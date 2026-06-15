'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useConsent } from '../hooks/use-consent'

type ConsentContextValue = ReturnType<typeof useConsent>

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useConsent()
  return <ConsentContext.Provider value={consent}>{children}</ConsentContext.Provider>
}

export function useConsentContext(): ConsentContextValue {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsentContext must be used within ConsentProvider')
  }
  return context
}
