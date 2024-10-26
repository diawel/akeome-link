import { getServerSession } from 'next-auth'
import { StrapiApiListResponse, StrapiError, StrapiRecord } from '.'
import { MediaAttributes } from './media'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'

export type CardAttributes = {
  title: string
  creatorName: string
  layout: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  userImages: { data: StrapiRecord<MediaAttributes>[] }
  creator: { data: StrapiRecord<{ id: string }> }
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
  layout: string
}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('creatorName', creatorName)
  userImages.forEach((image) => {
    formData.append('userImages', String(image.id))
  })
  formData.append('layout', JSON.stringify(layout))
  formData.append('creator', String(session.user.strapiUserId))

  const strapiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/cards`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.strapiToken}`,
      },
      body: formData,
    }
  )

  if (!strapiResponse.ok) {
    throw new Error(`Failed to add card: ${strapiResponse.statusText}`)
  }
}
