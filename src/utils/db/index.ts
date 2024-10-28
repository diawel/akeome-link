import Dexie, { Table } from 'dexie'

type RecievedCard = {
  cardId: number
}

class Default extends Dexie {
  recievedCard!: Table<RecievedCard>

  constructor() {
    super('app')
    this.version(1).stores({
      recievedCard: 'cardId',
    })
  }
}

const db = new Default()

export const saveRecievedCard = async (record: RecievedCard) => {
  await db.recievedCard.put(record)
}
