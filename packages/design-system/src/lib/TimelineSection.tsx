import * as React from 'react'
import { SectionHeader } from './SectionHeader'

export interface TimelineStep {
  step: string | number
  title: string
  description?: string
}

export interface TimelineSectionProps {
  steps: TimelineStep[]
  kicker?: string
  title?: React.ReactNode
  intro?: string
  variant?: 'horizontal' | 'vertical'
  light?: boolean
  className?: string
  'aria-label'?: string
}

export function TimelineSection({
  steps,
  kicker,
  title,
  intro,
  variant = 'horizontal',
  light = false,
  className = '',
  'aria-label': ariaLabel = 'Timeline',
}: TimelineSectionProps) {
  const showHeader = Boolean(kicker || title || intro)

  return (
    <section className={className} aria-label={ariaLabel}>
      {showHeader ? (
        <SectionHeader kicker={kicker} title={title ?? ''} intro={intro} light={light} className="mb-12" />
      ) : null}

      {variant === 'vertical' ? (
        <ol className="relative space-y-8 border-s border-brand-whisper-border dark:border-white/10 ps-6 list-none m-0 p-0">
          {steps.map((step, index) => (
            <li key={`${step.step}-${index}`} className="relative">
              <span
                className={[
                  'absolute -start-[1.6rem] top-1 flex h-8 w-8 items-center justify-center rounded-xl text-[13px] font-bold',
                  light
                    ? 'bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow'
                    : 'bg-brand-navy/[0.06] dark:bg-white/10 text-brand-navy dark:text-brand-yellow border border-brand-whisper-border dark:border-white/10',
                ].join(' ')}
                aria-hidden="true"
              >
                {step.step}
              </span>
              <h3
                className={[
                  'text-[16px] font-semibold mb-2',
                  light ? 'text-white' : 'text-brand-navy dark:text-brand-off-white',
                ].join(' ')}
              >
                {step.title}
              </h3>
              {step.description ? (
                <p
                  className={[
                    'text-[14px] leading-relaxed',
                    light ? 'text-white/55' : 'text-brand-secondary dark:text-brand-text-muted',
                  ].join(' ')}
                >
                  {step.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none m-0 p-0">
          {steps.map((step, index) => (
            <li key={`${step.step}-${index}`} className="relative">
              {index < steps.length - 1 ? (
                <div
                  className="hidden lg:block absolute top-5 start-full w-full h-px bg-white/[0.08] dark:bg-white/[0.08] -translate-y-px z-0"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative z-10">
                <div
                  className={[
                    'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[14px] mb-4',
                    light
                      ? 'bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow'
                      : 'bg-brand-navy/[0.06] dark:bg-white/10 text-brand-navy dark:text-brand-yellow border border-brand-whisper-border dark:border-white/10',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {step.step}
                </div>
                <h3
                  className={[
                    'text-[16px] font-semibold mb-2',
                    light ? 'text-white' : 'text-brand-navy dark:text-brand-off-white',
                  ].join(' ')}
                >
                  {step.title}
                </h3>
                {step.description ? (
                  <p
                    className={[
                      'text-[14px] leading-relaxed',
                      light ? 'text-white/55' : 'text-brand-secondary dark:text-brand-text-muted',
                    ].join(' ')}
                  >
                    {step.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
