import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createCspMiddleware } from '@mediabubble/shared/csp-middleware'

// Instantiate the CSP middleware handler (shared across MediaBubble apps)
const cspMiddleware = createCspMiddleware({ analytics: false })

const SESSION_COOKIE = 'mb_session'
const JWT_SECRET = process.env['JWT_SECRET'] || 'dev-only-insecure-secret-change-me-1f3c9b7e'

// Edge-compatible verification of HS256 JWT signature via Web Crypto API
async function verifyJwtEdge(token: string, secret: string): Promise<any | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [header, body, signature] = parts

  try {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const data = enc.encode(`${header}.${body}`)
    const sigBuf = base64urlToBuffer(signature)
    const isValid = await crypto.subtle.verify('HMAC', key, sigBuf as any, data)
    if (!isValid) return null

    const claims = JSON.parse(new TextDecoder().decode(base64urlToBuffer(body)))
    if (typeof claims.exp !== 'number' || claims.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    return claims
  } catch {
    return null
  }
}

function base64urlToBuffer(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Retrieve the session token from the cookies
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const claims = token ? await verifyJwtEdge(token, JWT_SECRET) : null
  const isAuthenticated = !!claims

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/verify-email')

  if (isAuthRoute) {
    if (isAuthenticated) {
      // Authenticated users should not see login/signup -> send to home
      return NextResponse.redirect(new URL('/', request.url))
    }
    // Allow guest access with CSP headers applied
    return cspMiddleware(request)
  }

  // Protected app routes
  if (!isAuthenticated) {
    const url = new URL('/login', request.url)
    if (pathname !== '/') {
      url.searchParams.set('next', pathname)
    }
    return NextResponse.redirect(url)
  }

  // Allow authenticated users with CSP headers applied
  return cspMiddleware(request)
}

/** Must be inlined — Next.js cannot analyze imported matcher constants. */
export const config = {
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
