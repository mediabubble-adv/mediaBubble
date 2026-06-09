'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Container } from './Container'

const NAV_LINKS = [
  { key: 'nav.about',     href: '/about' },
  { key: 'nav.services',  href: '/services' },
  { key: 'nav.portfolio', href: '/portfolio' },
  { key: 'nav.blog',      href: '/blog' },
  { key: 'nav.contact',   href: '/contact' },
] as const

export function SiteNav() {
  const { t, dir } = useI18n()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const [scrolled, setScrolled] = useState(false)

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        dir={dir}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label={t('nav.logoAlt', 'MediaBubble — Hurghada Marketing Agency')}
            >
              <Image
                src="/assets/logo.svg"
                alt=""
                width={32}
                height={32}
                className="shrink-0"
              />
              <span className={`font-display font-bold text-[15px] leading-none ${scrolled ? 'text-brand-navy' : 'text-white'} transition-colors`}>
                MediaBubble
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label={t('nav.skipToContent', 'Main navigation')}>
              {NAV_LINKS.map(({ key, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={key}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? scrolled
                          ? 'text-brand-navy font-semibold bg-black/[0.05]'
                          : 'text-white font-semibold bg-white/[0.15]'
                        : scrolled
                          ? 'text-brand-secondary hover:text-brand-navy hover:bg-black/[0.04]'
                          : 'text-white/80 hover:text-white hover:bg-white/[0.1]'
                    }`}
                  >
                    {t(key)}
                  </Link>
                )
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher
                className={scrolled ? '' : 'text-white/80 hover:text-white hover:bg-white/[0.1]'}
              />
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
              >
                {t('nav.getAudit', 'Get Free Audit')}
              </Link>
              <button
                onClick={() => setOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? 'text-[#333] hover:bg-black/[0.05]' : 'text-white hover:bg-white/[0.1]'
                }`}
                aria-label={t('nav.openMenu', 'Open menu')}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        style={{ background: 'rgba(7,42,107,0.6)', backdropFilter: 'blur(4px)' }}
      />

      {/* Mobile drawer */}
      <aside
        dir={dir}
        className={`fixed inset-y-0 end-0 z-50 w-72 bg-white md:hidden flex flex-col transition-transform duration-250 ease-out shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={dir === 'rtl' ? { transform: open ? 'translateX(0)' : 'translateX(100%)' } : undefined}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-brand-whisper-border shrink-0">
          <div className="flex items-center gap-2.5">
            <Image src="/assets/logo.svg" alt="" width={32} height={32} />
            <span className="font-display font-bold text-[15px] text-brand-navy">MediaBubble</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-brand-secondary hover:text-brand-charcoal rounded-lg hover:bg-black/[0.05] transition-colors"
            aria-label={t('nav.closeMenu', 'Close menu')}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center px-3 py-3 rounded-xl text-[14px] font-semibold text-brand-navy hover:bg-brand-light-border transition-colors"
          >
            {t('nav.home', 'Home')}
          </Link>
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center px-3 py-3 rounded-xl text-[14px] transition-colors ${
                  isActive
                    ? 'text-brand-navy font-semibold bg-brand-blue/10'
                    : 'text-brand-secondary hover:text-brand-navy hover:bg-brand-light-border'
                }`}
              >
                {t(key)}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 pb-6 pt-2 border-t border-[#E8E8E8]">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-[14px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all"
          >
            {t('nav.getAudit', 'Get Free Audit')}
          </Link>
          <div className="flex justify-center mt-3">
            <LanguageSwitcher variant="outline" />
          </div>
        </div>
      </aside>
    </>
  )
}
