import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import { addCard } from '../../../utils/strapi/card'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const newCard = await addCard({
    isDraft: true,
    view: {
      layout: [],
      background: {
        type: 'solid',
        color: '#ffffff',
      },
    },
    userImages: [],
  })

  redirect(`/create/edit/${newCard.data.id}`)
}

export default Page
