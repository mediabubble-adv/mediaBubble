'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@mediabubble/shared/client'

export interface ThemeToggleProps {
  className?: string
  /** Nav surface behind the toggle — affects contrast styles. */
  surface?: 'dark' | 'light'
}

export function ThemeToggle({ className = '', surface = 'light' }: ThemeToggleProps) {
  const { resolved, toggleTheme } = useTheme()
  const isDark = resolved === 'dark'
  const onLightSurface = surface === 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={[
        'inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors',
        onLightSurface
          ? 'border-brand-whisper-border dark:border-white/10 bg-brand-surface text-brand-navy dark:text-brand-off-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
          : 'border-white/20 bg-white/10 text-white hover:bg-white/15',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/60',
        className,
      ].join(' ')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  )
}
