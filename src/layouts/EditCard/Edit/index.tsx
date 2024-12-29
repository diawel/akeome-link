import { Fragment, useEffect, useState } from 'react'
import { UserImages } from '../../../components/Card'
import * as styles from './index.css'
import { useStickers } from '../../../app/StickerProvider'
import { uploadMedia } from '../../../utils/strapi/media'
import { getImageUrl } from '../../../utils/strapi/strapiImage'
import randomLabel from './random-label.svg'
import Image from 'next/image'
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaImage,
  FaPalette,
  FaPen,
  FaPlus,
  FaTriangleExclamation,
} from 'react-icons/fa6'
import { useEditCard } from '../EditCardProvider'

type EditProps = {
  isAnyFocused: boolean
  setIsAnyFocused: (isAnyFocused: boolean) => void
  setIsLoading: (isLoading: boolean) => void
}

const Edit = ({ isAnyFocused, setIsAnyFocused, setIsLoading }: EditProps) => {
  const {
    cardLayoutState: [cardLayout, setCardLayout],
    cardBackgroundState: [cardBackground, setCardBackground],
    userImagesState: [userImages, setUserImages],
  } = useEditCard()
  const stickers = useStickers()
  const [activeTab, setActiveTab] = useState<
    'background' | 'userImage' | 'sticker' | 'text'
  >('background')
  const focusedContent =
    cardLayout && isAnyFocused
      ? cardLayout[cardLayout.length - 1].content
      : null
  useEffect(() => {
    if (focusedContent) {
      setActiveTab(focusedContent.type)
    }
  }, [activeTab, cardLayout, focusedContent])
  const [isTextEditing, setIsTextEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => {
      setError(null)
    }, 5000)
    const handleClick = () => {
      setError(null)
    }
    window.addEventListener('click', handleClick)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleClick)
    }
  }, [error])

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (userImage: UserImages[number]) => void
  ) => {
    setIsLoading(true)
    const file = event.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('files', file)
    uploadMedia(formData)
      .then((media) => {
        callback({
          id: media[0].id,
          urlSet: media[0],
        })
        setIsLoading(false)
      })
      .catch(() => {
        setError(
          `画像のアップロードに失敗しました。\n画像サイズの上限は${process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_TEXT}です。`
        )
        setIsLoading(false)
      })
    event.target.value = ''
  }

  if (!cardLayout || !cardBackground || !userImages) {
    return (
      <>
        <div className={styles.controlContainer} />
        <div className={styles.nav}>
          <button className={styles.navButton.disabled}>背景</button>
          <button className={styles.navButton.disabled}>写真</button>
          <button className={styles.navButton.disabled}>ステッカー</button>
          <button className={styles.navButton.disabled}>テキスト</button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.controlContainer}>
        {activeTab == 'background' ? (
          <div className={styles.control}>
            <div className={styles.controlGrid}>
              <label className={styles.controlButton.default}>
                <FaImage size={20} />
                写真を選択
                <input
                  className={styles.controlInput}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    handleUpload(event, (userImage) => {
                      setCardBackground({
                        type: 'userImage',
                        id: userImage.id,
                      })

                      if (cardBackground.type === 'userImage') {
                        setUserImages(
                          userImages
                            .filter(
                              (userImage) => userImage.id !== cardBackground.id
                            )
                            .concat(userImage)
                        )
                      } else {
                        setUserImages(userImages.concat(userImage))
                      }
                    })
                  }}
                />
              </label>
              <label className={styles.controlButton.default}>
                <FaPalette size={20} />
                カラー
                <input
                  className={styles.controlInput}
                  type="color"
                  onChange={(event) => {
                    setCardBackground({
                      type: 'solid',
                      color: event.target.value,
                    })
                    if (cardBackground.type === 'userImage') {
                      setUserImages(
                        userImages.filter(
                          (userImage) => userImage.id !== cardBackground.id
                        )
                      )
                    }
                  }}
                />
              </label>
            </div>
          </div>
        ) : activeTab == 'userImage' ? (
          <div className={styles.control}>
            <div className={styles.controlGrid}>
              <label className={styles.controlButton.default}>
                <FaPlus size={20} />
                追加
                <input
                  className={styles.controlInput}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    handleUpload(event, (userImage) => {
                      setUserImages(userImages)
                      setCardLayout(
                        cardLayout.concat({
                          container: { x: 200, y: 291, scale: 1, rotate: 0 },
                          content: {
                            type: 'userImage',
                            id: userImage.id,
                          },
                        })
                      )
                      setUserImages(userImages.concat(userImage))
                      setIsAnyFocused(true)
                    })
                  }}
                />
              </label>
            </div>
          </div>
        ) : activeTab == 'sticker' ? (
          <div className={styles.control}>
            {stickers
              .filter((sticker) => sticker.attributes.current)
              .map((sticker) => (
                <button
                  key={sticker.id}
                  className={styles.stickerButton}
                  onClick={() => {
                    setCardLayout([
                      ...cardLayout,
                      {
                        container: { x: 200, y: 291, scale: 1, rotate: 0 },
                        content: {
                          type: 'sticker',
                          stickerId: sticker.id,
                        },
                      },
                    ])
                    setIsAnyFocused(true)
                  }}
                >
                  <img
                    className={styles.sticker}
                    src={getImageUrl(
                      sticker.attributes.image.data.attributes,
                      'thumbnail'
                    )}
                    style={{
                      aspectRatio: `${sticker.attributes.image.data.attributes.width}/${sticker.attributes.image.data.attributes.height}`,
                    }}
                    alt=""
                  />
                  {sticker.attributes.randomVariants.data?.length && (
                    <Image
                      className={styles.stickerLabel}
                      src={randomLabel}
                      alt="おみくじ対応"
                    />
                  )}
                </button>
              ))}
          </div>
        ) : (
          <div className={styles.control}>
            <div className={styles.controlGrid}>
              <button
                className={styles.controlButton.default}
                onClick={() => {
                  setCardLayout([
                    ...cardLayout,
                    {
                      container: { x: 200, y: 291, scale: 1, rotate: 0 },
                      content: {
                        type: 'text',
                        text: 'テキストを入力',
                        color: '#000',
                        align: 'center',
                      },
                    },
                  ])
                  setIsAnyFocused(true)
                }}
              >
                <FaPlus size={20} />
                追加
              </button>
              <button
                className={
                  styles.controlButton[
                    focusedContent?.type === 'text' ? 'default' : 'disabled'
                  ]
                }
                onClick={() => {
                  if (focusedContent?.type !== 'text') return
                  setIsTextEditing(true)
                }}
              >
                <FaPen size={20} />
                編集
              </button>
              <label
                className={
                  styles.controlButton[
                    focusedContent?.type === 'text' ? 'default' : 'disabled'
                  ]
                }
              >
                <FaPalette size={20} />
                カラー
                <input
                  className={styles.controlInput}
                  type="color"
                  value={
                    focusedContent?.type === 'text'
                      ? focusedContent.color
                      : '#000'
                  }
                  onChange={(event) => {
                    if (focusedContent?.type !== 'text') return
                    setCardLayout(
                      cardLayout.slice(0, -1).concat({
                        ...cardLayout[cardLayout.length - 1],
                        content: {
                          ...focusedContent,
                          color: event.target.value,
                        },
                      })
                    )
                  }}
                />
              </label>
              <button
                className={
                  styles.controlButton[
                    focusedContent?.type === 'text' ? 'default' : 'disabled'
                  ]
                }
                onClick={() => {
                  if (focusedContent?.type !== 'text') return
                  setCardLayout(
                    cardLayout.slice(0, -1).concat({
                      ...cardLayout[cardLayout.length - 1],
                      content: {
                        ...focusedContent,
                        align:
                          focusedContent.align == 'left'
                            ? 'center'
                            : focusedContent.align == 'center'
                            ? 'right'
                            : 'left',
                      },
                    })
                  )
                }}
              >
                {focusedContent?.type === 'text' ? (
                  focusedContent.align == 'left' ? (
                    <>
                      <FaAlignLeft size={20} />
                      左揃え
                    </>
                  ) : focusedContent.align == 'center' ? (
                    <>
                      <FaAlignCenter size={20} />
                      中央揃え
                    </>
                  ) : (
                    <>
                      <FaAlignRight size={20} />
                      右揃え
                    </>
                  )
                ) : (
                  <>
                    <FaAlignCenter size={20} />
                    中央揃え
                  </>
                )}
              </button>
              {focusedContent?.type === 'text' && <></>}
            </div>
          </div>
        )}
      </div>
      <div className={styles.nav}>
        <button
          className={
            styles.navButton[activeTab == 'background' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('background')
            setIsAnyFocused(false)
          }}
        >
          背景
        </button>
        <button
          className={
            styles.navButton[activeTab == 'userImage' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('userImage')
            if (focusedContent?.type !== 'userImage') {
              setIsAnyFocused(false)
            }
          }}
        >
          写真
        </button>
        <button
          className={
            styles.navButton[activeTab == 'sticker' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('sticker')
            if (focusedContent?.type !== 'sticker') {
              setIsAnyFocused(false)
            }
          }}
        >
          ステッカー
        </button>
        <button
          className={
            styles.navButton[activeTab == 'text' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('text')
            if (focusedContent?.type !== 'text') {
              setIsAnyFocused(false)
            }
          }}
        >
          テキスト
        </button>
      </div>
      {isTextEditing && focusedContent?.type === 'text' && (
        <div className={styles.textEditWindow}>
          <div className={styles.textEditButtonContainer}>
            <button
              className={styles.textEditButton}
              onClick={() => {
                setIsTextEditing(false)
                if (focusedContent.text === '') {
                  setCardLayout(cardLayout.slice(0, -1))
                  setIsAnyFocused(false)
                }
              }}
            >
              完了
            </button>
          </div>
          <div className={styles.textEditTextareaWrapper}>
            {focusedContent.text}
            {'\u200b'}
            <textarea
              className={styles.textEditTextarea}
              value={focusedContent.text}
              onChange={(event) => {
                setCardLayout(
                  cardLayout.slice(0, -1).concat({
                    ...cardLayout[cardLayout.length - 1],
                    content: {
                      ...focusedContent,
                      text: event.target.value,
                    },
                  })
                )
              }}
            />
          </div>
        </div>
      )}
      {error !== null && (
        <div className={styles.errorContainer}>
          <FaTriangleExclamation size={20} />
          {error.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </div>
      )}
    </>
  )
}

export default Edit
