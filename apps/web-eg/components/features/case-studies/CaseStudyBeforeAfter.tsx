'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import type { BeforeAfterPair } from '@/lib/data/case-studies'
import { Container } from '@/components/layout/Container'

interface Props {
  pair: BeforeAfterPair
  accent: string
}

export function CaseStudyBeforeAfter({ pair, accent }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPosition((x / rect.width) * 100)
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }

  function onPointerUp(e: React.PointerEvent) {
    dragging.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <section aria-label="Before and after comparison" className="py-10 sm:py-14 bg-white border-b border-brand-whisper-border">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-[22px] font-bold text-brand-navy mb-2">
            {pair.label ?? 'Before & After'}
          </h2>
          <p className="text-[14px] text-brand-secondary mb-6">
            Drag the slider to compare the starting point with the outcome.
          </p>

          <div
            ref={containerRef}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden select-none touch-none bg-brand-navy/5"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <Image
              src={pair.after.src}
              alt={pair.after.alt}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={pair.before.src}
                alt={pair.before.alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-10"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 z-20 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize"
              style={{ left: `${position}%`, borderColor: accent, borderWidth: 2 }}
              aria-hidden="true"
            >
              <span className="text-brand-navy text-xs font-bold">↔</span>
            </div>

            <span className="absolute top-3 start-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/50 text-white">
              Before
            </span>
            <span className="absolute top-3 end-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/50 text-white">
              After
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
