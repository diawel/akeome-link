import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import Detail from '../../../../layouts/Detail'
import { getCard } from '../../../../utils/strapi/card'

type PageProps = {
  params: {
    id: number
  }
}

const Page: NextPage<PageProps> = async ({
  params,
}: {
  params: { id: number }
}) => {
  const cardResponse = await getCard(params.id)

  if (!cardResponse) {
    redirect('/')
  }

  return <Detail cardRecord={cardResponse.data} />
}

export default Page
