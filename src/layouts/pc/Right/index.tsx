import flowerImage from '../flower.svg'
import * as styles from './index.css'
import Image from 'next/image'

const Right = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flowerImage}>
        <Image src={flowerImage} alt="" loading="eager" />
      </div>
    </div>
  )
}

export default Right
