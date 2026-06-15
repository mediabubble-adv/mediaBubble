'use client'

import { marketingKickerOnDarkClassName } from '@mediabubble/shared/ui/marketing-kicker'
import type { CSSProperties } from 'react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { Lightbulb, Compass, Paintbrush, Rocket } from 'lucide-react'

const STEPS = [
  {
    id: 'discovery',
    icon: Lightbulb,
    accentClass: 'text-brand-yellow',
    ringClass: 'border-brand-yellow/40 group-hover:border-brand-yellow/70 group-hover:shadow-[0_0_24px_rgba(255,193,7,0.22)]',
    badgeClass: 'bg-brand-yellow text-brand-navy',
    numberKey: 'process.step1.number',
    titleKey: 'process.step1.title',
    descKey: 'process.step1.description',
    numberFallback: '01',
    titleFallback: 'Discovery',
    descFallback: 'We audit your market, competitors, and current marketing. You get a written brief with priorities and quick wins.',
  },
  {
    id: 'strategy',
    icon: Compass,
    accentClass: 'text-brand-blue',
    ringClass: 'border-brand-blue/40 group-hover:border-brand-blue/70 group-hover:shadow-[0_0_24px_rgba(33,150,243,0.2)]',
    badgeClass: 'bg-brand-blue text-white',
    numberKey: 'process.step2.number',
    titleKey: 'process.step2.title',
    descKey: 'process.step2.description',
    numberFallback: '02',
    titleFallback: 'Strategy',
    descFallback: 'We define goals, channels, budget, and KPIs. You approve the plan before we build anything.',
  },
  {
    id: 'creation',
    icon: Paintbrush,
    accentClass: 'text-brand-dark-blue',
    ringClass: 'border-brand-dark-blue/40 group-hover:border-brand-dark-blue/70 group-hover:shadow-[0_0_24px_rgba(21,101,192,0.2)]',
    badgeClass: 'bg-brand-dark-blue text-white',
    numberKey: 'process.step3.number',
    titleKey: 'process.step3.title',
    descKey: 'process.step3.description',
    numberFallback: '03',
    titleFallback: 'Build',
    descFallback: 'Design, content, ads, and development run in parallel with weekly check-ins and shared timelines.',
  },
  {
    id: 'launch',
    icon: Rocket,
    accentClass: 'text-brand-yellow',
    ringClass: 'border-brand-yellow/40 group-hover:border-brand-yellow/70 group-hover:shadow-[0_0_24px_rgba(255,193,7,0.22)]',
    badgeClass: 'bg-brand-yellow text-brand-navy',
    numberKey: 'process.step4.number',
    titleKey: 'process.step4.title',
    descKey: 'process.step4.description',
    numberFallback: '04',
    titleFallback: 'Launch and grow',
    descFallback: 'We go live, track performance, and optimize monthly. You get reports you can use in board meetings.',
  },
] as const

export function ProcessSection() {
  const { t, dir } = useI18n()
  const headingId = 'process-heading'

  return (
    <section
      dir={dir}
      className="relative pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32 bg-brand-navy overflow-hidden"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div data-reveal data-reveal-delay="80" className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <p className={marketingKickerOnDarkClassName}>
            {t('process.heading.kicker', 'How we work')}
          </p>
          <h2
            id={headingId}
            className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-white leading-tight mb-4"
          >
            {t('process.heading.title', 'Four steps from brief to results')}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-white/65 leading-relaxed max-w-xl mx-auto">
            {t('process.heading.subtitle', 'Discovery, strategy, build, and launch. Each step has a clear deliverable and owner.')}
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 list-none p-0 m-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            const isLast = index === STEPS.length - 1
            const stepStyle = { '--step-index': index } as CSSProperties

            return (
              <li
                key={step.id}
                data-reveal
                data-reveal-delay={String(100 + index * 90)}
                style={stepStyle}
                className="process-step relative flex flex-col items-center text-center group"
              >
                {!isLast && (
                  <>
                    <span
                      className="process-step-connector hidden lg:block absolute top-12 z-0 h-0.5 rounded-full origin-left"
                      style={{
                        insetInlineStart: 'calc(50% + 3rem)',
                        width: 'calc(100% + 1.5rem - 6rem)',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="process-step-rail sm:hidden absolute top-[6.5rem] start-1/2 -translate-x-1/2 w-px h-[calc(100%-4rem)] bg-gradient-to-b from-brand-yellow/35 to-brand-yellow/5"
                      aria-hidden="true"
                    />
                  </>
                )}

                <div className="relative z-10 mb-5 sm:mb-6">
                  <div
                    className={[
                      'process-step-icon relative w-24 h-24 rounded-full flex items-center justify-center',
                      'border-2 bg-brand-navy ring-[10px] ring-brand-navy',
                      'transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      'group-hover:scale-[1.04]',
                      step.ringClass,
                    ].join(' ')}
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className={`${step.accentClass} transition-transform duration-500 group-hover:scale-110`}
                      aria-hidden="true"
                    />
                  </div>

                  <span
                    className={[
                      'process-step-badge absolute -bottom-2 start-1/2 -translate-x-1/2',
                      'px-3 py-1 rounded-full text-[11px] font-bold tracking-wide',
                      'transition-transform duration-500 group-hover:-translate-y-0.5',
                      step.badgeClass,
                    ].join(' ')}
                  >
                    {t(step.numberKey, step.numberFallback)}
                  </span>
                </div>

                <div className="process-step-copy relative z-10 max-w-[280px]">
                  <h3 className="process-step-title font-display text-[18px] font-bold text-white mb-2">
                    {t(step.titleKey, step.titleFallback)}
                  </h3>
                  <p className="process-step-desc text-[14px] text-white/55 leading-relaxed">
                    {t(step.descKey, step.descFallback)}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <div data-reveal data-reveal-delay="520" className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <p className="text-[14px] text-white/45">
            {t('process.footer.tagline', 'Ready to start? Book your free strategy audit.')}
          </p>
        </div>
      </Container>
    </section>
  )
}
