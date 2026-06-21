'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastAction {
  label: string
  onClick: () => void
}

interface ToastRecord {
  id: string
  type: ToastType
  message: string
  action?: ToastAction
  leaving: boolean
}

const DURATION = 5000

const ToastContext = createContext<{
  toast: (type: ToastType, message: string, action?: ToastAction) => void
} | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([])

  const toast = useCallback((type: ToastType, message: string, action?: ToastAction) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, type, message, action, leaving: false }])
  }, [])

  // Two-phase removal: mark `leaving` to play the exit transition, then splice
  // once it finishes (handled in the item via onTransitionEnd).
  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
        role="region"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} onExited={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-brand-success" />,
  error: <AlertCircle size={18} className="text-red-500" />,
  info: <Info size={18} className="text-brand-blue" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
}

function ToastItem({
  toast,
  onDismiss,
  onExited,
}: {
  toast: ToastRecord
  onDismiss: () => void
  onExited: () => void
}) {
  // Enter via the data-mounted pattern (flip after first paint) so the CSS
  // transition fires. Exit is driven by `toast.leaving` from the provider.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Auto-dismiss timer that pauses while the tab is hidden — users never notice
  // this, which is exactly right (no toast silently expires off-screen).
  const remaining = useRef(DURATION)
  const startedAt = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function start() {
      startedAt.current = Date.now()
      timer.current = setTimeout(onDismiss, remaining.current)
    }
    function pause() {
      if (timer.current) clearTimeout(timer.current)
      remaining.current -= Date.now() - startedAt.current
    }
    function onVisibility() {
      if (document.hidden) pause()
      else start()
    }

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      if (timer.current) clearTimeout(timer.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const visible = mounted && !toast.leaving

  return (
    <div
      onTransitionEnd={(e) => {
        // Splice only after the exit transform finishes (not the enter, not a child).
        if (toast.leaving && e.propertyName === 'transform' && e.target === e.currentTarget) onExited()
      }}
      // Spatial consistency: slide in/out from the same (bottom) edge; scale from
      // 0.95 not 0 — nothing in the real world appears from nothing.
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-xl border border-brand-whisper-border bg-brand-surface px-4 py-3 shadow-lg shadow-black/20',
        'transition-[transform,opacity] duration-[260ms] ease-[var(--ease-out)]',
        visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0',
      )}
    >
      <span className="mt-px shrink-0">{icons[toast.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-brand-text">{toast.message}</p>
        {toast.action ? (
          <button
            type="button"
            onClick={toast.action.onClick}
            className="mt-1 text-[12px] font-bold text-brand-blue underline-offset-2 hover:underline"
          >
            {toast.action.label}
          </button>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 text-brand-text-muted transition-colors duration-150 hover:text-brand-text"
      >
        <X size={15} />
      </button>
    </div>
  )
}
