import * as styles from './index.css'
import ReturnButton from '../../../../components/ReturnButton'
import { color } from '../../../../utils/styleSchema'

type MetaProps = {
  onComplete: () => void
  disabled?: boolean
}

const Meta = ({ onComplete, disabled }: MetaProps) => {
  return (
    <div className={styles.control}>
      <ReturnButton href="/create/new" color={color.gray[5]} />
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
