'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { Container } from '@/components/layout/Container'

interface Props {
  cs: CaseStudy
}

export function PortfolioGallery({ cs }: Props) {
  const images =
    cs.gallery && cs.gallery.length > 0
      ? cs.gallery
      : cs.heroImage
        ? [{ src: cs.heroImage, alt: cs.heroImageAlt ?? cs.title }]
        : []

  const [index, setIndex] = useState(0)

  if (images.length === 0) return null

  const hasMultiple = images.length > 1
  const current = images[index] ?? images[0]

  function go(delta: number) {
    setIndex(i => (i + delta + images.length) % images.length)
  }

  return (
    <section aria-label="Project gallery" className="py-10 sm:py-14 bg-brand-canvas border-b border-brand-whisper-border">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-brand-navy/5">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-brand-navy/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} className="text-brand-navy dark:text-brand-off-white" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-brand-navy/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} className="text-brand-navy dark:text-brand-off-white" />
                </button>
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Image ${i + 1}`}
                      aria-current={i === index ? 'true' : undefined}
                      className={[
                        'w-2 h-2 rounded-full transition-all',
                        i === index ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80',
                      ].join(' ')}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {current.caption && (
            <p className="mt-4 text-center text-[13px] text-brand-secondary leading-relaxed">
              {current.caption}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
