import { getServerSession } from 'next-auth'
import { StrapiApiListResponse, StrapiError, StrapiRecord } from '.'
import { CardAttributes } from './card'
import { UserAttributes } from './user'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'

export type RecievedCardAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  card: { data: StrapiRecord<Omit<CardAttributes, 'creator'>> }
  reciever: { data: StrapiRecord<UserAttributes> }
}

export const getRecievedCard = async (id: number) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/recieved-card/${id}?${stringify({
        populate: ['card.userImages', 'reciever'],
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

    const card: StrapiRecord<RecievedCardAttributes> =
      await strapiResponse.json()
    return card
  } catch (error) {
    throw error
  }
}

export const getRecievedCards = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/recieved-card?${stringify({
        populate: ['card.userImages', 'reciever'],
        filters: {
          reciever: {
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

    const cards: StrapiApiListResponse<RecievedCardAttributes> =
      await strapiResponse.json()
    return cards
  } catch (error) {
    throw error
  }
}

export const addRecievedCard = async ({
  card,
  reciever,
}: {
  card: {
    id: number
  }
  reciever: {
    id: number
  }
}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/recieved-card`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          card,
          reciever,
        }),
      }
    )

    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const recievedCard: StrapiRecord<RecievedCardAttributes> =
      await strapiResponse.json()
    return recievedCard
  } catch (error) {
    throw error
  }
}
