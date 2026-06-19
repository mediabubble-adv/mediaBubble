// One-time tokens for email verification & password reset.
// We return the RAW token (emailed to the user) and its SHA-256 HASH (the only
// thing stored — matches the token_hash columns in migration 0002).

import { createHash, randomBytes } from 'node:crypto'

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export function generateOneTimeToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString('base64url')
  return { token, tokenHash: hashToken(token) }
}

/** Default lifetimes (seconds). */
export const TOKEN_TTL = {
  emailVerification: 60 * 60 * 24, // 24h
  passwordReset: 60 * 60, // 1h
} as const

export const isExpired = (expiresAt: Date, now: Date = new Date()): boolean =>
  expiresAt.getTime() < now.getTime()
