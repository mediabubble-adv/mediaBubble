'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { NAV_ITEMS, NAV_FOOTER } from './nav'

const ALL = [...NAV_ITEMS, ...NAV_FOOTER]

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL
    return ALL.filter((item) => item.label.toLowerCase().includes(q))
  }, [query])

  // Reset and focus whenever the palette opens.
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // Focus after the element is painted.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Keep the active index in range as results shrink.
  useEffect(() => {
    setActive((i) => Math.min(i, Math.max(0, results.length - 1)))
  }, [results.length])

  if (!open) return null

  function go(href: string) {
    onClose()
    router.push(href)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') return onClose()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[active]
      if (item) go(item.href)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-brand-whisper-border bg-brand-surface shadow-2xl shadow-black/40"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-brand-whisper-border px-4">
          <Search size={16} className="shrink-0 text-brand-text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages…"
            className="w-full bg-transparent py-3.5 text-[14px] text-brand-text placeholder:text-brand-text-muted focus:outline-none"
          />
          <kbd className="rounded border border-brand-whisper-border px-1.5 py-0.5 text-[10px] font-semibold text-brand-text-muted">
            ESC
          </kbd>
        </div>

        <ul className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-[13px] text-brand-text-muted">
              No matches for “{query}”.
            </li>
          ) : (
            results.map((item, i) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item.href)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors ${
                      i === active
                        ? 'bg-brand-blue/[0.16] text-brand-text'
                        : 'text-brand-text-muted hover:bg-brand-canvas'
                    }`}
                  >
                    <Icon size={16} className="shrink-0 text-brand-blue" />
                    <span className="flex-1 text-brand-text">{item.label}</span>
                    {item.status ? (
                      <span className="text-[11px] text-brand-text-muted">{item.status}</span>
                    ) : null}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}
