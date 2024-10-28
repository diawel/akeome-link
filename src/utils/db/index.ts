import Dexie, { Table } from 'dexie'

export type ReceivedCard = {
  cardId: number
}

class Default extends Dexie {
  receivedCard!: Table<ReceivedCard>

  constructor() {
    super('app')
    this.version(1).stores({
      receivedCard: 'cardId',
    })
  }
}

const db = new Default()

export const putLocalReceivedCard = async (record: ReceivedCard) => {
  await db.receivedCard.put(record)
}
