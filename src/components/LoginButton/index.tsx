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

  const isInApp = (() => {
    if (!userAgent) return

    const match = userAgent.match(/[^()\[\]\s]+|\([^()]*\)|\[[^\[\]]*\]/g)
    const items = match
      ? match.flatMap((item) =>
          item.startsWith('(') || item.startsWith('[')
            ? item.slice(1, -1).split(/;\s+/)
            : item.split(' ')
        )
      : []

    if (items.some((item) => item.startsWith('sleipnir/'))) {
      // SleipnirはinAppでない
      return false
    }

    if (items.includes('wv')) {
      // Sleipnir以外のwvはinApp
      return true
    }
    // Androidはここまでで判定可能

    if (
      items.some(
        (item) =>
          item.startsWith('fban/') ||
          item.startsWith('fb_iab/') ||
          item.startsWith('line/') ||
          item === 'instagram' ||
          item === 'twitter'
      )
    ) {
      // 含まれていたらinApp
      return true
    }

    if (
      !items.some(
        (item) => item.startsWith('safari/') || item.startsWith('firefox/')
      )
    ) {
      // 含まれていなければinApp
      return true
    }

    return false
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

  if (isInApp) {
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
