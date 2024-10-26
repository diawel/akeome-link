export type MediaAttributes = {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: ImageFormat
    small?: ImageFormat
    medium?: ImageFormat
    thumbnail?: ImageFormat
  } | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown | null
  createdAt: string
  updatedAt: string
}

type ImageFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}
