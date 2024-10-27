import { redirect } from 'next/navigation'
import { getRecievedCard } from '../../../../utils/strapi/recievedCard'
import RecievedDetail from '../../../../layouts/RecievedDetail'

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getRecievedCard(parseInt(params.id, 10))

  if (!card?.data.attributes.card.data) {
    redirect('/recieve/list')
  }

  return <RecievedDetail cardRecord={card.data.attributes.card.data} />
}

export default Page
