'use client'

import Image from 'next/image'
import { usePrefersReducedMotion } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

const CLIENTS = [
  { name: 'Sahl Hasheesh', src: '/assets/clients-logo/sahl-hasheesh-logo.png', width: 200, height: 48 },
  { name: 'Galeria', src: '/assets/clients-logo/galeria-logo.png', width: 180, height: 48 },
  { name: "Gold's Gym", src: '/assets/clients-logo/golds-gym-logo.png', width: 120, height: 36 },
  { name: 'Logo Org', src: '/assets/clients-logo/logofull-org.svg', width: 120, height: 36 },
  { name: 'Logo 01', src: '/assets/clients-logo/logo-01.png', width: 100, height: 32 },
] as const

type Client = (typeof CLIENTS)[number]

function Logo({ name, src, width, height }: Client) {
  return (
    <div
      className="relative shrink-0 grayscale opacity-50 transition-all duration-200 hover:grayscale-0 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      style={{ width, height }}
      aria-label={name}
    >
      <Image src={src} alt={name} fill className="object-contain" sizes={`${width}px`} />
    </div>
  )
}

export function ClientLogosSection() {
  const { t, dir } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const doubled = [...CLIENTS, ...CLIENTS]

  return (
    <section
      dir={dir}
      className="overflow-hidden border-y border-brand-light-border bg-brand-surface py-12 sm:py-16 lg:py-20"
      aria-label="Clients"
    >
      <Container>
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-secondary">
          {t('clients.heading', 'Trusted by hospitality and retail brands in Hurghada')}
        </p>
      </Container>

      {prefersReducedMotion ? (
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {CLIENTS.map((client) => (
              <Logo key={client.name} {...client} />
            ))}
          </div>
        </Container>
      ) : (
        <div dir="ltr" className="group relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-surface to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-surface to-transparent sm:w-28" />
          <div
            className="flex w-max items-center gap-x-14 will-change-transform animate-marquee-left group-hover:[animation-play-state:paused] sm:gap-x-20"
            style={{ animationDuration: '40s' }}
          >
            {doubled.map((client, i) => (
              <Logo key={`${client.name}-${i}`} {...client} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
