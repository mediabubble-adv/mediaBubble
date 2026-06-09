'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import { brand, sections } from './constants'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

import { OverviewSection, OverviewBody } from './sections/OverviewSection'
import { PageHero } from './sections/PageHero'
import { GettingStartedPage } from './sections/GettingStartedPage'
import { LogoPage } from './sections/LogoPage'
import { ColorsPage } from './sections/ColorsPage'
import { TypographyPage } from './sections/TypographyPage'
import { IconographyPage } from './sections/IconographyPage'
import { VoiceTonePage } from './sections/VoiceTonePage'
import { ComponentsPage } from './sections/ComponentsPage'
import { SpacingGridPage } from './sections/SpacingGridPage'
import { CollateralPage } from './sections/CollateralPage'
import { DigitalAssetsPage } from './sections/DigitalAssetsPage'
import { RealWorldExamplesPage } from './sections/RealWorldExamplesPage'
import { AssetsPage } from './sections/AssetsPage'
import { PromptsPage } from './sections/PromptsPage'

export const BrandGuidelinesApp = () => {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(220)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartWidth = useRef(0)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const delta = e.clientX - dragStartX.current
      setSidebarWidth(Math.min(360, Math.max(180, dragStartWidth.current + delta)))
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

  const filteredSections = searchQuery.trim()
    ? sections.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started': return <GettingStartedPage onNavigate={setActiveTab} />
      case 'logo': return <LogoPage />
      case 'colors': return <ColorsPage onCopy={copyToClipboard} copiedId={copiedId} />
      case 'typography': return <TypographyPage />
      case 'iconography': return <IconographyPage />
      case 'voice': return <VoiceTonePage />
      case 'components': return <ComponentsPage />
      case 'spacing': return <SpacingGridPage />
      case 'collateral': return <CollateralPage />
      case 'digital': return <DigitalAssetsPage />
      case 'real-world-examples': return <RealWorldExamplesPage />
      case 'assets': return <AssetsPage />
      case 'prompts': return <PromptsPage />
      default: return <OverviewSection onNavigate={setActiveTab} />
    }
  }

  const currentSection = sections.find(s => s.id === activeTab)
  const effectiveWidth = sidebarCollapsed ? 60 : sidebarWidth
  const groups = ['Brand', 'Identity', 'System', 'Application'] as const

  const SidebarNav = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
      {groups.map((group) => {
        const groupLinks = sections.filter(s => s.group === group)
        if (!groupLinks.length) return null
        return (
          <div key={group} className="mb-1">
            {(!sidebarCollapsed || mobile) && (
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/20 px-4 pt-3 pb-1" aria-label={`${t(group)} section`}>{t(group)}</p>
            )}
            <div className="px-2 space-y-0.5">
              {groupLinks.map((link) => {
                const IconComponent = link.icon
                const isActive = activeTab === link.id
                return (
                    <button
                      key={link.id}
                      onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false) }}
                      title={sidebarCollapsed && !mobile ? link.label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-150 active:scale-[0.98] ${
                      sidebarCollapsed && !mobile ? 'justify-center' : ''
                    } ${
                      isActive
                        ? 'text-[#FFC107] bg-[#FFC107]/[0.1] shadow-[inset_0_0_0_1px_rgba(255,193,7,0.12)]'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <IconComponent size={16} strokeWidth={1.5} className="shrink-0" />
                    {(!sidebarCollapsed || mobile) && (
                      <span className={`truncate ${isActive ? 'font-semibold' : ''}`}>{t(link.label)}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex relative">
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">
        {t('Skip to content')}
      </a>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col shrink-0 bg-[#072A6B] sticky top-0 h-screen transition-[width] duration-200 ease-out"
        style={{ width: `${effectiveWidth}px` }}
        role="navigation"
        aria-label={t('Brand guidelines navigation')}
      >
        <div className="flex items-center border-b border-white/[0.06] shrink-0 h-[46px] px-3 gap-2.5 overflow-hidden">
          <img src="/assets/logo.svg" alt="MediaBubble" className="w-8 h-8 shrink-0" />
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-white truncate leading-tight">{brand.name}</p>
              <p className="text-[10px] text-white/40 font-light uppercase tracking-[0.14em]">{t('Brand Guidelines')}</p>
            </div>
          )}
        </div>
        <SidebarNav />
        <div className="p-2 border-t border-white/[0.06] shrink-0">
          <button
            onClick={() => setSidebarCollapsed(v => !v)}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-white/35 hover:text-white/70 hover:bg-white/[0.05] transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            {sidebarCollapsed
              ? <ChevronsRight size={15} strokeWidth={1.5} />
              : <><ChevronsLeft size={15} strokeWidth={1.5} /><span className="text-[11px]">{t('Collapse')}</span></>
            }
          </button>
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
        fixed md:hidden inset-y-0 start-0 z-30 w-[220px] bg-[#072A6B] flex flex-col
        transition-transform duration-200 ease-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between border-b border-white/[0.06] h-[46px] px-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.svg" alt="MediaBubble" className="w-8 h-8 shrink-0" />
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
        <header role="banner" className="sticky top-0 z-10 bg-white border-b border-[#E8E8E8] h-[46px] flex items-center gap-3 px-4 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-[#0D0F12] hover:bg-black/[0.06] rounded-lg transition-all"
            aria-label={t('Open menu')}
          >
            <Menu size={19} />
          </button>
          <div className="hidden sm:flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] text-[#9E9E9E] font-light truncate">            {t(currentSection?.group || 'Brand')}</span>
            <span className="text-brand.muted-steel text-[10px]">/</span>
            <span className="text-[12px] font-semibold text-[#FFC107] truncate">{t(currentSection?.label || 'Overview')}</span>
          </div>
          <div className="ms-auto flex items-center gap-1.5">
            <a
              href="https://github.com/mediabubble"
              target="_blank"
              rel="noopener noreferrer"
              title="MediaBubble on GitHub"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-[#666666]/60 hover:text-[#0D0F12] hover:bg-black/[0.05] transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/company/mediabubble"
              target="_blank"
              rel="noopener noreferrer"
              title="MediaBubble on LinkedIn"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-[#666666]/60 hover:text-[#0D0F12] hover:bg-black/[0.05] transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <LanguageSwitcher />
          <div className="relative" role="search">
            <div className={`flex items-center gap-2 h-8 rounded-lg bg-white border border-[#E0E0E0] transition-all duration-200 ${searchFocused ? 'w-52 border-[#333333]/30' : 'w-40'}`}>
              <Search size={13} className="text-[#666666]/40 ms-2.5 shrink-0" />
              <input
                id="page-search"
                type="text"
                placeholder={t('Search pages…', 'Search guidelines…')}
                aria-label={t('Search brand guidelines pages. Press Cmd-K to focus.', 'Search brand guidelines. Press Ctrl+K or ⌘K to focus.')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => { setSearchFocused(false); setSearchQuery('') }, 160)}
                className="flex-1 bg-transparent text-[12px] text-[#333333] placeholder:text-brand.muted-steel outline-none pe-2.5 min-w-0"
              />
              {!searchQuery && !searchFocused && (
                <kbd className="me-2 text-[10px] text-[#9E9E9E] font-mono hidden sm:inline">⌘K</kbd>
              )}
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="me-2 text-[#666666]/40 hover:text-[#333333] transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>
            {searchFocused && searchQuery.trim() && (
              <div className="absolute end-0 top-full mt-1.5 w-52 bg-white border border-[#E0E0E0] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden z-50 animate-scale-in">
                {filteredSections.length > 0 ? filteredSections.map(section => {
                  const IconComponent = section.icon
                  return (
                    <button
                      key={section.id}
                      onMouseDown={() => { setActiveTab(section.id); setSearchQuery(''); setSearchFocused(false) }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-start hover:bg-[#F5F5F5] transition-colors"
                    >
                      <IconComponent size={14} strokeWidth={1.5} className="text-[#2196F3] shrink-0" />
                      <span className="text-[12px] text-[#333333]">{t(section.label)}</span>
                      <span className="ms-auto text-[10px] text-[#9E9E9E]">{t(section.group)}</span>
                    </button>
                  )
                }) : (
                  <div className="px-4 py-3 text-center">
                    <p className="text-[11px] text-[#9E9E9E]">{t('No pages found', "No pages match your search. Try 'colors', 'logo', or 'typography'.")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        </header>
        <main id="main-content" role="main" aria-label={t('Main content')} className="flex-1 overflow-y-auto">
          {activeTab === 'overview' ? (
            <div>
              <PageHero
                kicker={t('Brand Guidelines')}
                title={t(brand.tagline)}
                description={t(brand.description)}
                showLogo
                stats={[
                  { label: t('Founded'), value: '2015' },
                  { label: t('Team'), value: '22+ people' },
                  { label: t('Services'), value: '20+ disciplines' },
                  { label: t('Clients'), value: '200+ brands' },
                ]}
              />
              <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto animate-fade-in-up">
                <OverviewBody onNavigate={setActiveTab} />
              </div>
            </div>
          ) : (
            <div key={activeTab} className="animate-fade-in-up">
              {renderContent()}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
