'use client'

import { useEffect } from 'react'

/** Unregister stale PWA workers and clear Workbox caches in local dev. */
export function useDevServiceWorkerCleanup() {
  useEffect(() => {
    if (process.env['NODE_ENV'] !== 'development') return
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return

    void (async () => {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((registration) => registration.unregister()))

      if ('caches' in window) {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      }
    })()
  }, [])
}
