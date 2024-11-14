'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Top from '../layouts/Top'
import LogoPage from '../layouts/Top/LogoPage'

const Login = () => {
  const { status } = useSession()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (status === 'authenticated') {
    redirect('/create/list')
  }

  return (
    <>
      {showSplash ? (
        <LogoPage />
      ) : (
        <Top signIn={signIn} />
      )}
    </>
  )
}

export default Login