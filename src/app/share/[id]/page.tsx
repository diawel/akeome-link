import { notFound, redirect } from 'next/navigation'
import Share from '../../../layouts/Share'
import { getCreatedCard } from '../../../utils/strapi/card'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'

export const metadata: Metadata = {
  title: '年賀状の共有 - あけおめリンク',
}

const Page = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const cardResponse = await getCreatedCard(params.id)
  if (!cardResponse) {
    notFound()
  }

  return <Share cardRecord={cardResponse.data} />
}

export default Page
