'use client'

import { useCallback, useState, type ReactElement } from 'react'

type SidebarTooltipProps = {
  label: string
  show: boolean
  rtl?: boolean
  children: ReactElement
}

/** Tooltip for collapsed sidebar nav — fixed position so it is not clipped by scroll containers. */
export function SidebarTooltip({ label, show, rtl = false, children }: SidebarTooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)

  const updatePosition = useCallback((target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    setCoords({
      top: rect.top + rect.height / 2,
      left: rtl ? rect.left - 10 : rect.right + 10,
    })
  }, [rtl])

  if (!show) return children

  return (
    <span
      className="relative flex w-full justify-center"
      onMouseEnter={(e) => {
        updatePosition(e.currentTarget)
        setVisible(true)
      }}
      onMouseLeave={() => setVisible(false)}
      onFocus={(e) => {
        updatePosition(e.currentTarget)
        setVisible(true)
      }}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && coords && (
        <span
          role="tooltip"
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: rtl ? 'translate(-100%, -50%)' : 'translateY(-50%)',
          }}
          className="pointer-events-none z-[var(--z-tooltip)] whitespace-nowrap rounded-md border border-white/10 bg-[#0D0F12] px-2.5 py-1.5 text-[11px] font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
        >
          {label}
        </span>
      )}
    </span>
  )
}
