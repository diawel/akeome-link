import { redirect } from 'next/navigation'
import { getReservedCards } from '../../utils/strapi/receivedCard'
import Header from './Header'
import Delivered from './Delivered'
import * as styles from './index.css'
import Undelivered from './Undelivered'

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
      <div className={styles.container}>
        <div className={styles.screen}>
          <Header activeTab={tab} />
          <Delivered initialReservedCard={receivedCards} />
        </div>
      </div>
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
      <div className={styles.container}>
        <div className={styles.screen}>
          <Header activeTab={tab} />
          <Undelivered initialReservedCard={receivedCards} />
        </div>
      </div>
    )
  }
}

export default Post
