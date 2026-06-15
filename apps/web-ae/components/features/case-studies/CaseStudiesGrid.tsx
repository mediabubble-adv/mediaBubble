'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@mediabubble/design-system'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { CASE_STUDIES } from '@/lib/data/case-studies'

const ALL_TAG = 'All'

export function CaseStudiesGrid() {
  const { t, dir } = useI18n()
  const [activeTag, setActiveTag] = useState(ALL_TAG)

  const tags = useMemo(() => {
    const unique = [...new Set(CASE_STUDIES.map(cs => cs.tag))]
    return [ALL_TAG, ...unique]
  }, [])

  const visible = useMemo(
    () => (activeTag === ALL_TAG ? CASE_STUDIES : CASE_STUDIES.filter(cs => cs.tag === activeTag)),
    [activeTag],
  )

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-canvas" aria-label="Case studies">
      <Container>
        <SectionHeader
          className="mb-8"
          kicker={t('portfolio.heading.kicker', 'Our Work')}
          title={t('portfolio.heading.title', "Results We're Proud Of")}
          intro={t(
            'portfolio.heading.subtitle',
            'Every case study started with a clear business problem. Here is what we did and what changed.',
          )}
        />

        <div
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label={t('portfolio.filters.label', 'Filter by category')}
        >
          {tags.map(tag => {
            const selected = activeTag === tag
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTag(tag)}
                className={[
                  'px-4 py-2 rounded-full text-[13px] font-medium transition-colors',
                  selected
                    ? 'bg-brand-navy text-white dark:bg-brand-yellow dark:text-brand-navy'
                    : 'bg-white dark:bg-brand-navy/40 text-brand-secondary border border-brand-whisper-border dark:border-brand-light-border hover:text-brand-navy dark:hover:text-brand-off-white',
                ].join(' ')}
              >
                {tag === ALL_TAG ? t('portfolio.filters.all', 'All projects') : tag}
              </button>
            )
          })}
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-brand-secondary py-12">
            {t('portfolio.empty', 'No case studies in this category yet.')}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(cs => (
              <article
                key={cs.id}
                className="group bg-white dark:bg-brand-navy/40 rounded-2xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                {cs.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={cs.heroImage}
                      alt={cs.heroImageAlt ?? cs.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute bottom-3 start-3 text-[11px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md bg-white/90 dark:bg-brand-navy/90"
                      style={{ color: cs.accent }}
                    >
                      {cs.tag}
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  {!cs.heroImage && (
                    <span
                      className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                      style={{ color: cs.accent }}
                    >
                      {cs.tag}
                    </span>
                  )}

                  <h3 className="font-display text-[16px] font-bold text-brand-navy dark:text-brand-off-white leading-snug mb-3">
                    {cs.title}
                  </h3>

                  <p className="text-[13px] text-brand-secondary dark:text-brand-muted-steel leading-relaxed mb-5 flex-1">
                    {cs.desc}
                  </p>

                  <div
                    className="rounded-xl px-4 py-3 mb-5"
                    style={{ backgroundColor: cs.bg }}
                  >
                    <p className="text-[12px] font-semibold leading-relaxed" style={{ color: cs.accent }}>
                      ↗ {cs.metric}
                    </p>
                  </div>

                  <Link
                    href={`/case-studies/${cs.id}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-150 group/link"
                    style={{ color: cs.accent }}
                  >
                    {t('portfolio.readMore', 'Read case study')}
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-150 group-hover/link:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
