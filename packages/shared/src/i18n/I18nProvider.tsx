'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getLocalStorageItem, setLocalStorageItem } from '../storage'
import { STORAGE_KEYS, getTypedStorageItem, setTypedStorageItem } from '../storage-keys'

export type Locale = string

type TranslationDict = Record<string, string>

export function flattenTranslations(
  obj: Record<string, unknown>,
  prefix = '',
): TranslationDict {
  const result: TranslationDict = {}
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenTranslations(value as Record<string, unknown>, path))
    } else if (typeof value === 'string') {
      result[path] = value
    }
  }
  return result
}

export interface I18nProviderProps {
  children: React.ReactNode
  dictionaries: Record<Locale, TranslationDict>
  defaultLocale?: Locale
  storageKey?: string
  rtlLocales?: Locale[]
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key, fallback) => fallback || key,
  dir: 'ltr',
})

export function I18nProvider({
  children,
  dictionaries,
  defaultLocale = 'en',
  storageKey = STORAGE_KEYS.language,
  rtlLocales = [],
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  const normalizeStoredLocale = useCallback(
    (saved: string): Locale => {
      if (dictionaries[saved]) return saved
      if (saved === 'ar-masri' && dictionaries['ar']) return 'ar'
      if (saved === 'ar' && dictionaries['ar-masri']) return 'ar-masri'
      return defaultLocale
    },
    [dictionaries, defaultLocale],
  )

  useEffect(() => {
    const saved =
      storageKey === STORAGE_KEYS.language
        ? getTypedStorageItem(STORAGE_KEYS.language)
        : getLocalStorageItem(storageKey)
    if (saved) {
      const normalized = normalizeStoredLocale(saved)
      setLocaleState(normalized)
      if (storageKey === STORAGE_KEYS.language) {
        document.cookie = `${STORAGE_KEYS.language}=${normalized}; path=/; max-age=31536000; SameSite=Lax`
      }
    }
  }, [storageKey, normalizeStoredLocale])

  const applyDocumentLocale = useCallback(
    (l: Locale) => {
      const isRtl = rtlLocales.includes(l)
      document.documentElement.lang = isRtl ? 'ar' : 'en'
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
      document.documentElement.setAttribute('data-dir', isRtl ? 'rtl' : 'ltr')
    },
    [rtlLocales],
  )

  const setLocale = useCallback(
    (l: Locale) => {
      const normalized = normalizeStoredLocale(l)
      setLocaleState(normalized)
      if (storageKey === STORAGE_KEYS.language) {
        setTypedStorageItem(STORAGE_KEYS.language, normalized)
        document.cookie = `${STORAGE_KEYS.language}=${normalized}; path=/; max-age=31536000; SameSite=Lax`
      } else {
        setLocalStorageItem(storageKey, normalized)
      }
      applyDocumentLocale(normalized)
    },
    [applyDocumentLocale, storageKey, normalizeStoredLocale],
  )

  const t = useCallback(
    (key: string, fallback?: string) => dictionaries[locale]?.[key] ?? fallback ?? key,
    [dictionaries, locale],
  )

  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  useEffect(() => {
    applyDocumentLocale(locale)
  }, [locale, applyDocumentLocale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
