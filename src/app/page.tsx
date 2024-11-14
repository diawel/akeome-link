'use client'

import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Top from '../layouts/Top'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    redirect('/create/list')
  }

  return (
    <>
      {!session && (
        <Top signIn={signIn} />
      )}
    </>
  )
}

export default Login
