'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/authOptions'

export const extractPersonName = async (sentence: string) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    const response = await fetch('https://labs.goo.ne.jp/api/entity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: process.env.GOOLAB_APP_ID,
        sentence,
        class_filter: 'PSN',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to extract person name')
    }

    const result: {
      class_filter: 'PSN'
      ne_list: [string, 'PSN'][]
      request_id: string
    } = await response.json()

    return result.ne_list.map((ne) => ne[0])
  } catch (error) {
    throw error
  }
}
