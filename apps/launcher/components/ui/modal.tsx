'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  // `render` keeps the node mounted through the exit transition; `shown` drives
  // the enter/exit visual state one frame later so the transition actually fires.
  const [render, setRender] = useState(isOpen)
  const [shown, setShown] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setRender(true)
      const raf = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(raf)
    }
    setShown(false)
    return undefined
  }, [isOpen])

  // ESC to close + lock body scroll while open (invisible correctness).
  useEffect(() => {
    if (!render) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [render, onClose])

  // Move focus into the dialog when it opens.
  useEffect(() => {
    if (shown) panelRef.current?.focus()
  }, [shown])

  if (!render) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-200 ease-[var(--ease-out)]',
          shown ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        // Modals stay center-origin (they are not anchored to a trigger). Enter
        // from scale(0.96)+opacity — never from nothing.
        onTransitionEnd={(e) => {
          if (!isOpen && e.propertyName === 'transform' && e.target === e.currentTarget) setRender(false)
        }}
        className={cn(
          'relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-whisper-border bg-brand-surface shadow-2xl shadow-black/40 outline-none',
          'transition-[transform,opacity] duration-200 ease-[var(--ease-out)]',
          shown ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-0',
        )}
      >
        <div className="flex items-center justify-between border-b border-brand-whisper-border px-5 py-4">
          <h2 className="text-[15px] font-bold text-brand-text">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-brand-text-muted transition-colors duration-150 hover:text-brand-text"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {actions ? (
          <div className="flex justify-end gap-2 border-t border-brand-whisper-border px-5 py-4">{actions}</div>
        ) : null}
      </div>
    </div>
  )
}
