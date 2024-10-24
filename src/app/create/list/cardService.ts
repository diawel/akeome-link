import { StrapiError } from '../../../utils/strapi'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { Card } from '../../../utils/strapi/card'
import { ApiResponse } from '../../../utils/strapi/sticker'
import { AddCardParams } from '../../../utils/strapi/card'

export const getSticker = async () => {
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/stickers?populate=image`
    )

    const strapiData: ApiResponse = await strapiResponse.json()

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

export const getCreatedCards = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards?populate=creator,userImages`,
      { cache: 'no-cache' }
    )

    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const cards = await strapiResponse.json()
    const createdCards = cards.data.filter(
      (card: Card) =>
        card.attributes.creator.data.id === session.user.strapiUserId
    )

    return createdCards
  } catch (error) {
    throw error
  }
}

export const addCard = async ({
  title,
  creatorName,
  userImages,
  layout,
}: AddCardParams) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('creatorName', creatorName)
  userImages.forEach((image, index) => {
    formData.append(`userImages[${index}][blob]`, image.blob, `${index}.png`)
    formData.append(`userImages[${index}][uid]`, image.uid)
  })

  formData.append('layout', JSON.stringify(layout))
  formData.append('creator', JSON.stringify({ id: session.user.strapiUserId }))

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/cards`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.strapiToken}`,
        },
        body: formData,
      }
    )

    if (!strapiResponse.ok) {
      throw new Error(`Failed to add card: ${strapiResponse.statusText}`)
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error adding card')
  }
}
