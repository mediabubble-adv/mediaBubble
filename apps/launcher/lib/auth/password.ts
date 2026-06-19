// Password hashing using Node's built-in scrypt (no external deps).
// Format: scrypt$<N>$<r>$<p>$<saltHex>$<hashHex>. Swappable for bcrypt/argon2
// later without changing call sites.

import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const KEYLEN = 64
const N = 16384 // CPU/memory cost (2^14); ~16MB, within Node's default maxmem
const R = 8
const P = 1

export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, KEYLEN, { N, r: R, p: P })
  return ['scrypt', N, R, P, salt.toString('hex'), derived.toString('hex')].join('$')
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$')
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false
  const [, n, r, p, saltHex, hashHex] = parts
  const keylen = hashHex.length / 2
  let derived: Buffer
  try {
    derived = scryptSync(password, Buffer.from(saltHex, 'hex'), keylen, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    })
  } catch {
    return false
  }
  const expected = Buffer.from(hashHex, 'hex')
  return derived.length === expected.length && timingSafeEqual(derived, expected)
}
