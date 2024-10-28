import { getServerSession } from 'next-auth'
import EditCard from '../../../layouts/EditCard'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')

  return <EditCard />
}

export default Page
