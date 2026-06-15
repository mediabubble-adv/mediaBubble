'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'
import { useConsentContext } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'

export function CookieConsent() {
  const { t } = useI18n()
  const { status, ready, accept, decline } = useConsentContext()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ready || status) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [status, ready])

  const handleChoice = (choice: 'accepted' | 'declined') => {
    if (choice === 'accepted') {
      accept()
    } else {
      decline()
    }
    setVisible(false)
  }

  if (!ready || status) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[600] flex justify-center px-4 pb-4 sm:pb-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
    >
      <div
        className={`w-full max-w-[1400px] bg-brand-yellow rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] border-2 border-brand-navy/10 px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
          visible ? 'animate-attention-pulse' : ''
        }`}
      >
        {/* Icon */}
        <div className="shrink-0 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center">
            <Cookie size={20} className="text-brand-navy" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] sm:text-[14px] font-semibold text-brand-navy mb-0.5">
            {t('cookieConsent.title', 'We value your privacy')}
          </p>
          <p className="text-[12px] sm:text-[13px] text-brand-navy/75 leading-relaxed">
            {t('cookieConsent.body', 'We use cookies to improve your experience, analyze site traffic, and remember your language preference.')}{' '}
            <Link
              href="/cookies"
              className="font-semibold underline underline-offset-2 decoration-brand-navy/40 hover:decoration-brand-navy transition-colors"
            >
              {t('cookieConsent.learnMore', 'Learn more')}
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
          <button
            onClick={() => handleChoice('accepted')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-brand-navy text-white hover:bg-[#0a2a66] active:scale-[0.97] transition-all duration-150 whitespace-nowrap shadow-lg shadow-brand-navy/25"
          >
            {t('cookieConsent.accept', 'Accept')}
          </button>
          <button
            onClick={() => handleChoice('declined')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-[13px] font-medium text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/[0.08] active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
          >
            {t('cookieConsent.decline', 'Decline')}
          </button>
          <button
            onClick={() => setVisible(false)}
            className="hidden sm:flex p-2 rounded-lg text-brand-navy/40 hover:text-brand-navy hover:bg-brand-navy/[0.08] transition-colors"
            aria-label={t('cookieConsent.close', 'Close')}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
