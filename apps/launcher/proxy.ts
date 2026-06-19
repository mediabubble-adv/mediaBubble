// Next.js 16 proxy (formerly middleware.ts). Optimistic auth gate: only checks
// whether the session cookie is present, then defers real JWT verification to
// getCurrentUser() in route handlers and server components (node runtime).

import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth/cookie'

// Routes reachable without a session. Everything else requires the cookie.
const PUBLIC_PATHS = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
]

const isPublic = (pathname: string): boolean =>
  PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl
  const hasSession = req.cookies.has(SESSION_COOKIE)

  // Unauthenticated visitor on a protected route → send to login, remembering
  // where they were headed.
  if (!hasSession && !isPublic(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.search = ''
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Authenticated visitor on an auth page → bounce to the dashboard.
  if (hasSession && isPublic(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const proxyConfig = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
