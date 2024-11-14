import { notFound } from 'next/navigation'
import Detail from '../../../../layouts/Detail'
import EditDetail from '../../../../layouts/EditDetail'
import { getCreatedCard } from '../../../../utils/strapi/card'
import Link from 'next/link'

const Page = async ({ params }: { params: { id: number } }) => {
  const cardResponse = await getCreatedCard(params.id)

  if (!cardResponse) {
    notFound()
  }

  const cardRecord = cardResponse.data
  if (cardRecord.attributes.publishedAt === null) {
    return (
      <div>
        <EditDetail cardRecord={cardRecord} />
      </div>
    )
  }
  return <Detail cardRecord={cardRecord} />
}

export default Page
