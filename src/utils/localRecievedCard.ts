const key = 'recievedCard'

export const useLocalRecievedCard = (cardId: number, defaultSeed?: number) => {
  const tabele = JSON.parse(localStorage.getItem(key) || '[]')
  let recievedCard = tabele.find((card: any) => card.cardId === cardId)
  if (!recievedCard) {
    recievedCard = {
      cardId,
      seed: defaultSeed ?? Math.floor(Math.random() * 9000000 + 1000000),
    }
    tabele.push(recievedCard)
    localStorage.setItem(key, JSON.stringify(tabele))
  }
  return recievedCard as { cardId: number; seed: number }
}
