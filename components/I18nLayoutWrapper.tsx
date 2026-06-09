'use client'

import { I18nProvider } from '@/lib/i18n/I18nProvider'

export function I18nLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>
}
