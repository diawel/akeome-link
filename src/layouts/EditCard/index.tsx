'use client'

import { useState } from 'react'
import Card from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'
import { useEditCard } from './EditCardProvider'

const EditCard = () => {
  const {
    cardLayoutState: [cardLayout, setCardLayout],
    cardBackgroundState: [cardBackground, setCardBackground],
    userImagesState: [userImages, setUserImages],
  } = useEditCard()
  const [isAnyFocused, setIsAnyFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      <Meta />
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
    </div>
  )
}

export default EditCard
