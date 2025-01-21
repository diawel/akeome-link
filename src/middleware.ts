import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (
    process.env.MAINTENANCE_MODE === '1' &&
    request.headers.get('sec-fetch-dest') === 'document'
  ) {
    return NextResponse.next({
      status: 503,
    })
  }

  return NextResponse.next()
}
