import type { Metadata } from 'next'
import './globals.css'
import SessionWrapper from './ClientSessionProvider'

export const metadata: Metadata = {
  title: 'あけおめリンク',
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ja">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}

export default Layout
