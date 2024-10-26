'use client'

import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'
import { ImageUrlSet } from '../../utils/strapiImage'
import { addCard } from '../../utils/strapi/card'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const creatorNameLocalStorageKey = 'creatorName'

const EditCard = () => {
  const { data: session } = useSession()
  const [cardLayout, setCardLayout] = useState<
    React.ComponentProps<typeof Card>['layout']
  >([])
  const [userImages, setUserImages] = useState<
    {
      id: number
      urlSet: ImageUrlSet
    }[]
  >([])

  const [isAnyFocused, setIsAnyFocused] = useState(false)
  const [title, setTitle] = useState('無題')
  const [creatorName, setCreatorName] = useState<string | undefined>(undefined)
  const [isSaving, setIsSaving] = useState(false)
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
    if (isSaving) return

    if (!title) alert('タイトルを入力してください')
    if (!creatorName) alert('作者名を入力してください')

    setIsSaving(true)
    localStorage.setItem(creatorNameLocalStorageKey, creatorName)
    addCard({
      title: 'テスト',
      creatorName: 'テスト作者',
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
        isSaving
          ? {
              pointerEvents: isSaving ? 'none' : 'auto',
              filter: isSaving ? 'brightness(0.5)' : 'none',
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
          userImages={userImages}
          maxFormat="medium"
          edit={{
            isAnyFocused,
            setIsAnyFocused,
            setLayout: setCardLayout,
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
        }}
      />
    </div>
  )
}

export default EditCard
