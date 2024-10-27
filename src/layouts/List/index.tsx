import * as styles from './index.css'
import Header from './Header'
import { FaPlus } from 'react-icons/fa6'
import Card from '../../components/Card'
import { getCreatedCards } from '../../utils/strapi/card'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapiImage'

type ListProps = {
  tab: 'created' | 'received'
}

const List = async ({ tab }: ListProps) => {
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

export default List
