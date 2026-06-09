'use client'

import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './config'
import { LANGUAGE_KEY } from './config'

export type Language = 'en' | 'ar'

const RTL_LANGUAGES: Language[] = ['ar']

export function useLanguage() {
  const { t, i18n } = useTranslation()

  const language = (
    RTL_LANGUAGES.includes(i18n.language as Language) ||
    i18n.language === 'en'
      ? i18n.language
      : 'en'
  ) as Language

  const isRTL = RTL_LANGUAGES.includes(language)
  const dir: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr'

  const switchLanguage = useCallback(
    (lang: Language) => {
      i18n.changeLanguage(lang)
      localStorage.setItem(LANGUAGE_KEY, lang)
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.setAttribute('data-dir', lang === 'ar' ? 'rtl' : 'ltr')
    },
    [i18n]
  )

  const toggleLanguage = useCallback(() => {
    switchLanguage(language === 'en' ? 'ar' : 'en')
  }, [language, switchLanguage])

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
    document.documentElement.setAttribute('data-dir', dir)
  }, [dir, language])

  return { t, i18n, language, isRTL, dir, switchLanguage, toggleLanguage }
}
