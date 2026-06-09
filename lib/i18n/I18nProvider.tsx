'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import en from './en.json'
import arMasri from './ar-masri.json'
import enLocale from '../../public/locales/en/translation.json'
import arLocale from '../../public/locales/ar/translation.json'

type Locale = 'en' | 'ar-masri'
type TranslationDict = Record<string, string>

function flatten(obj: Record<string, unknown>, prefix = ''): TranslationDict {
  const result: TranslationDict = {}
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, path))
    } else if (typeof value === 'string') {
      result[path] = value
    }
  }
  return result
}

const dictionaries: Record<Locale, TranslationDict> = {
  en: { ...en, ...flatten(enLocale as Record<string, unknown>) },
  'ar-masri': { ...arMasri, ...flatten(arLocale as Record<string, unknown>) },
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

const STORAGE_KEY = 'mediabubble-language'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar-masri' || saved === 'en') {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
    document.documentElement.lang = l === 'ar-masri' ? 'ar' : 'en'
    document.documentElement.dir = l === 'ar-masri' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('data-dir', l === 'ar-masri' ? 'rtl' : 'ltr')
  }, [])

  const t = useCallback((key: string, fallback?: string) => {
    return dictionaries[locale]?.[key] ?? fallback ?? key
  }, [locale])

  const dir = locale === 'ar-masri' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.setAttribute('data-dir', dir)
  }, [dir])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
