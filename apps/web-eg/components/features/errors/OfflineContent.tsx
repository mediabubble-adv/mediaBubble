'use client'

import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { useI18n } from '@/lib/i18n/provider'

export function OfflineContent() {
  const { t, dir } = useI18n()

  return (
    <div dir={dir}>
      <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue mb-3">
        {t('offline.kicker', "You're offline")}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy dark:text-white mb-4">
        {t('offline.title', 'Connection unavailable')}
      </h1>
      <p className="text-brand-text-muted max-w-md mx-auto mb-8">
        {t(
          'offline.body',
          "This page isn't cached yet. Check your connection and try again — recently visited pages may still be available.",
        )}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy transition-colors"
      >
        {t('offline.cta', 'Back to homepage')}
      </Link>
    </Container>
    </div>
  )
}
