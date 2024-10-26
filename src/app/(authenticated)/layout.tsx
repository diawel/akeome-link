import ClientSessionProvider from './ClientSessionProvider'

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <ClientSessionProvider>{children}</ClientSessionProvider>
}

export default Layout
