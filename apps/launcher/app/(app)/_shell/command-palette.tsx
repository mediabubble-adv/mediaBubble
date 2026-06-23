'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { NAV_ITEMS, NAV_FOOTER } from './nav'
import { Input } from '@/components/ui/input'

const ALL = [...NAV_ITEMS, ...NAV_FOOTER]

interface SearchItem {
  id: string
  label: string
  meta: string
  href: string
  type: string
}

interface SearchResults {
  tasks: SearchItem[]
  clients: SearchItem[]
  invoices: SearchItem[]
}

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
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [searching, setSearching] = useState(false)

  const navResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL
    return ALL.filter((item) => item.label.toLowerCase().includes(q))
  }, [query])

  // Debounced cross-entity search
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null)
      setSearching(false)
      return
    }
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        const json = await res.json()
        if (res.ok) setSearchResults(json.data)
        else setSearchResults({ tasks: [], clients: [], invoices: [] })
      } catch {
        setSearchResults({ tasks: [], clients: [], invoices: [] })
      } finally {
        setSearching(false)
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  // Reset and focus whenever the palette opens.
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setSearchResults(null)
      setSearching(false)
      // Focus after the element is painted.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Keep the active index in range as nav results shrink.
  useEffect(() => {
    if (searchResults === null) {
      setActive((i) => Math.min(i, Math.max(0, navResults.length - 1)))
    }
  }, [navResults.length, searchResults])

  if (!open) return null

  function go(href: string) {
    onClose()
    router.push(href)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') return onClose()
    if (searchResults !== null) return // no keyboard nav in search mode
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % navResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + navResults.length) % navResults.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = navResults[active]
      if (item) go(item.href)
    }
  }

  const totalSearchResults =
    searchResults !== null
      ? searchResults.tasks.length + searchResults.clients.length + searchResults.invoices.length
      : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="w-full bg-transparent py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {/* Loading state */}
          {searching && (
            <p className="px-3 py-6 text-center text-[13px] text-muted-foreground">
              Searching...
            </p>
          )}

          {/* Cross-entity search results */}
          {!searching && searchResults !== null && (
            <>
              {totalSearchResults === 0 ? (
                <p className="px-3 py-6 text-center text-[13px] text-muted-foreground">
                  No results for &quot;{query}&quot;
                </p>
              ) : (
                <>
                  {searchResults.tasks.length > 0 && (
                    <div>
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Tasks
                      </p>
                      <ul>
                        {searchResults.tasks.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => go(item.href)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-background"
                            >
                              <span className="flex-1 text-foreground">{item.label}</span>
                              {item.meta && (
                                <span className="text-[11px] text-muted-foreground">{item.meta}</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.clients.length > 0 && (
                    <div>
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Clients
                      </p>
                      <ul>
                        {searchResults.clients.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => go(item.href)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-background"
                            >
                              <span className="flex-1 text-foreground">{item.label}</span>
                              {item.meta && (
                                <span className="text-[11px] text-muted-foreground">{item.meta}</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.invoices.length > 0 && (
                    <div>
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Invoices
                      </p>
                      <ul>
                        {searchResults.invoices.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => go(item.href)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-background"
                            >
                              <span className="flex-1 text-foreground">{item.label}</span>
                              {item.meta && (
                                <span className="text-[11px] text-muted-foreground">{item.meta}</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Nav items (empty query or no search yet) */}
          {!searching && searchResults === null && (
            <ul>
              {navResults.length === 0 ? (
                <li className="px-3 py-6 text-center text-[13px] text-muted-foreground">
                  No matches for &quot;{query}&quot;.
                </li>
              ) : (
                navResults.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(item.href)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors ${
                          i === active
                            ? 'bg-primary/10 text-foreground'
                            : 'text-muted-foreground hover:bg-background'
                        }`}
                      >
                        <Icon size={16} className="shrink-0 text-primary" />
                        <span className="flex-1 text-foreground">{item.label}</span>
                        {item.status ? (
                          <span className="text-[11px] text-muted-foreground">{item.status}</span>
                        ) : null}
                      </button>
                    </li>
                  )
                })
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
