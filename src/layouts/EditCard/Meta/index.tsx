import * as styles from './index.css'

type MetaProps = {
  onSave: () => void
  title: string
  setTitle: (title: string) => void
  creatorName: string
  setCreatorName: (creatorName: string) => void
}

const Meta = ({
  onSave,
  title,
  setTitle,
  creatorName,
  setCreatorName,
}: MetaProps) => {
  return (
    <div className={styles.control}>
      <button>Cancel</button>
      <input
        type="text"
        placeholder="タイトルを入力"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        style={{ width: 80 }}
      />
      <input
        type="text"
        placeholder="作者名を入力"
        value={creatorName}
        onChange={(event) => setCreatorName(event.target.value)}
        style={{ width: 80 }}
      />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

export default Meta
