'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { getButtonClasses } from '@mediabubble/design-system'
import { Container } from '@/components/layout/Container'
import { useI18n } from '@/lib/i18n/provider'

// ─── Types ────────────────────────────────────────────────────────────────────

export const HERO_IMAGE_FALLBACK = '/assets/mediaBubble_main_artwork.svg'

export type HeroSize = 'full' | 'medium' | 'small' | 'compact'

const HERO_MIN_HEIGHT: Record<HeroSize, string> = {
  full:    'min-h-[100dvh]',   // homepage
  medium:  'min-h-[50vh]',     // about, portfolio, services
  small:   'min-h-[45vh]',     // blog
  compact: 'min-h-[40vh]',     // contact
}

export interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  image?: string
  /** Used when the primary image fails to load. Defaults to brand artwork SVG. */
  imageFallback?: string
  backgroundImage?: string
  ctaButtons: {
    primary: { label: string; href: string; icon?: string }
    secondary?: { label: string; href: string }
  }
  proofPoints?: { icon?: string; text: string }[]
  stats?: { number: string; label: string }[]
  layout?: 'default' | 'image-left' | 'image-right'
  showScrollIndicator?: boolean
  dropdownMenu?: { label: string; href: string }[]
  /** Controls the minimum viewport height of the hero section. Defaults to 'full' (100dvh). */
  size?: HeroSize
  onPrimaryCtaClick?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection({
  title,
  subtitle,
  description,
  image,
  imageFallback = HERO_IMAGE_FALLBACK,
  backgroundImage,
  ctaButtons,
  proofPoints,
  stats,
  layout = 'default',
  showScrollIndicator = true,
  dropdownMenu,
  size = 'full',
  onPrimaryCtaClick,
}: HeroSectionProps) {
  const { t } = useI18n()
  const [ddOpen, setDdOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState(image ?? '')
  const [imageHidden, setImageHidden] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ddTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setImageSrc(image ?? '')
    setImageHidden(false)
  }, [image])

  const displayImage = !imageHidden && imageSrc ? imageSrc : undefined

  // Subtle parallax on the image element
  useEffect(() => {
    const el = imageRef.current
    if (!el || !displayImage) return
    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
      el.style.transform = `translateY(${progress * 24}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [displayImage])

  const isSplit = !!displayImage
  const isImageLeft = layout === 'image-left'
  // Center text on mobile when there is no image (default single-column layout)
  const centerMobile = !isSplit

  // ─── Text block ─────────────────────────────────────────────────────────────

  const textBlock = (
    <div
      className={`flex flex-col justify-center ${centerMobile ? 'items-center sm:items-start' : ''}`}
    >
      {/* Subtitle / benefit line */}
      <p className={`text-2xl font-semibold text-brand-yellow mb-3 leading-snug ${centerMobile ? 'text-center sm:text-start' : ''}`}>
        {subtitle}
      </p>

      {/* Title */}
      <h1 className={`font-display text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight mb-5 ${centerMobile ? 'text-center sm:text-start' : ''}`}>
        {title}
      </h1>

      {/* Description */}
      <p className={`text-lg text-white/75 leading-relaxed mb-6 max-w-xl ${centerMobile ? 'text-center sm:text-start' : ''}`}>
        {description}
      </p>

      {/* Proof points */}
      {proofPoints && proofPoints.length > 0 && (
        <ul className="flex flex-col gap-2.5 mb-8" role="list" aria-label="Key highlights">
          {proofPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 shrink-0 mt-[2px]"
              >
                {point.icon ? (
                  <span className="text-[11px] text-brand-yellow leading-none select-none">
                    {point.icon}
                  </span>
                ) : (
                  <Check size={11} className="text-brand-yellow" strokeWidth={2.5} />
                )}
              </span>
              <span className="text-[15px] text-white/70 leading-snug">{point.text}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA buttons + dropdown */}
      <div
        className={`flex flex-col sm:flex-row sm:flex-nowrap sm:overflow-x-auto gap-3 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${centerMobile ? 'items-center sm:items-center sm:justify-start' : 'sm:items-center'}`}
      >
        <Link
          href={ctaButtons.primary.href}
          onClick={() => onPrimaryCtaClick?.()}
          className={getButtonClasses(
            'primary',
            'md',
            'h-[52px] shrink-0 px-6 text-[15px] rounded-xl shadow-md shadow-brand-yellow/25 group',
          )}
        >
          {ctaButtons.primary.label}
          <ArrowRight
            size={16}
            className="transition-transform duration-150 rtl-arrow-translate"
          />
        </Link>
        {ctaButtons.secondary && (
          <Link
            href={ctaButtons.secondary.href}
            className={getButtonClasses(
              'hero-outline',
              'md',
              'h-[52px] shrink-0 px-6 text-[15px] rounded-xl',
            )}
          >
            {ctaButtons.secondary.label}
          </Link>
        )}

        {/* Hero dropdown menu */}
        {dropdownMenu && dropdownMenu.length > 0 && (
          <div
            className="relative shrink-0"
            onMouseEnter={() => {
              if (ddTimeout.current) clearTimeout(ddTimeout.current)
              setDdOpen(true)
            }}
            onMouseLeave={() => {
              ddTimeout.current = setTimeout(() => setDdOpen(false), 150)
            }}
          >
            <button
              className="inline-flex h-[52px] w-full sm:w-auto shrink-0 items-center justify-center gap-2 whitespace-nowrap px-6 rounded-xl text-[15px] font-semibold border-2 border-white/20 bg-white/10 text-white hover:bg-white/[0.15] hover:border-white/40 active:scale-[0.97] transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50"
              aria-expanded={ddOpen}
              aria-haspopup="true"
            >
              {t('hero.dropdown.toggle', 'View services')}
              <ChevronDown size={16} className={`transition-transform duration-200 ${ddOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute top-full start-0 mt-2 py-2 rounded-xl bg-white shadow-xl shadow-black/15 border border-brand-whisper-border min-w-[200px] transition-all duration-200 z-20 ${
                ddOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {dropdownMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-[13px] text-brand-secondary hover:text-brand-navy hover:bg-black/[0.03] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div className={`flex flex-wrap gap-8 pt-6 border-t border-white/20 ${centerMobile ? 'justify-center sm:justify-start' : ''}`}>
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display text-[2rem] font-bold text-brand-yellow leading-none mb-1">
                {stat.number}
              </p>
              <p className="text-[12px] text-white/50 font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // ─── Image block ────────────────────────────────────────────────────────────

  const imageBlock = displayImage ? (
    <div className="relative">
      <div
        ref={imageRef}
        className="relative will-change-transform"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[4/3] bg-white/5">
          <Image
            src={displayImage}
            alt=""
            aria-hidden={true}
            fill
            priority
            unoptimized={displayImage.endsWith('.svg')}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 sm:object-cover sm:p-0"
            onError={() => {
              if (imageSrc && imageSrc !== imageFallback) {
                setImageSrc(imageFallback)
                return
              }
              setImageHidden(true)
            }}
          />
          {/* Subtle bottom vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/[0.06] to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* Decorative background glow behind image */}
      <div
        aria-hidden="true"
        className="absolute -z-10 w-4/5 h-4/5 rounded-full blur-[64px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #2196F3 0%, #1565C0 100%)',
          top: '8%',
          ...(isImageLeft ? { right: '-15%' } : { left: '-15%' }),
        }}
      />
    </div>
  ) : null

  // ─── Background ─────────────────────────────────────────────────────────────

  const bgClassName = backgroundImage
    ? ''
    : 'bg-gradient-to-br from-brand-navy via-[#0a3278] to-[#1565C0]'
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : undefined

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className={`relative overflow-hidden ${HERO_MIN_HEIGHT[size]} flex flex-col ${bgClassName}`}
      style={bgStyle}
    >
      {/* Background decorations */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute rounded-full opacity-[0.07]"
          style={{
            width: 560,
            height: 560,
            top: '-18%',
            right: '-6%',
            background: 'radial-gradient(circle, #2196F3, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.04]"
          style={{
            width: 400,
            height: 400,
            bottom: '-12%',
            left: '-4%',
            background: 'radial-gradient(circle, #072A6B, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex-1 flex items-center pt-20 pb-12 sm:pb-20 lg:pb-28">
        {isSplit ? (
          /* Two-column layout. On mobile: image first, then text. */
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Image — always first in DOM = always on top on mobile */}
            <div
              className={`w-full lg:w-1/2 ${
                isImageLeft ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              {imageBlock}
            </div>
            {/* Text — below image on mobile, position driven by order on desktop */}
            <div
              className={`w-full lg:w-1/2 ${
                isImageLeft ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              {textBlock}
            </div>
          </div>
        ) : (
          /* Single-column layout when no image */
          <div className="max-w-3xl mx-auto sm:mx-0">
            {textBlock}
          </div>
        )}
      </Container>

      {/* Scroll-down indicator */}
      {showScrollIndicator && (
        <button
          onClick={() => {
            const nextSection = sectionRef.current?.nextElementSibling as HTMLElement | null
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
              window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
            }
          }}
          className="absolute bottom-8 start-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer group"
          aria-label="Scroll down to content"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
          <div className="relative w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-white/60 flex items-start justify-center pt-2 transition-all duration-300">
            <div className="w-1 h-2 rounded-full bg-white/70 group-hover:bg-white animate-scroll-ping" />
          </div>
        </button>
      )}
    </section>
  )
}
