import { notFound, redirect } from 'next/navigation'
import { EditCardProvider } from '../../../../layouts/EditCard/EditCardProvider'
import { getCreatedCard } from '../../../../utils/strapi/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions'
import { mediaRecordsToUrlSet } from '../../../../utils/strapi/strapiImage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '年賀状を編集 - あけおめリンク',
}

const Layout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    id: number
  }
}>) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(
        `/create/edit/${params.id}`
      )}`
    )
  }

  const existingCard = await getCreatedCard(params.id)
  if (!existingCard || existingCard.data.attributes.publishedAt !== null) {
    notFound()
  }

  return (
    <EditCardProvider
      defaultCard={{
        view: existingCard.data.attributes.view,
        userImages: mediaRecordsToUrlSet(
          existingCard.data.attributes.userImages.data
        ),
      }}
      existingId={params.id}
    >
      {children}
    </EditCardProvider>
  )
}

export default Layout
