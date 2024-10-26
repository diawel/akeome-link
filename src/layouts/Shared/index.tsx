import { FaDownload, FaPrint } from 'react-icons/fa6'
import Card from '../../components/Card'
import { StrapiRecord } from '../../utils/strapi'
import { CardAttributes } from '../../utils/strapi/card'
import { mediaRecordsToUrlSet } from '../../utils/strapiImage'
import * as styles from './index.css'
import Link from 'next/link'

type SharedProps = {
  cardRecord: StrapiRecord<CardAttributes>
}

const Shared = ({ cardRecord }: SharedProps) => {
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.title}>
          {cardRecord.attributes.creatorName} さんから
          <br />
          年賀状を受け取りました
        </div>
        <div className={styles.cardContainer}>
          <Card
            layout={cardRecord.attributes.layout}
            userImages={mediaRecordsToUrlSet(
              cardRecord.attributes.userImages.data
            )}
            maxFormat="original"
            edit={undefined}
          />
        </div>
        <div className={styles.control}>
          <Link className={styles.primaryButton} href="/create/new">
            年賀状を作ってみる
          </Link>
          <Link
            className={styles.seconradyButton}
            href={`/edit/${cardRecord.id}`}
          >
            <FaDownload />
            保存
          </Link>
          <Link
            className={styles.seconradyButton}
            href={`/delete/${cardRecord.id}`}
          >
            <FaPrint />
            印刷
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Shared
