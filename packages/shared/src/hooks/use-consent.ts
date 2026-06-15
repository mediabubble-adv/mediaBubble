'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  COOKIE_CONSENT_GRANTED_EVENT,
  COOKIE_CONSENT_KEY,
  type ConsentStatus,
} from '../consent/constants'
import { getTypedStorageItem, setTypedStorageItem } from '../storage-keys'

function readConsentStatus(): ConsentStatus {
  return getTypedStorageItem(COOKIE_CONSENT_KEY) ?? null
}

/** Tracks cookie consent state and syncs across tabs via `storage` events. */
export function useConsent() {
  const [status, setStatus] = useState<ConsentStatus>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStatus(readConsentStatus())
    setReady(true)

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== COOKIE_CONSENT_KEY) return
      const next = event.newValue
      setStatus(next === 'accepted' || next === 'declined' ? next : null)
    }

    const handleGranted = () => {
      if (getTypedStorageItem(COOKIE_CONSENT_KEY) === 'accepted') {
        setStatus('accepted')
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(COOKIE_CONSENT_GRANTED_EVENT, handleGranted)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(COOKIE_CONSENT_GRANTED_EVENT, handleGranted)
    }
  }, [])

  const accept = useCallback(() => {
    setTypedStorageItem(COOKIE_CONSENT_KEY, 'accepted')
    setStatus('accepted')
    window.dispatchEvent(new Event(COOKIE_CONSENT_GRANTED_EVENT))
  }, [])

  const decline = useCallback(() => {
    setTypedStorageItem(COOKIE_CONSENT_KEY, 'declined')
    setStatus('declined')
  }, [])

  return {
    status,
    ready,
    hasAnalyticsConsent: status === 'accepted',
    accept,
    decline,
  }
}
