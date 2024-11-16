import { notFound } from 'next/navigation'
import Share from '../../../layouts/Share'
import { getCreatedCard } from '../../../utils/strapi/card'

const Page = async ({ params }: { params: { id: number } }) => {
  const cardResponse = await getCreatedCard(params.id)

  if (!cardResponse) notFound()
  
  return <Share cardRecord={cardResponse.data} />
}

export default Page