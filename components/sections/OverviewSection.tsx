import React from 'react'
import { Layout, Layers, Palette, Type, Shapes, MessageSquare, Square, Grid3X3, FileText, Monitor, Zap, Download, Package, ArrowRight, Mail, Bell, User, Search, Settings } from 'lucide-react'
import { brand } from '../constants'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/I18nProvider'

export function OverviewHero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()
  return (
    <PageHero
      showLogo
      kicker={t('overview.hero.kicker', 'Brand Guidelines')}
      title={t('brand.tagline', brand.tagline)}
      titleHighlight="brand"
      description={t('brand.description', brand.description)}
      stats={[
        { label: t('overview.stats.founded', 'Founded'), value: t('overview.stats.foundedValue', '2015') },
        { label: t('overview.stats.team', 'Team'), value: t('overview.stats.teamValue', '22+ specialists') },
        { label: t('overview.stats.services', 'Services'), value: t('overview.stats.servicesValue', '20+ services') },
        { label: t('overview.stats.clients', 'Clients'), value: t('overview.stats.clientsValue', '200+ brands') },
      ]}
    />
  )
}

export function OverviewBody({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()
  const navCards = [
    { id: 'logo', label: t('nav.logo.label', 'Logo'), desc: t('nav.logo.desc', 'Mark, variants, clear space'), color: '#2196F3', icon: Layers },
    { id: 'colors', label: t('nav.colors.label', 'Color Palette'), desc: t('nav.colors.desc', 'Brand palette, tokens, and contrast checker'), color: '#FFC107', icon: Palette },
    { id: 'typography', label: t('nav.typography.label', 'Typography'), desc: t('nav.typography.desc', 'Poppins, Inter, Cairo'), color: '#1565C0', icon: Type },
    { id: 'iconography', label: t('nav.iconography.label', 'Iconography'), desc: t('nav.iconography.desc', 'Lucide icons, sizing, color, and do/don\u2019t rules'), color: '#2196F3', icon: Shapes },
    { id: 'voice', label: t('nav.voice.label', 'Voice & Tone'), desc: t('nav.voice.desc', 'Copy guidelines & banned words'), color: '#1565C0', icon: MessageSquare },
    { id: 'components', label: t('nav.components.label', 'Components'), desc: t('nav.components.desc', 'Buttons, forms, badges'), color: '#2196F3', icon: Square },
    { id: 'spacing', label: t('nav.spacing.label', 'Spacing & Grid'), desc: t('nav.spacing.desc', '8px base, 9-step scale'), color: '#9E9E9E', icon: Grid3X3 },
    { id: 'collateral', label: t('nav.collateral.label', 'Collateral'), desc: t('nav.collateral.desc', 'Business card, envelope, letterhead'), color: '#FFC107', icon: FileText },
    { id: 'digital', label: t('nav.digital.label', 'Digital Assets'), desc: t('nav.digital.desc', 'Avatar, favicon, email signature'), color: '#1565C0', icon: Monitor },
    { id: 'real-world-examples', label: t('nav.caseStudies.label', 'Case Studies'), desc: t('nav.caseStudies.desc', 'Before/after transformations'), color: '#FFC107', icon: Zap },
    { id: 'assets', label: t('nav.assets.label', 'Asset Library'), desc: t('nav.assets.desc', 'Logos (SVG, PNG), brand guide PDF, Figma kit, color tokens'), color: '#9E9E9E', icon: Package },
  ]

  return (
    <div>

      {/* Nav cards */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('overview.guidelinesIndex', 'Guidelines Index')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 stagger-grid">
          {navCards.map((card) => {
            const IconComp = card.icon
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="bg-white rounded-xl border border-[#E8E8E8] p-4 text-start transition-all duration-150 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand-yellow"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${card.color}15` }}>
                  <IconComp size={18} strokeWidth={1.5} style={{ color: card.color }} />
                </div>
                <p className="text-[13px] font-semibold text-[#333333] leading-tight mb-1">{card.label}</p>
                <p className="text-[11px] text-[#9E9E9E] leading-snug">{card.desc}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Brand pillars */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('overview.pillars.heading', 'Brand Pillars')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-grid">
          {[
            { nameKey: 'creative', name: t('pillars.creative.name', 'Creative'), def: t('pillars.creative.def', 'Ideas with a point of view. Not decoration, not trend-following — work that earns attention because it earns trust.'), color: '#FFC107', icon: '/assets/elements/icon-star-01.png' },
            { nameKey: 'strategic', name: t('pillars.strategic.name', 'Strategic'), def: t('pillars.strategic.def', 'Every decision traces back to a goal. We align visual choices, copy, and media to what the client is actually trying to achieve.'), color: '#2196F3', icon: '/assets/elements/icon-star-02.png' },
            { nameKey: 'dataDriven', name: t('pillars.dataDriven.name', 'Data-Driven'), def: t('pillars.dataDriven.def', 'Numbers inform, not decide. We read performance data, test hypotheses, and improve — creative judgment stays in the loop, not out of it.'), color: '#1565C0', icon: '/assets/elements/icon-star-02.png' },
          ].map((p) => (
            <div key={p.nameKey} className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
              <div className="h-1" style={{ backgroundColor: p.color }} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <img src={p.icon} alt="" className="w-5 h-5" />
                  <p className="font-display text-base font-semibold text-brand.dark-blue">{p.name}</p>
                </div>
                <p className="text-sm text-[#666666] leading-relaxed">{p.def}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual system snapshot */}
      <section className="mb-10">
        <div className="bg-[#EBF5FB] rounded-lg px-4 py-2.5 mb-5">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('overview.visualSystem.heading', 'Visual System at a Glance')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Colors */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9E9E9E] mb-3">{t('overview.visualSystem.colors', 'Colors')}</p>
            <div className="flex gap-2 mb-3">
              {['#2196F3', '#1565C0', '#FFC107', '#072A6B', '#333333', '#FAFAFA'].map((c) => (
                <div key={c} className="w-7 h-7 rounded-lg border border-[#E8E8E8]" style={{ backgroundColor: c }} title={c} />
              ))}
            </div>
            <button onClick={() => onNavigate('colors')} className="text-[11px] font-semibold text-[#2196F3] hover:underline flex items-center gap-1">
              {t('overview.visualSystem.viewPalette', 'View palette')} <ArrowRight size={12} />
            </button>
          </div>
          {/* Typography */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9E9E9E] mb-3">{t('overview.visualSystem.typography', 'Typography')}</p>
            <p className="font-display text-lg font-bold text-brand.dark-blue leading-tight mb-1">Poppins</p>
            <p className="font-sans text-sm text-[#666666] leading-snug mb-3">{t('overview.visualSystem.bodyFont', 'Inter for body copy')}</p>
            <button onClick={() => onNavigate('typography')} className="text-[11px] font-semibold text-[#2196F3] hover:underline flex items-center gap-1">
              {t('overview.visualSystem.viewFonts', 'View fonts')} <ArrowRight size={12} />
            </button>
          </div>
          {/* Icons */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9E9E9E] mb-3">{t('overview.visualSystem.iconography', 'Iconography')}</p>
            <div className="flex gap-2 mb-3">
              {([Search, Settings, Mail, Bell, User, ArrowRight] as React.ComponentType<{size: number; strokeWidth: number; className: string}>[]).map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                  <Icon size={15} strokeWidth={1.5} className="text-[#2196F3]" />
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('iconography')} className="text-[11px] font-semibold text-[#2196F3] hover:underline flex items-center gap-1">
              {t('overview.visualSystem.viewIcons', 'View icons')} <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('overview.services.heading', 'Service Areas')}</h2>
        </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E8E8E8] rounded-xl overflow-hidden">
          <img src="/assets/elements/photo-global-reach.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none select-none" />
          {brand.services.map((service, idx) => (
            <div key={service.name} className="flex items-start gap-3 px-5 py-4 bg-white transition-all duration-150 hover:bg-[#FAFAFA] active:bg-[#F5F5F5]">
              <div className="w-9 h-9 rounded-lg bg-[#0D0F12] flex items-center justify-center shrink-0 mt-0.5">
                <ArrowRight size={14} className="text-[#FFC107]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#333333]">{t(`services.${idx}.name`, service.name)}</p>
                <p className="text-sm text-[#666666] leading-relaxed mt-0.5">{t(`services.${idx}.desc`, service.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function OverviewSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div>
      <OverviewHero onNavigate={onNavigate} />
      <OverviewBody onNavigate={onNavigate} />
    </div>
  )
}
