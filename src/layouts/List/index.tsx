import Header from './Header'
import { getCreatedCards } from '../../utils/strapi/card'
import { redirect } from 'next/navigation'
import { getReceivedCards } from '../../utils/strapi/receivedCard'
import Created from './Created'
import Received from './Received'

type ListProps = {
  tab: 'created' | 'received'
}

const List = async ({ tab }: ListProps) => {
  if (tab === 'created') {
    const cards = await getCreatedCards()
    if (!cards) {
      redirect('/')
    }
    return (
      <div>
        <Header activeTab={tab} />
        <Created initialCards={cards} />
      </div>
    )
  }
  if (tab === 'received') {
    const receivedCards = await getReceivedCards()
    if (!receivedCards) {
      redirect(
        `/api/auth/signin?callbackUrl=${encodeURIComponent('/receive/list')}`
      )
    }
    return (
      <div>
        <Header activeTab={tab} />
        <Received initialReceivedCards={receivedCards} />
      </div>
    )
  }
}

export default List
