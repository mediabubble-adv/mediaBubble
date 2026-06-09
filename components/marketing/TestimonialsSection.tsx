'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

const TESTIMONIALS = [
  {
    quoteKey:  'testimonials.1.quote',
    authorKey: 'testimonials.1.author',
    roleKey:   'testimonials.1.role',
    quoteFallback:  '"MediaBubble took our resort from near-invisible online to fully booked through summer. The SEO and paid ads strategy they built us drives 68% of our direct bookings now."',
    authorFallback: 'Ahmed Hassan',
    roleFallback:   'General Manager, Coral Bay Resort',
    avatar: 'AH',
    color:  '#2196F3',
  },
  {
    quoteKey:  'testimonials.2.quote',
    authorKey: 'testimonials.2.author',
    roleKey:   'testimonials.2.role',
    quoteFallback:  '"In six months our organic traffic grew 340%. The team genuinely understands Hurghada\'s market — they know which tourists search, how, and when."',
    authorFallback: 'Nadia Saleh',
    roleFallback:   'Marketing Director, Red Sea Divers',
    avatar: 'NS',
    color:  '#072A6B',
  },
  {
    quoteKey:  'testimonials.3.quote',
    authorKey: 'testimonials.3.author',
    roleKey:   'testimonials.3.role',
    quoteFallback:  '"We rebranded with MediaBubble and launched a new site. Within three months our lead volume doubled. More importantly, the leads actually convert."',
    authorFallback: 'Khaled Mansour',
    roleFallback:   'CEO, Aqua Sports Egypt',
    avatar: 'KM',
    color:  '#1565C0',
  },
] as const

export function TestimonialsSection() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-white" aria-label="Client testimonials">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
            {t('testimonials.heading.kicker', 'Client Stories')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#072A6B] leading-tight mb-4">
            {t('testimonials.heading.title', 'Real Businesses. Real Results.')}
          </h2>
          <p className="text-[16px] text-[#666] leading-relaxed">
            {t('testimonials.heading.subtitle', "Don't take our word for it — here's what our clients say after working with us.")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.authorKey}
              className="bg-[#FAFAFA] rounded-2xl border border-[#E8E8E8] p-7 flex flex-col"
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                className="font-display text-[64px] leading-none font-bold mb-2 select-none"
                style={{ color: `${item.color}18` }}
              >
                "
              </span>

              <blockquote className="flex-1 text-[14px] text-[#444] leading-relaxed mb-6">
                {t(item.quoteKey, item.quoteFallback)}
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-[12px] font-bold"
                  style={{ backgroundColor: item.color }}
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1A1A2E]">
                    {t(item.authorKey, item.authorFallback)}
                  </p>
                  <p className="text-[12px] text-[#999]">
                    {t(item.roleKey, item.roleFallback)}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
