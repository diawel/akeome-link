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
  card: { data: StrapiRecord<Omit<CardAttributes, 'userImages' | 'creator'>> }
  reciever: { data: StrapiRecord<UserAttributes> }
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
        populate: ['card', 'reciever'],
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
