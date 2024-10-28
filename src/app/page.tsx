import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    redirect('/create/list')
  }

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
