import { redirect } from 'next/navigation'
import EditCardProvider from '../../../../layouts/EditCard/EditCardProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions'
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
    redirect('/')
  }
  return <EditCardProvider existingId={params.id}>{children}</EditCardProvider>
}

export default Layout
