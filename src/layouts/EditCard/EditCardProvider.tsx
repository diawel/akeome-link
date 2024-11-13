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
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

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

export const EditCardProvider = ({
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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const firstRenderRef = useRef(Date.now())

  useEffect(() => {
    const lastSaved = searchParams.get('lastSaved')
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
          existingCard.data.attributes.userImages.data?.map((userImage) => ({
            id: userImage.id,
            urlSet: userImage.attributes,
          })) ?? []
        )
        router.replace(pathname)
      })
    }
  }, [existingId, pathname, router, searchParams])

  const saveDraft = useCallback(
    (toSave: (typeof toSaveRef)['current']) => {
      if (!toSave) return
      console.log('saving')

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
          console.log('saved')
          router.push(`${pathname}?lastSaved=${Date.now()}`)
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
    },
    [existingId, pathname, router]
  )

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
      }}
    >
      {children}
    </EditCardContext.Provider>
  )
}
