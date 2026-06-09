'use client'

import Link from 'next/link'
import { Search, MousePointer, Share2, Palette, Code, FileText, Calendar, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

const SERVICES = [
  {
    id: 'seo',
    icon: Search,
    color: '#2196F3',
    subtitleKey: 'services.seo.subtitle',
    titleKey: 'services.seo.title',
    descKey: 'services.seo.description',
    subtitleFallback: 'SEO & Organic Growth',
    titleFallback: 'Rank Higher, Get More Customers',
    descFallback: 'We help Hurghada businesses rank on the first page of Google — where your customers are already searching.',
  },
  {
    id: 'ppc',
    icon: MousePointer,
    color: '#1565C0',
    subtitleKey: 'services.ppc.subtitle',
    titleKey: 'services.ppc.title',
    descKey: 'services.ppc.description',
    subtitleFallback: 'Paid Advertising (PPC)',
    titleFallback: 'Reach Customers Ready to Buy',
    descFallback: 'Stop wasting budget on clicks that don\'t convert. Our paid advertising team runs Google Ads and Meta Ads.',
  },
  {
    id: 'social',
    icon: Share2,
    color: '#2196F3',
    subtitleKey: 'services.social.subtitle',
    titleKey: 'services.social.title',
    descKey: 'services.social.description',
    subtitleFallback: 'Social Media Marketing',
    titleFallback: 'Build a Community That Converts',
    descFallback: 'We manage your social presence so you can focus on running your business.',
  },
  {
    id: 'branding',
    icon: Palette,
    color: '#FFC107',
    subtitleKey: 'services.branding.subtitle',
    titleKey: 'services.branding.title',
    descKey: 'services.branding.description',
    subtitleFallback: 'Branding & Design',
    titleFallback: 'Look Like the Market Leader You Are',
    descFallback: 'We build brand identities that reflect your values, connect with your audience, and stand out.',
  },
  {
    id: 'web',
    icon: Code,
    color: '#1565C0',
    subtitleKey: 'services.web.subtitle',
    titleKey: 'services.web.title',
    descKey: 'services.web.description',
    subtitleFallback: 'Web Development',
    titleFallback: 'A Website That Works as Hard as You Do',
    descFallback: 'Your website should be your best salesperson — available 24/7, fast, and built to convert.',
  },
  {
    id: 'content',
    icon: FileText,
    color: '#2196F3',
    subtitleKey: 'services.content.subtitle',
    titleKey: 'services.content.title',
    descKey: 'services.content.description',
    subtitleFallback: 'Content Marketing',
    titleFallback: 'Content That Ranks and Converts',
    descFallback: 'Great content doesn\'t just fill a blog — it attracts organic traffic, builds authority, and nurtures prospects.',
  },
  {
    id: 'events',
    icon: Calendar,
    color: '#FFC107',
    subtitleKey: 'services.events.subtitle',
    titleKey: 'services.events.title',
    descKey: 'services.events.description',
    subtitleFallback: 'Events & Activations',
    titleFallback: 'Make Every Event Unforgettable',
    descFallback: 'From corporate launches to experiential activations, we handle the strategy, creative, and logistics.',
  },
] as const

export function ServicesSection() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-brand-canvas" aria-label="Services">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-blue mb-3">
            {t('services.hero.kicker', 'What We Do')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy leading-tight mb-4">
            {t('services.hero.title', 'Everything Your Business Needs to Grow Online')}
          </h2>
          <p className="text-[16px] text-brand-secondary leading-relaxed">
            {t('services.hero.subtitle', 'From SEO to branding, paid ads to web development — we cover every channel that moves the needle.')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                id={service.id}
                href={`/services#${service.id}`}
                className="group bg-brand-surface rounded-2xl border border-brand-whisper-border p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-blue outline-none scroll-mt-24"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}14` }}
                >
                  <Icon size={20} strokeWidth={1.75} style={{ color: service.color }} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: service.color }}>
                  {t(service.subtitleKey, service.subtitleFallback)}
                </p>
                <h3 className="font-display text-[15px] font-bold text-brand-charcoal leading-snug mb-2">
                  {t(service.titleKey, service.titleFallback)}
                </h3>
                <p className="text-[13px] text-brand-secondary leading-relaxed line-clamp-3">
                  {t(service.descKey, service.descFallback)}
                </p>
                <div className="flex items-center gap-1 mt-4 text-[12px] font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {t('common.learnMore', 'Learn More')}
                  <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-[2px]" />
                </div>
              </Link>
            )
          })}

          {/* CTA card */}
          <div className="bg-brand-navy rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <p className="font-display text-[15px] font-bold text-white leading-snug mb-2">
                {t('services.cta.heading', "Not Sure Where to Start?")}
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                {t('services.cta.body', "Book a free 30-minute strategy call. We'll review your current marketing and identify the biggest opportunities.")}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150"
            >
              {t('services.cta.primary', 'Get Your Free Strategy Audit')}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
