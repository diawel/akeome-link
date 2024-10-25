'use client'
import { signOut, useSession } from 'next-auth/react'
import { NextPage } from 'next'
import Card from '../../../components/Card'
import { dummyData } from './dummyData'
import { Fragment } from 'react'
import * as styles from './index.css'
import CardsHeader from '../../../components/CardsHeader'
import { FaPlus } from 'react-icons/fa6'

const List: NextPage = () => {
  const { data: session } = useSession({ required: true })

  return (
    <div>
      <CardsHeader />
      <div className={styles.container}>
        {dummyData.createdCard.length < 0 ? (
          <div className={styles.cardContainer}>
            {dummyData.createdCard.map((card, index) => (
              <Fragment key={index}>
                <Card
                  layout={card.layout}
                  userImages={card.userImages}
                  maxFormat="original"
                  edit={undefined}
                />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className={styles.newCardContainer}>
            <FaPlus className={styles.newCardIcon} />
            <div className={styles.newCardText}>年賀状を新規作成</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
