'use client'

import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/create/list')
    }
  }, [status, router])

  return (
    <div>
      {!session && (
        <div>
          <p>ログインしていません</p>
          <button onClick={() => signIn()}>ログイン</button>
        </div>
      )}
    </div>
  )
}

export default Login
