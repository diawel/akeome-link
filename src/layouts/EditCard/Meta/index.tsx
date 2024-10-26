import * as styles from './index.css'

type MetaProps = {
  onSave: () => void
}

const Meta = ({ onSave }: MetaProps) => {
  return (
    <div className={styles.control}>
      <button>Cancel</button>
      <button onClick={onSave}>Save</button>
    </div>
  )
}

export default Meta
