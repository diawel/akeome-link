'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { extractPersonName } from '../../../utils/goolab'
import * as styles from './index.css'
import Meta from './Meta'
import { useEditCard } from '../EditCardProvider'
import postNumber from './post-number.svg'
import Image from 'next/image'
import expressLabel from './express-label.svg'
import post from './post.svg'
import { FaEarthAmericas, FaLock } from 'react-icons/fa6'

const creatorNameLocalStorageKey = 'creatorName'

const calcDeliveredAt = (date: Date) => {
  if (date.getMonth() === 0) {
    return new Date(date.getFullYear(), 0, date.getDate() + 1, 6)
  }
  return new Date(date.getFullYear() + 1, 0, 1)
}

const Setting = () => {
  const {
    cardLayoutState: [cardLayout],
    saveCard,
  } = useEditCard()
  const { data: session } = useSession({ required: true })
  const [creatorName, setCreatorName] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpress, setIsExpress] = useState(false)

  useEffect(() => {
    if (!session) return
    if (creatorName !== undefined) return
    setCreatorName(
      localStorage.getItem(creatorNameLocalStorageKey) ??
        session?.user?.name ??
        ''
    )
  }, [session])

  useEffect(() => {
    if (title !== undefined) return
    if (!cardLayout) return
    const texts = cardLayout.flatMap((item) =>
      item.content.type === 'text' ? item.content.text : []
    )
    const sourceText = texts.join('\n')
    extractPersonName(sourceText).then((names) => {
      if (names.length === 0) {
        setTitle('無題')
      } else {
        setTitle(`${names[0]}宛`)
      }
    })
  }, [cardLayout, title])

  const router = useRouter()

  const now = new Date()
  const deliveredAt = calcDeliveredAt(now)
  const deliveredAtString = useSyncExternalStore(
    () => () => {},
    () =>
      `${deliveredAt.getFullYear()}年${
        deliveredAt.getMonth() + 1
      }月${deliveredAt.getDate()}日 ${deliveredAt.getHours()}:${deliveredAt
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
    () => ''
  )
  const isExpressAvailable = useSyncExternalStore(
    () => () => {},
    () => now.getMonth() === 0,
    () => undefined
  )

  const save = () => {
    if (!title) return
    if (!creatorName) return
    if (!saveCard) return

    setIsLoading(true)
    localStorage.setItem(creatorNameLocalStorageKey, creatorName)
    saveCard(title, creatorName, isExpress ? now : deliveredAt).then(
      (response) => {
        if (!response) return
        router.replace(`/share/${response.data.id}`)
      }
    )
  }

  return (
    <div className={styles.screen}>
      <Meta
        onComplete={save}
        disabled={!title || !creatorName || isLoading || !saveCard}
      />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.postNumberContainer}>
            <Image src={postNumber} alt="" />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <div className={styles.titleGroup}>
                <div className={styles.title}>タイトル</div>
                <div className={styles.error}>
                  {title === undefined || title
                    ? ''
                    : 'タイトルを入力してください'}
                </div>
              </div>
              <input
                className={
                  styles.input[
                    title === undefined || title ? 'default' : 'error'
                  ]
                }
                value={title ?? ''}
                onChange={(event) => setTitle(event.target.value)}
                disabled={title === undefined}
                placeholder="SNS用"
              />
              <div className={styles.inputNotice}>
                <FaLock size={14} />
                自分にのみ表示されます
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.titleGroup}>
                <div className={styles.title}>差出人</div>
                <div className={styles.error}>
                  {creatorName === undefined || creatorName
                    ? ''
                    : '差出人を入力してください'}
                </div>
              </div>
              <input
                className={
                  styles.input[
                    creatorName === undefined || creatorName
                      ? 'default'
                      : 'error'
                  ]
                }
                value={creatorName ?? ''}
                onChange={(event) => setCreatorName(event.target.value)}
                disabled={creatorName === undefined}
              />
              <div className={styles.inputNotice}>
                <FaEarthAmericas size={14} />
                相手に公開されます
              </div>
            </div>
          </div>
          <div
            className={
              styles.toggleContainer[
                isExpressAvailable ? 'expressAvailable' : 'default'
              ]
            }
          >
            {isExpressAvailable && (
              <div className={styles.toggleGroup}>
                <div className={styles.title}>速達</div>
                <label className={styles.toggle[isExpress ? 'on' : 'off']}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={isExpress}
                    onChange={(event) => {
                      setIsExpress(event.target.checked)
                    }}
                  />
                </label>
              </div>
            )}
            <div className={styles.deliveredAtGroup}>
              <div className={styles.subTitle}>配達予定日</div>
              <div className={styles.deliveredAt}>
                {isExpress ? 'いますぐ' : deliveredAtString}
              </div>
            </div>
          </div>
          {isExpress && (
            <Image className={styles.expressLabel} src={expressLabel} alt="" />
          )}
        </div>
      </div>
      <div className={styles.postContainer}>
        <Image src={post} alt="" />
      </div>
    </div>
  )
}

export default Setting
