import { notFound } from 'next/navigation'
import { getReceivedCard } from '../../../../utils/strapi/receivedCard'
import ReceivedDetail from '../../../../layouts/ReceivedDetail'

export const generateMetadata = async ({
  params,
}: {
  params: { id: number }
}) => {
  const card = await getReceivedCard(params.id)
  if (
    !card?.data.attributes.card.data ||
    card.data.attributes.publishedAt === null
  ) {
    notFound()
  }

  return {
    title: `${card.data.attributes.card.data.attributes.creatorName} さんからの年賀状 - あけおめリンク`,
  }
}

const Page = async ({ params }: { params: { id: number } }) => {
  const card = await getReceivedCard(params.id)
  if (
    !card?.data.attributes.card.data ||
    card.data.attributes.publishedAt === null
  ) {
    notFound()
  }

  return (
    <ReceivedDetail
      cardRecord={card.data.attributes.card.data}
      randomSeed={card.data.attributes.randomSeed}
    />
  )
}

export default Page
