'use client'

import { useState } from 'react'
import Card, {
  CardBackground,
  CardLayout,
  UserImages,
} from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'
import { uploadMedia } from '../../utils/strapi/media'
import Setting from './Setting'

const EditCard = () => {
  const [cardLayout, setCardLayout] = useState<CardLayout>([])
  const [cardBackground, setCardBackground] = useState<CardBackground>({
    type: 'solid',
    color: '#ffffff',
  })
  const [userImages, setUserImages] = useState<UserImages>([])
  const [isAnyFocused, setIsAnyFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

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
        onComplete={() => {
          if (isLoading) return
          setIsCompleted(true)
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
      {isCompleted && (
        <div className={styles.settingContainer}>
          <Setting
            onClose={() => setIsCompleted(false)}
            {...{
              cardLayout,
              cardBackground,
              userImages,
              isLoading,
              isCompleted,
              setIsCompleted,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default EditCard
