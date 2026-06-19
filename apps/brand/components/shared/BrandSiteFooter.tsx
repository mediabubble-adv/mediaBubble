'use client'

import Image from 'next/image'
import { getMarketPortalUrl, resolveMarketSiteConfig } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'
import { brand } from '../constants'

const site = resolveMarketSiteConfig('brand')
const egSiteUrl = getMarketPortalUrl('eg')
const aeSiteUrl = getMarketPortalUrl('ae')

export function BrandSiteFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="mt-auto shrink-0 border-t border-white/[0.08] bg-brand-navy text-white/55"
    >
      <div className="px-6 lg:px-10 py-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <Image
              src="/assets/logo.svg"
              alt=""
              width={28}
              height={28}
              className="w-7 h-7 shrink-0"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight truncate">{brand.name}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">{t('Brand Guidelines')}</p>
            </div>
          </div>

          <nav
            aria-label={t('brand.footer.links', 'Related sites')}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px]"
          >
            <a
              href={egSiteUrl}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('brand.footer.egSite', 'Egypt')}
            </a>
            <a
              href={aeSiteUrl}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('brand.footer.aeSite', 'UAE')}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white transition-colors tabular-nums" dir="ltr">
              {site.email}
            </a>
          </nav>

          <p className="text-[11px] text-white/40 sm:text-end">
            {t('brand.footer.copyright', `© ${year} MediaBubble. All rights reserved.`).replace(
              '{{year}}',
              String(year),
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
