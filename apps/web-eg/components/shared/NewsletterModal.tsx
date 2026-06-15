'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { X, Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import {
  trackNewsletterShown,
  trackNewsletterSubmitted,
  trackNewsletterDismissed,
  getTypedStorageItem,
  setTypedStorageItem,
  STORAGE_KEYS,
} from '@mediabubble/shared/client'

// ─── Constants ───────────────────────────────────────────────────────────────
const SCROLL_TRIGGER_RATIO = 0.45

function isNewsletterEligiblePath(pathname: string): boolean {
  if (pathname.startsWith('/insights/') && pathname.length > '/insights/'.length) return true
  if (pathname === '/services' || pathname.startsWith('/services/')) return true
  return false
}

function getLocalDateString(): string {
  return new Date().toLocaleDateString('en-CA')
}

function hasShownToday(): boolean {
  const stored = getTypedStorageItem(STORAGE_KEYS.newsletterShownDate)
  if (!stored) return false
  return stored === getLocalDateString()
}

function markShownToday(): void {
  setTypedStorageItem(STORAGE_KEYS.newsletterShownDate, getLocalDateString())
}

// ─── Component ───────────────────────────────────────────────────────────────
export function NewsletterModal() {
  const { t, dir } = useI18n()
  const pathname = usePathname()
  const eligible = isNewsletterEligiblePath(pathname)
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const openedAtRef = useRef<number>(0)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const open = useCallback(() => {
    if (hasShownToday()) return
    setVisible(true)
    markShownToday()
    openedAtRef.current = Date.now()
    trackNewsletterShown()
    // Defer focus until after animation frame
    requestAnimationFrame(() => firstInputRef.current?.focus())
  }, [])

  const close = useCallback(() => {
    const timeOnPage = Date.now() - openedAtRef.current
    setVisible(false)
    trackNewsletterDismissed(timeOnPage)
  }, [])

  // Scroll-depth trigger (45% of page)
  useEffect(() => {
    if (!eligible) return

    let triggered = false
    const checkScroll = () => {
      if (triggered) return
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      if (window.scrollY / maxScroll >= SCROLL_TRIGGER_RATIO) {
        triggered = true
        open()
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => window.removeEventListener('scroll', checkScroll)
  }, [eligible, open])

  // Exit-intent trigger (cursor leaves top of viewport)
  useEffect(() => {
    if (!eligible) return
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) open()
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [eligible, open])

  // Keyboard: Esc closes; focus trap inside modal
  useEffect(() => {
    if (!visible) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }

      // Focus trap
      if (e.key === 'Tab') {
        const modal = document.getElementById('newsletter-modal-dialog')
        if (!modal) return
        const focusable = modal.querySelectorAll<HTMLElement>(
          'input, button, a, [tabindex]:not([tabindex="-1"])',
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [visible, close])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, service_interest: 'newsletter' }),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Submission failed')
      }
      setStatus('success')
      trackNewsletterSubmitted(email)
      setTimeout(close, 2500)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] animate-fade-in"
        onClick={close}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        id="newsletter-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-modal-title"
        className="fixed inset-0 z-[400] flex items-center justify-center p-4 pointer-events-none"
      >
        <div dir={dir} className="relative bg-brand-surface border border-brand-whisper-border rounded-2xl shadow-2xl dark:shadow-black/40 w-full max-w-[400px] pointer-events-auto animate-scale-in overflow-hidden">

          {/* Brand accent bar */}
          <div className="h-1.5 w-full bg-brand-yellow" />

          {/* Close */}
          <button
            ref={closeButtonRef}
            onClick={close}
            aria-label={t('newsletter.closeLabel', 'Close newsletter sign-up')}
            className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-1.5 rounded-lg text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-brand-canvas dark:text-brand-text-muted dark:hover:text-brand-off-white dark:hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="px-7 pt-6 pb-7">
            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-brand-yellow/15 dark:bg-brand-yellow/20 flex items-center justify-center mb-4">
              <Mail className="text-brand-navy dark:text-brand-yellow" size={22} />
            </div>

            <h2
              id="newsletter-modal-title"
              className="font-display text-[1.35rem] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-1.5"
            >
              {t('newsletter.title', 'Join Our Newsletter')}
            </h2>
            <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted mb-6">
              {t('newsletter.description', 'Monthly tips and local case studies in your inbox. No spam. Unsubscribe anytime.')}
            </p>

            {status === 'success' ? (
              <div className="flex items-center gap-3 py-4 text-brand-success">
                <CheckCircle2 size={22} />
                <span className="font-semibold text-[15px]">{t('newsletter.success', 'Check your email!')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  {t('newsletter.emailLabel', 'Email address')}
                </label>
                <input
                  ref={firstInputRef}
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('newsletter.placeholder', 'you@example.com')}
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl border border-brand-input-border bg-brand-surface text-brand-text text-[15px] placeholder:text-brand-muted-steel dark:bg-brand-navy/50 dark:text-brand-off-white dark:border-brand-light-border outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:border-transparent transition-all mb-3 disabled:opacity-50"
                />

                {status === 'error' && (
                  <p role="alert" className="text-[13px] text-brand-error mb-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  data-ripple=""
                  disabled={status === 'submitting' || !email}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-yellow text-brand-navy text-[15px] font-semibold hover:bg-[#FFB300] active:scale-[0.98] transition-all duration-150 shadow-md shadow-brand-yellow/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t('newsletter.sending', 'Sending…')}
                    </>
                  ) : (
                    t('newsletter.cta', 'Get Insights')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
