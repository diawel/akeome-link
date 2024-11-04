import { redirect } from 'next/navigation'
import Shared from '../../../layouts/Shared'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { CardAttributes, getSharedCard } from '../../../utils/strapi/card'
import { StrapiRecord } from '../../../utils/strapi'
import {
  getReceivedCardByCardId,
  getReservedCardByCardId,
} from '../../../utils/strapi/receivedCard'

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

const checkIsDelivered = (
  card: StrapiRecord<Pick<CardAttributes, 'isExpress' | 'publishedAt'>>
) => {
  if (card.attributes.isExpress) return true
  const now = new Date()
  const publishedAt = new Date(card.attributes.publishedAt)
  if (publishedAt.getMonth() === 0) {
    const deliveredAt = new Date(
      publishedAt.getFullYear(),
      publishedAt.getMonth(),
      publishedAt.getDate() + 1,
      6
    )
    return now >= deliveredAt
  }
  return now.getFullYear() > publishedAt.getFullYear()
}

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getSharedCard(params.id)
  if (!card) redirect('/')
  const session = await getServerSession(authOptions)
  const isDelivered = checkIsDelivered(card.data)
  const isReceived =
    isDelivered && Boolean(await getReceivedCardByCardId(card.data.id))
  const isReserved =
    !isDelivered &&
    !isReceived &&
    Boolean(await getReservedCardByCardId(card.data.id))

  return (
    <Shared
      cardRecord={{
        attributes: card.data.attributes,
        id: card.data.id,
      }}
      cardCreatorId={card.data.attributes.creator.data.id}
      strapiUserId={session?.user.strapiUserId}
      isDelivered={isDelivered}
      isAlreadyReceived={isReceived}
      isAlreadyReserved={isReserved}
    />
  )
}

export default Page
