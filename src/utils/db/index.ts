import Dexie, { Table } from 'dexie'

export type ReceivedCard = {
  cardId: number
  creatorId: number
  randomSeed: number
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

export const putLocalReceivedCard = async ({
  cardId,
  creatorId,
}: {
  cardId: number
  creatorId: number
}) => {
  const existingLocalReceivedCard = await db.receivedCard.get(cardId)
  if (existingLocalReceivedCard) {
    return existingLocalReceivedCard
  }
  await db.receivedCard.put({
    cardId,
    creatorId,
    randomSeed: 10000000 + Math.floor(Math.random() * 90000000),
  })
  return await db.receivedCard.get(cardId)
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
