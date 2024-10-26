'use client'

import { useState } from 'react'
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
  >([
    {
      container: { x: 100, y: 150, scale: 1, rotate: 0 },
      content: {
        type: 'userImage',
        id: 1,
      },
    },
    {
      container: { x: 200, y: 150, scale: 1, rotate: 0 },
      content: {
        type: 'sticker',
        stickerId: 1,
      },
    },
    {
      container: { x: 200, y: 291, scale: 1, rotate: 0 },
      content: {
        type: 'text',
        text: 'Hello,\nworld!<script>alert(1)</script>',
        color: '#000',
        align: 'center',
      },
    },
  ])
  const [userImages, setUserImages] = useState<
    {
      id: number
      urlSet: ImageUrlSet
    }[]
  >([
    {
      id: 1,
      urlSet: {
        url: 'https://placehold.jp/150x150.png',
      },
    },
  ])
  console.log(session?.user?.name)
  const [isAnyFocused, setIsAnyFocused] = useState(false)
  const [title, setTitle] = useState('無題')
  const [creatorName, setCreatorName] = useState(
    localStorage.getItem(creatorNameLocalStorageKey) ??
      session?.user?.name ??
      'ゲスト'
  )
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const save = () => {
    if (isSaving) return

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
