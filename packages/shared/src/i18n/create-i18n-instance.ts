'use client'

import i18next, { type i18n, type InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { STORAGE_KEYS } from '../storage-keys'

export interface CreateI18nOptions {
  resources: InitOptions['resources']
  fallbackLng?: string
  supportedLngs?: string[]
  storageKey?: string
}

export function createI18nInstance({
  resources,
  fallbackLng = 'en',
  supportedLngs = ['en', 'ar'],
  storageKey = STORAGE_KEYS.language,
}: CreateI18nOptions): i18n {
  if (i18next.isInitialized) return i18next

  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng,
      supportedLngs,
      defaultNS: 'translation',
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: storageKey,
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })

  return i18next
}

export { i18next }
