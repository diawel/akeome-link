'use client'

import { useEffect, useState } from 'react'
import Card, { CardBackground, CardLayout } from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'
import { ImageUrlSet } from '../../utils/strapi/strapiImage'
import { addCard } from '../../utils/strapi/card/server'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { uploadMedia } from '../../utils/strapi/media'

const creatorNameLocalStorageKey = 'creatorName'

const EditCard = () => {
  const { data: session } = useSession({ required: true })
  const [cardLayout, setCardLayout] = useState<CardLayout>([])
  const [cardBackground, setCardBackground] = useState<CardBackground>({
    type: 'solid',
    color: '#ffffff',
  })
  const [userImages, setUserImages] = useState<
    {
      id: number
      urlSet: ImageUrlSet
    }[]
  >([])
  const [isAnyFocused, setIsAnyFocused] = useState(false)
  const [title, setTitle] = useState('無題')
  const [creatorName, setCreatorName] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!session) return
    setCreatorName(
      localStorage.getItem(creatorNameLocalStorageKey) ??
        session?.user?.name ??
        'ゲスト'
    )
  }, [session])

  const save = () => {
    if (creatorName === undefined) return
    if (isLoading) return

    if (!title) alert('タイトルを入力してください')
    if (!creatorName) alert('作者名を入力してください')

    setIsLoading(true)
    localStorage.setItem(creatorNameLocalStorageKey, creatorName)
    addCard({
      title,
      creatorName,
      view: {
        layout: cardLayout,
        background: cardBackground,
      },
      userImages: userImages,
    }).then((response) => {
      router.push(`/create/detail/${response.data.id}`)
    })
  }

  return (
    <div
      className={styles.screen}
      style={
        isLoading
          ? {
              pointerEvents: isLoading ? 'none' : 'auto',
              filter: isLoading ? 'brightness(0.5)' : 'none',
            }
          : {}
      }
    >
      <Meta
        onSave={save}
        {...{
          title,
          setTitle,
          creatorName,
          setCreatorName,
        }}
      />
      <div>
        <select
          value={cardBackground.type}
          onChange={(event) => {
            setCardBackground(
              event.target.value === 'solid'
                ? { type: 'solid', color: '#ffffff' }
                : { type: 'userImage', id: -1 }
            )
          }}
        >
          <option value="solid">単色</option>
          <option value="userImage">画像</option>
        </select>
        {cardBackground.type === 'solid' ? (
          <input
            type="color"
            value={cardBackground.color}
            onChange={(event) =>
              setCardBackground({ type: 'solid', color: event.target.value })
            }
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setIsLoading(true)
              const file = event.target.files?.[0]
              if (!file) return
              const formData = new FormData()
              formData.append('files', file)
              uploadMedia(formData)
                .then((media) => {
                  setUserImages(
                    userImages.concat({
                      id: media[0].id,
                      urlSet: media[0],
                    })
                  )
                  setCardBackground({ type: 'userImage', id: media[0].id })
                  setIsLoading(false)
                })
                .catch(() => {
                  alert(
                    `画像のアップロードに失敗しました。画像サイズの上限は${process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_TEXT}です。`
                  )
                  setIsLoading(false)
                })
            }}
          />
        )}
      </div>
      <div className={styles.cardWrapper}>
        <Card
          layout={cardLayout}
          background={cardBackground}
          userImages={userImages}
          edit={{
            isAnyFocused,
            setIsAnyFocused,
            setLayout: setCardLayout,
            setBackground: setCardBackground,
          }}
        />
      </div>
      <Edit
        {...{
          cardLayout,
          setCardLayout,
          isAnyFocused,
          setIsAnyFocused,
          userImages,
          setUserImages,
          setIsLoading,
        }}
      />
    </div>
  )
}

export default EditCard
