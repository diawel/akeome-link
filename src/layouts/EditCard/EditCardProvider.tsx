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
import {
  CardAttributes,
  DraftCardAttributes,
  getCreatedCard,
  updateCard,
} from '../../utils/strapi/card'
import { StrapiApiResponse } from '../../utils/strapi'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'

const EditCardContext = createContext<
  | {
      cardLayoutState: [CardLayout, (cardLayout: CardLayout) => void]
      cardBackgroundState: [
        CardBackground,
        (cardBackground: CardBackground) => void
      ]
      userImagesState: [UserImages, (userImages: UserImages) => void]
      saveCard: (
        title: string,
        creatorName: string,
        deliveredAt: Date
      ) => Promise<StrapiApiResponse<CardAttributes | DraftCardAttributes>>
      isSyncing: boolean
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
  defaultCard: {
    view: {
      layout: CardLayout
      background: CardBackground
    }
    userImages: UserImages
  }
  existingId: number
}

const EditCardProvider = ({
  children,
  defaultCard,
  existingId,
}: EditCardProviderProps) => {
  const [cardLayout, setCardLayout] = useState<CardLayout>(
    defaultCard.view.layout
  )
  const [cardBackground, setCardBackground] = useState<CardBackground>(
    defaultCard.view.background
  )
  const [userImages, setUserImages] = useState<UserImages>(
    defaultCard.userImages
  )
  const toSaveRef = useRef<{
    cardLayout: CardLayout
    cardBackground: CardBackground
    userImages: UserImages
  } | null>(null)
  const isSavingRef = useRef(false)
  const isModifiedRef = useRef(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const firstRenderRef = useRef(Date.now())
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const lastSaved = history.state?.lastSaved
    if (lastSaved && Number(lastSaved) < firstRenderRef.current) {
      getCreatedCard(existingId).then((existingCard) => {
        if (
          !existingCard ||
          existingCard.data.attributes.publishedAt !== null
        ) {
          redirect('/create/new')
        }
        setCardLayout(existingCard.data.attributes.view.layout)
        setCardBackground(existingCard.data.attributes.view.background)
        setUserImages(
          mediaRecordsToUrlSet(existingCard.data.attributes.userImages.data)
        )
        router.replace(location.pathname)
      })
    }
  }, [existingId, router, searchParams])

  const saveDraft = useCallback(
    (toSave: (typeof toSaveRef)['current'], initialPathname: string) => {
      if (!toSave) return
      setIsSyncing(true)

      isSavingRef.current = true
      updateCard({
        userImages: toSave.userImages,
        view: {
          layout: toSave.cardLayout,
          background: toSave.cardBackground,
        },
        isDraft: true,
        existingId,
      })
        .then(() => {
          if (initialPathname === location.pathname) {
            history.replaceState(
              {
                lastSaved: Date.now(),
              },
              ''
            )
          }
          if (!toSaveRef.current || toSave === toSaveRef.current) {
            isSavingRef.current = false
            setIsSyncing(false)
          } else {
            setTimeout(
              () => saveDraft(toSaveRef.current, initialPathname),
              1000
            )
          }
        })
        .catch(() => {
          isSavingRef.current = false
        })
    },
    [existingId]
  )

  useEffect(() => {
    if (!isModifiedRef.current) return

    toSaveRef.current = {
      cardLayout,
      cardBackground,
      userImages,
    }

    if (isSavingRef.current) return
    saveDraft(toSaveRef.current, location.pathname)
  }, [cardBackground, cardLayout, saveDraft, userImages])

  const saveCard = useCallback(
    async (title: string, creatorName: string, deliveredAt: Date) => {
      return await updateCard({
        title,
        creatorName,
        view: {
          layout: cardLayout,
          background: cardBackground,
        },
        userImages,
        deliveredAt,
        existingId,
        isDraft: false,
      })
    },
    [cardBackground, cardLayout, existingId, userImages]
  )

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
        saveCard,
        isSyncing,
      }}
    >
      {children}
    </EditCardContext.Provider>
  )
}

export default EditCardProvider
