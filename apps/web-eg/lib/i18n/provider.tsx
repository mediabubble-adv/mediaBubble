'use client'

import en from './en.json'
import arMasri from './ar-masri.json'
import enLocale from '../../public/locales/en/translation.json'
import arLocale from '../../public/locales/ar/translation.json'
import {
  flattenTranslations,
  I18nProvider as SharedI18nProvider,
} from '@mediabubble/shared/client'

const dictionaries = {
  en: { ...en, ...flattenTranslations(enLocale as Record<string, unknown>) },
  'ar-masri': { ...arMasri, ...flattenTranslations(arLocale as Record<string, unknown>) },
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
