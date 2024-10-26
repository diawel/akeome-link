import { getCard } from '../../utils/strapi/card'

type DetailProps = {
  id: number
}

const Detail = async ({ id }: DetailProps) => {
  const card = await getCard(id)
  return (
    <div>
      <pre>{JSON.stringify(card)}</pre>
    </div>
  )
}

export default Detail
