'use client'

import { useEffect, useRef, useState } from 'react'
import * as styles from './index.css'
import zoomIcon from './icon-zoom.svg'
import rotateIcon from './icon-rotate.svg'
import removeIcon from './icon-remove.svg'
import Image from 'next/image'

type CardProps = {
  layout: {
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
        }
      | {
          type: 'userImage'
          src: string
        }
      | {
          type: 'sticker'
          stickerId: number
        }
  }[]
  setLayout?: (layout: CardProps['layout']) => void
}

const Card = ({ layout, setLayout }: CardProps) => {
  const [cardScale, setCardScale] = useState(0)
  const sizerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

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

  const [isAnyFocused, setIsFocued] = useState<boolean>(false)
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
    if (!setLayout) return
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
          setLayout(
            layout.slice(0, layout.length - 1).concat({
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
          setLayout(
            layout.slice(0, layout.length - 1).concat({
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
          setLayout(
            layout.slice(0, layout.length - 1).concat({
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
  }, [dragState, setLayout, layout])

  const focus = (index: number) => {
    setLayout?.([
      ...layout.slice(0, index),
      ...layout.slice(index + 1),
      layout[index],
    ])
    setIsFocued(true)
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
            onMouseDown={() => setIsFocued(false)}
            onTouchStart={() => setIsFocued(false)}
            ref={cardRef}
          >
            {layout.map((target, index) => {
              const isFocused =
                setLayout && isAnyFocused && index === layout.length - 1
              const content = (() => {
                switch (target.content.type) {
                  case 'text':
                    return (
                      <div className={styles.text}>{target.content.text}</div>
                    )
                  case 'userImage':
                    return (
                      <div className={styles.userImageContainer}>
                        <img
                          className={styles.userImage}
                          src={target.content.src}
                          alt=""
                        />
                      </div>
                    )
                  case 'sticker':
                    return (
                      <div className={styles.stickerContainer}>
                        <img
                          className={styles.sticker}
                          src={`https://placehold.jp/512x512.png?text=${target.content.stickerId}`}
                          alt=""
                        />
                      </div>
                    )
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
                      setLayout?.(layout.slice(0, index))
                    }}
                    style={{
                      transform: `scale(${
                        1 / target.container.scale / cardScale
                      }) rotate(${-target.container.rotate}deg)`,
                    }}
                  >
                    <Image src={removeIcon} alt="消す" />
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
