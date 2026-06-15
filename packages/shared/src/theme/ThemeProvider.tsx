'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS, getTypedStorageItem, setTypedStorageItem } from '../storage-keys'
import {
  applyThemeToDocument,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from './theme-utils'

type ThemeContextValue = {
  theme: ThemePreference
  resolved: ResolvedTheme
  setTheme: (preference: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>('system')
  const [resolved, setResolved] = useState<ResolvedTheme>('light')

  useEffect(() => {
    const stored = getTypedStorageItem(STORAGE_KEYS.theme)
    const preference = stored ?? 'system'
    setThemeState(preference)
    const next = resolveTheme(preference)
    setResolved(next)
    applyThemeToDocument(next)
  }, [])

  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = resolveTheme('system')
      setResolved(next)
      applyThemeToDocument(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((preference: ThemePreference) => {
    setThemeState(preference)
    setTypedStorageItem(STORAGE_KEYS.theme, preference)
    const next = resolveTheme(preference)
    setResolved(next)
    applyThemeToDocument(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark')
  }, [resolved, setTheme])

  const value = useMemo(
    () => ({ theme, resolved, setTheme, toggleTheme }),
    [theme, resolved, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
