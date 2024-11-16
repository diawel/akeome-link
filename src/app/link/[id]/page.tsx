import { notFound } from 'next/navigation'
import Shared from '../../../layouts/Shared'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { getSharedCard } from '../../../utils/strapi/card'
import { getReceivedCardByCardId } from '../../../utils/strapi/receivedCard'

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  const card = await getSharedCard(params.id)
  if (!card) {
    notFound()
  }

  return {
    title: `${card.data.attributes.creatorName} さんから年賀状が届きました - あけおめリンク`,
    openGraph: {
      images: [`/api/og?shareId=${params.id}`],
    },
    robots: {
      index: false,
    },
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getSharedCard(params.id)
  if (!card) {
    notFound()
  }
  const session = await getServerSession(authOptions)
  const recievedCard = await getReceivedCardByCardId(card.data.id)
  const isDelivered = new Date(card.data.attributes.deliveredAt) < new Date()

  return (
    <Shared
      cardCreatorId={card.data.attributes.creator.data.id}
      strapiUserId={session?.user.strapiUserId}
      existingReceivedCard={
        recievedCard
          ? {
              id: recievedCard.data.id,
              attributes: {
                randomSeed: recievedCard.data.attributes.randomSeed,
                publishedAt: recievedCard.data.attributes.publishedAt,
              },
            }
          : undefined
      }
      {...(isDelivered
        ? {
            isDelivered: true,
            cardRecord: {
              attributes: card.data.attributes,
              id: card.data.id,
            },
          }
        : {
            isDelivered: false,
            cardRecord: {
              attributes: {
                shareId: card.data.attributes.shareId,
                creatorName: card.data.attributes.creatorName,
                deliveredAt: card.data.attributes.deliveredAt,
              },
              id: card.data.id,
            },
          })}
    />
  )
}

export default Page
