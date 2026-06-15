'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/data/insights-utils'

interface Props {
  items: TocItem[]
}

export function InsightsTableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = items
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-brand-whisper-border bg-brand-canvas p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-secondary/70 mb-3">
        On this page
      </p>
      <ol className="space-y-2">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-[13px] leading-snug transition-colors ${
                activeId === item.id
                  ? 'font-semibold text-brand-blue'
                  : 'text-brand-secondary hover:text-brand-navy'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
