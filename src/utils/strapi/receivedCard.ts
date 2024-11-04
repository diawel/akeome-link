'use server'

import { getServerSession } from 'next-auth'
import {
  StrapiApiListResponse,
  StrapiApiResponse,
  StrapiError,
  StrapiRecord,
} from '.'
import { CardAttributes, getSharedCard } from './card'
import { UserAttributes } from './user'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'

export type ReceivedCardAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  card: { data: StrapiRecord<Omit<CardAttributes, 'creator'>> | null }
  receiver: { data: StrapiRecord<UserAttributes> | null }
  randomSeed: number
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
        filters: {
          receiver: {
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
      return undefined
    }

    const cards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    if (cards.data.length === 0) {
      return undefined
    }

    return {
      data: cards.data[0],
    }
  } catch (error) {
    throw error
  }
}

export const addUniqueReceivedCard = async ({
  shareId,
  randomSeed,
}: {
  shareId: string
  randomSeed?: number
}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const card = await getSharedCard(shareId)
    if (!card) {
      return undefined
    }

    const existingReceivedCards = await getReceivedCardByCardId(card.data.id)
    if (existingReceivedCards) {
      return existingReceivedCards
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
            card: card.data.id,
            receiver: session.user.strapiUserId,
            randomSeed:
              randomSeed ?? 10000000 + Math.floor(Math.random() * 90000000),
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
