import { notFound } from 'next/navigation'
import Qr from '../../../../layouts/Share/Qr'
import { getCreatedCard } from '../../../../utils/strapi/card'
import Link from 'next/link'

const Page = async ({ params }: { params: { id: number } }) => {
  const cardResponse = await getCreatedCard(params.id)


  if (!cardResponse) {
    notFound()
  }

  const cardAttributes = cardResponse.data.attributes
  if (cardAttributes.publishedAt === null) {
    return (
      <div>
        下書き表示<Link href={`/create/edit/${params.id}`}>編集</Link>
      </div>
    )
  }

  return <Qr cardAttributes={cardAttributes} />
}

export default Page