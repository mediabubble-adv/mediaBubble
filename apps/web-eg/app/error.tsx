'use client'

import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/provider'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t, dir } = useI18n()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main-content"
      tabIndex={-1}
      dir={dir}
      className="min-h-screen bg-brand-canvas flex flex-col items-center justify-center px-6 text-center"
    >
      <p className={marketingKickerClassName}>
        {t('errors.500.kicker', 'Error')}
      </p>
      <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
        {t('errors.500.heading', 'Something went wrong')}
      </h2>
      <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-8 max-w-md">
        {t(
          'errors.500.body',
          'An unexpected error occurred. You can try again or return to the homepage.',
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-brand-navy text-white hover:bg-[#0A3580] active:scale-[0.97] transition-all duration-150"
        >
          {t('errors.500.cta', 'Try again')}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border-2 border-brand-navy/20 dark:border-brand-off-white/20 text-brand-navy dark:text-brand-off-white hover:border-brand-navy dark:hover:border-brand-off-white hover:bg-brand-navy/[0.04] dark:hover:bg-white/[0.06] active:scale-[0.97] transition-all duration-150"
        >
          {t('errors.500.homeCta', 'Go to Homepage')}
        </Link>
      </div>
    </main>
  )
}
