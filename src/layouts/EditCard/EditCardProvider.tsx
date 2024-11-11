'use client'

import { createContext, useContext, useState } from 'react'
import { CardBackground, CardLayout, UserImages } from '../../components/Card'

const EditCardContext = createContext<
  | {
      cardLayoutState: [CardLayout, (cardLayout: CardLayout) => void]
      cardBackgroundState: [
        CardBackground,
        (cardBackground: CardBackground) => void
      ]
      userImagesState: [UserImages, (userImages: UserImages) => void]
    }
  | undefined
>(undefined)

export const useEditCard = () => {
  const context = useContext(EditCardContext)
  if (!context) {
    throw new Error('useEditCard must be used within a EditCardProvider')
  }
  return context
}

type EditCardProviderProps = {
  children: React.ReactNode
}

export const EditCardProvider = ({ children }: EditCardProviderProps) => {
  const [cardLayout, setCardLayout] = useState<CardLayout>([])
  const [cardBackground, setCardBackground] = useState<CardBackground>({
    type: 'solid',
    color: '#ffffff',
  })
  const [userImages, setUserImages] = useState<UserImages>([])

  return (
    <EditCardContext.Provider
      value={{
        cardLayoutState: [cardLayout, setCardLayout],
        cardBackgroundState: [cardBackground, setCardBackground],
        userImagesState: [userImages, setUserImages],
      }}
    >
      {children}
    </EditCardContext.Provider>
  )
}
