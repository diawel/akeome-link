'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState, useSyncExternalStore } from 'react'
import { useLoginDialog } from './LoginDialogProvider'

type LoginButtonProps = {
  className?: string
  children?: React.ReactNode
  callbackUrl?: string
}

const LoginButton = ({
  className,
  children,
  callbackUrl,
}: LoginButtonProps) => {
  const userAgent = useSyncExternalStore(
    () => () => {},
    () => window.navigator.userAgent.toLowerCase().trim(),
    () => undefined
  )

  const browser = (() => {
    if (!userAgent) return

    const isFacebook =
      userAgent.includes('fbios') || userAgent.includes('fb_iab')
    const isInstagram = userAgent.includes('instagram')
    const isLine = userAgent.includes('line/')
    const isYahoo = userAgent.includes('yjapp')
    const isWebview = userAgent.includes('webview') // e.g. Rakuten Link
    return isFacebook
      ? 'facebook'
      : isInstagram
      ? 'instagram'
      : isLine
      ? 'line'
      : isYahoo
      ? 'yahoo'
      : isWebview
      ? 'webview'
      : 'other'
  })()

  const os = (() => {
    if (!userAgent) return

    const isAndroid = userAgent.includes('android')
    const isIos =
      userAgent.includes('iphone') ||
      userAgent.includes('ipod') ||
      userAgent.includes('ipad')
    return isAndroid ? 'android' : isIos ? 'ios' : 'other'
  })()

  const { open: openLoginDialog } = useLoginDialog()

  const [isFirstClick, setIsFirstClick] = useState(true)

  if (browser && browser !== 'other') {
    return (
      <Link
        href={`intent://${String(window.location).replace(
          /^.+:\/\//,
          ''
        )}#Intent;scheme=https;end;`}
        className={className}
        onClick={() => {
          setIsFirstClick(false)
          if (os === 'android' && isFirstClick) return

          openLoginDialog()
        }}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={className}
      onClick={() =>
        signIn('google', {
          callbackUrl,
        })
      }
    >
      {children}
    </button>
  )
}

export default LoginButton
