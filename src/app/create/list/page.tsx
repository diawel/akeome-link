'use client'
import { signOut, useSession } from 'next-auth/react'
import { NextPage } from 'next'

const List: NextPage = () => {
  const { data: session } = useSession({ required: true })

  return (
    <>
      {session && (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {!session && (
        <div>
          <p>You are not signed in.</p>
        </div>
      )}
    </>
  )
}

export default List
