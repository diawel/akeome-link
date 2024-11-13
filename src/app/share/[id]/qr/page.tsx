import { notFound } from 'next/navigation'
import Qr from '../../../../layouts/Share/Qr'
import { getSharedCard } from '../../../../utils/strapi/card'

const Page = async ({ params }: { params: { id: string } }) => {
  const card = await getSharedCard(params.id)

  if (!card) {
    notFound()
  }

  return <Qr creatorName={card.data.attributes.creatorName} id={params.id} />
}

export default Page