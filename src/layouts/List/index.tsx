import * as styles from './index.css'
import Header from './Header'
import { FaPlus } from 'react-icons/fa6'
import Card from '../../components/Card'
import { getCreatedCards } from '../../utils/strapi/card'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { getReceivedCards } from '../../utils/strapi/receivedCard'

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
        <div className={styles.container}>
          {cards.data.length > 0 ? (
            <div className={styles.cardContainer}>
              <Link href="/create/new" className={styles.cardLink}>
                <div className={styles.newCardButtonSizeInner}>
                  <div className={styles.newCardButtonContent}>
                    <div>
                      <FaPlus className={styles.newCardButtonIcon} />
                    </div>
                  </div>
                </div>
                <div className={styles.newCardButtonTextContainer}>
                  <div className={styles.newCardButtonText}>新規作成</div>
                </div>
              </Link>

              {cards.data.map((card, index) => (
                <div className={styles.content} key={index}>
                  <Link
                    href={`/create/detail/${card.id}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.card}>
                      <Card
                        layout={card.attributes.layout}
                        userImages={mediaRecordsToUrlSet(
                          card.attributes.userImages.data
                        )}
                        maxFormat="thumbnail"
                      />
                    </div>
                    <div className={styles.cardTitle}>
                      {card.attributes.title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <Link href="/create/new" className={styles.cardLink}>
              <div className={styles.newCardContainer}>
                <FaPlus className={styles.newCardIcon} />
                <div className={styles.newCardText}>年賀状を新規作成</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    )
  }
  if (tab === 'received') {
    const receivedCards = await getReceivedCards()
    if (!receivedCards) {
      redirect('/')
    }
    return (
      <div>
        <Header activeTab={tab} />
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            {receivedCards.data.map((receivedCard, index) => {
              if (
                !receivedCard.attributes.card ||
                !receivedCard.attributes.card.data
              ) {
                return null
              }
              return (
                <div className={styles.content} key={index}>
                  <Link
                    href={`/receive/detail/${receivedCard.id}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.card}>
                      <Card
                        layout={
                          receivedCard.attributes.card.data.attributes.layout
                        }
                        userImages={mediaRecordsToUrlSet(
                          receivedCard.attributes.card.data.attributes
                            .userImages.data
                        )}
                        maxFormat="thumbnail"
                      />
                    </div>
                    <div className={styles.cardTitle}>
                      {receivedCard.attributes.card.data.attributes.creatorName}
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default List
