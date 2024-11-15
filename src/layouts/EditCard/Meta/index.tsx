import Link from 'next/link'
import * as styles from './index.css'
import ReturnButton from '../../../components/ReturnButton'
import { color } from '../../../utils/styleSchema'
import { usePathname } from 'next/navigation'

const Meta = () => {
  const pathname = usePathname()
  return (
    <div className={styles.control}>
      <ReturnButton href="/create/list" color={color.gray[5]} />
      <Link className={styles.primaryButton} href={`${pathname}/setting`}>
        次へ
      </Link>
    </div>
  )
}

export default Meta
