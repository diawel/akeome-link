import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  CardBackground,
  CardLayout,
  UserImages,
} from '../../../components/Card'
import { addCard } from '../../../utils/strapi/card/server'
import { extractPersonName } from '../../../utils/goolab'
import * as styles from './index.css'

const creatorNameLocalStorageKey = 'creatorName'

type SettingProps = {
  onClose: () => void
  cardLayout: CardLayout
  cardBackground: CardBackground
  userImages: UserImages
}

const Setting = ({
  onClose,
  cardLayout,
  cardBackground,
  userImages,
}: SettingProps) => {
  const { data: session } = useSession({ required: true })
  const [creatorName, setCreatorName] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [isExpress, setIsExpress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!session) return
    setCreatorName(
      localStorage.getItem(creatorNameLocalStorageKey) ??
        session?.user?.name ??
        ''
    )
  }, [session])

  useEffect(() => {
    if (title !== undefined) return
    const texts = cardLayout.flatMap((item) =>
      item.content.type === 'text' ? item.content.text : []
    )
    const allText = texts.join('\n')
    if (allText.length === 0) {
      setTitle('無題')
      return
    }
    extractPersonName(texts.join('\n')).then((names) => {
      if (names.length === 0) return
      setTitle(`${names[0]}宛`)
    })
  }, [cardLayout, title])

  const router = useRouter()

  const save = () => {
    if (creatorName === undefined) return
    if (title === undefined) {
      alert('タイトルを入力してください')
      return
    }

    setIsLoading(true)
    localStorage.setItem(creatorNameLocalStorageKey, creatorName)
    addCard({
      title,
      creatorName,
      view: {
        layout: cardLayout,
        background: cardBackground,
      },
      userImages,
      isExpress,
    }).then((response) => {
      router.push(`/create/detail/${response.data.id}`)
    })
  }

  return (
    <div className={styles.screen}>
      <button onClick={onClose}>戻る</button>
      <input
        value={creatorName ?? ''}
        onChange={(event) => setCreatorName(event.target.value)}
        placeholder="差出人名"
        disabled={creatorName === undefined}
      />
      <input
        value={title ?? ''}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="タイトル"
        disabled={title === undefined}
      />
      <label>
        <input
          type="checkbox"
          checked={isExpress}
          onChange={(event) => setIsExpress(event.target.checked)}
        />
        速達
      </label>
      <button onClick={save} disabled={isLoading}>
        保存
      </button>
    </div>
  )
}

export default Setting
