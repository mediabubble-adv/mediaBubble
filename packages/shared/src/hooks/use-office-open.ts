'use client'

import { useEffect, useState } from 'react'
import { isOfficeOpen } from '../office-hours'
import type { Market } from '../site-config'

export function useOfficeOpen(market: Extract<Market, 'eg' | 'ae'>) {
  const [open, setOpen] = useState(() => isOfficeOpen(market))

  useEffect(() => {
    const refresh = () => setOpen(isOfficeOpen(market))
    refresh()
    const id = window.setInterval(refresh, 60_000)
    return () => window.clearInterval(id)
  }, [market])

  return open
}
