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
          setCardBackground,
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
