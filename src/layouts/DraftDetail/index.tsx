'use client'

import Card from '../../components/Card'
import * as styles from './index.css'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { CardAttributes, deleteCreatedCard, DraftCardAttributes } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'
import { StrapiRecord } from '../../utils/strapi'

type DraftProps = {
  cardRecord: StrapiRecord<CardAttributes | DraftCardAttributes>
}

const DraftDetail = ({ cardRecord }: DraftProps) => {
  return (
    <>
      <div>
        <div className={styles.control}>
          <ReturnButton href="/create/list" color={color.gray[5]} />
        </div>
        <div className={styles.container}>
          <div className={styles.center}>
            <div className={styles.title}>{cardRecord.attributes.title}</div>
          </div>
          <div className={styles.center}>
            <div className={styles.creatorName}>{cardRecord.attributes.creatorName}</div>
          </div>
          <div className={styles.cardSpace}>
            <div className={styles.card}>
              <Card
                layout={cardRecord.attributes.view.layout}
                background={cardRecord.attributes.view.background}
                userImages={mediaRecordsToUrlSet(
                  cardRecord.attributes.userImages.data
                )}
                randomVariants="hidden"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonSpace}>
              <Link className={styles.link} href={`/create/edit/${cardRecord.id}`}>
                <button className={styles.editButton}>
                  <div className={styles.buttonText}>つづきから編集</div>
                </button>
              </Link> 
            </div>
            <Link className={styles.link} href='/create/list'>
              <button
                className={styles.deleteButton}
                onClick={() => deleteCreatedCard(cardRecord.id)}
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