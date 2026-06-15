'use client'

import { I18nProvider, useI18n } from '@/lib/i18n/provider'
import { CookieConsent } from './CookieConsent'
import { I18nErrorBoundary } from './I18nErrorBoundary'
import { Phase1Provider } from '@/components/shared/Phase1Provider'
import { Phase3Provider } from '@/components/shared/Phase3Provider'

function SkipToContentLink() {
  const { t } = useI18n()
  return (
    <a href="#main-content" className="skip-link">
      {t('nav.skipToContent', 'Skip to content')}
    </a>
  )
}

export function I18nLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <I18nErrorBoundary>
      <I18nProvider>
        <SkipToContentLink />
        {children}
        <CookieConsent />
        <Phase1Provider />
        <Phase3Provider />
      </I18nProvider>
    </I18nErrorBoundary>
  )
}
