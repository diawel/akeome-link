import type { Metadata } from 'next'
import './globals.css'
import SessionWrapper from './ClientSessionProvider'
import * as styles from './layout.css'

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
      <body className={styles.container}>
        <div className={styles.display}>
          <div className={styles.inner}>
            <SessionWrapper>{children}</SessionWrapper>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Layout
