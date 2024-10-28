import { redirect } from 'next/navigation'
import Detail from '../../../../layouts/Detail'
import { getCard } from '../../../../utils/strapi/card'

const Page = async ({ params }: { params: { id: number } }) => {
  const cardResponse = await getCard(params.id)

  if (!cardResponse) {
    redirect('/')
  }

  return <Detail cardRecord={cardResponse.data} />
}

export default Page
