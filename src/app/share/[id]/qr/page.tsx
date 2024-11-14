import { notFound } from 'next/navigation'
import Qr from '../../../../layouts/Share/Qr'
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
        下書き表示<Link href={`/create/edit/${params.id}`}>編集</Link>
      </div>
    )
  }

  return <Qr cardRecord={cardRecord} />
}

export default Page