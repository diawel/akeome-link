import Link from 'next/link'
import * as styles from './index.css'

type MetaProps = {
  onSave: () => void
  title: string
  setTitle: (title: string) => void
  creatorName: string | undefined
  setCreatorName: (creatorName: string) => void
  isExpress: boolean
  setIsExpress: (isExpress: boolean) => void
}

const Meta = ({
  onSave,
  title,
  setTitle,
  creatorName,
  setCreatorName,
  isExpress,
  setIsExpress,
}: MetaProps) => {
  return (
    <div className={styles.control}>
      <Link href="/create/list">戻る</Link>
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
        disabled={creatorName === undefined}
      />
      <label>
        <input
          type="checkbox"
          checked={isExpress}
          onChange={(event) => setIsExpress(event.target.checked)}
        />
        速達
      </label>
      <button onClick={onSave}>Save</button>
    </div>
  )
}

export default Meta
