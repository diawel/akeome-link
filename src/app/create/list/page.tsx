import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import List from '../../../layouts/List'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/receive/list')

  return <List tab="created" />
}

export default Page
