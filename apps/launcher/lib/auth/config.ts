// Auth runtime configuration sourced from the environment.

/** JWT signing secret. Throws if unset so misconfiguration fails loudly. */
export function getJwtSecret(): string {
  const secret = process.env['JWT_SECRET']
  if (!secret) throw new Error('JWT_SECRET is not set')
  return secret
}

/** Access-token lifetime (seconds). Sessions are stateless JWTs (see README). */
export const ACCESS_TOKEN_TTL = 60 * 60 * 24 * 7 // 7 days

export const isProduction = (): boolean => process.env['NODE_ENV'] === 'production'
