import { StrapiRecord } from '.'
import { MediaAttributes } from './media'

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
