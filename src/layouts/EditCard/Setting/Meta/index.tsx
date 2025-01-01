import * as styles from './index.css'
import ReturnButton from '../../../../components/ReturnButton'
import { color } from '../../../../utils/styleSchema'
import { useEditCard } from '../../EditCardProvider'

type MetaProps = {
  onComplete: () => void
  disabled?: boolean
}

const Meta = ({ onComplete, disabled }: MetaProps) => {
  const { isSyncing } = useEditCard()
  return (
    <div className={styles.control}>
      <ReturnButton href="./" color={color.gray[5]} />
      <button
        className={
          styles.primaryButton[disabled || isSyncing ? 'disabled' : 'default']
        }
        onClick={onComplete}
      >
        公開
      </button>
    </div>
  )
}

export default Meta
