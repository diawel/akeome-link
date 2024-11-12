import type { Metadata, Viewport } from 'next'
import './globals.css'
import * as styles from './layout.css'
import StickerProvider from './StickerProvider'
import { getStickers } from '../utils/strapi/sticker'
import ClientSessionProvider from './ClientSessionProvider'
import StrapiAdoper from '../utils/db/StrapiAdaper'
import AchievementPopup from '../layouts/AchievementPopup'

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
        <ClientSessionProvider>
          <StickerProvider stickers={(await getStickers()).data}>
            <div className={styles.display}>
              <div className={styles.inner}>
                <div className={styles.content}>{children}</div>
                <AchievementPopup />
              </div>
            </div>
          </StickerProvider>
          <StrapiAdoper />
        </ClientSessionProvider>
      </body>
    </html>
  )
}

export default Layout
