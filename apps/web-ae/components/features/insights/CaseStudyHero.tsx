'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { Container } from '@/components/layout/Container'

interface Props {
  cs: CaseStudy
}

export function CaseStudyHero({ cs }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const hasImage = Boolean(cs.heroImage)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg || !hasImage) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const offset = -rect.top * 0.38
      bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.14)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasImage])

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden min-h-[40vh] pt-24 pb-14 sm:pt-32 sm:pb-16 border-b border-brand-whisper-border ${
        hasImage ? '' : 'bg-brand-canvas'
      }`}
    >
      {hasImage && cs.heroImage && (
        <>
          <div
            ref={bgRef}
            className="absolute -inset-y-[18%] inset-x-0 -z-20 will-change-transform"
            aria-hidden="true"
          >
            <Image
              src={cs.heroImage}
              alt={cs.heroImageAlt ?? cs.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Dark blue scrim layers — keeps hero copy readable on busy photos */}
          <div className="absolute inset-0 -z-10 bg-[#072A6B]/70" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#072A6B]/95 via-[#072A6B]/82 to-[#072A6B]/40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-[#072A6B]/50 via-transparent to-brand-navy/90"
            aria-hidden="true"
          />
        </>
      )}

      <Container className="relative z-10">
        <Link
          href="/case-studies"
          className={`inline-flex items-center gap-1.5 text-[13px] font-medium mb-8 transition-colors ${
            hasImage
              ? 'text-white/75 hover:text-white'
              : 'text-brand-blue hover:text-brand-navy'
          }`}
        >
          <ArrowLeft size={14} />
          All case studies
        </Link>

        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
          style={{ color: hasImage ? '#FFC107' : cs.accent }}
        >
          {cs.service}
        </span>

        <h1
          className={`font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight mb-6 max-w-3xl ${
            hasImage
              ? 'text-white [text-shadow:0_2px_28px_rgba(7,42,107,0.85)]'
              : 'text-brand-navy'
          }`}
        >
          {cs.title}
        </h1>

        <div
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3"
          style={{
            backgroundColor: hasImage ? 'rgba(255,255,255,0.12)' : cs.bg,
            backdropFilter: hasImage ? 'blur(8px)' : undefined,
          }}
        >
          <span className="text-[18px]" aria-hidden="true">
            ↗
          </span>
          <span
            className="text-[15px] font-semibold"
            style={{ color: hasImage ? '#FFC107' : cs.accent }}
          >
            {cs.metric}
          </span>
        </div>
      </Container>
    </div>
  )
}
