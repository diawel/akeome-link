import Dexie, { Table } from 'dexie'

export type ReceivedCard = {
  shareId: string
  creatorId: number
  randomSeed: number
}

class AppDb extends Dexie {
  receivedCard!: Table<ReceivedCard>

  constructor() {
    super('app-db')
    this.version(1).stores({
      receivedCard: 'shareId',
    })
  }
}

const db = new AppDb()

export const putLocalReceivedCard = async ({
  shareId,
  creatorId,
}: {
  shareId: string
  creatorId: number
}) => {
  const existingLocalReceivedCard = await db.receivedCard.get(shareId)
  if (existingLocalReceivedCard) {
    return existingLocalReceivedCard
  }
  await db.receivedCard.put({
    shareId,
    creatorId,
    randomSeed: 10000000 + Math.floor(Math.random() * 90000000),
  })
  return await db.receivedCard.get(shareId)
}

export const getLocalReceivedCard = async (shareId: string) => {
  return await db.receivedCard.get(shareId)
}

export const getAllLocalReceivedCard = async () => {
  return await db.receivedCard.toArray()
}

export const deleteLocalReceivedCard = async (shareId: string) => {
  await db.receivedCard.delete(shareId)
}

export const deleteAllLocalReceivedCard = async () => {
  await db.receivedCard.clear()
}
