import { getCard } from '../../utils/strapi/card'
import Card from '../../components/Card'
import { redirect } from 'next/navigation'
import postImage from './post.svg'
import Image from 'next/image'
import * as styles from './index.css'
import copyIcon from './icon-copy.svg'

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
    </div>
  )
}

export default Detail
