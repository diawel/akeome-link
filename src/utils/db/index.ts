import Dexie, { Table } from 'dexie'

export type ReceivedCard = {
  cardId: number
  creatorId: number
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

export const getLocalReceivedCard = async (cardId: number) => {
  return await db.receivedCard.get(cardId)
}

export const getAllLocalReceivedCard = async () => {
  return await db.receivedCard.toArray()
}

export const deleteLocalReceivedCard = async (cardId: number) => {
  await db.receivedCard.delete(cardId)
}

export const deleteAllLocalReceivedCard = async () => {
  await db.receivedCard.clear()
}
