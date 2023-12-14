import { NextResponse, type NextRequest } from 'next/server'
import { verify } from '@/libs/jwt'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')
  if (!token || !(await verify(token.value))) {
    return NextResponse.redirect('/login')
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)']
}
