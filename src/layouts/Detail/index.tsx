'use client'

import Card from '../../components/Card'
import * as styles from './index.css'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { CardAttributes, deleteCreatedCard } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'
import { useRouter } from 'next/navigation';

type DetailProps = {
  cardAttributes: CardAttributes
  cardRecordId: number
}

const Detail = ({ cardAttributes, cardRecordId }: DetailProps) => {
  const router = useRouter()

  return (
    <>
      <div>
        <div className={styles.control}>
          <ReturnButton href="/create/list" color={color.gray[5]} />
        </div>
        <div>
          <div className={styles.center}>
            <div className={styles.title}>{cardAttributes.title}</div>
          </div>
          <div className={styles.center}>
            <div className={styles.creatorName}>{cardAttributes.creatorName}</div>
          </div>
          <div className={styles.center}>
            <div className={styles.cardSpace}>
              <div className={styles.card}>
                <Card
                  layout={cardAttributes.view.layout}
                  background={cardAttributes.view.background}
                  userImages={mediaRecordsToUrlSet(
                    cardAttributes.userImages.data
                  )}
                  randomVariants="hidden"
                />
              </div>
            </div>
          </div>
          <div className={styles.center}>
            <Link href={`/share/${cardRecordId}`}>
              <button className={styles.primaryButton}>
                SNSで共有する
              </button>
            </Link> 
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonSpace}>
              <Link className={styles.link} href={`/create/new/${cardRecordId}`}>
                <button className={styles.copyAndEditButton}>
                  <div className={styles.buttonText}>コピーして編集</div>
                </button>
              </Link> 
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => deleteCreatedCard(cardRecordId).then(() => {router.push('/create/list')})}
            >
              <div className={styles.buttonText}>削除</div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail