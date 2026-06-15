'use client'

import { getMarketPortalUrl } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'

const PORTALS = [
  { market: 'eg' as const, flag: '🇪🇬', labelKey: 'footer.regions.egypt', labelFallback: 'EG site' },
  { market: 'ae' as const, flag: '🇦🇪', labelKey: 'footer.regions.uae', labelFallback: 'UAE' },
] as const

type ActiveMarket = (typeof PORTALS)[number]['market']

interface FooterMarketSwitchProps {
  activeMarket: ActiveMarket
}

export function FooterMarketSwitch({ activeMarket }: FooterMarketSwitchProps) {
  const { t } = useI18n()

  return (
    <div
      className="flex items-center gap-2 mt-4"
      role="navigation"
      aria-label={t('footer.regions.heading', 'MediaBubble regional sites')}
    >
      {PORTALS.map(({ market, flag, labelKey, labelFallback }) => {
        const isActive = market === activeMarket
        const label = t(labelKey, labelFallback)

        return (
          <a
            key={market}
            href={getMarketPortalUrl(market)}
            aria-label={`MediaBubble ${label}`}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-150',
              isActive
                ? 'bg-white/10 text-white ring-1 ring-white/20 pointer-events-none'
                : 'text-white/45 hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            <span className="text-base leading-none" aria-hidden>
              {flag}
            </span>
            <span className="font-medium">{label}</span>
          </a>
        )
      })}
    </div>
  )
}
