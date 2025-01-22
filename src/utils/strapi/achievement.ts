import { getServerSession } from 'next-auth'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { stringify } from 'qs'
import { StrapiApiListResponse, StrapiError } from '.'

export type AchievementAttributes = {
  holder: {
    id: number
  }
  achievementKey: string
}

export const getUserAchievements = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
      }/api/achievements?${stringify({
        filter: {
          holder: {
            id: {
              $eq: session.user.strapiUserId,
            },
          },
        },
      })}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    const achievements: StrapiApiListResponse<AchievementAttributes> =
      await strapiResponse.json()
    return achievements
  } catch (error) {
    throw error
  }
}

export const addAchievement = async (achievementKey: string) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return undefined
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/achievements`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { holder: session.user.strapiUserId, achievementKey },
        }),
      }
    )
    if (!strapiResponse.ok) {
      const strapiError: StrapiError = await strapiResponse.json()
      throw new Error(strapiError.error.message)
    }

    return await strapiResponse.json()
  } catch (error) {
    throw error
  }
}
