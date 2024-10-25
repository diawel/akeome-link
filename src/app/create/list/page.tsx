'use client'
import { signOut, useSession } from 'next-auth/react'
import { NextPage } from 'next'
import Card from '../../../components/Card'
import { dummyData } from './dummyData'
import { Fragment } from 'react'
import * as styles from './index.css'
import CardsHeader from '../../../components/CardsHeader'

const List: NextPage = () => {
  const { data: session } = useSession({ required: true })

  return (
    <div>
      <CardsHeader />

      <div className={styles.container}>
        {dummyData.createdCard.map((card, index) => (
          <Fragment key={index}>
            <Card
              layout={card.layout}
              userImages={card.userImages}
              maxFormat="original"
              edit={undefined} // 編集機能が必要ない場合
            />
            {/* <div className={styles.cardWrapper}>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.creatorName}>Created by: {card.creatorName}</p>
          </div> */}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default List
