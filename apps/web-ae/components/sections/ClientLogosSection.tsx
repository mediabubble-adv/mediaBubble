'use client'

import Image from 'next/image'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

const CLIENTS = [
  { name: 'Sahl Hasheesh', src: '/assets/clients-logo/sahl-hasheesh-logo.png', width: 200, height: 48 },
  { name: 'Galeria', src: '/assets/clients-logo/galeria-logo.png', width: 180, height: 48 },
  { name: "Gold's Gym", src: '/assets/clients-logo/golds-gym-logo.png', width: 120, height: 36 },
  { name: 'Logo Org', src: '/assets/clients-logo/logofull-org.svg', width: 120, height: 36 },
  { name: 'Logo 01', src: '/assets/clients-logo/logo-01.png', width: 100, height: 32 },
] as const

export function ClientLogosSection() {
  const { t, dir } = useI18n()

  return (
    <section
      dir={dir}
      className="py-12 sm:py-16 lg:py-20 bg-brand-surface border-y border-brand-light-border"
      aria-label="Clients"
    >
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted-steel text-center mb-8">
          {t('clients.heading', 'Trusted by hospitality and retail brands across the UAE')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {CLIENTS.map(({ name, src, width, height }) => (
            <div
              key={name}
              className="relative grayscale opacity-50 dark:opacity-60 hover:grayscale-0 hover:opacity-100 dark:hover:opacity-100 transition-all duration-200"
              style={{ width, height }}
              aria-label={name}
            >
              <Image
                src={src}
                alt={name}
                fill
                className="object-contain"
                sizes={`${width}px`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
