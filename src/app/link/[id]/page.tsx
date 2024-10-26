import { redirect } from 'next/navigation'
import { getCreatedCards } from '../../../utils/strapi/card'
import Shared from '../../../layouts/Shared'

const Page = async ({ params }: { params: { id: string } }) => {
  const temp = await getCreatedCards()
  if (!temp) {
    redirect('/')
  }

  return <Shared cardRecord={temp.data[0]} />
}

export default Page
