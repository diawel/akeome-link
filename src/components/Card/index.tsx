'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import * as styles from './index.css'
import zoomIcon from './icon-zoom.svg'
import rotateIcon from './icon-rotate.svg'
import removeIcon from './icon-remove.svg'
import Image from 'next/image'
import { useStickers } from '../../app/StickerProvider'
import {
  getImageUrl,
  ImageFormat,
  ImageUrlSet,
} from '../../utils/strapi/strapiImage'

export type CardLayout = {
  container: {
    x: number
    y: number
    scale: number
    rotate: number
  }
  content:
    | {
        type: 'text'
        text: string
        color: string
        align: 'left' | 'center' | 'right'
      }
    | {
        type: 'userImage'
        id: number
      }
    | {
        type: 'sticker'
        stickerId: number
      }
}[]

class Random {
  private x: number
  private y: number
  private z: number
  private w: number

  constructor(seed: number = 1) {
    this.x = 111111111
    this.y = 222222222
    this.z = 333333333
    this.w = seed
  }

  next(): number {
    const t = this.x ^ (this.x << 11)
    this.x = this.y
    this.y = this.z
    this.z = this.w
    this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8))
    return this.w
  }

  nextInt(min: number, max: number): number {
    const r = Math.abs(this.next())
    return min + (r % (max + 1 - min))
  }
}

export type CardProps = {
  layout: CardLayout
  userImages: {
    id: number
    urlSet: ImageUrlSet
  }[]
  maxFormat?: ImageFormat
  edit?: {
    setLayout: (layout: CardProps['layout']) => void
    isAnyFocused: boolean
    setIsAnyFocused: (isAnyFocused: boolean) => void
  }
  proxy?: boolean
  randomVariants?: 'revealed' | 'hidden' | 'revealing'
  seed?: number
}

const Card = ({
  layout,
  userImages,
  maxFormat,
  edit,
  proxy,
  randomVariants = 'hidden',
  seed,
}: CardProps) => {
  const stickers = useStickers()
  const [cardScale, setCardScale] = useState(0)
  const sizerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const random = new Random(seed)

  useEffect(() => {
    if (!sizerRef.current) return
    const resize = () => {
      if (!sizerRef.current) return
      const { width } = sizerRef.current.getBoundingClientRect()
      setCardScale(width / 400)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(sizerRef.current)
    resize()

    return () => {
      observer.disconnect()
    }
  }, [])

  const [dragState, setDragState] = useState<{
    startPosition: {
      x: number
      y: number
    }
    initialPosition: {
      x: number
      y: number
    }
    initialScale: number
    type: 'move' | 'rotate' | 'scale'
  } | null>(null)

  useEffect(() => {
    if (!edit) return
    if (!dragState) return
    const hundleMove = (x: number, y: number) => {
      if (!cardRef.current) return
      const { startPosition, initialPosition, initialScale, type } = dragState
      const { left, top, width, height } =
        cardRef.current.getBoundingClientRect()
      const actualPosition = {
        x: (x - left - width / 2) / cardScale + 200,
        y: (y - top - height / 2) / cardScale + 296,
      }
      switch (type) {
        case 'move':
          edit.setLayout(
            layout.slice(0, -1).concat({
              ...layout[layout.length - 1],
              container: {
                ...layout[layout.length - 1].container,
                x: initialPosition.x + (actualPosition.x - startPosition.x),
                y: initialPosition.y + (actualPosition.y - startPosition.y),
              },
            })
          )
          break
        case 'rotate':
          const angle =
            (Math.atan2(
              actualPosition.y - initialPosition.y,
              actualPosition.x - initialPosition.x
            ) *
              180) /
              Math.PI +
            -45
          edit.setLayout(
            layout.slice(0, -1).concat({
              ...layout[layout.length - 1],
              container: {
                ...layout[layout.length - 1].container,
                rotate: angle,
              },
            })
          )
          break
        case 'scale':
          const distance = Math.hypot(
            actualPosition.x - initialPosition.x,
            actualPosition.y - initialPosition.y
          )
          const startDistance = Math.hypot(
            startPosition.x - initialPosition.x,
            startPosition.y - initialPosition.y
          )
          edit.setLayout(
            layout.slice(0, -1).concat({
              ...layout[layout.length - 1],
              container: {
                ...layout[layout.length - 1].container,
                scale: initialScale * (distance / startDistance),
              },
            })
          )
          break
      }
    }
    const handleMouseMove = (event: MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
      hundleMove(event.clientX, event.clientY)
    }
    const handleTouchMove = (event: TouchEvent) => {
      event.stopPropagation()
      event.preventDefault()
      hundleMove(event.touches[0].clientX, event.touches[0].clientY)
    }

    const handleLeave = () => {
      setDragState(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleLeave)
    window.addEventListener('mouseup', handleLeave)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleLeave)
    window.addEventListener('touchcancel', handleLeave)
    window.addEventListener('touchleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('mouseup', handleLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleLeave)
      window.removeEventListener('touchcancel', handleLeave)
      window.removeEventListener('touchleave', handleLeave)
    }
  }, [cardScale, dragState, edit, layout])

  const focus = (index: number) => {
    if (!edit) return
    edit.setLayout([
      ...layout.slice(0, index),
      ...layout.slice(index + 1),
      layout[index],
    ])
    edit.setIsAnyFocused(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.sizer}>
        <div className={styles.sizerInner} ref={sizerRef}>
          <div
            className={styles.card}
            style={{
              transform: `scale(${cardScale})`,
            }}
            onMouseDown={() => edit?.setIsAnyFocused(false)}
            onTouchStart={() => edit?.setIsAnyFocused(false)}
            ref={cardRef}
          >
            {layout.map((target, index) => {
              const isFocused =
                edit && edit.isAnyFocused && index === layout.length - 1
              const content = (() => {
                switch (target.content.type) {
                  case 'text': {
                    return (
                      <div
                        className={styles.text}
                        style={{
                          color: target.content.color,
                          textAlign: target.content.align,
                        }}
                      >
                        {target.content.text.split('\n').map((line, index) => (
                          <Fragment key={index}>
                            {line}
                            <br />
                          </Fragment>
                        ))}
                      </div>
                    )
                  }
                  case 'userImage': {
                    const id = target.content.id
                    const userImage = userImages.find(
                      (userImage) => userImage.id === id
                    )
                    if (!userImage) return null
                    const longEdge = Math.max(
                      userImage.urlSet.width,
                      userImage.urlSet.height
                    )
                    const imageUrl = getImageUrl(userImage.urlSet, maxFormat)
                    return (
                      <div className={styles.userImageContainer}>
                        <img
                          style={{
                            width: `${
                              (userImage.urlSet.width / longEdge) * 100
                            }%`,
                            height: `${
                              (userImage.urlSet.height / longEdge) * 100
                            }%`,
                          }}
                          src={proxy ? `/api/proxy?url=${imageUrl}` : imageUrl}
                          alt=""
                        />
                      </div>
                    )
                  }
                  case 'sticker': {
                    const stickerId = target.content.stickerId
                    const sticker = stickers.find(
                      (sticker) => sticker.id === stickerId
                    )
                    if (!sticker) return null
                    if (sticker.attributes.randomVariants.data) {
                      const variant = random.nextInt(
                        0,
                        sticker.attributes.randomVariants.data.length - 1
                      )
                      const baseLongEdge = Math.max(
                        sticker.attributes.randomVariants.data[variant]
                          .attributes.width,
                        sticker.attributes.randomVariants.data[variant]
                          .attributes.height
                      )
                      const baseImageUrl = getImageUrl(
                        sticker.attributes.randomVariants.data[variant]
                          .attributes,
                        maxFormat
                      )
                      const coverLongEdge = Math.max(
                        sticker.attributes.image.data.attributes.width,
                        sticker.attributes.image.data.attributes.height
                      )
                      const coverImageUrl = getImageUrl(
                        sticker.attributes.image.data.attributes,
                        maxFormat
                      )
                      return (
                        <div className={styles.stickerContainer}>
                          <img
                            style={{
                              width: `${
                                (sticker.attributes.randomVariants.data[variant]
                                  .attributes.width /
                                  baseLongEdge) *
                                100
                              }%`,
                              height: `${
                                (sticker.attributes.randomVariants.data[variant]
                                  .attributes.height /
                                  baseLongEdge) *
                                100
                              }%`,
                            }}
                            src={
                              proxy
                                ? `/api/proxy?url=${baseImageUrl}`
                                : baseImageUrl
                            }
                            alt=""
                          />
                          <div
                            className={
                              styles.layeredStickerContainer[randomVariants]
                            }
                          >
                            <img
                              style={{
                                width: `${
                                  (sticker.attributes.image.data.attributes
                                    .width /
                                    coverLongEdge) *
                                  100
                                }%`,
                                height: `${
                                  (sticker.attributes.image.data.attributes
                                    .height /
                                    coverLongEdge) *
                                  100
                                }%`,
                              }}
                              src={
                                proxy
                                  ? `/api/proxy?url=${coverImageUrl}`
                                  : coverImageUrl
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      )
                    }

                    const longEdge = Math.max(
                      sticker.attributes.image.data.attributes.width,
                      sticker.attributes.image.data.attributes.height
                    )
                    const imageUrl = getImageUrl(
                      sticker.attributes.image.data.attributes,
                      maxFormat
                    )
                    return (
                      <div className={styles.stickerContainer}>
                        <img
                          style={{
                            width: `${
                              (sticker.attributes.image.data.attributes.width /
                                longEdge) *
                              100
                            }%`,
                            height: `${
                              (sticker.attributes.image.data.attributes.height /
                                longEdge) *
                              100
                            }%`,
                          }}
                          src={proxy ? `/api/proxy?url=${imageUrl}` : imageUrl}
                          alt=""
                        />
                      </div>
                    )
                  }
                }
              })()

              const handleDragStart = (
                x: number,
                y: number,
                type: 'move' | 'rotate' | 'scale'
              ) => {
                if (!cardRef.current) return
                const { left, top, width, height } =
                  cardRef.current.getBoundingClientRect()
                focus(index)
                setDragState({
                  startPosition: {
                    x: (x - left - width / 2) / cardScale + 200,
                    y: (y - top - height / 2) / cardScale + 296,
                  },
                  initialPosition: {
                    x: target.container.x,
                    y: target.container.y,
                  },
                  initialScale: target.container.scale,
                  type,
                })
              }

              return (
                <div
                  key={index}
                  className={
                    styles.interactionContainer[
                      isFocused ? 'focused' : 'default'
                    ]
                  }
                  style={{
                    left: target.container.x,
                    top: target.container.y,
                    transform: `scale(${target.container.scale}) rotate(${target.container.rotate}deg)`,
                  }}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    handleDragStart(event.clientX, event.clientY, 'move')
                  }}
                  onTouchStart={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    focus(index)
                    handleDragStart(
                      event.touches[0].clientX,
                      event.touches[0].clientY,
                      'move'
                    )
                  }}
                >
                  {content}
                  <button
                    className={styles.control.remove}
                    onClick={(event) => {
                      event.stopPropagation()
                      edit?.setLayout(layout.slice(0, index))
                      edit?.setIsAnyFocused(false)
                    }}
                    style={{
                      transform: `scale(${
                        1 / target.container.scale / cardScale
                      }) rotate(${-target.container.rotate}deg)`,
                    }}
                  >
                    <Image src={removeIcon} alt="消す" loading="eager" />
                  </button>
                  <Image
                    className={styles.control.rotate}
                    src={rotateIcon}
                    alt="回す"
                    onMouseDown={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      handleDragStart(event.clientX, event.clientY, 'rotate')
                    }}
                    onTouchStart={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      handleDragStart(
                        event.touches[0].clientX,
                        event.touches[0].clientY,
                        'rotate'
                      )
                    }}
                    style={{
                      transform: `scale(${
                        1 / target.container.scale / cardScale
                      }) rotate(${-target.container.rotate}deg)`,
                    }}
                    loading="eager"
                  />
                  <Image
                    className={styles.control.zoom}
                    src={zoomIcon}
                    alt="拡大"
                    onMouseDown={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      handleDragStart(event.clientX, event.clientY, 'scale')
                    }}
                    onTouchStart={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      handleDragStart(
                        event.touches[0].clientX,
                        event.touches[0].clientY,
                        'scale'
                      )
                    }}
                    style={{
                      transform: `scale(${
                        1 / target.container.scale / cardScale
                      }) rotate(${-target.container.rotate}deg)`,
                    }}
                    loading="eager"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
