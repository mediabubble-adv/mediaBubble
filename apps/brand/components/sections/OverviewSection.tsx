import React, { useState, useEffect } from 'react'
import { 
  Layout, Layers, Palette, Type, Shapes, MessageSquare, Square, 
  Grid3X3, FileText, Monitor, Zap, Download, Package, ArrowRight, 
  BookOpen, HelpCircle, Copy, Check, X, ChevronDown, ChevronUp, Code
} from 'lucide-react'
import { brand, sections } from '../constants'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading, brandDocCardShell } from '@/components/ui/brand-doc'
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
  const [activeFont, setActiveFont] = useState<'poppins' | 'inter' | 'arabic'>('poppins')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <BrandPageContent>
      {/* 1. BRAND QUICK PLAY - HERO SANDBOX */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <BrandSectionHeading icon={Zap} title={t('quickStartSteps', 'Interactive Brand Playground')} />
          <div className="text-xs font-mono text-brand-text-muted bg-brand-canvas dark:bg-black/20 border border-brand-whisper-border px-2.5 py-1 rounded-md self-start">
            Interactive Sandbox v2.0
          </div>
        </div>

        {/* Outer Shell */}
        <div className="bg-brand-surface border border-brand-whisper-border rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row">
          
          {/* Left Side: Navigation Tabs & Copy Details */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-e border-brand-whisper-border lg:max-w-[380px] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.15em] text-brand-blue font-bold block">
                {t('stepNumber', 'Interactive Preview')} {steps[activeStep].step}
              </span>
              <h3 className="font-display text-xl font-bold text-brand-text tracking-tight">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed text-wrap pretty">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Tab Selectors Stack */}
            <div className="flex flex-col gap-1.5 mt-8 mb-6">
              {steps.map((s, idx) => {
                const IconComp = s.icon
                const isActive = activeStep === idx
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-start transition-all duration-200 border ${
                      isActive 
                        ? 'bg-[#FFC107]/[0.08] dark:bg-[#FFC107]/10 border-[#FFC107] text-brand-text font-bold shadow-sm' 
                        : 'bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-brand-text-secondary'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-[#FFC107] text-[#0D0F12]' : 'bg-brand-canvas dark:bg-white/5 text-brand-text-muted'}`}>
                      {s.step}
                    </span>
                    <IconComp size={15} className={isActive ? 'text-[#FFC107]' : 'text-brand-text-muted'} />
                    <span className="text-xs font-semibold leading-none">{s.title}</span>
                  </button>
                )
              })}
            </div>

            {/* CTA Navigation Button */}
            <button
              onClick={() => onNavigate(steps[activeStep].page)}
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group w-full sm:w-auto"
            >
              {steps[activeStep].action}
              <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-[2px]" />
            </button>
          </div>

          {/* Right Side: Showcase Preview Canvas */}
          <div className={`flex-[2] bg-brand-canvas dark:bg-[#090d16] flex flex-col justify-stretch min-h-[360px] lg:min-h-full ${
            activeStep === 0 ? 'p-0' : 'p-6 sm:p-8'
          }`}>
            
            {/* PANEL 01: COLOR INTERACTIVES */}
            {activeStep === 0 && (
              <div className="flex flex-col lg:flex-row h-full min-h-[360px] lg:min-h-full w-full gap-0 items-stretch">
                {[
                  { name: 'Brand Blue', hex: '#2196F3', token: 'colors.brand-blue', usage: 'Primary Links & Focus states', isDark: true },
                  { name: 'Dark Blue', hex: '#1565C0', token: 'colors.dark-blue', usage: 'Headings & Container backdrops', isDark: true },
                  { name: 'Brand Yellow', hex: '#FFC107', token: 'colors.brand-yellow', usage: 'Primary CTA Highlights', isDark: false },
                  { name: 'Mint', hex: '#1AD191', token: 'colors.accent-gold', usage: 'Secondary Premium Details', isDark: false },
                  { name: 'Deep Charcoal', hex: '#0D0F12', token: 'colors.deep-charcoal', usage: 'Obsidian Canvas Fills', isDark: true },
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      navigator.clipboard.writeText(c.hex)
                      setCopiedColor(c.hex)
                      setTimeout(() => setCopiedColor(null), 2000)
                    }}
                    className="relative flex-1 flex flex-col justify-between text-start p-5 sm:p-6 transition-all duration-300 hover:flex-[1.3] active:scale-[0.98] group overflow-hidden focus:outline-none"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedColor === c.hex && (
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 animate-fade-in z-10">
                        <Check className="text-[#FFC107] mb-1" size={16} />
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">HEX Copied!</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[9px] font-mono opacity-80 uppercase font-bold ${c.isDark ? 'text-white' : 'text-[#0D0F12]'}`}>{c.hex}</span>
                      <Copy size={11} className={`opacity-0 group-hover:opacity-100 transition-opacity ${c.isDark ? 'text-white' : 'text-[#0D0F12]'}`} />
                    </div>
                    
                    <div className="space-y-1">
                      <p className={`text-xs font-bold leading-none ${c.isDark ? 'text-white' : 'text-[#0D0F12]'}`}>{c.name}</p>
                      <p className={`text-[8.5px] leading-tight opacity-75 truncate ${c.isDark ? 'text-white/80' : 'text-[#0D0F12]/80'}`}>{c.usage}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* PANEL 02: TYPOGRAPHY PREVIEWS */}
            {activeStep === 1 && (
              <div className="flex flex-col gap-5">
                {/* Font Selector Tabs */}
                <div className="flex gap-1.5 bg-brand-surface border border-brand-whisper-border p-1 rounded-lg self-start">
                  {[
                    { id: 'poppins', label: 'Poppins (Display Heading)' },
                    { id: 'inter', label: 'Inter (Body Text)' },
                    { id: 'arabic', label: 'Cairo (Arabic System)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFont(f.id as any)}
                      className={`text-[11px] px-3 py-1.5 rounded-md font-semibold transition-all ${
                        activeFont === f.id 
                          ? 'bg-[#FFC107] text-[#0D0F12] shadow-sm font-bold' 
                          : 'text-brand-text-secondary hover:text-brand-text'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                
                {/* Visual Spec Box */}
                <div className="bg-brand-surface rounded-xl border border-brand-whisper-border p-6 sm:p-8 min-h-[220px] flex flex-col justify-between shadow-sm">
                  <div>
                    {activeFont === 'poppins' && (
                      <div className="flex flex-col gap-5 animate-fade-in">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-brand-blue block">Kicker Eyebrow</span>
                          <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
                            We build digital platforms that drive actual business growth.
                          </h4>
                          <p className="text-[13px] text-brand-text-secondary leading-relaxed max-w-[65ch]">
                            Poppins is our display typeface. Optimized for high impact at display weights with tight letter tracking for editorial boldness.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono text-brand-text-secondary bg-brand-canvas dark:bg-black/20 p-4 rounded-lg border border-brand-whisper-border">
                          <div>Family: Poppins (EN)</div>
                          <div>Class: font-display</div>
                          <div>Weight: 700 (Bold)</div>
                          <div>Tracking: -0.03em</div>
                        </div>
                      </div>
                    )}
                    {activeFont === 'inter' && (
                      <div className="flex flex-col gap-5 animate-fade-in">
                        <div className="space-y-3">
                          <h4 className="font-sans text-lg font-bold text-brand-text">
                            Clear readability at any text scale or screen resolution.
                          </h4>
                          <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed max-w-[68ch]">
                            Inter handles our body prose, technical specs, dashboard labels, and UI metadata. Optimized for reading comfort, clear spacing, and high legibility.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono text-brand-text-secondary bg-brand-canvas dark:bg-black/20 p-4 rounded-lg border border-brand-whisper-border">
                          <div>Family: Inter (EN)</div>
                          <div>Class: font-sans</div>
                          <div>Weight: 400 (Regular)</div>
                          <div>Line-height: 1.65</div>
                        </div>
                      </div>
                    )}
                    {activeFont === 'arabic' && (
                      <div className="flex flex-col gap-5 animate-fade-in" dir="rtl">
                        <div className="space-y-3 text-right">
                          <h4 className="font-arabic text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-blue leading-relaxed">
                            نقوم بتصميم منصات رقمية إبداعية تحقق نتائج ملموسة.
                          </h4>
                          <p className="font-arabic text-sm sm:text-base text-brand-text-secondary leading-relaxed max-w-[68ch]">
                            خط كيرو (Cairo) هو الخط الأساسي للمحتوى العربي. نستخدمه للعناوين الكبيرة والنصوص والواجهات ثنائية اللغة لضمان تجربة تصفح مثالية وانسيابية.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono text-brand-text-secondary bg-brand-canvas dark:bg-black/20 p-4 rounded-lg border border-brand-whisper-border text-left" dir="ltr">
                          <div>Family: Cairo (AR)</div>
                          <div>Class: font-arabic</div>
                          <div>Weight: 700 (Bold)</div>
                          <div>Dir: rtl</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-brand-whisper-border flex items-center justify-between text-[11px] font-mono text-brand-text-muted">
                    <span>Active Class: font-{activeFont}</span>
                    <span className="uppercase font-bold text-[#FFC107]">{activeFont} System</span>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 03: INTERACTIVE COMPONENTS CANVAS */}
            {activeStep === 2 && (
              <div className="flex flex-col gap-5">
                {/* Dotted Blueprint Canvas */}
                <div className="bg-[#07080A] bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] border border-white/[0.08] p-10 sm:p-12 rounded-xl flex flex-wrap items-center justify-center gap-6 relative overflow-hidden shadow-inner">
                  
                  <button 
                    className="relative z-10 px-6 py-3.5 rounded-lg bg-[#FFC107] hover:bg-[#FFC107]/90 text-[#0D0F12] font-black text-xs sm:text-sm shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all font-sans"
                    onClick={() => copyText('<button className="px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-bold rounded-lg transition-all text-sm">Primary CTA</button>', 'primary')}
                  >
                    Primary Button
                  </button>
                  
                  <button 
                    className="relative z-10 px-6 py-3.5 rounded-lg bg-[#1565C0] hover:bg-[#1565C0]/90 text-white font-black text-xs sm:text-sm shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all font-sans"
                    onClick={() => copyText('<button className="px-6 py-3.5 bg-brand-navy dark:bg-brand-blue text-white font-bold rounded-lg transition-all text-sm">Secondary CTA</button>', 'secondary')}
                  >
                    Secondary Button
                  </button>
                  
                  <button 
                    className="relative z-10 px-6 py-3.5 rounded-lg border border-white/20 hover:bg-white/5 text-white font-black text-xs sm:text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all font-sans"
                    onClick={() => copyText('<button className="px-6 py-3.5 border border-brand-whisper-border hover:bg-brand-blue/[0.04] text-brand-text font-bold rounded-lg transition-all text-sm">Outline CTA</button>', 'outline')}
                  >
                    Outline Button
                  </button>
                </div>
                
                {/* JSX Code Showcase */}
                <div className="relative bg-brand-surface rounded-xl border border-brand-whisper-border p-5 sm:p-6 flex flex-col gap-3 shadow-sm min-h-[110px] justify-between">
                  {copiedCode && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 rounded-xl animate-fade-in z-25">
                      <Check className="text-[#FFC107] mb-1" size={16} />
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider">{copiedCode.toUpperCase()} JSX Code Copied!</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold text-brand-text-muted">{t('clickBtnToCopyCode', 'Click any button component to copy its React JSX code:')}</p>
                    <Code size={13} className="text-brand-text-muted" />
                  </div>
                  <div className="bg-brand-canvas dark:bg-[#05080e] p-3 rounded-lg border border-brand-whisper-border">
                    <code className="text-[11.5px] font-mono text-brand-blue leading-snug break-all block">
                      {copiedCode === 'primary' && '<button className="px-6 py-3.5 bg-[#FFC107] text-[#0D0F12] font-bold rounded-lg">Primary</button>'}
                      {copiedCode === 'secondary' && '<button className="px-6 py-3.5 bg-[#1565C0] text-white font-bold rounded-lg">Secondary</button>'}
                      {copiedCode === 'outline' && '<button className="px-6 py-3.5 border border-white/20 text-white font-bold rounded-lg">Outline</button>'}
                      {!copiedCode && '<button className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy ... />'}
                    </code>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 04: VOICE COMPARISON */}
            {activeStep === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full items-stretch">
                {/* Do Card */}
                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-sm transition-all hover:scale-[1.01]">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Check size={15} className="stroke-[3]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t('voiceDo', 'DO: Outcomes & Actions')}</span>
                  </div>
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-brand-text-muted font-bold block">Marketing Headline</span>
                      <p className="text-sm sm:text-[14.5px] text-brand-text leading-relaxed font-semibold text-start">
                        &quot;Hurghada&apos;s outcome-driven marketing agency. We build pages that capture direct leads.&quot;
                      </p>
                    </div>
                    <div className="space-y-1 text-start">
                      <span className="text-[9px] uppercase tracking-wider text-brand-text-muted font-bold block">UI CTA Button</span>
                      <p className="text-sm sm:text-[14.5px] text-brand-text leading-relaxed font-semibold">
                        &quot;Download Vector Asset Package&quot;
                      </p>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-emerald-600 dark:text-emerald-400 italic border-t border-emerald-500/10 pt-2.5 text-start">
                    Reason: Outcomes-focused, concrete action verbs, no marketing fluff.
                  </p>
                </div>
                
                {/* Don't Card */}
                <div className="bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 dark:border-rose-500/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-sm transition-all hover:scale-[1.01]">
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                    <X size={15} className="stroke-[3]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t('voiceDont', 'DON\'T: Buzzwords & AI Slop')}</span>
                  </div>
                  <div className="space-y-3.5">
                    <div className="space-y-1 text-start">
                      <span className="text-[9px] uppercase tracking-wider text-brand-text-muted font-bold block">Marketing Headline</span>
                      <p className="text-sm sm:text-[14.5px] text-brand-text-secondary leading-relaxed">
                        &quot;Next-generation full-service marketing capabilities to maximize paradigm alignments.&quot;
                      </p>
                    </div>
                    <div className="space-y-1 text-start">
                      <span className="text-[9px] uppercase tracking-wider text-brand-text-muted font-bold block">UI CTA Button</span>
                      <p className="text-sm sm:text-[14.5px] text-brand-text-secondary leading-relaxed">
                        &quot;Leverage our systems to unlock success&quot;
                      </p>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-rose-600 dark:text-rose-400 italic border-t border-rose-500/10 pt-2.5 text-start">
                    Reason: Heavy buzzword count, vague verbs, lacks physical meaning.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC ASYMMETRICAL GUIDELINES GRID */}
      <section className="mb-14">
        <BrandSectionHeading icon={Layout} title={t('overview.guidelinesIndex', 'Guidelines Index')} />
        
        {/* Asymmetrical layout container */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          
          {/* Logo Card (Large - Spans 3 cols) */}
          <button
            onClick={() => onNavigate('logo')}
            className={`${brandDocCardShell} p-5 text-start md:col-span-3 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 active:scale-[0.98] border border-brand-whisper-border group flex flex-col justify-between min-h-[160px]`}
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-blue/10 text-brand-blue transition-all duration-300 group-hover:scale-110">
                <Layers size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-mono bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border px-2 py-0.5 rounded text-brand-text-muted uppercase font-bold">IDENTITY</span>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-text mb-1 group-hover:text-brand-blue transition-colors">{t('nav.logo.label', 'Logo')}</p>
              <p className="text-xs text-brand-text-secondary leading-relaxed">{t('nav.logo.desc', 'Mark, variants, clear space rules, and placement guides.')}</p>
            </div>
          </button>

          {/* Colors Card (Large - Spans 3 cols) */}
          <button
            onClick={() => onNavigate('colors')}
            className={`${brandDocCardShell} p-5 text-start md:col-span-3 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 active:scale-[0.98] border border-brand-whisper-border group flex flex-col justify-between min-h-[160px]`}
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FFC107]/10 text-[#FFC107] transition-all duration-300 group-hover:scale-110">
                <Palette size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-mono bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border px-2 py-0.5 rounded text-brand-text-muted uppercase font-bold">IDENTITY</span>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-text mb-1 group-hover:text-[#FFC107] transition-colors">{t('nav.colors.label', 'Color Palette')}</p>
              <p className="text-xs text-brand-text-secondary leading-relaxed">{t('nav.colors.desc', 'Hex values, color application hierarchy, and WCAG contrast check.')}</p>
            </div>
          </button>

          {/* Typography (Spans 2 cols) */}
          <button
            onClick={() => onNavigate('typography')}
            className={`${brandDocCardShell} p-5 text-start md:col-span-2 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 active:scale-[0.98] border border-brand-whisper-border group flex flex-col justify-between min-h-[150px]`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500/10 text-purple-500 transition-all duration-300 group-hover:scale-110">
              <Type size={16} strokeWidth={1.5} />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-brand-text mb-1 group-hover:text-purple-500 transition-colors">{t('nav.typography.label', 'Typography')}</p>
              <p className="text-[11px] text-brand-text-muted leading-relaxed">Poppins display, Inter body text, and Cairo Arabic pairing scales.</p>
            </div>
          </button>

          {/* Components (Spans 2 cols) */}
          <button
            onClick={() => onNavigate('components')}
            className={`${brandDocCardShell} p-5 text-start md:col-span-2 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 active:scale-[0.98] border border-brand-whisper-border group flex flex-col justify-between min-h-[150px]`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500 transition-all duration-300 group-hover:scale-110">
              <Square size={16} strokeWidth={1.5} />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-brand-text mb-1 group-hover:text-emerald-500 transition-colors">{t('nav.components.label', 'Components')}</p>
              <p className="text-[11px] text-brand-text-muted leading-relaxed">Buttons, interactive form controls, badges, and interface assets.</p>
            </div>
          </button>

          {/* Voice & Copywriting (Spans 2 cols) */}
          <button
            onClick={() => onNavigate('voice')}
            className={`${brandDocCardShell} p-5 text-start md:col-span-2 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 active:scale-[0.98] border border-brand-whisper-border group flex flex-col justify-between min-h-[150px]`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-500 transition-all duration-300 group-hover:scale-110">
              <MessageSquare size={16} strokeWidth={1.5} />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-brand-text mb-1 group-hover:text-cyan-500 transition-colors">{t('nav.voice.label', 'Voice & Tone')}</p>
              <p className="text-[11px] text-brand-text-muted leading-relaxed">Bilingual brand positioning, tone registers, and prohibited expressions.</p>
            </div>
          </button>

          {/* Secondary Pages Row (All Span 1 col on desktop) */}
          {[
            { id: 'iconography', label: t('nav.iconography.label', 'Iconography'), icon: Shapes, color: 'text-amber-500 bg-amber-500/10' },
            { id: 'spacing', label: t('nav.spacing.label', 'Spacing & Grid'), icon: Grid3X3, color: 'text-slate-500 bg-slate-500/10' },
            { id: 'collateral', label: t('nav.collateral.label', 'Collateral'), icon: FileText, color: 'text-rose-500 bg-rose-500/10' },
            { id: 'digital', label: t('nav.digital.label', 'Digital Assets'), icon: Monitor, color: 'text-blue-500 bg-blue-500/10' },
            { id: 'assets', label: t('nav.assets.label', 'Asset Library'), icon: Package, color: 'text-teal-500 bg-teal-500/10' },
          ].map((card) => {
            const IconComp = card.icon
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`${brandDocCardShell} p-4 text-start transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] border border-brand-whisper-border group flex flex-col justify-between md:col-span-1 min-h-[110px]`}
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${card.color}`}>
                  <IconComp size={14} strokeWidth={1.5} />
                </div>
                <p className="text-[11.5px] font-bold text-brand-text leading-tight group-hover:text-brand-blue transition-colors mt-2">{card.label}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* 3. DENSE FAQ SECTION ACCORDION */}
      <section className="mb-8">
        <BrandSectionHeading icon={HelpCircle} title={t('commonQuestions', 'Frequently Asked Questions')} className="mb-5" />
        
        <div className="flex flex-col gap-3">
          {[
            { q: t('faq1q', 'Can I use the brand colors outside the defined palette?'), a: t('faq1a', 'No. Use only the colors defined in the palette. If a color is missing, request an addition — do not invent your own.') },
            { q: t('faq2q', 'Which font do I use for Arabic content?'), a: t('faq2a', 'Cairo. It pairs with Inter for mixed-direction layouts.') },
            { q: t('faq3q', 'Can I modify the logo mark?'), a: t('faq3a', 'No. Use only the approved variants shown in the Logo section. Do not rotate, recolor, or add effects.') },
            { q: t('faq4q', 'Where do I find downloadable assets?'), a: t('faq4a', 'The Asset Library has logos, color tokens, and font references — all ready to copy or download.') }
          ].map((item, i) => {
            const isExpanded = expandedFaq === i
            return (
              <div 
                key={i} 
                className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-start font-semibold text-xs text-brand-text hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                >
                  <span className="font-bold">{item.q}</span>
                  {isExpanded ? <ChevronUp size={14} className="text-brand-blue" /> : <ChevronDown size={14} className="text-brand-text-muted" />}
                </button>
                
                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 text-xs text-brand-text-secondary leading-relaxed border-t border-brand-whisper-border/20 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
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
