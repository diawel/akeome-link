import { redirect } from 'next/navigation'
import Shared from '../../../layouts/Shared'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { getSharedCard } from '../../../utils/strapi/card/server'
import { getReceivedCardByCardId } from '../../../utils/strapi/receivedCard'
import { checkIsDelivered } from '../../../utils/strapi/card'

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  const card = await getSharedCard(params.id)
  return {
    title: `${card?.data.attributes.creatorName} さんから年賀状が届きました - あけおめリンク`,
    openGraph: {
      images: [`/api/og?cardId=${params.id}`],
    },
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getSharedCard(params.id)
  if (!card) redirect('/')
  const session = await getServerSession(authOptions)
  const recievedCard = await getReceivedCardByCardId(card.data.id)
  const isDelivered = checkIsDelivered(card.data)

  return (
    <Shared
      cardCreatorId={card.data.attributes.creator.data.id}
      strapiUserId={session?.user.strapiUserId}
      isAlreadyReceived={
        recievedCard !== undefined &&
        recievedCard.data.attributes.publishedAt !== null
      }
      isAlreadyReserved={recievedCard !== undefined}
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
              },
              id: card.data.id,
            },
          })}
    />
  )
}

export default Page
