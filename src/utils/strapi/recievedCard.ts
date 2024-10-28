'use server'

import { getServerSession } from 'next-auth'
import {
  StrapiApiListResponse,
  StrapiApiResponse,
  StrapiError,
  StrapiRecord,
} from '.'
import { CardAttributes } from './card'
import { UserAttributes } from './user'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'

export type ReceivedCardAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  card: { data: StrapiRecord<Omit<CardAttributes, 'creator'>> | null }
  receiver: { data: StrapiRecord<UserAttributes> | null }
}

export const getReceivedCard = async (id: number) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards/${id}?${stringify({
        populate: ['card.userImages', 'receiver'],
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

    const card: StrapiApiResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return card
  } catch (error) {
    throw error
  }
}

export const getReceivedCards = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards?${stringify({
        populate: ['card.userImages', 'receiver'],
        filters: {
          receiver: {
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

    const cards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return cards
  } catch (error) {
    throw error
  }
}

export const getReceivedCardByCardId = async (cardId: number) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards?${stringify({
        populate: ['card.userImages', 'receiver'],
        filters: {
          receiver: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
          card: {
            id: {
              $eq: cardId,
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
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const cards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return cards
  } catch (error) {
    throw error
  }
}

export const addUniqueReceivedCard = async ({
  card,
}: {
  card: {
    id: number
  }
}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const existingReceivedCards = await getReceivedCardByCardId(card.id)
    if (existingReceivedCards?.data.length) {
      return { data: existingReceivedCards.data[0] }
    }
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/received-cards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            card: card.id,
            receiver: session.user.strapiUserId,
            randomSeed: 0,
          },
        }),
      }
    )

    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const receivedCard: StrapiApiResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return receivedCard
  } catch (error) {
    throw error
  }
}
