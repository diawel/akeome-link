import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions'
import { notFound, redirect } from 'next/navigation'
import { addCard, getCreatedCard } from '../../../../utils/strapi/card'

const Page = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions)
  if (!session)
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(
        `/create/new/${params.id}`
      )}`
    )

  const existingCard = await getCreatedCard(params.id)
  if (!existingCard) {
    notFound()
  }

  const newCard = await addCard({
    isDraft: true,
    view: existingCard.data.attributes.view,
    userImages:
      existingCard.data.attributes.userImages.data?.map((userImage) => ({
        id: userImage.id,
        urlSet: userImage.attributes,
      })) ?? [],
  })

  redirect(`/create/edit/${newCard.data.id}`)
}

export default Page
