'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { trackFloatingCtaClicked } from '@mediabubble/shared/client'

import { useI18n } from '@/lib/i18n/provider'

function getScrollDepthPct(): number {
  const scrolled = window.scrollY
  const total = document.documentElement.scrollHeight - window.innerHeight
  if (total <= 0) return 0
  return (scrolled / total) * 100
}

interface FloatingCtaProps {
  /** Hide the button when a modal is open */
  hidden?: boolean
}

export function FloatingCta({ hidden = false }: FloatingCtaProps) {
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Slide in after initial paint
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  // Hide on scroll-down, reveal on scroll-up
  const onScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const current = window.scrollY
      if (current < 60) {
        setVisible(true)
      } else if (current > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = current
      ticking.current = false
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const handleClick = () => {
    trackFloatingCtaClicked(getScrollDepthPct())
  }

  if (!mounted) return null

  const show = visible && !hidden

  return (
    <Link
      href="/contact"
      onClick={handleClick}
      aria-label={t('floatingCta.ariaLabel', 'Free audit — contact us')}
      data-ripple=""
      className={[
        // Base
        'fixed bottom-6 right-6 z-[200]',
        'flex items-center gap-2.5',
        'bg-brand-yellow text-brand-navy',
        'font-semibold text-[14px]',
        'shadow-lg shadow-brand-yellow/40',
        'rounded-full',
        'transition-all duration-300 ease-out',
        // Desktop: pill shape; mobile: circle
        'h-14 px-5 sm:px-6',
        'hover:bg-[#FFB300] hover:shadow-xl hover:shadow-brand-yellow/50 hover:-translate-y-0.5',
        'active:scale-95',
        // Visibility
        show ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none',
        // Focus ring
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50',
      ].join(' ')}
    >
      <MessageCircle size={20} className="flex-shrink-0" />
      {/* Text hidden on mobile to keep button compact */}
      <span className="hidden sm:inline whitespace-nowrap">{t('floatingCta.label', 'Free audit')}</span>
    </Link>
  )
}
