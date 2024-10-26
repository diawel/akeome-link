import { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import Detail from '../../../../layouts/Detail'

type PageProps = {
  params: {
    id: number
  }
}

const Page: NextPage<PageProps> = ({ params }: { params: { id: number } }) => {
  const session = getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return <Detail id={params.id} />
}

export default Page
