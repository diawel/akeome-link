import * as styles from './index.css'
import Header from './Header'
import { FaPlus } from 'react-icons/fa6'
import Card from '../../components/Card'
import { getCreatedCards } from '../../utils/strapi/card'
import { redirect } from 'next/navigation'

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
            <div>
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
            </div>

            {cards.data.map((card, index) => (
              <div className={styles.content} key={index}>
                <div>
                  <div className={styles.card}>
                    <Card
                      layout={card.attributes.layout}
                      userImages={card.attributes.userImages.data.map(
                        (image) => ({
                          id: image.id,
                          urlSet: image.attributes,
                        })
                      )}
                      maxFormat="thumbnail"
                    />
                  </div>
                  <div className={styles.cardTitle}>
                    {card.attributes.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.newCardContainer}>
            <FaPlus className={styles.newCardIcon} />
            <div className={styles.newCardText}>年賀状を新規作成</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
