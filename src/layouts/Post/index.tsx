import { redirect } from 'next/navigation'
import { getReservedCards } from '../../utils/strapi/receivedCard'
import Header from './Header'

type PostProps = {
  tab: 'delivered' | 'undelivered'
}

const Post = async ({ tab }: PostProps) => {
  if (tab === 'delivered') {
    const receivedCards = await getReservedCards({ filter: 'delivered' })
    if (!receivedCards) {
      redirect(
        `/api/auth/signin?callbackUrl=${encodeURIComponent('/post/delivered')}`
      )
    }
    return (
      <>
        <Header activeTab={tab} />
      </>
    )
  }
  if (tab === 'undelivered') {
    const receivedCards = await getReservedCards({ filter: 'undelivered' })
    if (!receivedCards) {
      redirect(
        `/api/auth/signin?callbackUrl=${encodeURIComponent(
          '/post/undelivered'
        )}`
      )
    }
    return (
      <>
        <Header activeTab={tab} />
      </>
    )
  }
}

export default Post
