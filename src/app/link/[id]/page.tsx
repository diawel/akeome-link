import { redirect } from 'next/navigation'
import { getCard } from '../../../utils/strapi/card'
import Shared from '../../../layouts/Shared'

const Page = async ({ params }: { params: { id: number } }) => {
  const card = await getCard(params.id)
  if (!card) {
    redirect('/')
  }

  return <Shared cardRecord={card.data} />
}

export default Page
