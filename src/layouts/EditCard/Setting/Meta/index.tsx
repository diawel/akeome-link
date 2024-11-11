import Link from 'next/link'
import * as styles from './index.css'
import { FaChevronLeft } from 'react-icons/fa6'

type MetaProps = {
  onComplete: () => void
  disabled?: boolean
}

const Meta = ({ onComplete, disabled }: MetaProps) => {
  return (
    <div className={styles.control}>
      <Link className={styles.returnButtonContainer} href="/create/new">
        <FaChevronLeft className={styles.returnButton} size={24} />
      </Link>
      <button
        className={styles.primaryButton[disabled ? 'disabled' : 'default']}
        onClick={onComplete}
      >
        完成
      </button>
    </div>
  )
}

export default Meta
