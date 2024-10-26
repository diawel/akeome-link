import type { Metadata, Viewport } from 'next'
import './globals.css'
import * as styles from './layout.css'
import StickerProvider from './StickerProvider'
import { getStickers } from '../utils/strapi/sticker'
import ClientSessionProvider from './ClientSessionProvider'

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

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ja">
      <body className={styles.container}>
        <div className={styles.display}>
          <div className={styles.inner}>
            <StickerProvider stickers={(await getStickers()).data}>
              <ClientSessionProvider>{children}</ClientSessionProvider>
            </StickerProvider>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Layout
