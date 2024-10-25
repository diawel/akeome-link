'use client'

import { useState } from 'react'
import Card from '../../components/Card'
import * as styles from './index.css'
import Meta from './Meta'
import Edit from './Edit'

const EditCard = () => {
  const [cardLayout, setCardLayout] = useState<
    React.ComponentProps<typeof Card>['layout']
  >([
    {
      container: { x: 100, y: 150, scale: 1, rotate: 0 },
      content: {
        type: 'userImage',
        id: 1,
      },
    },
    {
      container: { x: 200, y: 150, scale: 1, rotate: 0 },
      content: {
        type: 'sticker',
        stickerId: 1,
      },
    },
    {
      container: { x: 200, y: 291, scale: 1, rotate: 0 },
      content: {
        type: 'text',
        text: 'Hello,\nworld!<script>alert(1)</script>',
        color: '#000',
        align: 'center',
      },
    },
  ])
  const [userImages, setUserImages] = useState<
    React.ComponentProps<typeof Card>['userImages']
  >([
    {
      id: 1,
      attributes: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
      },
    },
  ])
  const [isAnyFocused, setIsAnyFocused] = useState(false)

  return (
    <div className={styles.screen}>
      <Meta />
      <div className={styles.cardWrapper}>
        <Card
          layout={cardLayout}
          userImages={userImages}
          maxFormat="medium"
          edit={{
            isAnyFocused,
            setIsAnyFocused,
            setLayout: setCardLayout,
          }}
        />
      </div>
      <Edit
        {...{
          cardLayout,
          setCardLayout,
          isAnyFocused,
          setIsAnyFocused,
          userImages,
          setUserImages,
        }}
      />
    </div>
  )
}

export default EditCard
