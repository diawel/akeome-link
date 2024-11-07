import Link from 'next/link'
import * as styles from './index.css'

type MetaProps = {
  onComplete: () => void
}

const Meta = ({ onComplete }: MetaProps) => {
  return (
    <div className={styles.control}>
      <Link href="/create/list">戻る</Link>
      <button onClick={onComplete}>次へ</button>
    </div>
  )
}

export default Meta
