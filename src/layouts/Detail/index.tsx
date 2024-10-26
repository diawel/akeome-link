import { getCard } from '../../utils/strapi/card'
import Card from '../../components/Card'
import { redirect } from 'next/navigation'
import { cardTitle } from '../List/index.css'
import postImage from './post.svg'
import Image from 'next/image'
import * as styles from './index.css'
import { style } from '@vanilla-extract/css'

type DetailProps = {
  id: number
}

const Detail = async ({ id }: DetailProps) => {
  const card = await getCard(id)

  if (!card) {
    redirect('/')
  }

  return (
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
  )
}

export default Detail
