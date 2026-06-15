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
      'Local and technical SEO for Dubai and the UAE: the searches your customers already run.',
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
    descFallback: 'Logos, guidelines, and collateral tuned for UAE audiences and bilingual touchpoints.',
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
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
            {t('services.hero.title', 'SEO, web, ads, and content from one UAE team')}
          </h2>
          <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
            {t(
              'services.hero.subtitle',
              'Pick a channel or bundle them. One plan, one report, no handoffs between vendors.',
            )}
          </p>
        </div>

        {/* Primary services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {primaryServices.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                id={service.id}
                href={LINKABLE_SERVICE_IDS.has(service.id) ? `/services/${service.id}` : '/contact'}
                className="group bg-brand-surface rounded-2xl border border-brand-whisper-border p-6 sm:p-7 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-blue outline-none scroll-mt-24"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${service.color}14` }}
                >
                  <Icon size={22} strokeWidth={1.75} style={{ color: service.color }} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5" style={{ color: service.color }}>
                  {t(service.subtitleKey, service.subtitleFallback)}
                </p>
                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-brand-charcoal dark:text-brand-off-white leading-snug mb-2">
                  {t(service.titleKey, service.titleFallback)}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
                  {t(service.descKey, service.descFallback)}
                </p>
                <div className="flex items-center gap-1 mt-5 text-[12px] font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {t('common.learnMore', 'View service')}
                  <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-[2px]" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Secondary services */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0 border-t border-brand-whisper-border pt-6 sm:pt-8 list-none p-0 m-0" role="list">
          {secondaryServices.map((service) => {
            const Icon = service.icon
            return (
              <li key={service.id} className="border-b border-brand-whisper-border sm:[&:nth-last-child(-n+2)]:border-b-0">
                <Link
                  id={service.id}
                  href={LINKABLE_SERVICE_IDS.has(service.id) ? `/services/${service.id}` : '/contact'}
                  className="group flex items-start gap-4 py-5 sm:py-6 focus-visible:ring-2 focus-visible:ring-brand-blue outline-none rounded-lg scroll-mt-24"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${service.color}14` }}
                  >
                    <Icon size={18} strokeWidth={1.75} style={{ color: service.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: service.color }}>
                      {t(service.subtitleKey, service.subtitleFallback)}
                    </p>
                    <h3 className="font-display text-[15px] font-bold text-brand-charcoal dark:text-brand-off-white leading-snug group-hover:text-brand-blue transition-colors duration-150">
                      {t(service.titleKey, service.titleFallback)}
                    </h3>
                  </div>
                  <ArrowRight
                    size={14}
                    className="ms-auto shrink-0 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-1"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
