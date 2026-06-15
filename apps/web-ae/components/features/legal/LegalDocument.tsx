'use client'

import { resolveMarketSiteConfig } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'
import { LegalLayout } from '@/components/layout/LegalLayout'
import type { LegalDocumentConfig } from '@/lib/content/legal/types'

const MARKET = 'ae' as const
const site = resolveMarketSiteConfig(MARKET)

interface Props {
  document: LegalDocumentConfig
}

export function LegalDocument({ document }: Props) {
  const { locale } = useI18n()
  const content = locale === 'ar' ? document.ar : document.en

  return (
    <LegalLayout
      kicker={content.kicker}
      title={content.title}
      lastUpdated={document.lastUpdated}
      sections={content.sections}
      contactEmail={site.email}
    />
  )
}
