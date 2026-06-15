'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  ChevronDown, ChevronRight,
  Globe, BarChart2, Palette, BookOpen,
  Code2, Search, ShoppingCart,
  Share2, FileText, Mail,
  Brush, Award, Image as ImageIcon,
  FolderOpen, Rss, DollarSign,
  Home,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { useTheme } from '@mediabubble/shared/client'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Container } from './Container'

// ─── Mega-menu data ───────────────────────────────────────────────────────────

const MEGA_MENU_COLUMNS = [
  {
    id: 'web',
    labelKey: 'nav.mega.web.label',
    icon: Globe,
    items: [
      { labelKey: 'nav.mega.web.webDev.label', descKey: 'nav.mega.web.webDev.desc', href: '/services/web',    icon: Code2        },
      { labelKey: 'nav.mega.web.seo.label',    descKey: 'nav.mega.web.seo.desc',    href: '/services/seo',    icon: Search       },
      { labelKey: 'nav.mega.web.ecom.label',   descKey: 'nav.mega.web.ecom.desc',   href: '/services/web',    icon: ShoppingCart },
    ],
  },
  {
    id: 'marketing',
    labelKey: 'nav.mega.marketing.label',
    icon: BarChart2,
    items: [
      { labelKey: 'nav.mega.marketing.social.label',  descKey: 'nav.mega.marketing.social.desc',  href: '/services/social', icon: Share2   },
      { labelKey: 'nav.mega.marketing.content.label', descKey: 'nav.mega.marketing.content.desc', href: '/services/social', icon: FileText },
      { labelKey: 'nav.mega.marketing.email.label',   descKey: 'nav.mega.marketing.email.desc',   href: '/contact',         icon: Mail     },
    ],
  },
  {
    id: 'branding',
    labelKey: 'nav.mega.branding.label',
    icon: Palette,
    items: [
      { labelKey: 'nav.mega.branding.strategy.label', descKey: 'nav.mega.branding.strategy.desc', href: '/services/branding', icon: Award    },
      { labelKey: 'nav.mega.branding.logo.label',     descKey: 'nav.mega.branding.logo.desc',     href: '/services/branding', icon: Brush    },
      { labelKey: 'nav.mega.branding.paid.label',     descKey: 'nav.mega.branding.paid.desc',     href: '/services/ppc',      icon: ImageIcon },
    ],
  },
  {
    id: 'resources',
    labelKey: 'nav.mega.resources.label',
    icon: BookOpen,
    items: [
      { labelKey: 'nav.mega.resources.cases.label',   descKey: 'nav.mega.resources.cases.desc',   href: '/case-studies', icon: FolderOpen  },
      { labelKey: 'nav.mega.resources.blog.label',    descKey: 'nav.mega.resources.blog.desc',    href: '/insights',      icon: Rss         },
      { labelKey: 'nav.mega.resources.pricing.label', descKey: 'nav.mega.resources.pricing.desc', href: '/contact',   icon: DollarSign  },
    ],
  },
] as const

const NAV_LINKS = [
  { key: 'nav.about',     href: '/about' },
  { key: 'nav.services',  href: '/services',  hasMega: true },
  { key: 'nav.portfolio', href: '/case-studies' },
  { key: 'nav.blog',      href: '/insights' },
  { key: 'nav.contact',   href: '/contact' },
] as const

const SCROLL_FLOAT_THRESHOLD = 16
const NAV_BAR_HEIGHT = 64

const LOGO_FULL_COLOR = '/assets/Logo/mediaBubble_logo_horizontal_full_color.svg'
const LOGO_TEXT_WHITE = '/assets/Logo/mediaBubble_logo_horizontal_text_white.svg'

function resolveNavLogoSrc(isFloating: boolean, isDark: boolean): string {
  if (!isFloating || isDark) return LOGO_TEXT_WHITE
  return LOGO_FULL_COLOR
}

function getScrollY(): number {
  return Math.max(
    window.scrollY,
    document.documentElement.scrollTop,
    document.body.scrollTop,
  )
}

function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

// ─── AnimatedHamburger ────────────────────────────────────────────────────────

// Pure icon — no button element; callers supply their own button/div wrapper
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-5" aria-hidden="true">
      <span
        className={`block h-[2px] bg-current rounded-full transition-all duration-250 origin-center ${
          open ? 'rotate-45 translate-y-[7px]' : ''
        }`}
      />
      <span
        className={`block h-[2px] bg-current rounded-full transition-all duration-250 ${
          open ? 'opacity-0 scale-x-0' : ''
        }`}
      />
      <span
        className={`block h-[2px] bg-current rounded-full transition-all duration-250 origin-center ${
          open ? '-rotate-45 -translate-y-[7px]' : ''
        }`}
      />
    </span>
  )
}

// ─── MegaMenu ────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  visible: boolean
  scrolled: boolean
  onClose: () => void
  t: (key: string, fallback?: string) => string
}

function MegaMenu({ visible, scrolled, onClose, t }: MegaMenuProps) {
  return (
    <div
      role="region"
      aria-label="Services mega menu"
      className={[
        'absolute top-full start-1/2 -translate-x-1/2 mt-2',
        'w-[min(92vw,860px)]',
        'rounded-2xl shadow-2xl shadow-black/10',
        'border border-black/[0.06]',
        'transition-all duration-200',
        scrolled ? 'bg-brand-surface border-brand-whisper-border dark:border-white/10' : 'bg-[#0D1B2A]/98 backdrop-blur-md',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none',
      ].join(' ')}
    >
      {/* Accent bar */}
      <div className="h-1 w-full bg-brand-yellow rounded-t-2xl" />

      <div className="grid grid-cols-4 gap-0 p-5">
        {MEGA_MENU_COLUMNS.map((col, colIdx) => {
          const ColIcon = col.icon
          return (
            <div
              key={col.id}
              className={[
                'py-2 px-3',
                colIdx < MEGA_MENU_COLUMNS.length - 1
                  ? scrolled
                    ? 'border-r border-black/[0.06] dark:border-white/10'
                    : 'border-r border-white/[0.08]'
                  : '',
              ].join(' ')}
            >
              {/* Column heading */}
              <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${scrolled ? 'border-black/[0.06] dark:border-white/10' : 'border-white/[0.08]'}`}>
                <ColIcon
                  size={13}
                  className={scrolled ? 'text-brand-navy dark:text-brand-yellow' : 'text-brand-yellow'}
                />
                <span className={`text-[11px] font-semibold uppercase tracking-widest ${scrolled ? 'text-brand-navy dark:text-brand-yellow' : 'text-brand-yellow'}`}>
                  {t(col.labelKey)}
                </span>
              </div>

              {/* Items */}
              <ul className="space-y-0.5" role="list">
                {col.items.map(item => {
                  const ItemIcon = item.icon
                  return (
                    <li key={item.href + item.labelKey}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={[
                          'group flex items-start gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-150',
                          scrolled
                            ? 'hover:bg-brand-navy/[0.05] dark:hover:bg-white/[0.06] hover:shadow-sm'
                            : 'hover:bg-white/[0.08]',
                        ].join(' ')}
                      >
                        <span className={[
                          'mt-0.5 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors',
                          scrolled
                            ? 'bg-brand-yellow/15 group-hover:bg-brand-yellow/25 dark:bg-brand-yellow/10'
                            : 'bg-white/[0.08] group-hover:bg-brand-yellow/20',
                        ].join(' ')}>
                          <ItemIcon size={12} className={scrolled ? 'text-brand-navy dark:text-brand-off-white' : 'text-white/80'} />
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-[13px] font-medium leading-tight mb-0.5 transition-colors ${
                            scrolled
                              ? 'text-brand-charcoal dark:text-brand-off-white group-hover:text-brand-navy dark:group-hover:text-brand-yellow'
                              : 'text-white/90 group-hover:text-white'
                          }`}>
                            {t(item.labelKey)}
                          </span>
                          <span className={`block text-[11px] leading-snug ${
                            scrolled ? 'text-brand-secondary dark:text-brand-text-muted' : 'text-white/45'
                          }`}>
                            {t(item.descKey)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── MobileAccordionSection ───────────────────────────────────────────────────

interface MobileAccordionSectionProps {
  col: (typeof MEGA_MENU_COLUMNS)[number]
  onClose: () => void
  t: (key: string, fallback?: string) => string
}

function MobileAccordionSection({ col, onClose, t }: MobileAccordionSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const ColIcon = col.icon

  return (
    <li>
      <button
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between px-3 py-3.5 rounded-xl text-[14px] font-medium text-brand-secondary dark:text-brand-text-muted hover:text-brand-navy dark:hover:text-brand-off-white hover:bg-brand-light-border dark:hover:bg-white/[0.06] transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-brand-navy/[0.06] dark:bg-white/[0.08]">
            <ColIcon size={14} className="text-brand-navy dark:text-brand-off-white" />
          </span>
          {t(col.labelKey)}
        </span>
        <ChevronRight
          size={15}
          className={`text-brand-secondary/60 dark:text-brand-text-muted transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
        />
      </button>

      {expanded && (
        <ul className="mt-0.5 mb-1 ms-4 border-s-2 border-brand-yellow/30 ps-3 space-y-0.5">
          {col.items.map(item => {
            const ItemIcon = item.icon
            return (
              <li key={item.href + item.labelKey}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg text-[13px] text-brand-secondary dark:text-brand-text-muted hover:text-brand-navy dark:hover:text-brand-off-white hover:bg-brand-light-border dark:hover:bg-white/[0.06] transition-colors"
                >
                  <ItemIcon size={13} className="text-brand-navy/50 dark:text-brand-off-white/50 flex-shrink-0" />
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

// ─── SiteNav ─────────────────────────────────────────────────────────────────

export type SiteNavTopSurface = 'dark' | 'light'

export interface SiteNavProps {
  /** Hero contrast at scroll top. Use `light` on pages without a dark hero (e.g. legal). */
  topSurface?: SiteNavTopSurface
}

export function SiteNav({ topSurface = 'dark' }: SiteNavProps) {
  const { t, dir } = useI18n()
  const { resolved } = useTheme()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(topSurface === 'light')
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollRaf = useRef<number | null>(null)
  const isFloating = scrolled || topSurface === 'light' || megaOpen || pastHero

  const syncNavState = useCallback(() => {
    const scrollY = getScrollY()
    setScrolled(scrollY > SCROLL_FLOAT_THRESHOLD)

    if (topSurface === 'light') {
      setPastHero(true)
      return
    }

    const hero = document.querySelector('section[aria-label="Hero"]')
    const heroBottom = hero?.getBoundingClientRect().bottom ?? Infinity
    setPastHero(heroBottom <= NAV_BAR_HEIGHT + 8)
  }, [topSurface])

  useEffect(() => {
    syncNavState()

    const onScroll = () => {
      if (scrollRaf.current !== null) return
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = null
        syncNavState()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', syncNavState, { passive: true })

    return () => {
      if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', syncNavState)
    }
  }, [pathname, syncNavState])

  // Touch-swipe-to-dismiss (drawer slides in from the end edge)
  const touchStartX = useRef(0)
  const drawerRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // Close drawer on route change
  useEffect(() => { closeMobile() }, [pathname, closeMobile])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Focus management: save focus on open, trap Tab inside drawer, restore on close
  useEffect(() => {
    if (mobileOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement
      requestAnimationFrame(() => {
        const drawer = drawerRef.current
        if (!drawer) return
        const focusable = drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        )
        focusable[0]?.focus()
      })
    } else {
      prevFocusRef.current?.focus()
      prevFocusRef.current = null
    }
  }, [mobileOpen])

  // Esc to close drawer + Tab focus trap
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMobile(); return }
      if (e.key === 'Tab') {
        const drawer = drawerRef.current
        if (!drawer) return
        const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen, closeMobile])

  // Mega-menu hover helpers (keep-alive during mouse transit)
  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMegaDeferred = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150)
  }

  // Touch swipe-to-dismiss (swipe toward the edge)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const isRtl = dir === 'rtl'
    // LTR: swipe right (positive delta) closes start-edge drawer
    // RTL: swipe left (negative delta) closes start-edge drawer
    const swipeAway = isRtl ? deltaX < -60 : deltaX > 60
    if (swipeAway) closeMobile()
  }

  // Smooth scroll for same-page anchor links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const el = document.getElementById(anchor.getAttribute('href')!.slice(1))
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const navTextClass = isFloating
    ? 'text-brand-secondary dark:text-brand-text-muted hover:text-brand-navy dark:hover:text-brand-off-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
    : 'text-white/80 hover:text-white hover:bg-white/[0.1]'
  const navActiveClass = isFloating
    ? 'text-brand-navy dark:text-brand-off-white font-semibold'
    : 'text-white font-semibold'
  const langSwitcherClass = isFloating
    ? 'text-brand-secondary dark:text-brand-text-muted hover:text-brand-charcoal dark:hover:text-brand-off-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06]'
    : 'text-white/80 hover:text-white hover:bg-white/[0.1]'
  const hamburgerClass = isFloating
    ? 'text-brand-navy dark:text-brand-off-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06]'
    : 'text-white hover:bg-white/[0.1]'

  const isDark = resolved === 'dark'
  const logoSrc = resolveNavLogoSrc(isFloating, isDark)

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        dir={dir}
        data-nav-floating={isFloating || undefined}
        className={[
          'fixed inset-x-0 top-0 isolate',
          'z-[var(--z-sticky)] transition-[background-color,box-shadow,border-color] duration-300',
          isFloating
            ? 'bg-brand-surface shadow-sm border-b border-brand-whisper-border dark:border-white/10'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <Container>
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="shrink-0"
              aria-label={t('nav.logoAlt', 'MediaBubble, Hurghada marketing agency')}
            >
              <Image
                key={`nav-logo-${isFloating ? 'float' : 'hero'}-${resolved}`}
                src={logoSrc}
                alt=""
                width={150}
                height={32}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label={t('nav.skipToContent', 'Main navigation')}
            >
              {/* Home */}
              {(() => {
                const homeActive = isNavLinkActive(pathname, '/')
                return (
                  <Link
                    href="/"
                    aria-current={homeActive ? 'page' : undefined}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                      homeActive ? navActiveClass : navTextClass
                    }`}
                  >
                    <Home size={14} aria-hidden="true" className="shrink-0" />
                    {t('nav.home', 'Home')}
                    {homeActive && (
                      <span
                        className="absolute bottom-0 inset-x-2 h-0.5 rounded-full bg-brand-yellow"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )
              })()}

              {NAV_LINKS.map(({ key, href, ...rest }) => {
                const hasMega = 'hasMega' in rest && rest.hasMega
                const isActive = isNavLinkActive(pathname, href)

                if (hasMega) {
                  return (
                    <div
                      key={key}
                      className="relative"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMegaDeferred}
                    >
                      <button
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        className={`relative flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                          isActive ? navActiveClass : navTextClass
                        }`}
                      >
                        {t(key)}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                        />
                        {isActive && (
                          <span
                            className="absolute bottom-0 inset-x-2 h-0.5 rounded-full bg-brand-yellow"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      <MegaMenu
                        visible={megaOpen}
                        scrolled={isFloating}
                        onClose={() => setMegaOpen(false)}
                        t={t}
                      />
                    </div>
                  )
                }

                return (
                  <Link
                    key={key}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                      isActive ? navActiveClass : navTextClass
                    }`}
                  >
                    {t(key)}
                    {isActive && (
                      <span
                        className="absolute bottom-0 inset-x-2 h-0.5 rounded-full bg-brand-yellow"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle surface={isFloating ? 'light' : 'dark'} />
              <LanguageSwitcher className={langSwitcherClass} />
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
              >
                {t('nav.getAudit', 'Free audit')}
              </Link>

              {/* Hamburger — visible below lg */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileOpen(v => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={t(mobileOpen ? 'nav.closeMenu' : 'nav.openMenu', mobileOpen ? 'Close menu' : 'Open menu')}
                className={`lg:hidden p-2 rounded-lg transition-colors ${hamburgerClass}`}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* ── Mobile backdrop ──────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[var(--z-modal-backdrop)] lg:hidden transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
        aria-hidden="true"
        style={{ background: 'rgba(7,42,107,0.55)', backdropFilter: 'blur(4px)' }}
      />

      {/* ── Mobile drawer ───────────────────────────────────────────────────── */}
      <aside
        ref={drawerRef}
        id="mobile-nav-drawer"
        dir={dir}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`fixed inset-y-0 end-0 z-[var(--z-modal)] w-[min(80vw,300px)] bg-brand-surface lg:hidden flex flex-col shadow-2xl transition-transform duration-250 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={dir === 'rtl' ? { transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)' } : undefined}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-brand-whisper-border dark:border-white/10 shrink-0">
          <Image
            src={isDark ? LOGO_TEXT_WHITE : LOGO_FULL_COLOR}
            alt=""
            width={130}
            height={28}
          />
          <button
            onClick={closeMobile}
            aria-label={t('nav.closeMenu', 'Close menu')}
            className="p-2 text-brand-secondary dark:text-brand-text-muted hover:text-brand-charcoal dark:hover:text-brand-off-white rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors"
          >
            <HamburgerIcon open={true} />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile navigation menu">
          <ul className="space-y-0.5">
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={closeMobile}
                aria-current={isNavLinkActive(pathname, '/') ? 'page' : undefined}
                className={`relative flex items-center gap-2.5 px-3 py-3.5 rounded-xl text-[14px] min-h-[56px] transition-colors ${
                  isNavLinkActive(pathname, '/')
                    ? 'text-brand-navy dark:text-brand-off-white font-semibold'
                    : 'text-brand-secondary dark:text-brand-text-muted hover:text-brand-navy dark:hover:text-brand-off-white hover:bg-brand-light-border dark:hover:bg-white/[0.06]'
                }`}
              >
                <Home size={16} aria-hidden="true" className="shrink-0" />
                {t('nav.home', 'Home')}
                {isNavLinkActive(pathname, '/') && (
                  <span className="absolute bottom-2 inset-x-3 h-0.5 rounded-full bg-brand-yellow" aria-hidden="true" />
                )}
              </Link>
            </li>

            {/* Static nav links */}
            {NAV_LINKS.filter(l => !('hasMega' in l && l.hasMega)).map(({ key, href }) => {
              const isActive = isNavLinkActive(pathname, href)
              return (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={closeMobile}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center px-3 py-3.5 rounded-xl text-[14px] min-h-[56px] transition-colors ${
                      isActive
                        ? 'text-brand-navy dark:text-brand-off-white font-semibold'
                        : 'text-brand-secondary dark:text-brand-text-muted hover:text-brand-navy dark:hover:text-brand-off-white hover:bg-brand-light-border dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {t(key)}
                    {isActive && (
                      <span className="absolute bottom-2 inset-x-3 h-0.5 rounded-full bg-brand-yellow" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              )
            })}

            {/* Services accordion */}
            <li>
              <p className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-brand-navy/40 dark:text-brand-text-muted">
                {t('nav.services', 'Services')}
              </p>
              <ul className="space-y-0.5">
                {MEGA_MENU_COLUMNS.map(col => (
                  <MobileAccordionSection key={col.id} col={col} onClose={closeMobile} t={t} />
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        {/* CTA footer */}
        <div className="px-4 pb-6 pt-3 border-t border-brand-whisper-border dark:border-white/10 shrink-0">
          <Link
            href="/contact"
            onClick={closeMobile}
            className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-[14px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all min-h-[56px]"
          >
            {t('nav.getAudit', 'Free audit')}
          </Link>
          <div className="flex justify-center mt-3">
            <LanguageSwitcher variant="outline" />
          </div>
        </div>
      </aside>
    </>
  )
}
