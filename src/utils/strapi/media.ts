'use server'

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

export const uploadMedia = async (receivedFormData: FormData) => {
  try {
    const formData = new FormData()
    const files = receivedFormData.get('files')
    if (!files) throw new Error('Missing files')
    formData.append('files', files)
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )

    const strapiData: (MediaAttributes & { id: number })[] =
      await strapiResponse.json()

    return strapiData
  } catch (error) {
    throw error
  }
}
