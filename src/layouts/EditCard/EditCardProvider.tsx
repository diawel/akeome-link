'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CardBackground, CardLayout, UserImages } from '../../components/Card'
import { addCard, updateCard } from '../../utils/strapi/card'

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
  defaultCard?: {
    view: {
      layout: CardLayout
      background: CardBackground
    }
    userImages: UserImages
  }
  existingId?: number
}

export const EditCardProvider = ({
  children,
  defaultCard,
  existingId,
}: EditCardProviderProps) => {
  const [cardLayout, setCardLayout] = useState<CardLayout>(
    defaultCard?.view.layout ?? []
  )
  const [cardBackground, setCardBackground] = useState<CardBackground>(
    defaultCard?.view.background ?? {
      type: 'solid',
      color: '#ffffff',
    }
  )
  const [userImages, setUserImages] = useState<UserImages>(
    defaultCard?.userImages ?? []
  )
  const cardIdRef = useRef(existingId)
  const toSaveRef = useRef<{
    cardLayout: CardLayout
    cardBackground: CardBackground
    userImages: UserImages
  } | null>(null)
  const isSavingRef = useRef(false)
  const isModifiedRef = useRef(false)

  const saveDraft = useCallback((toSave: (typeof toSaveRef)['current']) => {
    if (!toSave) return
    console.log('saving')

    isSavingRef.current = true
    ;(cardIdRef.current === undefined
      ? addCard({
          userImages: toSave.userImages,
          view: {
            layout: toSave.cardLayout,
            background: toSave.cardBackground,
          },
          isDraft: true,
        })
      : updateCard({
          userImages: toSave.userImages,
          view: {
            layout: toSave.cardLayout,
            background: toSave.cardBackground,
          },
          isDraft: true,
          existingId: cardIdRef.current,
        })
    )
      .then((card) => {
        console.log('saved')
        cardIdRef.current = card.data.id
        history.replaceState(null, '', `/create/edit/${card.data.id}`)
        setTimeout(() => {
          if (toSave === toSaveRef.current) {
            isSavingRef.current = false
          } else {
            saveDraft(toSaveRef.current)
          }
        }, 1000)
      })
      .catch(() => {
        isSavingRef.current = false
      })
  }, [])

  useEffect(() => {
    if (!isModifiedRef.current) return

    toSaveRef.current = {
      cardLayout,
      cardBackground,
      userImages,
    }

    if (isSavingRef.current) return
    saveDraft(toSaveRef.current)
  }, [cardBackground, cardLayout, saveDraft, userImages])

  return (
    <EditCardContext.Provider
      value={{
        cardLayoutState: [
          cardLayout,
          (cardLayout) => {
            setCardLayout(cardLayout)
            isModifiedRef.current = true
          },
        ],
        cardBackgroundState: [
          cardBackground,
          (cardBackground) => {
            setCardBackground(cardBackground)
            isModifiedRef.current = true
          },
        ],
        userImagesState: [
          userImages,
          (userImages) => {
            setUserImages(userImages)
            isModifiedRef.current = true
          },
        ],
      }}
    >
      {children}
    </EditCardContext.Provider>
  )
}
