'use server'

import { getServerSession } from 'next-auth'
import {
  StrapiApiListResponse,
  StrapiApiResponse,
  StrapiError,
  StrapiRecord,
} from '.'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'
import { CardBackground, CardLayout } from '../../components/Card'
import { MediaAttributes } from './media'
import { UserAttributes } from './user'

export type CardAttributes = {
  title: string
  creatorName: string
  view: {
    background: CardBackground
    layout: CardLayout
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
  userImages: { data: StrapiRecord<MediaAttributes>[] | null }
  creator: { data: StrapiRecord<UserAttributes> }
  shareId: string
  deliveredAt: string
}

export type DraftCardAttributes = {
  title?: string
  creatorName?: string
  view: {
    background: CardBackground
    layout: CardLayout
  }
  createdAt: string
  updatedAt: string
  publishedAt: null
  userImages: { data: StrapiRecord<MediaAttributes>[] | null }
  creator: { data: StrapiRecord<UserAttributes> }
  shareId: string
  deliveredAt?: string
}

export const getCreatedCard = async (id: number) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/cards/${id}?${stringify({
        populate: ['creator', 'userImages'],
        publicationState: 'preview',
        filter: {
          creator: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
        },
      })}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    if (!strapiResponse.ok) {
      return undefined
    }

    const card: StrapiApiResponse<CardAttributes | DraftCardAttributes> =
      await strapiResponse.json()
    if (card.data.attributes.creator.data.id !== session.user.strapiUserId) {
      return undefined
    }

    return card
  } catch (error) {
    throw error
  }
}

export const getSharedCard = async (shareId: string) => {
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards?${stringify({
        populate: ['creator', 'userImages'],
        filters: {
          shareId: {
            $eq: shareId,
          },
        },
      })}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    if (!strapiResponse.ok) {
      return undefined
    }

    const card: StrapiApiListResponse<CardAttributes> =
      await strapiResponse.json()
    if (card.data.length === 0) {
      return undefined
    }

    return {
      data: {
        ...card.data[0],
        attributes: {
          creatorName: card.data[0].attributes.creatorName,
          shareId: card.data[0].attributes.shareId,
          view: card.data[0].attributes.view,
          userImages: card.data[0].attributes.userImages,
          deliveredAt: card.data[0].attributes.deliveredAt,
          publishedAt: card.data[0].attributes.publishedAt,
          creator: {
            data: {
              id: card.data[0].attributes.creator.data.id,
            },
          },
        },
      },
    }
  } catch (error) {
    throw error
  }
}

export const getCreatedCards = async ({ page }: { page?: number } = {}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards?${stringify({
        populate: ['creator', 'userImages'],
        publicationState: 'preview',
        filters: {
          creator: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
        },
        sort: 'updatedAt:desc',
        pagination: {
          page: page ?? 1,
        },
      })}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )

    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const cards: StrapiApiListResponse<CardAttributes | DraftCardAttributes> =
      await strapiResponse.json()
    return cards
  } catch (error) {
    throw error
  }
}

export const addCard = async ({
  title,
  creatorName,
  userImages,
  view,
  deliveredAt,
  isDraft,
}:
  | {
      title?: string
      creatorName?: string
      userImages: {
        id: number
      }[]
      view: {
        layout: CardLayout
        background: CardBackground
      }
      deliveredAt?: Date
      isDraft: true
    }
  | {
      title: string
      creatorName: string
      userImages: {
        id: number
      }[]
      view: {
        layout: CardLayout
        background: CardBackground
      }
      deliveredAt: Date
      isDraft?: false
    }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title,
            creatorName,
            view,
            creator: session.user.strapiUserId,
            userImages: userImages.map((userImage) => userImage.id),
            deliveredAt: deliveredAt?.toISOString(),
            ...(isDraft ? { publishedAt: null } : {}),
          },
        }),
      }
    )

    if (!strapiResponse.ok) {
      throw new Error(`Failed to add card: ${strapiResponse.statusText}`)
    }

    if (isDraft) {
      const card: StrapiApiResponse<DraftCardAttributes> =
        await strapiResponse.json()
      return card
    }
    const card: StrapiApiResponse<CardAttributes> = await strapiResponse.json()
    return card
  } catch (error) {
    throw error
  }
}

export const updateCard = async ({
  title,
  creatorName,
  userImages,
  view,
  deliveredAt,
  isDraft,
  existingId,
}:
  | {
      title?: string
      creatorName?: string
      userImages: {
        id: number
      }[]
      view: {
        layout: CardLayout
        background: CardBackground
      }
      deliveredAt?: Date
      isDraft: true
      existingId: number
    }
  | {
      title: string
      creatorName: string
      userImages: {
        id: number
      }[]
      view: {
        layout: CardLayout
        background: CardBackground
      }
      deliveredAt: Date
      isDraft?: false
      existingId: number
    }) => {
  const existingCard = await getCreatedCard(existingId)

  if (!existingCard) {
    throw new Error('Card not found')
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards/${existingId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title,
            creatorName,
            view,
            creator: existingCard.data.attributes.creator.data.id,
            userImages: userImages.map((userImage) => userImage.id),
            deliveredAt: deliveredAt?.toISOString(),
            publishedAt: isDraft ? null : new Date().toISOString(),
          },
        }),
      }
    )

    if (!strapiResponse.ok) {
      throw new Error(`Failed to update card: ${strapiResponse.statusText}`)
    }

    if (isDraft) {
      const card: StrapiApiResponse<DraftCardAttributes> =
        await strapiResponse.json()
      return card
    }
    const card: StrapiApiResponse<CardAttributes> = await strapiResponse.json()
    return card
  } catch (error) {
    throw error
  }
}

export const deleteCreatedCard = async (id: number) => {
  const existingCard = await getCreatedCard(id)

  if (!existingCard) {
    throw new Error('Card not found')
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )

    if (!strapiResponse.ok) {
      throw new Error(`Failed to delete card: ${strapiResponse.statusText}`)
    }
  } catch (error) {
    throw error
  }
}
