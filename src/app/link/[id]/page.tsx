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
  console.log(checkIsDelivered(card.data))
  return (
    <Shared
      cardRecord={{
        attributes: card.data.attributes,
        id: card.data.id,
      }}
      cardCreatorId={card.data.attributes.creator.data.id}
      strapiUserId={session?.user.strapiUserId}
      isDelivered={checkIsDelivered(card.data)}
      isAlreadyReceived={
        recievedCard !== undefined &&
        recievedCard.data.attributes.publishedAt !== null
      }
      isAlreadyReserved={recievedCard !== undefined}
    />
  )
}

export default Page
