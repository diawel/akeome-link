import { StrapiRecord } from '.'
import { MediaAttributes } from './media'

type MinimumImage = {
  url: string
  width: number
  height: number
}

export type ImageUrlSet = {
  formats?: {
    large?: MinimumImage
    medium?: MinimumImage
    small?: MinimumImage
    thumbnail?: MinimumImage
  } | null
} & MinimumImage

const imageFormats = [
  'large',
  'medium',
  'small',
  'thumbnail',
  'original',
] as const

export type ImageFormat = (typeof imageFormats)[number]

export const getImageUrl = (
  urlSet: ImageUrlSet,
  maxFormat: ImageFormat = 'original'
) => {
  const maxFormatOfImage = urlSet.formats?.large
    ? 'large'
    : urlSet.formats?.medium
    ? 'medium'
    : urlSet.formats?.small
    ? 'small'
    : urlSet.formats?.thumbnail
    ? 'thumbnail'
    : 'original'
  const format =
    imageFormats.indexOf(maxFormatOfImage) < imageFormats.indexOf(maxFormat)
      ? 'original'
      : maxFormat
  const url =
    format === 'original'
      ? urlSet.url
      : urlSet.formats?.[format]?.url ?? urlSet.url
  return url.startsWith('/')
    ? `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${url}`
    : url
}

export const mediaRecordsToUrlSet = (
  records: StrapiRecord<MediaAttributes>[] | null
) => {
  return (
    records?.map((image) => ({
      id: image.id,
      urlSet: image.attributes,
    })) ?? []
  )
}
