import { ImageData } from './strapiMedia'

export type Attributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: ImageData | null
}

export type StickerAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    data: ImageData
  }
}

export type Sticker = {
  id: number
  attributes: Attributes
}

export type ApiResponse = {
  data: Sticker[]
}
