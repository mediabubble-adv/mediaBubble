'use client'

import { ThemeProvider } from '@mediabubble/shared/client'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
