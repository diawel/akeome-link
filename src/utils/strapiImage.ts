export type ImageUrlSet = {
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
    thumbnail?: { url: string }
  } | null
  url: string
}

const imageFormats = [
  'large',
  'medium',
  'small',
  'thumbnail',
  'original',
] as const

export type ImageFormat = (typeof imageFormats)[number]

export const getImageUrl = (urlSet: ImageUrlSet, maxFormat?: ImageFormat) => {
  const maxFormatOfImage = urlSet.formats?.large
    ? 'large'
    : urlSet.formats?.medium
    ? 'medium'
    : urlSet.formats?.small
    ? 'small'
    : urlSet.formats?.thumbnail
    ? 'thumbnail'
    : 'original'
  const formatIndex = Math.max(
    imageFormats.indexOf(maxFormat ?? 'original'),
    imageFormats.indexOf(maxFormatOfImage)
  )
  const url =
    imageFormats[formatIndex] === 'original'
      ? urlSet.url
      : urlSet.formats?.[imageFormats[formatIndex]]?.url ?? urlSet.url
  return url.startsWith('/')
    ? `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${url}`
    : url
}
