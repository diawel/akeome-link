'use server'

import { getServerSession } from 'next-auth'
import {
  StrapiApiListResponse,
  StrapiApiResponse,
  StrapiError,
  StrapiRecord,
} from '.'
import { MediaAttributes } from './media'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'
import { CardLayout } from '../../components/Card'
import { UserAttributes } from './user'

export type CardAttributes = {
  title: string
  creatorName: string
  layout: CardLayout
  createdAt: string
  updatedAt: string
  publishedAt: string
  userImages: { data: StrapiRecord<MediaAttributes>[] }
  creator: { data: StrapiRecord<UserAttributes> }
  shareId: string | null
}

export const getPrivateCard = async (id: number) => {
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
          ...card.data[0].attributes,
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
  layout,
}: {
  title: string
  creatorName: string
  userImages: {
    id: number
  }[]
  layout: CardLayout
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
            layout: layout,
            creator: session.user.strapiUserId,
            userImages: userImages.map((userImage) => userImage.id),
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
