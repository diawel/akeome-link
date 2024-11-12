import { redirect } from 'next/navigation'
import { EditCardProvider } from '../../../../layouts/EditCard/EditCardProvider'
import { getCreatedCard } from '../../../../utils/strapi/card'

const Layout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    id: number
  }
}>) => {
  const existingCard = await getCreatedCard(params.id)
  if (!existingCard || existingCard.data.attributes.publishedAt !== null) {
    redirect('/create/new')
  }

  return (
    <EditCardProvider
      defaultCard={{
        view: existingCard.data.attributes.view,
        userImages:
          existingCard.data.attributes.userImages.data?.map((userImage) => ({
            id: userImage.id,
            urlSet: userImage.attributes,
          })) ?? [],
      }}
    >
      {children}
    </EditCardProvider>
  )
}

export default Layout
