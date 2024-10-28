import { redirect } from 'next/navigation'
import { getPublicCard } from '../../../utils/strapi/card'
import Shared from '../../../layouts/Shared'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  const card = await getPublicCard(parseInt(params.id, 10))
  return {
    title: `${card?.data.attributes.creatorName} さんから年賀状が届きました - あけおめリンク`,
    openGraph: {
      images: [`/api/og?cardId=${params.id}`],
    },
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getPublicCard(parseInt(params.id, 10))
  const session = await getServerSession(authOptions)
  if (!card) redirect('/')

  return (
    <Shared
      cardRecord={{
        attributes: card.data.attributes,
        id: card.data.id,
      }}
      cardCreatorId={card.data.attributes.creator.data.id}
      strapiUserId={session?.user.strapiUserId}
    />
  )
}

export default Page
