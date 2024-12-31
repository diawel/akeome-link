'use server'

import { getServerSession } from 'next-auth'
import {
  StrapiApiListResponse,
  StrapiApiResponse,
  StrapiError,
  StrapiRecord,
} from '.'
import { getSharedCard } from './card'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'
import { CardAttributes } from './card'

export type ReceivedCardAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  card: {
    data: StrapiRecord<Omit<CardAttributes, 'creator'>> | null
  }
  randomSeed: number
}

const recordFilter = (record: StrapiRecord<ReceivedCardAttributes>) => ({
  id: record.id,
  attributes: {
    createdAt: record.attributes.createdAt,
    updatedAt: record.attributes.updatedAt,
    publishedAt: record.attributes.publishedAt,
    card: {
      data: record.attributes.card.data
        ? {
            id: record.attributes.card.data.id,
            attributes: {
              creatorName: record.attributes.card.data.attributes.creatorName,
              view: record.attributes.card.data.attributes.view,
              userImages: record.attributes.card.data.attributes.userImages,
              publishedAt: record.attributes.card.data.attributes.publishedAt,
              deliveredAt: record.attributes.card.data.attributes.deliveredAt,
              shareId: record.attributes.card.data.attributes.shareId,
            },
          }
        : null,
    },
    randomSeed: record.attributes.randomSeed,
  },
})

export type SecureReceivedCardAttributes = ReturnType<
  typeof recordFilter
>['attributes']

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
        populate: 'card.userImages',
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

    const receivedCard: StrapiApiResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return {
      data: recordFilter(receivedCard.data),
    }
  } catch (error) {
    throw error
  }
}

export const getReceivedCards = async ({ page }: { page?: number } = {}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards?${stringify({
        populate: 'card.userImages',
        filters: {
          receiver: {
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

    const receivedCards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return {
      data: receivedCards.data.map((receivedCard) =>
        recordFilter(receivedCard)
      ),
      meta: receivedCards.meta,
    }
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
        populate: 'card.userImages',
        publicationState: 'preview',
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

    const receivedCards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    if (receivedCards.data.length === 0) {
      return undefined
    }

    return {
      data: recordFilter(receivedCards.data[0]),
    }
  } catch (error) {
    throw error
  }
}

export const addUniqueReceivedCard = async ({
  shareId,
  randomSeed,
  isReserve,
}: {
  shareId: string
  randomSeed?: number
  isReserve?: boolean
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

    const existingReceivedCard = await getReceivedCardByCardId(card.data.id)
    const shouldUpdate =
      !isReserve &&
      existingReceivedCard?.data.attributes.publishedAt === null &&
      new Date(card.data.attributes.deliveredAt) < new Date()
    if (existingReceivedCard && !shouldUpdate) {
      return existingReceivedCard
    }
    const strapiResponse = shouldUpdate
      ? await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/received-cards/${existingReceivedCard.data.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
              data: {
                card: card.data.id,
                receiver: session.user.strapiUserId,
                randomSeed: existingReceivedCard.data.attributes.randomSeed,
                publishedAt: new Date().toISOString(),
              },
            }),
          }
        )
      : await fetch(
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
                ...(isReserve ? { publishedAt: null } : {}),
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

export const getReservedCards = async ({
  page,
  filter,
}: { page?: number; filter?: 'delivered' | 'undelivered' } = {}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards?${stringify({
        populate: 'card.userImages',
        publicationState: 'preview',
        filters: {
          receiver: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
          publishedAt: {
            $null: true,
          },
          ...(filter && filter === 'delivered'
            ? {
                card: {
                  deliveredAt: {
                    $lt: new Date().toISOString(),
                  },
                },
              }
            : {
                card: {
                  deliveredAt: {
                    $gte: new Date().toISOString(),
                  },
                },
              }),
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

    const receivedCards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return {
      data: receivedCards.data.map((receivedCard) =>
        recordFilter(receivedCard)
      ),
      meta: receivedCards.meta,
    }
  } catch (error) {
    throw error
  }
}

export const countNewArrivalCards = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards?${stringify({
        publicationState: 'preview',
        filters: {
          receiver: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
          publishedAt: {
            $null: true,
          },
          card: {
            deliveredAt: {
              $lt: new Date().toISOString(),
            },
          },
        },
        pagination: {
          pageSize: 1,
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

    const receivedCards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return receivedCards.meta.pagination.total
  } catch (error) {
    throw error
  }
}

export const countReceivedRecords = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/received-cards?${stringify({
        publicationState: 'preview',
        filters: {
          card: {
            creator: {
              id: {
                $eq: session.user.strapiUserId,
              },
            },
          },
        },
        pagination: {
          pageSize: 1,
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

    const receivedCards: StrapiApiListResponse<ReceivedCardAttributes> =
      await strapiResponse.json()
    return receivedCards.meta.pagination.total
  } catch (error) {
    throw error
  }
}

export const receiveAllReservedCards = async (): Promise<number> => {
  const reservedCards = await getReservedCards({
    filter: 'delivered',
  })

  if (!reservedCards) {
    return 0
  }

  if (reservedCards.data.length === 0) {
    return 0
  }

  await Promise.all(
    reservedCards.data.map((receivedCard) => {
      if (!receivedCard.attributes.card.data) {
        return
      }
      return addUniqueReceivedCard({
        shareId: receivedCard.attributes.card.data.attributes.shareId,
        randomSeed: receivedCard.attributes.randomSeed,
      })
    })
  )

  return (await receiveAllReservedCards()) + reservedCards.data.length
}
