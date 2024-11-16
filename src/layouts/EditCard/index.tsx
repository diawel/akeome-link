'use client'

import { useState } from 'react'
import Card from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'
import { useEditCard } from './EditCardProvider'
import FixedPage from '../../components/DisableScroll'

const EditCard = () => {
  const {
    cardLayoutState: [cardLayout, setCardLayout],
    cardBackgroundState: [cardBackground, setCardBackground],
    userImagesState: [userImages, setUserImages],
  } = useEditCard()
  const [isAnyFocused, setIsAnyFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <FixedPage>
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
              setUserImages,
            }}
          />
        </div>
        <Edit
          {...{
            isAnyFocused,
            setIsAnyFocused,
            setIsLoading,
          }}
        />
      </div>
    </FixedPage>
  )
}

export default EditCard
