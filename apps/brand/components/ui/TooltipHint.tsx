import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Info } from 'lucide-react'

interface TooltipHintProps {
  text: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function TooltipHint({ text, side = 'top' }: TooltipHintProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    
    let top = 0
    let left = 0

    // Absolute position relative to document body (includes scroll offset)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    const scrollX = typeof window !== 'undefined' ? window.scrollX : 0

    if (side === 'top') {
      top = rect.top + scrollY
      left = rect.left + scrollX + rect.width / 2
    } else if (side === 'bottom') {
      top = rect.bottom + scrollY
      left = rect.left + scrollX + rect.width / 2
    } else if (side === 'left') {
      top = rect.top + scrollY + rect.height / 2
      left = rect.left + scrollX
    } else if (side === 'right') {
      top = rect.top + scrollY + rect.height / 2
      left = rect.right + scrollX
    }

    setCoords({ top, left })
  }, [side])

  useEffect(() => {
    if (isOpen) {
      updateCoords()
      window.addEventListener('resize', updateCoords)
      window.addEventListener('scroll', updateCoords)
    }
    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
    }
  }, [isOpen, updateCoords])

  const translateClasses = {
    top: '-translate-x-1/2 -translate-y-full -mt-2',
    bottom: '-translate-x-1/2 mt-2',
    left: '-translate-x-full -translate-y-1/2 -ml-2',
    right: '-translate-y-1/2 ml-2',
  }[side]

  return (
    <span className="inline-flex items-center shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => {
          updateCoords()
          setIsOpen(true)
        }}
        onBlur={() => setIsOpen(false)}
        aria-label="More information"
        className="text-brand-text-muted hover:text-brand-text-secondary cursor-help transition-colors p-0.5 outline-none focus-visible:ring-1 focus-visible:ring-brand-blue rounded shrink-0 flex items-center justify-center"
      >
        <Info size={12} className="shrink-0" />
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <span
          style={{
            position: 'absolute',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
          className={`z-[9999] px-2.5 py-1.5 rounded-lg bg-[#0D0F12] text-white text-[10.5px] leading-relaxed shadow-lg max-w-[200px] pointer-events-none transition-opacity duration-150 whitespace-normal break-words ${translateClasses}`}
        >
          {text}
        </span>,
        document.body
      )}
    </span>
  )
}
