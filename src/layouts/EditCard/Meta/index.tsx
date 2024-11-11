import Link from 'next/link'
import * as styles from './index.css'
import { FaChevronLeft } from 'react-icons/fa6'

const Meta = () => {
  return (
    <div className={styles.control}>
      <Link className={styles.returnButtonContainer} href="/create/list">
        <FaChevronLeft className={styles.returnButton} size={24} />
      </Link>
      <Link className={styles.primaryButton} href="/create/new/setting">
        次へ
      </Link>
    </div>
  )
}

export default Meta
