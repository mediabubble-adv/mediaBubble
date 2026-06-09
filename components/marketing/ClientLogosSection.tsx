'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

const CLIENTS = [
  { name: 'Coral Bay Resort',     abbr: 'CB' },
  { name: 'Red Sea Divers',       abbr: 'RS' },
  { name: 'Aqua Sports Egypt',    abbr: 'AQ' },
  { name: 'Desert Rose Hotel',    abbr: 'DR' },
  { name: 'Marina View Residences', abbr: 'MV' },
  { name: 'Hurghada Rentals',     abbr: 'HR' },
] as const

export function ClientLogosSection() {
  const { t, dir } = useI18n()

  return (
    <section
      dir={dir}
      className="py-8 sm:py-10 bg-white border-y border-[#F0F0F0]"
      aria-label="Clients"
    >
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] text-center mb-7">
          {t('clients.heading', 'Trusted by leading Hurghada businesses')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {CLIENTS.map(({ name, abbr }) => (
            <div
              key={name}
              className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-150 select-none"
              aria-label={name}
            >
              {/* Logo mark placeholder */}
              <div className="w-7 h-7 rounded-lg bg-[#072A6B] flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-bold leading-none">{abbr}</span>
              </div>
              <span className="text-[13px] font-semibold text-[#333] whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
