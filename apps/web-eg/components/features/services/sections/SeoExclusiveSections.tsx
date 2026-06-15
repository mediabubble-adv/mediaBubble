'use client'

import { MapPin } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader, BentoGrid, BentoItem, MetricStrip } from '@mediabubble/design-system'
import type { AuditChecklistData, LocalPackData, RankingTimelineData } from '@/lib/content/services/types'

const TRAJECTORY_HEIGHTS = [18, 30, 45, 58, 76, 100] as const

function TrajectoryChart({ compact = false }: { compact?: boolean }) {
  return (
    <figure aria-labelledby="ranking-trajectory-chart-label">
      <figcaption
        id="ranking-trajectory-chart-label"
        className="mb-3 text-xs font-bold uppercase tracking-wide text-white/45"
      >
        Typical visibility trend
      </figcaption>
      <div
        className={['flex items-end gap-1.5 sm:gap-2', compact ? 'h-20' : 'h-24 sm:h-28'].join(' ')}
        role="img"
        aria-label="Visibility increases from month 1 through month 6"
      >
        {TRAJECTORY_HEIGHTS.map((height, index) => (
          <div key={index} className="flex h-full flex-1 flex-col justify-end">
            <div
              className="w-full rounded-t-sm bg-brand-yellow"
              style={{ height: `${height}%`, opacity: 0.22 + (height / 100) * 0.78 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs font-medium text-white/40">
        <span>Month 1</span>
        <span>Month 6</span>
      </div>
    </figure>
  )
}

export function RankingTimelineSection({ data }: { data: RankingTimelineData }) {
  const { dir } = useI18n()
  const highlights = data.highlights ?? []
  const lastIndex = data.milestones.length - 1

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-brand-navy py-14 sm:py-20 lg:py-28"
      aria-labelledby="ranking-trajectory-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,193,7,0.07),transparent)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div data-reveal>
              <SectionHeader
                kicker={data.kicker}
                title={data.title}
                intro={data.intro}
                light
                className="max-w-none"
                id="ranking-trajectory-heading"
              />
            </div>
            {highlights.length > 0 ? (
              <div data-reveal data-reveal-delay="80" className="mt-8">
                <MetricStrip items={highlights} variant="dark-bar" aria-label="SEO timeline phases" />
              </div>
            ) : null}
            <div data-reveal data-reveal-delay="120" className="mt-8 lg:mt-10">
              <TrajectoryChart compact={highlights.length === 0} />
            </div>
          </div>

          <ol className="relative m-0 list-none space-y-3 p-0 sm:space-y-4 lg:col-span-7" aria-label="SEO ranking milestones">
            <div
              className="pointer-events-none absolute bottom-4 start-4 top-4 hidden w-px bg-white/10 lg:block"
              aria-hidden="true"
            />
            {data.milestones.map((milestone, index) => {
              const isFinal = index === lastIndex

              return (
                <li key={milestone.title} data-reveal data-reveal-delay={String(60 + index * 50)}>
                  <article
                    className={[
                      'rounded-2xl border p-5 transition-[border-color,background-color] duration-200 sm:p-6',
                      isFinal
                        ? 'border-brand-yellow/40 bg-brand-yellow/[0.07]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/18',
                    ].join(' ')}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={[
                          'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold tabular-nums',
                          isFinal
                            ? 'border border-brand-yellow/45 bg-brand-yellow/15 text-brand-yellow'
                            : 'border border-white/10 bg-brand-navy text-white/75',
                        ].join(' ')}
                        aria-hidden="true"
                      >
                        {milestone.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        {milestone.signal ? (
                          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-brand-yellow">
                            {milestone.signal}
                          </p>
                        ) : null}
                        <h3 className="mb-2 text-base font-semibold text-white">{milestone.title}</h3>
                        <p className="text-sm leading-relaxed text-white/60">{milestone.description}</p>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}

export function LocalPackSection({ data }: { data: LocalPackData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Local map pack">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <BentoGrid>
          {data.spots.map((spot, i) => (
            <BentoItem key={spot.title} className="flex flex-col">
              <div data-reveal data-reveal-delay={String(i * 80)}>
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center mb-4 text-brand-yellow">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <h3 className="text-[16px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">{spot.title}</h3>
                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed flex-1">
                  {spot.description}
                </p>
                {spot.stat ? (
                  <p className="text-[13px] font-bold text-brand-yellow mt-4">{spot.stat}</p>
                ) : null}
              </div>
            </BentoItem>
          ))}
        </BentoGrid>
      </Container>
    </section>
  )
}

export function AuditChecklistSection({ data }: { data: AuditChecklistData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="SEO audit checklist">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.groups.map((group, i) => (
            <div
              key={group.title}
              data-reveal
              data-reveal-delay={String(i * 80)}
              className="rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-canvas p-6"
            >
              <h3 className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white mb-4">{group.title}</h3>
              <ul className="space-y-3 m-0 p-0 list-none">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
                    <span className="text-brand-yellow font-bold mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
