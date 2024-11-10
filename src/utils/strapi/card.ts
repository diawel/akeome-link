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
  userImages: { data: StrapiRecord<MediaAttributes>[] }
  creator: { data: StrapiRecord<UserAttributes> }
  shareId: string
  deliveredAt: string
}

export const getCreatedCard = async (id: number) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return undefined
    }

    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/cards/${id}?${stringify({
        populate: ['creator', 'userImages'],
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

    const card: StrapiApiResponse<CardAttributes> = await strapiResponse.json()
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

export const getCreatedCards = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards?${stringify({
        populate: ['creator', 'userImages'],
        filters: {
          creator: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
        },
        sort: {
          0: 'updatedAt:desc',
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

    const cards: StrapiApiListResponse<CardAttributes> =
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
}: {
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
            deliveredAt: deliveredAt.toISOString(),
          },
        }),
      }
    )

    if (!strapiResponse.ok) {
      throw new Error(`Failed to add card: ${strapiResponse.statusText}`)
    }

    const card: StrapiApiResponse<CardAttributes> = await strapiResponse.json()

    return card
  } catch (error) {
    throw error
  }
}
