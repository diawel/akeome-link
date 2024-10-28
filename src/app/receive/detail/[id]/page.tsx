import { redirect } from 'next/navigation'
import { getReceivedCard } from '../../../../utils/strapi/receivedCard'
import ReceivedDetail from '../../../../layouts/ReceivedDetail'

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getReceivedCard(parseInt(params.id, 10))

  if (!card?.data.attributes.card.data) {
    redirect('/receive/list')
  }

  return <ReceivedDetail cardRecord={card.data.attributes.card.data} />
}

export default Page
