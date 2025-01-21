import type { Metadata, Viewport } from 'next'
import './globals.css'
import * as styles from './layout.css'
import StickerProvider from './StickerProvider'
import { getStickers } from '../utils/strapi/sticker'
import ClientSessionProvider from './ClientSessionProvider'
import StrapiAdapter from '../utils/db/StrapiAdapter'
import AchievementPopup from '../layouts/AchievementPopup'
import { GoogleAnalytics } from '@next/third-parties/google'
import LoginDialogProvider from '../components/LoginButton/LoginDialogProvider'
import Left from '../layouts/pc/Left'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import Right from '../layouts/pc/Right'

export const metadata: Metadata = {
  title: 'あけおめリンク',
  appleWebApp: {
    title: 'あけおめリンク',
  },
  openGraph: {
    images: ['/icon-512x512.png'],
  },
  twitter: {
    card: 'summary',
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
  if (process.env.MAINTENANCE_MODE === '1') {
    return (
      <html lang="ja">
        <body>
          <div>メンテナンス中</div>
        </body>
      </html>
    )
  }

  const session = await getServerSession(authOptions)
  return (
    <html lang="ja">
      <body className={styles.body}>
        <ClientSessionProvider>
          <StickerProvider stickers={await getStickers()}>
            <LoginDialogProvider>
              <div className={styles.container}>
                <div>
                  <Left isSignedIn={Boolean(session)} />
                </div>
                <div className={styles.display}>
                  <div className={styles.inner}>
                    <div className={styles.content}>{children}</div>
                    <AchievementPopup />
                  </div>
                </div>
                <div>
                  <Right />
                </div>
              </div>
            </LoginDialogProvider>
          </StickerProvider>
          <StrapiAdapter />
        </ClientSessionProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  )
}

export default Layout
