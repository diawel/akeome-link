'use server'

import { stringify } from 'qs'
import { StrapiApiListResponse, StrapiRecord } from '.'
import { MediaAttributes } from './media'

export type StickerAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    data: StrapiRecord<MediaAttributes>
  }
  randomVariants: {
    data: StrapiRecord<MediaAttributes>[] | null
  }
}

export const getStickers = async () => {
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/stickers?${stringify({
        populate: ['image', 'randomVariants'],
      })}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )

    const strapiData: StrapiApiListResponse<StickerAttributes> =
      await strapiResponse.json()

    return strapiData
  } catch (error) {
    throw error
  }
}
