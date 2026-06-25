'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, X } from 'lucide-react'
import { MeetPanel, useMeet } from './meet-provider'

export function MeetBubble() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { channels } = useMeet()

  if (pathname === '/meet') return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 end-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg lg:hidden"
        aria-label="Open Meet"
      >
        <MessageSquare size={20} />
        {channels.length > 0 ? (
          <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold">
            {channels.length > 9 ? '9+' : channels.length}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 top-16 flex flex-col rounded-t-2xl border border-border bg-card shadow-xl">
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-[14px] font-bold">Meet</span>
              <div className="flex items-center gap-3">
                <Link href="/meet" className="text-[12px] font-semibold text-primary" onClick={() => setOpen(false)}>
                  Full page
                </Link>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </header>
            <div className="min-h-0 flex-1">
              <MeetPanel variant="embedded" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
