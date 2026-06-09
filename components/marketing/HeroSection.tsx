'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Container } from './Container'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  image?: string
  backgroundImage?: string
  ctaButtons: {
    primary: { label: string; href: string; icon?: string }
    secondary?: { label: string; href: string }
  }
  proofPoints?: { icon?: string; text: string }[]
  stats?: { number: string; label: string }[]
  layout?: 'default' | 'image-left' | 'image-right'
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection({
  title,
  subtitle,
  description,
  image,
  backgroundImage,
  ctaButtons,
  proofPoints,
  stats,
  layout = 'default',
}: HeroSectionProps) {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Fade-in on first intersection
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Subtle parallax on the image element
  useEffect(() => {
    const el = imageRef.current
    if (!el || !image) return
    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
      el.style.transform = `translateY(${progress * 24}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [image])

  const isSplit = !!image
  const isImageLeft = layout === 'image-left'
  // Center text on mobile when there is no image (default single-column layout)
  const centerMobile = !isSplit

  // ─── Text block ─────────────────────────────────────────────────────────────

  const textBlock = (
    <div
      className={`flex flex-col justify-center transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${centerMobile ? 'items-center sm:items-start' : ''}`}
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

      {/* CTA buttons */}
      <div className={`flex flex-col sm:flex-row flex-wrap gap-3 mb-8 ${centerMobile ? 'items-center sm:items-start' : ''}`}>
        <Link
          href={ctaButtons.primary.href}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150 shadow-md shadow-brand-yellow/25 group"
        >
          {ctaButtons.primary.label}
          <ArrowRight
            size={16}
            className="transition-transform duration-150 group-hover:translate-x-[2px]"
          />
        </Link>
        {ctaButtons.secondary && (
          <Link
            href={ctaButtons.secondary.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border-2 border-white/30 text-white hover:border-white hover:bg-white/[0.08] active:scale-[0.97] transition-all duration-150"
          >
            {ctaButtons.secondary.label}
          </Link>
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

  const imageBlock = image ? (
    <div className="relative">
      <div
        ref={imageRef}
        className={`relative transition-all duration-1000 ease-out delay-200 will-change-transform ${
          visible
            ? 'opacity-100 scale-100 translate-x-0'
            : `opacity-0 scale-[0.96] ${isImageLeft ? '-translate-x-6' : 'translate-x-6'}`
        }`}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[4/3]">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="eager"
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

  const bgClassName = backgroundImage ? '' : 'bg-brand-navy'
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : undefined

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className={`relative overflow-hidden ${bgClassName}`}
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
      <Container className="relative z-10 py-10 sm:py-16 lg:py-20">
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
          <div className="max-w-2xl mx-auto sm:mx-0">
            {textBlock}
          </div>
        )}
      </Container>
    </section>
  )
}
