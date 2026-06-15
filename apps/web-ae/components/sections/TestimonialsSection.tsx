'use client'

import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { usePrefersReducedMotion } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { ROW_1, ROW_2, type TestimonialItem } from '@/lib/data/testimonials'

function StarRating({ color, className = '' }: { color: string; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ item, dir = 'ltr' }: { item: TestimonialItem; dir?: 'ltr' | 'rtl' }) {
  const { t } = useI18n()
  return (
    <figure
      dir={dir}
      className="shrink-0 w-[340px] sm:w-[400px] bg-brand-surface rounded-2xl border border-brand-whisper-border dark:border-white/10 px-6 pb-6 pt-14 flex flex-col shadow-sm hover:shadow-md dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-shadow duration-300 text-center"
    >
      {/* Photo / Avatar — overlapping top */}
      <div className="relative -mt-20 mx-auto mb-3">
        {item.photo ? (
          <img
            src={item.photo}
            alt={t(item.authorKey, item.authorFallback)}
            className="w-20 h-20 rounded-full object-cover border-4 border-brand-surface shadow-md bg-brand-surface"
            loading="lazy"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[14px] font-bold shadow-md border-4 border-brand-surface"
            style={{ backgroundColor: item.color }}
          >
            {item.avatar}
          </div>
        )}
      </div>

      {/* Name */}
      <p className="text-[14px] font-bold text-brand-deep-charcoal dark:text-brand-off-white mb-0.5">
        {t(item.authorKey, item.authorFallback)}
      </p>

      {/* Role */}
      <p className="text-[11px] text-brand-muted-steel dark:text-brand-text-muted mb-2">
        {t(item.roleKey, item.roleFallback)}
      </p>

      {/* Stars */}
      <div className="flex justify-center mb-5">
        <StarRating color="#FFB300" />
      </div>

      {/* Quote mark */}
      <span
        aria-hidden="true"
        className="font-display text-[32px] leading-none font-bold mb-2 select-none opacity-20"
        style={{ color: item.color }}
      >
        &ldquo;
      </span>

      <blockquote className="flex-1 text-[13px] text-brand-charcoal dark:text-brand-text-muted leading-relaxed text-pretty">
        {t(item.quoteKey, item.quoteFallback)}
      </blockquote>
    </figure>
  )
}

function MarqueeTrack({
  items,
  duration = 60,
  reverse = false,
  dir = 'ltr',
}: {
  items: TestimonialItem[]
  duration?: number
  reverse?: boolean
  dir?: 'ltr' | 'rtl'
}) {
  const allItems = [...items, ...items]
  const animClass = reverse ? 'animate-marquee-right' : 'animate-marquee-left'

  return (
    <div
      dir="ltr"
      className="testimonial-marquee-track overflow-hidden relative group pt-10 pb-2"
    >
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-brand-canvas to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-brand-canvas to-transparent" />

      <div
        className={`flex gap-5 w-max will-change-transform ${animClass} group-hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {allItems.map((item, i) => (
          <TestimonialCard key={`${item.authorKey}-${i}`} item={item} dir={dir} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { t, dir } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const staticItems = [...ROW_1, ...ROW_2]

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-canvas overflow-hidden" aria-label="Client testimonials">
      <Container>
        {/* Header */}
        <div data-reveal className="max-w-2xl mb-12 sm:mb-16 lg:mb-20">
          <p className={marketingKickerClassName}>
            {t('testimonials.heading.kicker', 'Client Stories')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
            {t('testimonials.heading.title', 'What clients report after year one')}
          </h2>
          <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
            {t(
              'testimonials.heading.subtitle',
              'Hospitality, retail, and professional services brands we work with across the UAE.',
            )}
          </p>
        </div>
      </Container>

      {prefersReducedMotion ? (
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pt-10 [&_figure]:w-full [&_figure]:max-w-none">
            {staticItems.map((item) => (
              <TestimonialCard key={item.authorKey} item={item} dir={dir} />
            ))}
          </div>
        </Container>
      ) : (
        <div dir="ltr" className="space-y-6">
          <MarqueeTrack items={ROW_1} duration={80} dir={dir} />
          <MarqueeTrack items={ROW_2} duration={100} reverse dir={dir} />
        </div>
      )}

    </section>
  )
}
