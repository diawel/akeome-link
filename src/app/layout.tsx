import type { Metadata, Viewport } from 'next'
import './globals.css'
import * as styles from './layout.css'
import { GoogleAnalytics } from '@next/third-parties/google'

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
  return (
    <html lang="ja">
      <body className={styles.body}>
        <div>メンテナンス中です</div>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  )
}

export default Layout
