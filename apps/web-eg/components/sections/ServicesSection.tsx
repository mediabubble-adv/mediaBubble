'use client'

import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import Link from 'next/link'
import { Search, MousePointer, Share2, Palette, Code, FileText, Calendar, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SERVICE_SLUGS } from '@/lib/services-data'
import { getRegistrySlugs } from '@/lib/content/services'

const LINKABLE_SERVICE_IDS = new Set([...SERVICE_SLUGS, ...getRegistrySlugs()])

const SERVICES = [
  {
    id: 'seo',
    icon: Search,
    color: '#2196F3',
    subtitleKey: 'services.seo.subtitle',
    titleKey: 'services.seo.title',
    descKey: 'services.seo.description',
    subtitleFallback: 'SEO & Organic Growth',
    titleFallback: 'First-page visibility on Google',
    descFallback:
      'Local and technical SEO for Hurghada and the Red Sea: the searches your guests and buyers already run.',
  },
  {
    id: 'ppc',
    icon: MousePointer,
    color: '#1565C0',
    subtitleKey: 'services.ppc.subtitle',
    titleKey: 'services.ppc.title',
    descKey: 'services.ppc.description',
    subtitleFallback: 'Paid Advertising (PPC)',
    titleFallback: 'Paid campaigns aimed at ready buyers',
    descFallback:
      'Google and Meta ads with weekly budget checks. Spend goes to clicks that book, call, or buy.',
  },
  {
    id: 'social',
    icon: Share2,
    color: '#2196F3',
    subtitleKey: 'services.social.subtitle',
    titleKey: 'services.social.title',
    descKey: 'services.social.description',
    subtitleFallback: 'Social Media Marketing',
    titleFallback: 'Social channels that feed your pipeline',
    descFallback: 'Content, scheduling, and community management so your team can run the business.',
  },
  {
    id: 'branding',
    icon: Palette,
    color: '#FFC107',
    subtitleKey: 'services.branding.subtitle',
    titleKey: 'services.branding.title',
    descKey: 'services.branding.description',
    subtitleFallback: 'Branding & Design',
    titleFallback: 'Brand identity built for your market',
    descFallback: 'Logos, guidelines, and collateral that read clearly to tourists and local buyers alike.',
  },
  {
    id: 'web',
    icon: Code,
    color: '#1565C0',
    subtitleKey: 'services.web.subtitle',
    titleKey: 'services.web.title',
    descKey: 'services.web.description',
    subtitleFallback: 'Web Development',
    titleFallback: 'Websites tuned for speed and conversions',
    descFallback: 'Mobile-first builds with clear paths to book, call, or request a quote.',
  },
  {
    id: 'content',
    icon: FileText,
    color: '#2196F3',
    subtitleKey: 'services.content.subtitle',
    titleKey: 'services.content.title',
    descKey: 'services.content.description',
    subtitleFallback: 'Content Marketing',
    titleFallback: 'Content that ranks and supports sales',
    descFallback: 'Articles, email, and social copy that bring qualified traffic and keep prospects warm.',
  },
  {
    id: 'events',
    icon: Calendar,
    color: '#FFC107',
    subtitleKey: 'services.events.subtitle',
    titleKey: 'services.events.title',
    descKey: 'services.events.description',
    subtitleFallback: 'Events & Activations',
    titleFallback: 'Events and activations with clear ROI',
    descFallback: 'Launches, venue fills, and on-site coverage with reporting you can share with leadership.',
  },
] as const

const PRIMARY_SERVICE_IDS = new Set(['seo', 'ppc', 'web'])

export function ServicesSection() {
  const { t, dir } = useI18n()
  const primaryServices = SERVICES.filter((service) => PRIMARY_SERVICE_IDS.has(service.id))
  const secondaryServices = SERVICES.filter((service) => !PRIMARY_SERVICE_IDS.has(service.id))

  return (
    <section dir={dir} className="relative py-12 sm:py-20 lg:py-28 bg-brand-canvas overflow-hidden" aria-label="Services">
      {/* Aurora background */}
      <div className="aurora-bg" aria-hidden="true" />

      <Container className="relative z-10">
        {/* Header */}
        <div data-reveal className="max-w-2xl mb-12">
          <p className={marketingKickerClassName}>
            {t('services.hero.kicker', 'What We Do')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4 [text-wrap:balance]">
            {t('services.hero.title', 'SEO, web, ads, and content from one Hurghada team')}
          </h2>
          <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
            {t(
              'services.hero.subtitle',
              'Pick a channel or bundle them. One plan, one report, no handoffs between vendors.',
            )}
          </p>
        </div>

        {/* Primary services */}
        {/* Primary services — alternating zig-zag feature rows */}
        <div className="mb-10 sm:mb-14 flex flex-col gap-5 sm:gap-7">
          {primaryServices.map((service, index) => {
            const Icon = service.icon
            const flip = index % 2 === 1
            return (
              <Link
                key={service.id}
                id={service.id}
                href={LINKABLE_SERVICE_IDS.has(service.id) ? `/services/${service.id}` : '/contact'}
                data-reveal
                data-reveal-delay={String(index * 80)}
                className="group grid grid-cols-1 items-stretch gap-5 sm:gap-7 md:grid-cols-2 scroll-mt-24 outline-none"
              >
                {/* Accent panel with oversized ghost icon */}
                <div
                  className={[
                    'relative flex min-h-[180px] items-end overflow-hidden rounded-2xl p-7 sm:p-8 transition-transform duration-300 group-hover:-translate-y-1',
                    flip ? 'md:order-2' : 'md:order-1',
                  ].join(' ')}
                  style={{ backgroundColor: `${service.color}12` }}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="pointer-events-none absolute -end-6 -top-6 h-44 w-44 opacity-[0.10] transition-transform duration-500 group-hover:scale-110"
                    style={{ color: service.color }}
                  />
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${service.color}1f` }}
                  >
                    <Icon size={24} strokeWidth={1.75} style={{ color: service.color }} />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={[
                    'flex flex-col justify-center rounded-2xl border border-brand-whisper-border bg-brand-surface p-7 sm:p-9 transition-shadow duration-300 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] dark:group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.40)] group-focus-visible:ring-2 group-focus-visible:ring-brand-blue',
                    flip ? 'md:order-1' : 'md:order-2',
                  ].join(' ')}
                >
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: service.color }}>
                    {t(service.subtitleKey, service.subtitleFallback)}
                  </p>
                  <h3 className="mb-3 font-display text-[clamp(1.15rem,2vw,1.5rem)] font-bold leading-snug text-brand-charcoal dark:text-brand-off-white">
                    {t(service.titleKey, service.titleFallback)}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-brand-secondary dark:text-brand-text-muted">
                    {t(service.descKey, service.descFallback)}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue">
                    {t('common.learnMore', 'View service')}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-[3px]"
                      style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </Container>
    </section>
  )
}
