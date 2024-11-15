'use client'

import Card from '../../components/Card'
import * as styles from './index.css'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { deleteCreatedCard, DraftCardAttributes } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'
import { useRouter } from 'next/navigation'

type DraftProps = {
  cardAttributes: DraftCardAttributes
  cardRecordId: number
}

const DraftDetail = ({ cardAttributes, cardRecordId }: DraftProps) => {
  const router = useRouter()

  return (
    <div className={styles.screen}>
      <div className={styles.control}>
        <ReturnButton href="/create/list" color={color.gray[5]} />
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <Card
            layout={cardAttributes.view.layout}
            background={cardAttributes.view.background}
            userImages={mediaRecordsToUrlSet(cardAttributes.userImages.data)}
            randomVariants="hidden"
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link className={styles.link} href={`/create/edit/${cardRecordId}`}>
            <button className={styles.editButton}>
              <div className={styles.buttonText}>つづきから編集</div>
            </button>
          </Link>
          <button
            className={styles.deleteButton}
            onClick={() =>
              deleteCreatedCard(cardRecordId).then(() => {
                router.push('/create/list')
              })
            }
          >
            <div className={styles.buttonText}>削除</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DraftDetail
