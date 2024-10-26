import { getCard } from '../../utils/strapi/card'
import Card from '../../components/Card'
import { redirect } from 'next/navigation'
import postImage from './post.svg'
import xIcon from './icon-x.svg'
import lineIcon from './icon-line.svg'
import downloadIcon from './icon-download.svg'
import Image from 'next/image'
import * as styles from './index.css'
import copyIcon from './icon-copy.svg'
import Link from 'next/link'

type DetailProps = {
  id: number
  shareUrl: string
}

const Detail = async ({ id, shareUrl }: DetailProps) => {
  const card = await getCard(id)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  if (!card) {
    redirect('/')
  }

  return (
    <div>
      <div className={styles.postContainer}>
        <Image className={styles.post} src={postImage} alt="postImage" />
        <div className={styles.card}>
          <Card
            layout={card.data.attributes.layout}
            userImages={
              card.data.attributes.userImages.data
                ? card.data.attributes.userImages.data.map((image) => ({
                    id: image.id,
                    urlSet: image.attributes,
                  }))
                : []
            }
            maxFormat="thumbnail"
          />
        </div>
      </div>

      <div className={styles.linkBoxContainer}>
        <div className={styles.linkBoxContent}>
          <input
            // ref={inputRef}
            type="text"
            value={shareUrl}
            readOnly
            className={styles.linkInput}
          />
          <div className={styles.copyButton}>
            <Image src={copyIcon} alt="copyIcon"></Image>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.iconButtonContainer}>
          <div className={styles.xContainer}>
            <Image src={xIcon} alt="xIcon"></Image>
          </div>
          <div className={styles.buttonSpace}>
            <div className={styles.lineContainer}>
              <Image src={lineIcon} alt="lineIcon"></Image>
            </div>
          </div>
          <div className={styles.downloadContainer}>
            <div className={styles.downloadContent}>
              <Image src={downloadIcon} alt="downLoadIcon"></Image>
              <div className={styles.downloadText}>画像として保存</div>
            </div>
          </div>
        </div>
        <Link href="/create/list" className={styles.cardLink}>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonContent}>
              <div className={styles.buttonText}>一覧に戻る</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Detail
