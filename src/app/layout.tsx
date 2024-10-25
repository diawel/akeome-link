import type { Metadata, Viewport } from 'next'
import './globals.css'
import * as styles from './layout.css'

export const metadata: Metadata = {
  title: 'あけおめリンク',
  appleWebApp: {
    title: 'あけおめリンク',
  },
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  maximumScale: 1,
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
          <div className={styles.inner}>{children}</div>
        </div>
      </body>
    </html>
  )
}

export default Layout
