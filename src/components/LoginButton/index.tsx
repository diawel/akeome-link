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

  const isWebview = (() => {
    if (!userAgent) return

    const items = userAgent.split(' ')
    const lastItem = items[items.length - 1]
    const browser = lastItem.split('/')[0]
    return (
      browser !== 'safari' &&
      browser !== 'chrome' &&
      browser !== 'firefox' &&
      browser !== 'opr' &&
      browser !== 'edge' &&
      browser !== 'edg' &&
      browser !== 'edga'
    )
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

  if (isWebview) {
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
