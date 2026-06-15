'use client'

import {
  ConsentProvider,
  ThemeProvider,
  useDevServiceWorkerCleanup,
} from '@mediabubble/shared/client'
import { GoogleAnalytics } from './GoogleAnalytics'
import { I18nLayoutWrapper } from './I18nLayoutWrapper'

export function AppProviders({ children }: { children: React.ReactNode }) {
  useDevServiceWorkerCleanup()

  return (
    <ConsentProvider>
      <ThemeProvider>
        <GoogleAnalytics />
        <I18nLayoutWrapper>{children}</I18nLayoutWrapper>
      </ThemeProvider>
    </ConsentProvider>
  )
}
