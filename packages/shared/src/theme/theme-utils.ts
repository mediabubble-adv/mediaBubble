import inlineScripts from '../inline-scripts.cjs'

export type ThemePreference = 'light' | 'dark' | 'system'

export type ResolvedTheme = 'light' | 'dark'

/** Inline script for layout `<head>` — applies theme class before paint. */
export const THEME_INIT_SCRIPT = inlineScripts.THEME_INIT_SCRIPT as string

export function resolveTheme(preference: ThemePreference | null): ResolvedTheme {
  if (preference === 'dark') return 'dark'
  if (preference === 'light') return 'light'
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function applyThemeToDocument(resolved: ResolvedTheme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}
