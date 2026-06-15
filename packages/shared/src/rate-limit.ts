interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()

// Prune expired entries periodically to prevent unbounded memory growth
let lastPruned = Date.now()
function maybePrune() {
  const now = Date.now()
  if (now - lastPruned < 60_000) return
  lastPruned = now
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Sliding-window rate limiter backed by an in-memory Map.
 * Works per serverless instance — provides meaningful protection
 * against single-source bursts without requiring an external store.
 */
export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
): RateLimitResult {
  maybePrune()
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs }
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count += 1
  return { allowed: true, remaining: max - entry.count, resetAt: entry.resetAt }
}

/** Extract the best-effort client IP from Next.js request headers. */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}
