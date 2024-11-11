import { getServerSession } from 'next-auth'
import EditCard from '../../../../layouts/EditCard'
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import { countReceivedRecords } from '../../../../utils/strapi/receivedCard'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')

  const receivedRecordsCount = await countReceivedRecords()
  console.log(receivedRecordsCount)

  return <EditCard />
}

export default Page
