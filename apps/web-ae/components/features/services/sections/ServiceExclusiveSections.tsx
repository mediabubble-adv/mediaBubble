'use client'

import { Calendar, Layers, Megaphone, Palette, Rocket, Server } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import {
  SectionHeader,
  BentoGrid,
  BentoItem,
  TimelineSection,
  TabbedShowcase,
  ComparisonTable,
  MetricStrip,
} from '@mediabubble/design-system'
import type {
  BeforeAfterData,
  BudgetFrameworkData,
  ChannelMatrixData,
  ContentCalendarData,
  DistributionMapData,
  EditorialPillarsData,
  EventTimelineData,
  IdentityDeliverablesData,
  LaunchChecklistData,
  PerformanceMetricsData,
  PlatformBadgesData,
  PlatformShowcaseData,
  TechStackData,
  VenueShowcaseData,
} from '@/lib/content/services/types'

export function PlatformBadgesSection({ data }: { data: PlatformBadgesData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Ad platforms">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
          {data.platforms.map((platform, i) => (
            <li
              key={platform.name}
              data-reveal
              data-reveal-delay={String(i * 60)}
              className="rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-surface p-5"
            >
              <p className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">{platform.name}</p>
              <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed m-0">
                {platform.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function ChannelMatrixSection({ data }: { data: ChannelMatrixData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="Channel matrix">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div data-reveal>
          <ComparisonTable columns={data.columns} rows={data.rows} highlightColumn={0} aria-label="PPC channel comparison" />
        </div>
      </Container>
    </section>
  )
}

export function BudgetFrameworkSection({ data }: { data: BudgetFrameworkData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-navy" aria-label="Budget framework">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} light className="mb-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.tiers.map((tier, i) => (
            <div
              key={tier.label}
              data-reveal
              data-reveal-delay={String(i * 80)}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-[12px] font-bold uppercase tracking-wide text-brand-yellow mb-2">{tier.label}</p>
              <p className="text-[22px] font-display font-bold text-white mb-3">{tier.spend}</p>
              <p className="text-[14px] text-white/70 leading-relaxed m-0">{tier.focus}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function ContentCalendarSection({ data }: { data: ContentCalendarData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Content calendar">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div className="space-y-6">
          {data.weeks.map((week, i) => (
            <div
              key={week.label}
              data-reveal
              data-reveal-delay={String(i * 60)}
              className="rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-surface p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={18} className="text-brand-blue shrink-0" aria-hidden="true" />
                <h3 className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white m-0">{week.label}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {week.themes.map((theme) => (
                  <li
                    key={theme}
                    className="rounded-full bg-brand-navy/[0.06] dark:bg-white/10 px-3 py-1 text-[13px] text-brand-secondary dark:text-brand-text-muted"
                  >
                    {theme}
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

export function PlatformShowcaseSection({ data }: { data: PlatformShowcaseData }) {
  const { dir } = useI18n()

  const tabs = data.platforms.map((platform) => ({
    id: platform.id,
    label: platform.label,
    content: (
      <ul className="space-y-3 list-none p-0 m-0">
        {platform.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
            <span className="text-brand-yellow font-bold mt-0.5" aria-hidden="true">
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    ),
  }))

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="Platform showcase">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div data-reveal>
          <TabbedShowcase tabs={tabs} aria-label="Social platform showcase" />
        </div>
      </Container>
    </section>
  )
}

export function BeforeAfterSection({ data }: { data: BeforeAfterData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Before and after">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.pairs.map((pair, i) => (
            <div key={pair.label} data-reveal data-reveal-delay={String(i * 80)} className="rounded-2xl border border-brand-whisper-border dark:border-white/10 overflow-hidden">
              <p className="text-[13px] font-bold uppercase tracking-wide text-brand-blue px-5 pt-5 mb-3">{pair.label}</p>
              <div className="grid grid-cols-2 gap-px bg-brand-whisper-border dark:bg-white/10">
                <div className="bg-brand-surface p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-secondary dark:text-brand-text-muted mb-2">Before</p>
                  <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed m-0">{pair.before}</p>
                </div>
                <div className="bg-brand-yellow/10 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-navy mb-2">After</p>
                  <p className="text-[14px] text-brand-navy dark:text-brand-off-white leading-relaxed m-0">{pair.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function IdentityDeliverablesSection({ data }: { data: IdentityDeliverablesData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="Identity deliverables">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <BentoGrid>
          {data.items.map((item, i) => (
            <BentoItem key={item.title} colSpan={item.colSpan ?? 1}>
              <div data-reveal data-reveal-delay={String(i * 80)} className="h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center mb-4 text-brand-yellow">
                  <Palette size={18} aria-hidden="true" />
                </div>
                <h3 className="text-[16px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">{item.title}</h3>
                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed flex-1 m-0">
                  {item.description}
                </p>
              </div>
            </BentoItem>
          ))}
        </BentoGrid>
      </Container>
    </section>
  )
}

export function TechStackSection({ data }: { data: TechStackData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Tech stack">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.tools.map((tool, i) => (
            <div
              key={tool.name}
              data-reveal
              data-reveal-delay={String(i * 60)}
              className="rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-surface p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <Server size={18} className="text-brand-blue shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white m-0">{tool.name}</p>
                  <p className="text-[12px] text-brand-secondary dark:text-brand-text-muted m-0">{tool.category}</p>
                </div>
              </div>
              <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed m-0">{tool.why}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function PerformanceMetricsSection({ data }: { data: PerformanceMetricsData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-navy" aria-label="Performance metrics">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} light className="mb-10" />
        </div>
        <div data-reveal>
          <MetricStrip
            variant="hero"
            columns={3}
            items={data.metrics.map((m) => ({ value: m.value, label: m.label }))}
            aria-label="Web performance targets"
          />
        </div>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
          {data.metrics.map((metric, i) => (
            <li
              key={metric.label}
              data-reveal
              data-reveal-delay={String(i * 60)}
              className="text-[13px] text-white/60"
            >
              <span className="text-white/90 font-medium">{metric.label}:</span> {metric.target}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function LaunchChecklistSection({ data }: { data: LaunchChecklistData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="Launch checklist">
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
              <div className="flex items-center gap-2 mb-4">
                <Rocket size={18} className="text-brand-yellow shrink-0" aria-hidden="true" />
                <h3 className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white m-0">{group.title}</h3>
              </div>
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

export function EditorialPillarsSection({ data }: { data: EditorialPillarsData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Editorial pillars">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              data-reveal
              data-reveal-delay={String(i * 80)}
              className="rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-surface p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers size={18} className="text-brand-blue shrink-0" aria-hidden="true" />
                <h3 className="text-[16px] font-semibold text-brand-navy dark:text-brand-off-white m-0">{pillar.title}</h3>
              </div>
              <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-4">{pillar.description}</p>
              <ul className="space-y-2 m-0 p-0 list-none">
                {pillar.examples.map((ex) => (
                  <li key={ex} className="text-[13px] text-brand-secondary dark:text-brand-text-muted">
                    {ex}
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

export function DistributionMapSection({ data }: { data: DistributionMapData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="Distribution map">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <div data-reveal className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[520px] border-collapse text-start" aria-label="Content distribution channels">
            <thead>
              <tr>
                <th scope="col" className="text-start text-[12px] font-bold uppercase tracking-wide text-brand-secondary dark:text-brand-text-muted pb-4 pe-4">
                  Channel
                </th>
                <th scope="col" className="text-start text-[12px] font-bold uppercase tracking-wide text-brand-secondary dark:text-brand-text-muted pb-4 pe-4">
                  Format
                </th>
                <th scope="col" className="text-start text-[12px] font-bold uppercase tracking-wide text-brand-secondary dark:text-brand-text-muted pb-4">
                  Cadence
                </th>
              </tr>
            </thead>
            <tbody>
              {data.channels.map((row) => (
                <tr key={row.channel} className="border-t border-brand-whisper-border dark:border-white/10">
                  <td className="py-4 pe-4 text-[14px] font-medium text-brand-navy dark:text-brand-off-white">{row.channel}</td>
                  <td className="py-4 pe-4 text-[14px] text-brand-secondary dark:text-brand-text-muted">{row.format}</td>
                  <td className="py-4 text-[14px] text-brand-secondary dark:text-brand-text-muted">{row.cadence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}

export function EventTimelineSection({ data }: { data: EventTimelineData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-navy" aria-label="Event timeline">
      <Container>
        <div data-reveal>
          <TimelineSection
            kicker={data.kicker}
            title={data.title}
            intro={data.intro}
            steps={data.phases}
            variant="vertical"
            light
            aria-label="Event production timeline"
          />
        </div>
      </Container>
    </section>
  )
}

export function VenueShowcaseSection({ data }: { data: VenueShowcaseData }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Venue showcase">
      <Container>
        <div data-reveal>
          <SectionHeader kicker={data.kicker} title={data.title} intro={data.intro} className="mb-10" />
        </div>
        <BentoGrid>
          {data.venues.map((venue, i) => (
            <BentoItem key={venue.title}>
              <div data-reveal data-reveal-delay={String(i * 80)} className="h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-4 text-brand-blue">
                  <Megaphone size={18} aria-hidden="true" />
                </div>
                <h3 className="text-[16px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">{venue.title}</h3>
                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed flex-1 m-0">
                  {venue.description}
                </p>
                {venue.capacity ? (
                  <p className="text-[13px] font-bold text-brand-yellow mt-4 m-0">{venue.capacity}</p>
                ) : null}
              </div>
            </BentoItem>
          ))}
        </BentoGrid>
      </Container>
    </section>
  )
}
