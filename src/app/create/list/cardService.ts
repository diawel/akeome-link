import { NextApiRequest, NextApiResponse } from 'next'
import { StrapiError } from '../../../utils/strapi'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { Card } from '../../../utils/card'

export async function getCreatedCards(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/cards?populate=creator`,
      { cache: 'no-cache' }
    )

    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const { data: cards }: { data: Card[] } = await strapiResponse.json()

    const createdCards = cards.filter(card =>
      card.attributes.creator.data.id === session.user.strapiUserId
    )
    return createdCards
  } catch (error) {
    throw error
  }
}
