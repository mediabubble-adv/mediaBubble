// Minimal HS256 JWT via Node's HMAC (no external deps). Covers sign + verify
// with expiry. Swappable for `jsonwebtoken` later without changing call sites.

import { createHmac, timingSafeEqual } from 'node:crypto'

export interface JwtPayload {
  sub: string // user id
  role: string
  [key: string]: unknown
}

interface SignedClaims extends JwtPayload {
  iat: number
  exp: number
}

const b64url = (buf: Buffer): string => buf.toString('base64url')

const sign = (data: string, secret: string): string =>
  b64url(createHmac('sha256', secret).update(data).digest())

export function signJwt(
  payload: JwtPayload,
  secret: string,
  expiresInSeconds: number,
): string {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url(Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const claims: SignedClaims = { ...payload, iat: now, exp: now + expiresInSeconds }
  const body = b64url(Buffer.from(JSON.stringify(claims)))
  const signature = sign(`${header}.${body}`, secret)
  return `${header}.${body}.${signature}`
}

/** Verify signature + expiry. Returns the claims, or null if invalid/expired. */
export function verifyJwt(token: string, secret: string): SignedClaims | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [header, body, signature] = parts

  const expected = sign(`${header}.${body}`, secret)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  let claims: SignedClaims
  try {
    claims = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return null
  }
  if (typeof claims.exp !== 'number' || claims.exp < Math.floor(Date.now() / 1000)) {
    return null
  }
  return claims
}
