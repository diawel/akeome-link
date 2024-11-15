'use client'

import Card from '../../components/Card'
import * as styles from './index.css'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { deleteCreatedCard, DraftCardAttributes } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'

type DraftProps = {
  cardAttributes: DraftCardAttributes
  cardRecordId: number
}

const DraftDetail = ({ cardAttributes, cardRecordId }: DraftProps) => {
  return (
    <>
      <div>
        <div className={styles.control}>
          <ReturnButton href="/create/list" color={color.gray[5]} />
        </div>
        <div className={styles.container}>
          <div className={styles.center}>
            <div className={styles.title}>{cardAttributes.title}</div>
          </div>
          <div className={styles.center}>
            <div className={styles.creatorName}>{cardAttributes.creatorName}</div>
          </div>
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
          <div className={styles.buttonContainer}>
            <div className={styles.buttonSpace}>
              <Link className={styles.link} href={`/create/edit/${cardRecordId}`}>
                <button className={styles.editButton}>
                  <div className={styles.buttonText}>つづきから編集</div>
                </button>
              </Link> 
            </div>
            <Link className={styles.link} href='/create/list'>
              <button
                className={styles.deleteButton}
                onClick={() => deleteCreatedCard(cardRecordId)}
              >
                <div className={styles.buttonText}>削除</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DraftDetail