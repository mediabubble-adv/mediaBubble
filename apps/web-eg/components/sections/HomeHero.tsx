'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { getButtonClasses } from '@mediabubble/design-system'
import { Container } from '@/components/layout/Container'
import { useI18n } from '@/lib/i18n/provider'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HomeHeroProps {
  /** Eyebrow / kicker line (kept per brand cadence). */
  subtitle: string
  title: string
  description: string
  backgroundImage: string
  primaryCta: { label: string; href: string; onClick?: () => void }
  secondaryCta: { label: string; href: string }
  /** Quiet tertiary link to the full services index. */
  servicesLink?: { label: string; href: string }
  proofPoints: { text: string }[]
}

// ─── Component ──────────────────────────────────────────────────────────────────
//
// Purpose-built homepage hero. The shared HeroSection still serves the other five
// pages; this one carries the orchestrated first-load choreography and a
// directional navy scrim that lets the photograph read as atmosphere rather than
// sitting under a flat box overlay.

export function HomeHero({
  subtitle,
  title,
  description,
  backgroundImage,
  primaryCta,
  secondaryCta,
  servicesLink,
  proofPoints,
}: HomeHeroProps) {
  const { dir } = useI18n()

  function scrollToContent(el: HTMLElement) {
    const section = el.closest('section')
    const next = section?.nextElementSibling as HTMLElement | null
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section
      dir={dir}
      aria-label="Hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-brand-navy"
    >
      {/* Background photograph */}
      <Image
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Directional scrim: dark at the start/bottom for legibility, open toward the
          top-end corner so the photo breathes. Two layers + a nav-legibility cap. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/25 rtl:bg-gradient-to-l"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/35 to-brand-navy/55"
      />

      {/* Content */}
      <Container className="relative z-10 flex flex-1 items-center pt-28 pb-24 sm:pt-32 lg:pb-28">
        <div className="max-w-2xl">
          {/* Kicker */}
          <p
            className="hero-load mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-yellow"
            style={{ ['--hero-delay' as string]: '120ms' }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-brand-yellow/60" />
            {subtitle}
          </p>

          {/* Headline */}
          <h1
            className="hero-load-headline font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance]"
            style={{ ['--hero-delay' as string]: '220ms' }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="hero-load mt-6 max-w-[46ch] text-[17px] leading-relaxed text-white/85 [text-wrap:pretty]"
            style={{ ['--hero-delay' as string]: '420ms' }}
          >
            {description}
          </p>

          {/* Proof points */}
          {proofPoints.length > 0 && (
            <ul
              className="hero-load mt-7 flex flex-col gap-x-6 gap-y-2.5 sm:flex-row sm:flex-wrap"
              style={{ ['--hero-delay' as string]: '540ms' }}
              aria-label="Key highlights"
            >
              {proofPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15"
                  >
                    <Check size={12} strokeWidth={2.5} className="text-brand-yellow" />
                  </span>
                  <span className="text-[14px] leading-snug text-white/80">{point.text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTAs */}
          <div
            className="hero-load mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            style={{ ['--hero-delay' as string]: '660ms' }}
          >
            <Link
              href={primaryCta.href}
              onClick={() => primaryCta.onClick?.()}
              className={getButtonClasses(
                'primary',
                'md',
                'group h-[52px] shrink-0 rounded-xl px-6 text-[15px] shadow-md shadow-brand-yellow/25',
              )}
            >
              {primaryCta.label}
              <ArrowRight size={16} className="transition-transform duration-150 rtl-arrow-translate" />
            </Link>
            <Link
              href={secondaryCta.href}
              className={getButtonClasses(
                'hero-outline',
                'md',
                'h-[52px] shrink-0 rounded-xl px-6 text-[15px]',
              )}
            >
              {secondaryCta.label}
            </Link>
            {servicesLink && (
              <Link
                href={servicesLink.href}
                className="group inline-flex h-[52px] shrink-0 items-center gap-1.5 px-2 text-[14px] font-semibold text-white/70 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/60 sm:ms-1"
              >
                {servicesLink.label}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-150 group-hover:translate-x-[3px] rtl-arrow-translate"
                />
              </Link>
            )}
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={(e) => scrollToContent(e.currentTarget)}
        aria-label="Scroll to content"
        className="hero-load group absolute bottom-8 start-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/45 transition-colors duration-300 hover:text-white rtl:translate-x-1/2"
        style={{ ['--hero-delay' as string]: '900ms' }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-70 transition-opacity group-hover:opacity-100">
          Scroll
        </span>
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 pt-2 transition-colors duration-300 group-hover:border-white/60">
          <span className="h-2 w-1 rounded-full bg-white/70 animate-scroll-ping group-hover:bg-white" />
        </span>
      </button>
    </section>
  )
}
