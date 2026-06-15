'use client'

import en from './en.json'
import arMasri from './ar-masri.json'
import {
  I18nProvider as SharedI18nProvider,
} from '@mediabubble/shared/client'

const dictionaries = {
  en,
  'ar-masri': arMasri,
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <SharedI18nProvider
      dictionaries={dictionaries}
      defaultLocale="en"
      rtlLocales={['ar-masri']}
    >
      {children}
    </SharedI18nProvider>
  )
}

export { useI18n } from '@mediabubble/shared/client'
