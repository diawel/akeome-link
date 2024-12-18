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
import { useRouter } from 'next/navigation'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'

const EditCardContext = createContext<
  | {
      cardLayoutState: [CardLayout | null, (cardLayout: CardLayout) => void]
      cardBackgroundState:
        | [CardBackground | null, (cardBackground: CardBackground) => void]
      userImagesState: [UserImages | null, (userImages: UserImages) => void]
      saveCard:
        | ((
            title: string,
            creatorName: string,
            deliveredAt: Date
          ) => Promise<StrapiApiResponse<CardAttributes | DraftCardAttributes>>)
        | null
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
  existingId: number
}

const EditCardProvider = ({ children, existingId }: EditCardProviderProps) => {
  const [cardLayout, setCardLayout] = useState<CardLayout | null>(null)
  const [cardBackground, setCardBackground] = useState<CardBackground | null>(
    null
  )
  const [userImages, setUserImages] = useState<UserImages | null>(null)
  const toSaveRef = useRef<{
    cardLayout: CardLayout
    cardBackground: CardBackground
    userImages: UserImages
  } | null>(null)
  const isSavingRef = useRef(false)
  const isModifiedRef = useRef(false)
  const router = useRouter()
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    getCreatedCard(existingId).then((existingCard) => {
      if (!existingCard || existingCard.data.attributes.publishedAt !== null) {
        router.replace(`/create/detail/${existingId}`)
        return
      }
      setCardLayout(existingCard.data.attributes.view.layout)
      setCardBackground(existingCard.data.attributes.view.background)
      setUserImages(
        mediaRecordsToUrlSet(existingCard.data.attributes.userImages.data)
      )
      router.replace(location.pathname)
    })
  }, [existingId, router])

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
    if (!cardLayout || !cardBackground || !userImages) return

    toSaveRef.current = {
      cardLayout,
      cardBackground,
      userImages,
    }

    if (isSavingRef.current) return
    saveDraft(toSaveRef.current, location.pathname)
  }, [cardBackground, cardLayout, saveDraft, userImages])

  const saveCard =
    cardLayout && cardBackground && userImages
      ? async (title: string, creatorName: string, deliveredAt: Date) => {
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
        }
      : null

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
