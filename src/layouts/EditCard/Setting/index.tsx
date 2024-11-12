'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { addCard } from '../../../utils/strapi/card'
import { extractPersonName } from '../../../utils/goolab'
import * as styles from './index.css'
import Meta from './Meta'
import { useEditCard } from '../EditCardProvider'
import postNumber from './post-number.svg'
import Image from 'next/image'
import expressLabel from './express-label.svg'
import post from './post.svg'

const creatorNameLocalStorageKey = 'creatorName'

const calcDeliveredAt = () => {
  const date = new Date()
  if (date.getMonth() === 0) {
    return new Date(date.getFullYear(), 0, date.getDate() + 1, 6)
  }
  return new Date(date.getFullYear() + 1, 0, 1)
}

const Setting = () => {
  const {
    cardLayoutState: [cardLayout],
    cardBackgroundState: [cardBackground],
    userImagesState: [userImages],
  } = useEditCard()
  const { data: session } = useSession({ required: true })
  const [creatorName, setCreatorName] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [deliveredAt, setDeliveredAt] = useState<Date>(calcDeliveredAt())

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

  const save = () => {
    if (!title) return
    if (!creatorName) return

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
      deliveredAt,
    }).then((response) => {
      router.replace(`/share/${response.data.id}`)
    })
  }

  return (
    <div className={styles.screen}>
      <Meta onComplete={save} disabled={!title || !creatorName || isLoading} />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.postNumberContainer}>
            <Image src={postNumber} alt="" />
          </div>
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
                styles.input[title === undefined || title ? 'default' : 'error']
              }
              value={title ?? ''}
              onChange={(event) => setTitle(event.target.value)}
              disabled={title === undefined}
            />
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
                  creatorName === undefined || creatorName ? 'default' : 'error'
                ]
              }
              value={creatorName ?? ''}
              onChange={(event) => setCreatorName(event.target.value)}
              disabled={creatorName === undefined}
            />
          </div>
          <div className={styles.toggleContainer}>
            <div className={styles.toggleGroup}>
              <div className={styles.title}>速達</div>
              <label
                className={
                  styles.toggle[deliveredAt <= new Date() ? 'on' : 'off']
                }
              >
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={deliveredAt <= new Date()}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setDeliveredAt(new Date())
                    } else {
                      setDeliveredAt(calcDeliveredAt())
                    }
                  }}
                />
              </label>
            </div>
            <div className={styles.deliveredAtGroup}>
              <div className={styles.subTitle}>配達予定日</div>
              <div className={styles.deliveredAt}>
                {deliveredAt <= new Date() ? (
                  'いますぐ'
                ) : (
                  <>
                    {deliveredAt.getFullYear()}年{deliveredAt.getMonth() + 1}月
                    {deliveredAt.getDate()}日 {deliveredAt.getHours()}:
                    {deliveredAt.getMinutes().toString().padStart(2, '0')}
                  </>
                )}
              </div>
            </div>
          </div>
          {deliveredAt <= new Date() && (
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
