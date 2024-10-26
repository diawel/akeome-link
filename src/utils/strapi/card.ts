'use server'

import { getServerSession } from 'next-auth'
import { StrapiApiListResponse, StrapiError, StrapiRecord } from '.'
import { MediaAttributes } from './media'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'

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
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards?populate=creator,userImages&filters[creator][id][$eq]=${session.user.strapiUserId}`,
      { cache: 'no-cache' }
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
