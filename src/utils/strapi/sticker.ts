'use server'

import { StrapiApiListResponse, StrapiRecord } from '.'
import { MediaAttributes } from './media'

export type StickerAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    data: StrapiRecord<MediaAttributes>
  }
}

export const getStickers = async () => {
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/stickers?populate=image`
    )

    const strapiData: StrapiApiListResponse<StickerAttributes> =
      await strapiResponse.json()

    const result = strapiData.data.map((item) => ({
      id: item.id,
      image: item.attributes.image
        ? item.attributes.image.data.attributes
        : null,
    }))

    return result
  } catch (error) {
    throw error
  }
}
