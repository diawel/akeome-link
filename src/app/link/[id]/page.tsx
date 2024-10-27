import { redirect } from 'next/navigation'
import { getCard } from '../../../utils/strapi/card'
import Shared from '../../../layouts/Shared'

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  const card = await getCard(parseInt(params.id, 10))
  return {
    title: `${card?.data.attributes.creatorName} さんから年賀状が届きました - あけおめリンク`,
    openGraph: {
      images: [`/api/og?cardId=${params.id}`],
    },
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getCard(parseInt(params.id, 10))
  if (!card) {
    redirect('/')
  }

  return <Shared cardRecord={card.data} />
}

export default Page
