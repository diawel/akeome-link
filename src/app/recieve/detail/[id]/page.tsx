import { redirect } from 'next/navigation'
import { getRecievedCard } from '../../../../utils/strapi/recievedCard'
import RecievedDetail from '../../../../layouts/RecievedDetail'
import { getCard } from '../../../../utils/strapi/card'

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
  const card = await getRecievedCard(parseInt(params.id, 10))

  if (!card?.data.attributes.card.data) {
    redirect('/recieve/list')
  }

  return <RecievedDetail cardRecord={card.data.attributes.card.data} />
}

export default Page
