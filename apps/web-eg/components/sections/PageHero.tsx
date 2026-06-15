'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

export interface PageHeroBreadcrumb {
  label: string
  href?: string
}

export interface PageHeroCta {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export interface PageHeroStat {
  value: string
  label: string
}

export interface PageHeroProps {
  breadcrumbs: PageHeroBreadcrumb[]
  kicker: string
  title: string
  subtitle: string
  ctas?: PageHeroCta[]
  proofPoints?: string[]
  stats?: PageHeroStat[]
}

export function PageHero({
  breadcrumbs,
  kicker,
  title,
  subtitle,
  ctas,
  proofPoints,
  stats,
}: PageHeroProps) {
  const { dir } = useI18n()

  return (
    <section
      dir={dir}
      className="relative bg-brand-navy overflow-hidden min-h-[40vh] pt-24 pb-14 sm:pt-32 sm:pb-16"
      aria-label="Hero"
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/[0.04] rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/[0.06] rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/40 mb-8">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  size={12}
                  className={`text-white/25 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              )}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white/70 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/60">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="max-w-3xl">
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-yellow mb-4">
            {kicker}
          </p>
          <h1 className="text-[32px] sm:text-[44px] lg:text-[54px] font-bold text-white leading-tight mb-5">
            {title}
          </h1>
          <p className="text-[17px] sm:text-[19px] text-white/65 leading-relaxed max-w-2xl mb-8">
            {subtitle}
          </p>

          {ctas && ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {ctas.map((cta) =>
                cta.variant === 'secondary' ? (
                  <Link
                    key={cta.href + cta.label}
                    href={cta.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/20 text-white text-[15px] font-semibold hover:border-white/40 hover:bg-white/[0.04] transition-all duration-150"
                  >
                    {cta.label}
                  </Link>
                ) : (
                  <Link
                    key={cta.href + cta.label}
                    href={cta.href}
                    data-ripple=""
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-yellow text-brand-navy text-[15px] font-semibold hover:bg-[#FFB300] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150 shadow-lg shadow-brand-yellow/30"
                  >
                    {cta.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ),
              )}
            </div>
          )}

          {proofPoints && proofPoints.length > 0 && (
            <ul className="space-y-2 mb-8 text-[14px] text-white/55">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="text-brand-yellow mt-0.5" aria-hidden="true">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] max-w-lg">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[28px] sm:text-[34px] font-bold text-brand-yellow leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[12px] text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
