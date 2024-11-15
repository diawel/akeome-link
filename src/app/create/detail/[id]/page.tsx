import { notFound } from 'next/navigation'
import Detail from '../../../../layouts/Detail'
import DraftDetail from '../../../../layouts/DraftDetail'
import { getCreatedCard } from '../../../../utils/strapi/card'

const Page = async ({ params }: { params: { id: number } }) => {
  const cardResponse = await getCreatedCard(params.id)

  if (!cardResponse) {
    notFound()
  }

  const cardRecord = cardResponse.data
  if (cardRecord.attributes.publishedAt === null) {
    return <DraftDetail cardRecord={cardRecord} />
  }
  return <Detail cardRecord={cardRecord} />
}

export default Page
