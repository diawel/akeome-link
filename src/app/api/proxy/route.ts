import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    )
  }

  if (!url.startsWith(process.env.USER_CONTENT_URL ?? '')) {
    return NextResponse.json(
      { error: 'URL parameter is invalid' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return NextResponse.json(
        { error: response.statusText },
        { status: response.status }
      )
    }

    const contentType = response.headers.get('content-type') || 'text/plain'

    return new NextResponse(response.body, {
      status: 200,
      headers: { 'Content-Type': contentType },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch the requested URL' },
      { status: 500 }
    )
  }
}
