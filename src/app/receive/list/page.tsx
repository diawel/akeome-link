import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import List from '../../../layouts/List'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')

  return <List tab="received" />
}

export default Page
