'use client'

import { Globe } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'

// ─── Types ────────────────────────────────────────────────────────────────────

export type LanguageSwitcherVariant = 'ghost' | 'outline'

export interface LanguageSwitcherProps {
  /** Visual style. 'ghost' = no border; 'outline' = thin border. Default: 'ghost' */
  variant?: LanguageSwitcherVariant
  /** Extra Tailwind classes forwarded to the root button */
  className?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** What the button displays and announces for each locale */
const LOCALE_META = {
  en: {
    /** Short label shown inside the button */
    label: 'EN',
    /** Spoken label for the action (switching away from English) */
    ariaLabel: 'التبديل إلى العربية — Switch to Arabic',
    useArabicFont: false,
  },
  'ar-masri': {
    label: 'العربية',
    ariaLabel: 'Switch to English',
    useArabicFont: true,
  },
} as const

const BASE_CLASSES = [
  // layout
  'group inline-flex items-center gap-1.5 shrink-0 select-none cursor-pointer',
  // shape & size
  'rounded-lg px-2.5 py-1.5',
  // typography
  'text-[11px] font-medium leading-none',
  // focus ring — visible only on keyboard navigation
  'focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-1',
  // motion
  'transition-all duration-150 ease-out',
].join(' ')

const VARIANT_CLASSES: Record<LanguageSwitcherVariant, string> = {
  ghost: [
    'border border-transparent',
    'text-brand-secondary',
    'hover:text-brand-charcoal hover:bg-black/[0.05]',
    'active:bg-black/[0.08]',
  ].join(' '),
  outline: [
    'border border-brand-whisper-border',
    'text-brand-secondary bg-transparent',
    'hover:text-brand-charcoal hover:bg-brand-canvas hover:border-brand-input-border',
    'active:bg-black/[0.04]',
  ].join(' '),
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LanguageSwitcher({
  variant = 'ghost',
  className = '',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()

  const isArabic = locale === 'ar-masri'
  const meta = LOCALE_META[locale]
  const nextLocale = isArabic ? 'en' : 'ar-masri'

  const rootClass = [BASE_CLASSES, VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      aria-label={meta.ariaLabel}
      // aria-pressed conveys the toggle state: true = Arabic is active
      aria-pressed={isArabic}
      data-testid="language-switcher"
      className={rootClass}
    >
      <Globe
        size={13}
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 group-hover:rotate-12"
      />

      {/* aria-live announces the new label to screen readers on change */}
      <span
        aria-live="polite"
        aria-atomic="true"
        className={meta.useArabicFont ? 'font-arabic' : ''}
      >
        {meta.label}
      </span>
    </button>
  )
}
