import React, { useState, useEffect } from 'react'
import { 
  Layout, Layers, Palette, Type, Shapes, MessageSquare, Square, 
  Grid3X3, FileText, Monitor, Zap, Download, Package, ArrowRight, 
  Mail, Bell, User, Search, Settings, BookOpen, HelpCircle, Copy, Check, X 
} from 'lucide-react'
import { brand, sections } from '../constants'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading, BrandInfoBand, brandDocCardShell } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function OverviewHero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()
  return (
    <PageHero
      showLogo
      icon={BookOpen}
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

  const [activeStep, setActiveStep] = useState(0)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [activeFont, setActiveFont] = useState<'poppins' | 'inter' | 'cairo'>('poppins')
  const [copiedCode, setCopiedCode] = useState(false)

  const steps = [
    {
      id: 'colors',
      icon: Palette,
      step: '01',
      title: t('findYourColors', 'Brand Colors'),
      description: t('findYourColorsDesc', 'Explore the core palette. Click any swatch to copy its HEX value instantly to your clipboard.'),
      page: 'colors',
      action: t('goToColors', 'Go to Colors'),
    },
    {
      id: 'typography',
      icon: Type,
      step: '02',
      title: t('setYourType', 'Typography Scale'),
      description: t('setYourTypeDesc', 'Switch between brand families and weights to preview how Cairo (AR) pairs with Poppins & Inter (EN).'),
      page: 'typography',
      action: t('goToTypography', 'Go to Typography'),
    },
    {
      id: 'components',
      icon: Square,
      step: '03',
      title: t('useComponents', 'Interactive Components'),
      description: t('useComponentsDesc', 'Test standard buttons in primary, secondary, and muted states. Copy the React component code with one click.'),
      page: 'components',
      action: t('goToComponents', 'Go to Components'),
    },
    {
      id: 'voice',
      icon: MessageSquare,
      step: '04',
      title: t('matchTheTone', 'Voice & Copywriting'),
      description: t('matchTheToneDesc', 'Observe how our strategic voice communicates. Contrast recommended copy against forbidden phrases.'),
      page: 'voice',
      action: t('goToVoiceTone', 'Go to Voice & Tone'),
    },
  ]

  const quickActions = [
    {
      label: t('copyColor', 'Copy a Color'),
      desc: t('copyColorDesc', 'Jump to the palette and copy HEX values instantly.'),
      page: 'colors',
      shortcut: '⌘1',
    },
    {
      label: t('previewFont', 'Preview a Font'),
      desc: t('previewFontDesc', 'See Poppins, Inter, JetBrains Mono, and Cairo at every weight.'),
      page: 'typography',
      shortcut: '⌘2',
    },
    {
      label: t('buildFromComponent', 'Build from a Component'),
      desc: t('buildFromComponentDesc', 'Copy button, input, card, and badge code with all states included.'),
      page: 'components',
      shortcut: '⌘3',
    },
  ]

  const navCards = [
    { id: 'logo', label: t('nav.logo.label', 'Logo'), desc: t('nav.logo.desc', 'Mark, variants, clear space'), color: 'text-brand-blue bg-brand-blue/10', icon: Layers },
    { id: 'colors', label: t('nav.colors.label', 'Color Palette'), desc: t('nav.colors.desc', 'Brand palette, tokens, and contrast checker'), color: 'text-brand-yellow bg-brand-yellow/10', icon: Palette },
    { id: 'typography', label: t('nav.typography.label', 'Typography'), desc: t('nav.typography.desc', 'Poppins, Inter, Cairo'), color: 'text-brand-navy dark:text-brand-blue bg-brand-navy/10 dark:bg-brand-blue/10', icon: Type },
    { id: 'iconography', label: t('nav.iconography.label', 'Iconography'), desc: t('nav.iconography.desc', 'Lucide icons, sizing, color, and do/don’t rules'), color: 'text-brand-blue bg-brand-blue/10', icon: Shapes },
    { id: 'voice', label: t('nav.voice.label', 'Voice & Tone'), desc: t('nav.voice.desc', 'Copy guidelines & banned words'), color: 'text-brand-navy dark:text-brand-blue bg-brand-navy/10 dark:bg-brand-blue/10', icon: MessageSquare },
    { id: 'components', label: t('nav.components.label', 'Components'), desc: t('nav.components.desc', 'Buttons, forms, badges'), color: 'text-brand-blue bg-brand-blue/10', icon: Square },
    { id: 'spacing', label: t('nav.spacing.label', 'Spacing & Grid'), desc: t('nav.spacing.desc', '8px base, 9-step scale'), color: 'text-brand-muted-steel bg-brand-muted-steel/10', icon: Grid3X3 },
    { id: 'collateral', label: t('nav.collateral.label', 'Collateral'), desc: t('nav.collateral.desc', 'Business card, envelope, letterhead'), color: 'text-brand-yellow bg-brand-yellow/10', icon: FileText },
    { id: 'digital', label: t('nav.digital.label', 'Digital Assets'), desc: t('nav.digital.desc', 'Avatar, favicon, email signature'), color: 'text-brand-navy dark:text-brand-blue bg-brand-navy/10 dark:bg-brand-blue/10', icon: Monitor },
    { id: 'real-world-examples', label: t('nav.caseStudies.label', 'Case Studies'), desc: t('nav.caseStudies.desc', 'Before/after transformations'), color: 'text-brand-yellow bg-brand-yellow/10', icon: Zap },
    { id: 'assets', label: t('nav.assets.label', 'Asset Library'), desc: t('nav.assets.desc', 'Logos (SVG, PNG), brand guide PDF, Figma kit, color tokens'), color: 'text-brand-muted-steel bg-brand-muted-steel/10', icon: Package },
  ]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return
      const map: Record<string, string> = { '1': 'colors', '2': 'typography', '3': 'components' }
      const page = map[e.key]
      if (page) { e.preventDefault(); onNavigate(page) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onNavigate])

  return (
    <BrandPageContent>
      {/* Interactive Quick Start Playground */}
      <section className="mb-14">
        <BrandSectionHeading icon={BookOpen} title={t('quickStartSteps', 'Interactive Brand Playground')} />
        
        {/* Playground Tabs */}
        <div className="flex flex-col md:flex-row gap-2 mb-6 border-b border-brand-whisper-border dark:border-brand-light-border/20 pb-2">
          {steps.map((s, idx) => {
            const IconComp = s.icon
            const isActive = activeStep === idx
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg text-start transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-blue/[0.06] dark:bg-brand-blue/10 border-s-2 md:border-s-0 md:border-b-2 border-brand-blue' 
                    : 'hover:bg-brand-blue/[0.02] dark:hover:bg-white/[0.02] border-s-2 border-transparent md:border-b-2'
                }`}
              >
                <span className={`text-xs font-mono font-bold leading-none ${isActive ? 'text-brand-blue' : 'text-brand-text-muted'}`}>
                  {s.step}
                </span>
                <IconComp size={16} className={isActive ? 'text-brand-blue' : 'text-brand-text-secondary'} />
                <span className={`text-sm font-semibold leading-none ${isActive ? 'text-brand-text font-bold' : 'text-brand-text-secondary'}`}>
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Tab Panel Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-brand-surface border border-brand-whisper-border dark:border-brand-light-border/40 rounded-xl p-6 shadow-sm">
          {/* Details & CTA Column */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-brand-blue dark:text-brand-blue font-bold block mb-1">
                {t('stepNumber', 'Interactive Preview')} {steps[activeStep].step}
              </span>
              <h3 className="font-display text-xl font-bold text-brand-text mb-3">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed mb-6 text-wrap pretty">
                {steps[activeStep].description}
              </p>
            </div>
            <button
              onClick={() => onNavigate(steps[activeStep].page)}
              className="self-start inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-brand-navy dark:bg-brand-blue text-white rounded-lg hover:bg-brand-blue dark:hover:bg-brand-blue/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              {steps[activeStep].action}
              <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-[2px]" />
            </button>
          </div>

          {/* Interactive Widget Column */}
          <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#0b1220] rounded-xl border border-brand-whisper-border dark:border-brand-light-border/20 p-5 flex flex-col justify-center min-h-[220px]">
            {activeStep === 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: 'Brand Blue', hex: '#2196F3', textClass: 'text-white' },
                  { name: 'Dark Blue', hex: '#1565C0', textClass: 'text-white' },
                  { name: 'Yellow', hex: '#FFC107', textClass: 'text-brand-navy' },
                  { name: 'Gold', hex: '#E8B506', textClass: 'text-brand-navy' },
                  { name: 'Charcoal', hex: '#0D0F12', textClass: 'text-white' },
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      navigator.clipboard.writeText(c.hex)
                      setCopiedColor(c.hex)
                      setTimeout(() => setCopiedColor(null), 2000)
                    }}
                    className="relative aspect-square rounded-xl p-3 flex flex-col justify-between text-start border border-brand-whisper-border dark:border-brand-light-border/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group shadow-sm overflow-hidden"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedColor === c.hex && (
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-1 animate-fade-in">
                        <Check className="text-brand-yellow mb-1" size={18} />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Copied!</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-mono opacity-80 uppercase ${c.textClass}`}>{c.hex}</span>
                      <Copy size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${c.textClass}`} />
                    </div>
                    <div>
                      <p className={`text-[11px] font-semibold leading-tight ${c.textClass}`}>{c.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activeStep === 1 && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 bg-brand-surface border border-brand-whisper-border dark:border-brand-light-border/20 p-1 rounded-lg self-start">
                  {[
                    { id: 'poppins', label: 'Poppins (Headings)' },
                    { id: 'inter', label: 'Inter (Body)' },
                    { id: 'cairo', label: 'Cairo (Arabic)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFont(f.id as any)}
                      className={`text-xs px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                        activeFont === f.id 
                          ? 'bg-brand-navy dark:bg-brand-blue text-white shadow-sm' 
                          : 'text-brand-text-secondary hover:text-brand-text'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                
                <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border/10 p-4 min-h-[140px] flex flex-col justify-between">
                  <div>
                    {activeFont === 'poppins' && (
                      <div className="flex flex-col gap-3">
                        <p className="font-display text-lg sm:text-xl font-extrabold text-brand-navy dark:text-brand-blue tracking-tight leading-snug">
                          Strategic creative that grows brands.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-brand-text-secondary bg-brand-canvas dark:bg-black/20 p-2 rounded border border-brand-whisper-border/50 dark:border-brand-light-border/5">
                          <div>Family: Poppins (EN)</div>
                          <div>Class: font-display</div>
                          <div>Weight: 800 (Extra Bold)</div>
                          <div>Usage: Headings &amp; Hero</div>
                        </div>
                      </div>
                    )}
                    {activeFont === 'inter' && (
                      <div className="flex flex-col gap-3">
                        <p className="font-sans text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                          MediaBubble is a marketing and advertising agency based in Hurghada, Egypt. Since 2015, we measure outcomes, not outputs.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-brand-text-secondary bg-brand-canvas dark:bg-black/20 p-2 rounded border border-brand-whisper-border/50 dark:border-brand-light-border/5">
                          <div>Family: Inter (EN)</div>
                          <div>Class: font-sans</div>
                          <div>Weight: 400 (Regular)</div>
                          <div>Usage: Body &amp; Interface</div>
                        </div>
                      </div>
                    )}
                    {activeFont === 'cairo' && (
                      <div className="flex flex-col gap-3">
                        <p className="font-cairo text-sm sm:text-base font-bold text-brand-navy dark:text-brand-blue text-right leading-relaxed" dir="rtl">
                          إبداع استراتيجي يملأ القاعات وينمي العلامات التجارية.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-brand-text-secondary bg-brand-canvas dark:bg-black/20 p-2 rounded border border-brand-whisper-border/50 dark:border-brand-light-border/5" dir="ltr">
                          <div>Family: Cairo (AR)</div>
                          <div>Class: font-cairo</div>
                          <div>Weight: 700 (Bold)</div>
                          <div>Usage: Arabic Copy</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-brand-whisper-border/50 dark:border-brand-light-border/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-brand-muted-steel">
                      {activeFont === 'poppins' && 'font-display font-extrabold tracking-tight'}
                      {activeFont === 'inter' && 'font-sans text-sm text-brand-text-secondary'}
                      {activeFont === 'cairo' && 'font-cairo text-base font-bold'}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-yellow">
                      {activeFont === 'cairo' ? 'Cairo' : activeFont === 'poppins' ? 'Poppins' : 'Inter'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4 bg-brand-surface border border-brand-whisper-border dark:border-brand-light-border/10 p-6 rounded-xl relative overflow-hidden shadow-sm">
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2196F3 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                  
                  <button 
                    className="relative z-10 px-4 py-2 rounded-lg bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-semibold text-xs shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
                    onClick={() => {
                      navigator.clipboard.writeText('<button className="px-4 py-2 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-semibold rounded-lg shadow-sm transition-all">Primary Button</button>')
                      setCopiedCode(true)
                      setTimeout(() => setCopiedCode(false), 2000)
                    }}
                  >
                    Primary CTA
                  </button>
                  <button 
                    className="relative z-10 px-4 py-2 rounded-lg bg-brand-navy dark:bg-brand-blue text-white font-semibold text-xs shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
                    onClick={() => {
                      navigator.clipboard.writeText('<button className="px-4 py-2 bg-brand-navy dark:bg-brand-blue text-white font-semibold rounded-lg shadow-sm transition-all">Secondary Button</button>')
                      setCopiedCode(true)
                      setTimeout(() => setCopiedCode(false), 2000)
                    }}
                  >
                    Secondary CTA
                  </button>
                  <button 
                    className="relative z-10 px-4 py-2 rounded-lg border border-brand-whisper-border dark:border-brand-light-border/40 hover:bg-brand-blue/[0.04] dark:hover:bg-white/[0.04] text-brand-text font-semibold text-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
                    onClick={() => {
                      navigator.clipboard.writeText('<button className="px-4 py-2 border border-brand-whisper-border dark:border-brand-light-border/40 hover:bg-brand-blue/[0.04] text-brand-text font-semibold rounded-lg transition-all">Outline Button</button>')
                      setCopiedCode(true)
                      setTimeout(() => setCopiedCode(false), 2000)
                    }}
                  >
                    Outline CTA
                  </button>
                </div>
                
                <div className="relative bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border/10 p-4 flex flex-col gap-2 min-h-[90px] justify-between overflow-hidden shadow-sm">
                  {copiedCode && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-1 rounded-xl animate-fade-in">
                      <Check className="text-brand-yellow mb-1" size={18} />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Button JSX Code Copied!</span>
                    </div>
                  )}
                  <p className="text-[11px] font-semibold text-brand-text-muted">{t('clickBtnToCopyCode', 'Click any button to copy its React JSX code:')}</p>
                  <div className="bg-brand-canvas dark:bg-[#0b1220]/50 p-2.5 rounded-lg border border-brand-whisper-border/30 dark:border-brand-light-border/5">
                    <code className="text-[10.5px] font-mono text-brand-blue leading-snug break-all block">
                      &lt;button className=&quot;bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy ... /&gt;
                    </code>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Check size={14} className="stroke-[2.5]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t('voiceDo', 'DO (Strategic & Outcomes)')}</span>
                  </div>
                  <p className="text-xs text-brand-text leading-relaxed font-medium">
                    &quot;We audit your current SEO profile, optimize target keywords, and build clean landing pages to drive direct leads.&quot;
                  </p>
                </div>
                
                <div className="bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 dark:border-rose-500/30 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                    <X size={14} className="stroke-[2.5]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t('voiceDont', 'DON\'T (Vague Slop)')}</span>
                  </div>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    &quot;We deliver synergy-based full-service marketing capabilities to maximize visual paradigm alignments.&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Guidelines Index */}
      <section className="mb-14">
        <BrandSectionHeading icon={Layout} title={t('overview.guidelinesIndex', 'Guidelines Index')} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 stagger-grid">
          {navCards.map((card) => {
            const IconComp = card.icon
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`${brandDocCardShell} p-4 text-start transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 active:scale-[0.97] border border-brand-whisper-border dark:border-brand-light-border/40 group`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 ${card.color}`}>
                  <IconComp size={18} strokeWidth={1.5} />
                </div>
                <p className="text-[13px] font-semibold text-brand-text leading-tight mb-1 group-hover:text-brand-blue transition-colors">{card.label}</p>
                <p className="text-[11px] text-brand-text-muted leading-snug">{card.desc}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Quick Actions & Pro Tip */}
      <section className="mb-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BrandSectionHeading icon={Zap} title={t('quickActions', 'Quick Actions')} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => onNavigate(a.page)}
                className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border/40 px-5 py-5 text-start shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out group"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-semibold text-brand-navy dark:text-brand-blue group-hover:text-brand-blue transition-colors">{a.label}</p>
                  <span className="text-[10px] font-mono text-brand-muted-steel bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border/20 dark:border-brand-light-border/10 px-1.5 py-0.5 rounded">{a.shortcut}</span>
                </div>
                <p className="text-sm text-brand-text-secondary leading-relaxed">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="mb-4 hidden lg:block h-6" /> {/* spacer to align headers */}
          <div className="flex items-start gap-4 bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border/40 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out h-[122px]">
            <div className="w-9 h-9 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
              <span className="text-brand-yellow text-base font-bold leading-none">i</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-text mb-0.5">{t('proTipTitle', 'Pro tip')}</p>
              <p className="text-[12px] text-brand-text-secondary leading-relaxed text-wrap pretty">
                {t('proTipDesc', 'Press ⌘K or Ctrl+K to search pages from anywhere in the guide.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand pillars */}
      <section className="mb-14">
        <BrandSectionHeading icon={Shapes} title={t('overview.pillars.heading', 'Brand Pillars')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-grid">
          {[
            { nameKey: 'creative', name: t('pillars.creative.name', 'Creative'), def: t('pillars.creative.def', 'Ideas with a point of view. Not decoration, not trend-following — work that earns attention because it earns trust.'), color: 'from-brand-yellow to-accent-gold', icon: Shapes },
            { nameKey: 'strategic', name: t('pillars.strategic.name', 'Strategic'), def: t('pillars.strategic.def', 'Every decision traces back to a goal. We align visual choices, copy, and media to what the client is actually trying to achieve.'), color: 'from-brand-blue to-brand-navy', icon: Zap },
            { nameKey: 'dataDriven', name: t('pillars.dataDriven.name', 'Data-Driven'), def: t('pillars.dataDriven.def', 'Numbers inform, not decide. We read performance data, test hypotheses, and improve — creative judgment stays in the loop, not out of it.'), color: 'from-brand-navy dark:from-brand-blue to-brand-blue dark:to-brand-navy', icon: Monitor },
          ].map((p) => {
            const PillarIcon = p.icon
            return (
              <div key={p.nameKey} className={`${brandDocCardShell} overflow-hidden border border-brand-whisper-border dark:border-brand-light-border/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out h-full flex flex-col`}>
                <div className={`h-1 bg-gradient-to-r ${p.color}`} />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                        <PillarIcon size={16} />
                      </div>
                      <p className="font-display text-base font-semibold text-brand-dark-blue dark:text-brand-off-white">{p.name}</p>
                    </div>
                    <p className="text-sm text-brand-text-secondary leading-relaxed">{p.def}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Visual System & Service Portfolio (Unified Height Grid) */}
      <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual System Snapshot */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-brand-surface border border-brand-whisper-border dark:border-brand-light-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
            <div>
              <BrandSectionHeading icon={Monitor} title={t('overview.visualSystem.heading', 'Visual System at a Glance')} className="mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Colors Card */}
                <div className="bg-brand-canvas dark:bg-[#0b1220]/50 rounded-xl border border-brand-whisper-border/30 dark:border-brand-light-border/5 p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted mb-3">{t('overview.visualSystem.colors', 'Colors')}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['#2196F3', '#1565C0', '#FFC107', '#E8B506', '#0D0F12', '#FAFAFA'].map((c) => (
                        <div key={c} className="w-7 h-7 rounded-lg border border-brand-whisper-border dark:border-brand-light-border/20 shadow-sm transition-transform hover:scale-105" style={{ backgroundColor: c }} title={c} />
                      ))}
                    </div>
                  </div>
                  <button onClick={() => onNavigate('colors')} className="text-[11px] font-semibold text-brand-blue hover:underline flex items-center gap-1 self-start mt-2">
                    {t('overview.visualSystem.viewPalette', 'View palette')} <ArrowRight size={12} />
                  </button>
                </div>

                {/* Typography Card */}
                <div className="bg-brand-canvas dark:bg-[#0b1220]/50 rounded-xl border border-brand-whisper-border/30 dark:border-brand-light-border/5 p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted mb-3">{t('overview.visualSystem.typography', 'Typography')}</p>
                    <p className="font-display text-lg font-bold text-brand-dark-blue dark:text-brand-off-white leading-tight mb-1">Poppins</p>
                    <p className="font-sans text-xs text-brand-text-secondary leading-snug mb-4">{t('overview.visualSystem.bodyFont', 'Inter for body copy, Cairo for Arabic layouts')}</p>
                  </div>
                  <button onClick={() => onNavigate('typography')} className="text-[11px] font-semibold text-brand-blue hover:underline flex items-center gap-1 self-start mt-2">
                    {t('overview.visualSystem.viewFonts', 'View fonts')} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Service Portfolio */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-brand-surface border border-brand-whisper-border dark:border-brand-light-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
            <div>
              <BrandSectionHeading icon={Palette} title={t('overview.services.heading', 'Service Areas')} className="mb-5" />
              <div className="flex flex-col justify-between bg-brand-canvas dark:bg-[#0b1220]/50 rounded-xl border border-brand-whisper-border/30 dark:border-brand-light-border/5 overflow-hidden">
                <div className="flex flex-col divide-y divide-brand-whisper-border/50 dark:divide-brand-light-border/5">
                  {brand.services.map((service, idx) => (
                    <div key={service.name} className="flex items-start gap-3 px-4 py-3.5 hover:bg-brand-blue/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                      <div className="w-6 h-6 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0 mt-0.5 text-brand-yellow">
                        <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <div>
                        <p className="text-[12.5px] font-semibold text-brand-text leading-tight">{t(`services.${idx}.name`, service.name)}</p>
                        <p className="text-[11.5px] text-brand-text-secondary leading-snug mt-1">{t(`services.${idx}.desc`, service.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Library (Unified 4-column Grid) */}
      <section className="mb-8">
        <BrandSectionHeading icon={HelpCircle} title={t('commonQuestions', 'Frequently Asked Questions')} className="mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-grid">
          {[
            { q: t('faq1q', 'Can I use the brand colors outside the defined palette?'), a: t('faq1a', 'No. Use only the colors defined in the palette. If a color is missing, request an addition — do not invent your own.') },
            { q: t('faq2q', 'Which font do I use for Arabic content?'), a: t('faq2a', 'Cairo. It pairs with Inter for mixed-direction layouts.') },
            { q: t('faq3q', 'Can I modify the logo mark?'), a: t('faq3a', 'No. Use only the approved variants shown in the Logo section. Do not rotate, recolor, or add effects.') },
            { q: t('faq4q', 'Where do I find downloadable assets?'), a: t('faq4a', 'The Asset Library has logos, color tokens, and font references — all ready to copy or download.') }
          ].map((item, i) => (
            <div key={i} className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border/40 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out h-full flex flex-col justify-between">
              <div>
                <p className="text-[13px] font-bold text-brand-text mb-3 leading-snug">{item.q}</p>
                <p className="text-[12px] text-brand-text-secondary leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </BrandPageContent>
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
