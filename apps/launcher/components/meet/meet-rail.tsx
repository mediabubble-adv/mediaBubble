'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { MeetPanel, useMeet } from './meet-provider'

export function MeetRail() {
  const pathname = usePathname()
  const { railOpen, setRailOpen } = useMeet()

  if (pathname === '/meet') return null

  return (
    <aside
      className={`hidden shrink-0 border-s border-border bg-card/95 transition-[width] duration-200 lg:flex lg:flex-col ${
        railOpen ? 'w-[min(360px,28vw)]' : 'w-12'
      }`}
      style={{ height: 'calc(100vh - 3.5rem)' }}
    >
      <div className="flex h-11 items-center justify-between border-b border-border px-2">
        {railOpen ? (
          <>
            <div className="flex items-center gap-2 px-1">
              <MessageSquare size={15} className="text-primary" />
              <span className="text-[12px] font-bold">Meet</span>
            </div>
            <div className="flex items-center gap-1">
              <Link href="/meet" className="text-[10px] font-semibold text-primary hover:underline">
                Expand
              </Link>
              <button
                type="button"
                onClick={() => setRailOpen(false)}
                className="rounded p-1 text-muted-foreground hover:text-foreground"
                aria-label="Collapse Meet"
              >
                <PanelRightClose size={16} />
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setRailOpen(true)}
            className="mx-auto rounded p-2 text-muted-foreground hover:text-foreground"
            aria-label="Open Meet"
          >
            <PanelRightOpen size={18} />
          </button>
        )}
      </div>
      {railOpen ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <MeetPanel variant="embedded" />
        </div>
      ) : null}
    </aside>
  )
}
