import { EditCardProvider } from '../../../layouts/EditCard/EditCardProvider'

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <EditCardProvider>{children}</EditCardProvider>
}

export default Layout
