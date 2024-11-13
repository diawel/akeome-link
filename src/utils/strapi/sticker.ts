'use server'

import { stringify } from 'qs'
import { StrapiApiListResponse, StrapiRecord } from '.'
import { MediaAttributes } from './media'

export type StickerAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  image: {
    data: StrapiRecord<MediaAttributes>
  }
  randomVariants: {
    data: StrapiRecord<MediaAttributes>[] | null
  }
  current: boolean
}

export const getStickers = async () => {
  try {
    const stickerRecords: StrapiRecord<StickerAttributes>[] = []
    const getPage = async (page: number) => {
      const strapiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/stickers?${stringify(
          {
            populate: ['image', 'randomVariants'],
            pagination: {
              page,
              pageSize: 100,
            },
          }
        )}`,
        {
          cache: 'no-cache',
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      )

      const strapiData: StrapiApiListResponse<StickerAttributes> =
        await strapiResponse.json()
      stickerRecords.push(...strapiData.data)

      if (
        strapiData.meta.pagination.pageCount > strapiData.meta.pagination.page
      ) {
        await getPage(page + 1)
      }
    }
    await getPage(1)

    return stickerRecords
  } catch (error) {
    throw error
  }
}
