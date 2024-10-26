import { StrapiRecord } from '.'
import { MediaAttributes } from './media'

export type StickerAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    data: StrapiRecord<MediaAttributes>
  }
}
