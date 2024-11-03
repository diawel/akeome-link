'use client'

import { useEffect, useState } from 'react'
import Card, { CardBackground, CardLayout } from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'
import { ImageUrlSet } from '../../utils/strapi/strapiImage'
import { addCard } from '../../utils/strapi/card'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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
      layout: cardLayout,
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
