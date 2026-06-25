'use client'

import Image from 'next/image'
import { useState, useRef, useEffect, Fragment, useMemo } from 'react'
import { Menu, X, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import { brand, sections } from './constants'
import { useI18n } from '@/lib/i18n/provider'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './shared/ThemeToggle'
import { BrandSiteFooter } from './shared/BrandSiteFooter'
import { SidebarTooltip } from './ui/SidebarTooltip'

import { OverviewSection, OverviewBody } from './sections/OverviewSection'
import { PageHero } from './sections/PageHero'
import { LogoPage } from './sections/LogoPage'
import { ColorsPage } from './sections/ColorsPage'
import { TypographyPage } from './sections/TypographyPage'
import { IconographyPage } from './sections/IconographyPage'
import { VoiceTonePage } from './sections/VoiceTonePage'
import { ComponentsPage } from './sections/ComponentsPage'
import { PatternsPage } from './sections/PatternsPage'
import { SpacingGridPage } from './sections/SpacingGridPage'
import { CollateralPage } from './sections/CollateralPage'
import { DigitalAssetsPage } from './sections/DigitalAssetsPage'
import { RealWorldExamplesPage } from './sections/RealWorldExamplesPage'
import { EmailApplicationsPage } from './sections/EmailApplicationsPage'
import { SocialApplicationsPage } from './sections/SocialApplicationsPage'
import { DeckApplicationsPage } from './sections/DeckApplicationsPage'
import { AssetsPage } from './sections/AssetsPage'
import { PromptGeneratorPage } from './prompt-generator/PromptGeneratorPage'
import { searchGuidelineItems, type GuidelineSearchItem } from '@/lib/guideline-search'

export const BrandGuidelinesApp = () => {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(220)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [headerFloating, setHeaderFloating] = useState(false)
  const [scrollTarget, setScrollTarget] = useState<string | null>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartWidth = useRef(0)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const isRtl = document.documentElement.dir === 'rtl'
      const delta = e.clientX - dragStartX.current
      const next = isRtl ? dragStartWidth.current - delta : dragStartWidth.current + delta
      setSidebarWidth(Math.min(360, Math.max(180, next)))
    }
    const onMouseUp = () => { isDragging.current = false }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useEffect(() => {
    setHeaderFloating(false)
    const main = document.getElementById('main-content')
    if (!main) return
    const onScroll = () => setHeaderFloating(main.scrollTop > 8)
    onScroll()
    main.addEventListener('scroll', onScroll, { passive: true })
    return () => main.removeEventListener('scroll', onScroll)
  }, [activeTab])

  useEffect(() => {
    if (!scrollTarget) return
    const main = document.getElementById('main-content')
    const scrollToAnchor = () => {
      const el = document.getElementById(`guideline-${scrollTarget}`)
      if (!el || !main) return false
      const offset = el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 64
      main.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' })
      setScrollTarget(null)
      return true
    }
    if (scrollToAnchor()) return
    const retry = window.setTimeout(scrollToAnchor, 180)
    const retryLate = window.setTimeout(scrollToAnchor, 420)
    return () => {
      window.clearTimeout(retry)
      window.clearTimeout(retryLate)
    }
  }, [activeTab, scrollTarget])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('#page-search')?.focus()
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const searchResults = useMemo(
    () => searchGuidelineItems(searchQuery),
    [searchQuery],
  )

  const selectSearchItem = (item: GuidelineSearchItem) => {
    setActiveTab(item.section)
    setScrollTarget(item.anchor ?? null)
    setSearchQuery('')
    setSearchFocused(false)
  }

  const sectionIconById = useMemo(
    () => new Map(sections.map((section) => [section.id, section.icon])),
    [],
  )

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'logo': return <LogoPage />
      case 'colors': return <ColorsPage onCopy={copyToClipboard} copiedId={copiedId} />
      case 'typography': return <TypographyPage />
      case 'iconography': return <IconographyPage />
      case 'voice': return <VoiceTonePage />
      case 'components': return <ComponentsPage />
      case 'patterns': return <PatternsPage onNavigate={setActiveTab} />
      case 'spacing': return <SpacingGridPage />
      case 'collateral': return <CollateralPage />
      case 'digital': return <DigitalAssetsPage />
      case 'real-world-examples': return <RealWorldExamplesPage onNavigate={setActiveTab} />
      case 'pattern-email': return <EmailApplicationsPage />
      case 'pattern-social': return <SocialApplicationsPage />
      case 'pattern-decks': return <DeckApplicationsPage />
      case 'assets': return <AssetsPage />
      case 'prompts': return <PromptGeneratorPage onNavigate={setActiveTab} />
      default: return <OverviewSection onNavigate={setActiveTab} />
    }
  }

  const currentSection = sections.find(s => s.id === activeTab)
  const effectiveWidth = sidebarCollapsed ? 64 : sidebarWidth
  const groups = ['Start Here', 'Foundations', 'Components', 'Patterns', 'Assets', 'Rules'] as const
  const isRtl = locale === 'ar-masri'
  const showNavTooltips = sidebarCollapsed
  const headerBarHeight = 'h-[52px]'
  const socialLinkClass = headerFloating
    ? 'flex items-center justify-center w-8 h-8 rounded-lg text-brand-navy/70 hover:text-brand-navy hover:bg-black/[0.06] transition-all'
    : 'flex items-center justify-center w-8 h-8 rounded-lg text-brand-text-secondary/60 hover:text-brand-charcoal dark:hover:text-brand-off-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all'

  const sidebarShell =
    'bg-[#0D0F12] border-e border-[#1F2128] shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)]'

  const SidebarNav = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
      {groups.map((group, groupIndex) => {
        const groupLinks = sections.filter(s => s.group === group)
        if (!groupLinks.length) return null
        const collapsed = sidebarCollapsed && !mobile
        return (
          <div key={group} className={collapsed ? 'mb-2' : 'mb-3'}>
            {(!sidebarCollapsed || mobile) && (
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.16em] text-white/25 px-2 ${groupIndex === 0 ? 'pt-1' : 'pt-4'} pb-2`}
                aria-label={`${t(group)} section`}
              >
                {t(group)}
              </p>
            )}
            {collapsed && groupIndex > 0 && (
              <div className="mx-2 mb-2 border-t border-[#1F2128]" aria-hidden />
            )}
            <div className="space-y-1">
              {groupLinks.map((link) => {
                const IconComponent = link.icon
                const isActive = activeTab === link.id
                const label = t(link.label)
                const canonicalState = link.id === 'logo' || link.id === 'digital' || link.id === 'assets' || link.id === 'components' || link.id === 'voice' || link.id === 'spacing'
                  ? 'Canonical'
                  : link.id === 'real-world-examples' || link.id === 'pattern-email' || link.id === 'pattern-social' || link.id === 'pattern-decks'
                    ? 'Reference'
                    : null
                const button = (
                  <button
                    onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false) }}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={collapsed ? label : undefined}
                    className={`w-full flex items-center rounded-lg text-[13px] transition-all duration-150 active:scale-[0.98] ${
                      collapsed ? 'justify-center size-10 mx-auto' : 'gap-3 px-3 py-2.5'
                    } ${
                      isActive
                        ? 'text-[#FFC107] bg-[#FFC107]/[0.12] shadow-[inset_0_0_0_1px_rgba(255,193,7,0.14)]'
                        : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <IconComponent size={17} strokeWidth={1.5} className="shrink-0" />
                    {(!sidebarCollapsed || mobile) && (
                      <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
                        <span className={`truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>{label}</span>
                        {canonicalState ? (
                          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${canonicalState === 'Canonical' ? 'bg-[#FFC107]/[0.12] text-[#FFC107]' : 'bg-white/[0.08] text-white/45'}`}>
                            {canonicalState}
                          </span>
                        ) : null}
                      </span>
                    )}
                  </button>
                )

                return (
                  <Fragment key={link.id}>
                    {collapsed ? (
                      <SidebarTooltip label={label} show={showNavTooltips} rtl={isRtl}>
                        {button}
                      </SidebarTooltip>
                    ) : (
                      button
                    )}
                  </Fragment>
                )
              })}
            </div>
          </div>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-brand-canvas flex relative">
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">
        {t('Skip to content')}
      </a>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 relative sticky top-0 h-screen transition-[width] duration-200 ease-out z-40 ${sidebarShell}`}
        style={{ width: `${effectiveWidth}px` }}
        role="navigation"
        aria-label={t('Brand guidelines navigation')}
      >
        <div className="flex items-center border-b border-[#1F2128] shrink-0 h-[52px] px-3 gap-3 overflow-hidden">
          <Image src="/assets/logo.svg" alt="MediaBubble" width={32} height={32} className="w-8 h-8 shrink-0" />
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-white truncate leading-tight">{brand.name}</p>
              <p className="text-[10px] text-white/45 font-light uppercase tracking-[0.14em]">{t('Brand Guidelines')}</p>
            </div>
          )}
        </div>
        <SidebarNav />
        <div className="p-2.5 border-t border-[#1F2128] shrink-0">
          <SidebarTooltip
            label={sidebarCollapsed ? t('Expand sidebar', 'Expand sidebar') : t('Collapse')}
            show={sidebarCollapsed}
            rtl={isRtl}
          >
            <button
              type="button"
              onClick={() => setSidebarCollapsed(v => !v)}
              aria-label={sidebarCollapsed ? t('Expand sidebar', 'Expand sidebar') : t('Collapse')}
              className={`w-full flex items-center gap-2.5 rounded-lg text-white/40 hover:text-white/75 hover:bg-white/[0.06] transition-all ${
                sidebarCollapsed ? 'justify-center size-10 mx-auto' : 'px-3 py-2.5'
              }`}
            >
              {sidebarCollapsed
                ? <ChevronsRight size={16} strokeWidth={1.5} />
                : <><ChevronsLeft size={16} strokeWidth={1.5} /><span className="text-[11px] font-medium">{t('Collapse')}</span></>
              }
            </button>
          </SidebarTooltip>
        </div>
        {!sidebarCollapsed && (
          <div
            className="absolute top-0 end-0 bottom-0 w-[5px] cursor-col-resize group"
            onMouseDown={(e) => {
              isDragging.current = true
              dragStartX.current = e.clientX
              dragStartWidth.current = sidebarWidth
              e.preventDefault()
            }}
          >
            <div className="absolute top-0 end-0 bottom-0 w-[2px] bg-transparent group-hover:bg-[#FFC107]/30 transition-colors duration-150" />
          </div>
        )}
      </aside>

      {/* Mobile overlay sidebar */}
      <aside className={`
        fixed md:hidden inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-30 w-[240px] ${sidebarShell} flex flex-col
        transition-transform duration-200 ease-out
        ${mobileMenuOpen ? 'translate-x-0 pointer-events-auto' : `${isRtl ? 'translate-x-full' : '-translate-x-full'} pointer-events-none`}
      `}>
        <div className="flex items-center justify-between border-b border-[#1F2128] h-[52px] px-3.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <Image src="/assets/logo.svg" alt="MediaBubble" width={32} height={32} className="w-8 h-8 shrink-0" />
            <p className="text-[12px] font-bold text-white">{brand.name}</p>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-white/40 hover:text-white rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
        <SidebarNav mobile />
      </aside>

      <div
        className={`fixed inset-0 bg-black/40 z-20 md:hidden transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header
          role="banner"
          data-header-floating={headerFloating ? 'true' : 'false'}
          className={`sticky top-0 z-10 ${headerBarHeight} flex items-center shrink-0 border-b transition-colors duration-200 ${
            headerFloating
              ? 'bg-brand-yellow border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
              : 'bg-brand-surface border-brand-whisper-border'
          }`}
        >
          <div className="relative flex items-center w-full h-full px-4 gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1 basis-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`md:hidden p-1.5 rounded-lg transition-all ${
                  headerFloating
                    ? 'text-brand-navy hover:bg-black/[0.06]'
                    : 'text-brand-charcoal dark:text-brand-off-white hover:bg-black/[0.06] dark:hover:bg-white/[0.06]'
                }`}
                aria-label={t('Open menu')}
              >
                <Menu size={19} />
              </button>
              <div className="hidden sm:flex items-center gap-1.5 min-w-0">
                <span className={`text-[11px] font-light truncate ${headerFloating ? 'text-brand-navy/60' : 'text-brand-text-muted'}`}>
                  {t(currentSection?.group || 'Brand')}
                </span>
                <span className={`text-[10px] ${headerFloating ? 'text-brand-navy/35' : 'text-brand-muted-steel'}`}>/</span>
                <span className={`text-[12px] font-semibold truncate ${headerFloating ? 'text-brand-navy' : 'text-brand-yellow'}`}>
                  {t(currentSection?.label || 'Overview')}
                </span>
              </div>
            </div>

            <div className="absolute inset-x-0 flex justify-center pointer-events-none px-20 sm:px-28 md:px-32">
              <div className="pointer-events-auto relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px]" role="search">
                <div
                  className={`flex items-center gap-2 h-8 rounded-lg border transition-all duration-200 ${
                    headerFloating
                      ? 'bg-white/90 border-black/10'
                      : 'bg-brand-surface border-brand-input-border'
                  } ${searchFocused ? 'w-full border-brand-text/30 dark:border-white/20' : 'w-full'}`}
                >
                  <Search size={13} className={`ms-2.5 shrink-0 ${headerFloating ? 'text-brand-navy/40' : 'text-brand-text-secondary/40'}`} />
                  <input
                    id="page-search"
                    type="text"
                    placeholder={t('Search pages…', 'Search logo, colors, components, or assets…')}
                    aria-label={t('Search brand guidelines pages. Press Cmd-K to focus.', 'Search brand guidelines. Press Ctrl+K or ⌘K to focus.')}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => { setSearchFocused(false); setSearchQuery('') }, 160)}
                    className="flex-1 bg-transparent text-[12px] text-brand-text placeholder:text-brand-muted-steel outline-none pe-2.5 min-w-0"
                  />
                  {!searchQuery && !searchFocused && (
                    <kbd className="me-2 text-[10px] text-brand-text-muted font-mono hidden sm:inline">⌘K</kbd>
                  )}
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="me-2 text-brand-text-secondary/40 hover:text-brand-text transition-colors">
                      <X size={12} />
                    </button>
                  )}
                </div>
                {searchFocused && (
                  <div className="absolute start-0 top-full mt-1.5 w-full overflow-hidden bg-brand-surface border border-brand-whisper-border rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-black/40 z-50 animate-scale-in">
                    {!searchQuery.trim() && (
                      <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted sticky top-0 bg-brand-surface">
                        {t('Popular items', 'Start here')}
                      </p>
                    )}
                    {searchResults.length > 0 ? searchResults.map((item) => {
                      const IconComponent = sectionIconById.get(item.section)
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseDown={() => selectSearchItem(item)}
                          className="w-full flex items-start gap-3 px-4 py-2.5 text-start hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors last:pb-3"
                        >
                          {IconComponent ? (
                            <IconComponent size={14} strokeWidth={1.5} className="text-brand-blue shrink-0 mt-0.5" />
                          ) : (
                            <Search size={14} strokeWidth={1.5} className="text-brand-blue shrink-0 mt-0.5" />
                          )}
                          <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-medium text-brand-text truncate">{item.label}</span>
                    <span className="block text-[10px] text-brand-text-muted truncate">
                      {item.context}
                      {item.context.includes('Canonical') ? ' · Canonical' : item.context.includes('Reference') ? ' · Reference' : ''}
                    </span>
                  </span>
                </button>
              )
                    }) : (
                      <div className="px-4 py-3 text-center">
                        <p className="text-[11px] text-brand-text-muted">{t('No pages found', "No pages match your search. Try 'colors', 'logo', or 'typography'.")}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 flex-1 basis-0 justify-end">
              <a
                href="https://github.com/mediabubble"
                target="_blank"
                rel="noopener noreferrer"
                title={t('MediaBubble on GitHub')}
                className={socialLinkClass}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.5 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/mediabubble"
                target="_blank"
                rel="noopener noreferrer"
                title={t('MediaBubble on LinkedIn')}
                className={socialLinkClass}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <span
                className={`mx-1.5 h-5 w-px shrink-0 ${headerFloating ? 'bg-brand-navy/20' : 'bg-brand-whisper-border dark:bg-white/10'}`}
                aria-hidden="true"
              />
              <div className="flex items-center gap-1">
                <ThemeToggle surface={headerFloating ? 'yellow' : 'light'} />
                <LanguageSwitcher
                  className={
                    headerFloating
                      ? 'text-brand-navy/75 hover:text-brand-navy hover:bg-black/[0.06] active:bg-black/[0.08]'
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </header>
        <main id="main-content" role="main" aria-label={t('Main content')} className="flex-1 overflow-y-auto flex flex-col">
          <div key={activeTab} className="animate-fade-in-up flex-1">
            {renderContent()}
          </div>
          <BrandSiteFooter />
        </main>
      </div>
    </div>
  )
}
