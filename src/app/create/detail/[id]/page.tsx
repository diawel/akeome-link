import { notFound, redirect } from 'next/navigation'
import Detail from '../../../../layouts/Detail'
import DraftDetail from '../../../../layouts/DraftDetail'
import { getCreatedCard } from '../../../../utils/strapi/card'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions'

export const metadata: Metadata = {
  title: '年賀状の詳細 - あけおめリンク',
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

  const cardAttributes = cardResponse.data.attributes
  const cardRecordId = cardResponse.data.id

  if (cardAttributes.publishedAt === null) {
    return (
      <DraftDetail
        cardAttributes={cardAttributes}
        cardRecordId={cardRecordId}
      />
    )
  }
  return <Detail cardAttributes={cardAttributes} cardRecordId={cardRecordId} />
}

export default Page
