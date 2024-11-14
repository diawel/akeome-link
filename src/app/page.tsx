import { redirect } from 'next/navigation'
import Top from '../layouts/Top'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

const Login = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/create/list')
    return null
  }

  return (
    <>
      <Top />
    </>
  )
}

export default Login