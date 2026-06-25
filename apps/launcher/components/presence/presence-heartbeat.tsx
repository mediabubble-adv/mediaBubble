'use client'

import { useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const HEARTBEAT_INTERVAL_MS = 60_000

async function sendHeartbeat(): Promise<void> {
  if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return
  try {
    await fetch('/api/presence/heartbeat', { method: 'POST' })
  } catch {
    // Non-critical — presence will catch up on next tick
  }
}

export function PresenceHeartbeat() {
  const pathname = usePathname()

  const ping = useCallback(() => {
    void sendHeartbeat()
  }, [])

  useEffect(() => {
    ping()
  }, [pathname, ping])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') ping()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') ping()
    }, HEARTBEAT_INTERVAL_MS)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearInterval(id)
    }
  }, [ping])

  return null
}
