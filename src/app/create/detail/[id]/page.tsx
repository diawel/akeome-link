import { redirect } from 'next/navigation'
import Detail from '../../../../layouts/Detail'
import { getPrivateCard } from '../../../../utils/strapi/card/server'

const Page = async ({ params }: { params: { id: number } }) => {
  const cardResponse = await getPrivateCard(params.id)

  if (!cardResponse) {
    redirect('/create/list')
  }

  return <Detail cardRecord={cardResponse.data} />
}

export default Page
