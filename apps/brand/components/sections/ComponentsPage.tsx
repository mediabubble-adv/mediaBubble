import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Copy, Check, AlertCircle, ArrowRight, Bell, ChevronRight, Square, Code,
  HelpCircle, Info, Calendar, ArrowUpRight, Search, Menu, Home, Settings,
  BarChart3, CalendarDays, MoreHorizontal, User, Mail, AlertTriangle
} from 'lucide-react'
import { getButtonClasses } from '@mediabubble/design-system'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

const destructiveBtnCls =
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold bg-[#DC2626] text-white hover:bg-[#DC2626]/90 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'

const disabledBtnCls =
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold bg-brand-canvas text-brand-text-muted cursor-not-allowed dark:bg-white/[0.04] dark:text-brand-text-muted/60'

export function ComponentsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'layout' | 'buttons' | 'forms' | 'display' | 'feedback'>('layout')
  const [toggletipOpen, setToggletipOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const { t } = useI18n()

  // Dynamic interactive demo states
  const [demoUnderlineTab, setDemoUnderlineTab] = useState<'active' | 'inactive' | 'tab'>('active')
  const [demoPillTab, setDemoPillTab] = useState<'active' | 'inactive' | 'tab'>('active')
  const [demoSegmentedTab, setDemoSegmentedTab] = useState<'day' | 'week' | 'month'>('day')

  const [firstName, setFirstName] = useState('Yasser')
  const [lastName, setLastName] = useState('Dorgham')
  const [email, setEmail] = useState('hello@mediabubble.com')
  const [service, setService] = useState('Brand Development')
  const [message, setMessage] = useState('Looking forward to working with your team on our rebrand.')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const [dateRangeStart, setDateRangeStart] = useState<number | null>(9)
  const [dateRangeEnd, setDateRangeEnd] = useState<number | null>(13)

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({
    hurghada: true,
    uae: false,
    egypt: false
  })
  const [checkAll, setCheckAll] = useState(false)

  const [progressVal1, setProgressVal1] = useState(65)
  const [progressVal2, setProgressVal2] = useState(90)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 1500)
  }

  const handleDateClick = (dayNum: number) => {
    if (dateRangeStart && dateRangeEnd) {
      setDateRangeStart(dayNum)
      setDateRangeEnd(null)
    } else if (dateRangeStart) {
      if (dayNum < dateRangeStart) {
        setDateRangeStart(dayNum)
      } else {
        setDateRangeEnd(dayNum)
      }
    } else {
      setDateRangeStart(dayNum)
    }
  }

  const isDaySelected = (dayNum: number) => {
    return dateRangeStart === dayNum || dateRangeEnd === dayNum
  }

  const isDayInRange = (dayNum: number) => {
    if (!dateRangeStart || !dateRangeEnd) return false
    return dayNum > dateRangeStart && dayNum < dateRangeEnd
  }

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = { ...prev, [id]: !prev[id] }
      const allChecked = Object.values(next).every(Boolean)
      setCheckAll(allChecked)
      return next
    })
  }

  const toggleAllRows = () => {
    const nextState = !checkAll
    setCheckAll(nextState)
    setSelectedRows({
      hurghada: nextState,
      uae: nextState,
      egypt: nextState
    })
  }

  const tabs = [
    { id: 'layout', label: t('components.tab.layout', 'Layout & Shells') },
    { id: 'buttons', label: t('components.tab.buttons', 'Buttons & Navigation') },
    { id: 'forms', label: t('components.tab.forms', 'Inputs & Calendars') },
    { id: 'display', label: t('components.tab.display', 'Data & Feedback') },
    { id: 'feedback', label: t('components.tab.feedback', 'Overlays & Guides') },
  ]

  const buttonVariants = [
    {
      label: t('Primary CTA', 'Primary CTA'),
      cls: getButtonClasses('primary', 'sm', 'w-full !py-2.5 !text-xs !font-bold'),
      token: 'primary',
      tokenCls: 'bg-[#FFC107]/10 text-[#FFC107]',
      desc: t('primaryBtnDesc', 'Use for the single primary action per view (save, submit, confirm).'),
      code: `<button className="px-4 py-2.5 bg-[#FFC107] text-[#0D0F12] font-bold rounded-lg hover:bg-[#FFC107]/90 active:scale-95 transition-all text-xs">Primary CTA</button>`,
    },
    {
      label: t('Secondary', 'Secondary'),
      cls: getButtonClasses('secondary', 'sm', 'w-full !py-2.5 !text-xs !font-bold'),
      token: 'secondary',
      tokenCls: 'bg-brand-blue/10 text-brand-blue',
      desc: t('Secondary navigation or non-critical actions on page views.', 'Secondary actions on page views.'),
      code: `<button className="px-4 py-2.5 bg-[#1565C0] text-white font-bold rounded-lg hover:bg-[#1565C0]/90 active:scale-95 transition-all text-xs">Secondary</button>`,
    },
    {
      label: t('Outline', 'Outline'),
      cls: getButtonClasses('outline', 'sm', 'w-full !py-2.5 !text-xs !font-bold'),
      token: 'outline',
      tokenCls: 'bg-brand-blue/10 text-brand-blue',
      desc: t('Tertiary actions with a visible border outline.', 'Tertiary actions with a visible border.'),
      code: `<button className="px-4 py-2.5 border border-white/20 hover:bg-white/5 text-white font-bold rounded-lg active:scale-95 transition-all text-xs">Outline</button>`,
    },
    {
      label: t('Ghost', 'Ghost'),
      cls: getButtonClasses('ghost', 'sm', 'w-full !py-2.5 !text-xs !font-bold'),
      token: 'ghost',
      tokenCls: 'bg-brand-canvas dark:bg-white/[0.04] text-brand-text-muted',
      desc: t('Low visual weight button. Use for supporting actions.', 'Low visual weight supporting action.'),
      code: `<button className="px-4 py-2.5 hover:bg-white/5 text-white/60 hover:text-white font-bold rounded-lg transition-all text-xs">Ghost</button>`,
    },
    {
      label: t('Destructive', 'Destructive'),
      cls: destructiveBtnCls,
      token: 'destructive',
      tokenCls: 'bg-rose-500/10 text-rose-500',
      desc: t('destructiveBtnDesc', 'Destructive actions — delete, remove, discard. Always confirm before executing.'),
      code: '<button className="bg-[#DC2626] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#DC2626]/90 active:scale-95 transition-all text-xs">Destructive</button>',
    },
    {
      label: t('Disabled', 'Disabled'),
      cls: disabledBtnCls,
      token: 'disabled',
      tokenCls: 'bg-brand-canvas dark:bg-white/[0.04] text-brand-text-muted',
      desc: t('Non-interactive state. Indicates incomplete requirements.', 'Non-interactive state.'),
      disabled: true,
      code: '<button className="bg-brand-canvas text-brand-text-muted px-4 py-2.5 rounded-lg font-bold cursor-not-allowed text-xs" disabled>Disabled</button>',
    },
  ]

  const cardVariants = [
    {
      title: t('Default card', 'Default card'),
      subtitle: t('rest state', 'Default — no interaction'),
      desc: t('Standard elevation — 1px border, no shadow blur. Flat card design.', 'Standard elevation — 1px border, no shadow blur.'),
      extra: '',
      cls: 'border border-brand-whisper-border bg-brand-surface text-brand-text',
    },
    {
      title: t('Hover card', 'Hover card'),
      subtitle: t('interactive state', 'On hover or focus'),
      desc: t('Decisive lift on cursor enter. Border transitions to blue, content translates -1px.', 'Decisive lift on cursor enter. TranslateY offset + blue border hover.'),
      extra: '',
      cls: 'border border-brand-blue/50 dark:border-brand-blue/60 bg-brand-surface text-brand-text -translate-y-1 shadow-sm',
    },
    {
      title: t('Accent card', 'Accent card'),
      subtitle: t('brand highlight', 'Emphasize one card per grid'),
      desc: t('Yellow top-border variant. Use when one card in a grid needs to lead.', 'Yellow top-border variant. Accent top stripe closes the outline.'),
      extra: 'border-t-4 border-t-[#FFC107]',
      cls: 'border border-brand-whisper-border bg-brand-surface text-brand-text',
    },
    {
      title: t('Dark card', 'Dark card'),
      subtitle: t('inverse surface', 'Dark background — use in hero sections'),
      desc: t('Deep blue surface for hero blocks, feature callouts, and dark sections.', 'Deep blue surface for hero blocks, feature callouts, and dark sections.'),
      extra: '',
      cls: 'bg-[#0D0F12] border border-white/[0.08] text-white',
    },
  ]

  return (
    <div>
      <PageHero 
        icon={Square} 
        kicker={t('Design System', 'Design System')} 
        title={t('Components', 'Components')} 
        titleHighlight={t('Components', 'Components')} 
        description={t('Every interactive element, every state defined. Consistent vocabulary across every surface — the same button shape, the same form control, the same focus ring everywhere.')} 
      />

      <BrandPageContent>
        {/* Category Tab Controller */}
        <div className="flex gap-4 border-b border-brand-whisper-border pb-px mb-12 overflow-x-auto select-none no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold px-4 pb-3 border-b-2 transition-all whitespace-nowrap outline-none ${
                activeTab === tab.id
                  ? 'border-brand-blue text-brand-blue font-black'
                  : 'border-transparent text-brand-text-secondary hover:text-brand-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─────────── TAB 1: LAYOUT & NAVIGATION ─────────── */}
        {activeTab === 'layout' && (
          <div className="space-y-16">
            
            {/* UI Shell Showcase */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.layout.uiShell', 'UI Dashboard Shell')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 md:p-10 rounded-xl border border-brand-whisper-border shadow-inner">
                  <div className="bg-brand-surface border border-brand-whisper-border rounded-xl overflow-hidden shadow-md flex h-[260px] text-brand-text">
                    {/* Left Sidebar */}
                    <div className="w-16 shrink-0 bg-[#0D0F12] border-e border-white/[0.08] flex flex-col items-center py-4 justify-between text-white/50">
                      <div className="flex flex-col items-center gap-4 w-full">
                        <Image
                          src="/assets/Logo/mediaBubble_icon.svg"
                          alt=""
                          width={32}
                          height={32}
                          className="w-8 h-8 shrink-0"
                          aria-hidden
                        />
                        <div className="w-8 h-8 rounded-lg bg-white/10 text-brand-blue flex items-center justify-center"><Home size={14} /></div>
                        <div className="w-8 h-8 rounded-lg text-white/40 flex items-center justify-center"><BarChart3 size={14} /></div>
                        <div className="w-8 h-8 rounded-lg text-white/40 flex items-center justify-center"><CalendarDays size={14} /></div>
                      </div>
                      <div className="w-8 h-8 rounded-lg text-white/40 flex items-center justify-center"><Settings size={14} /></div>
                    </div>
                    {/* Main Frame */}
                    <div className="flex-1 flex flex-col min-w-0">
                      {/* Top Nav Header */}
                      <header className="h-12 border-b border-brand-whisper-border px-4 flex items-center justify-between bg-brand-surface">
                        <span className="text-[11.5px] font-bold tracking-tight">Campaign Operations</span>
                        <div className="flex items-center gap-3">
                          <div className="relative w-36 hidden sm:block">
                            <input readOnly placeholder="Search..." className="w-full pl-7 pr-3 py-1 text-[10.5px] rounded-md border border-brand-input-border bg-brand-canvas outline-none" />
                            <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-text-muted" />
                          </div>
                          <div className="w-6 h-6 rounded-full bg-brand-canvas border border-brand-whisper-border flex items-center justify-center"><User size={11} className="text-brand-text-secondary" /></div>
                        </div>
                      </header>
                      {/* Inner Content Workspace */}
                      <div className="flex-1 p-4 bg-brand-canvas overflow-y-auto text-start">
                        <div className="bg-brand-surface p-4 rounded-lg border border-brand-whisper-border shadow-sm flex flex-col justify-between h-full">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-brand-yellow font-bold">Workspace Active</span>
                            <h5 className="text-xs font-bold text-brand-text mt-1">Egypt Social Media Campaign</h5>
                            <p className="text-[10.5px] text-brand-text-secondary mt-1">Reviewing metrics, copywriting guidelines, and active visual swatches.</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-16 h-2 rounded bg-brand-blue/30 inline-block" />
                            <span className="w-24 h-2 rounded bg-brand-blue/30 inline-block" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Sidebar width', value: '64px / 240px', desc: 'Collapsed sidebar icon tray on tablets; expanding list tree on desktops.' },
                      { spec: 'Header height', value: '48px (~3rem)', desc: 'Keeps dashboard header minimal, providing maximum vertical workspace.' },
                      { spec: 'Grid border styles', value: '1px var(--brand-whisper-border)', desc: 'Use border variables instead of dark shadows to partition grid boxes.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<div className="flex h-screen overflow-hidden bg-brand-canvas">\n  <aside className="w-16 bg-[#0D0F12] border-e border-white/[0.08] flex flex-col justify-between" />\n  <div className="flex-1 flex flex-col min-w-0">\n    <header className="h-12 border-b border-brand-whisper-border bg-brand-surface" />\n    <main className="flex-1 p-4 bg-brand-canvas overflow-y-auto" />\n  </div>\n</div>', 'shell-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'shell-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'shell-code' ? 'Code Copied!' : 'Copy Code Shell'}
                  </button>
                </div>
              </div>
            </section>

            {/* Header & Nav Menu Showcase */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.layout.headerNav', 'Header & Nav Menu')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 md:p-10 rounded-xl border border-brand-whisper-border flex items-center justify-center">
                  <header className="w-full bg-[#0D0F12] border border-white/[0.08] rounded-xl px-5 py-3.5 flex items-center justify-between text-white select-none">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/assets/Logo/mediaBubble_icon.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6 shrink-0"
                        aria-hidden
                      />
                      <span className="text-xs font-bold font-display tracking-tight">mediaBubble</span>
                    </div>
                    <nav className="hidden sm:flex items-center gap-5 text-[10.5px] font-semibold text-white/60">
                      <a href="#services" className="hover:text-white transition-colors">Services</a>
                      <a href="#cases" className="hover:text-white transition-colors">Case Studies</a>
                      <a href="#about" className="hover:text-white transition-colors">About</a>
                    </nav>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 rounded bg-[#FFC107] text-[#0D0F12] font-bold text-[10px] hover:bg-[#FFC107]/90 active:scale-95 transition-all">
                        Get Started
                      </button>
                      <button className="sm:hidden text-white/75 hover:text-white"><Menu size={15} /></button>
                    </div>
                  </header>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Desktop alignment', value: 'justify-between', desc: 'Logo lock left, navigation center, primary action buttons aligned right.' },
                      { spec: 'Hover indicator', value: 'transition-colors', desc: 'Nav items highlight from 60% white opacity to 100% white on pointer hover.' },
                      { spec: 'Header border', value: 'border-white/[0.08]', desc: 'Clean translucent border ensures contrast on dark background blocks.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<header className="flex items-center justify-between px-6 py-4 bg-[#0D0F12] border-b border-white/[0.08]">\n  <div className="flex items-center gap-2">Logo</div>\n  <nav className="flex gap-6">Links</nav>\n  <button className="px-4 py-2 bg-[#FFC107] text-[#0D0F12] font-bold rounded-lg">Action</button>\n</header>', 'header-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'header-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'header-code' ? 'Code Copied!' : 'Copy Code Header'}
                  </button>
                </div>
              </div>
            </section>

            {/* Footer Showcase */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.layout.footer', 'Footer layout')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 md:p-10 rounded-xl border border-brand-whisper-border">
                  <footer className="w-full bg-[#0D0F12] border border-white/[0.08] rounded-xl p-5 text-white/50 text-start select-none">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[10.5px]">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-1.5 text-white">
                          <Image
                            src="/assets/Logo/mediaBubble_icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5 shrink-0"
                            aria-hidden
                          />
                          <span className="font-bold tracking-tight">mediaBubble</span>
                        </div>
                        <p className="leading-relaxed">Strategic creative that fills rooms and grows business outcomes.</p>
                      </div>
                      <div className="space-y-2">
                        <span className="font-bold text-white uppercase tracking-wider text-[9px] block">Services</span>
                        <ul className="space-y-1.5">
                          <li><a href="#seo" className="hover:text-white transition-colors">SEO & Search</a></li>
                          <li><a href="#web" className="hover:text-white transition-colors">Web Development</a></li>
                          <li><a href="#branding" className="hover:text-white transition-colors">Branding Design</a></li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <span className="font-bold text-white uppercase tracking-wider text-[9px] block">Contact</span>
                        <p className="leading-relaxed">hello@mediabubble.com<br />Hurghada, Red Sea, Egypt</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px]">
                      <span>&copy; 2026 MediaBubble. All rights reserved.</span>
                      <div className="flex gap-4">
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#terms" className="hover:text-white transition-colors">Terms</a>
                      </div>
                    </div>
                  </footer>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Column Gap', value: 'gap-6 sm:gap-8', desc: 'Ample horizontal spacing prevents list headers from clashing.' },
                      { spec: 'Separators', value: 'border-t border-white/6', desc: 'Divider line splits footer directory links from legal details.' },
                      { spec: 'Interactive state', value: 'hover:text-white', desc: 'Links lighten up smoothly to signify focus and mouse hovering.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<footer className="bg-[#0D0F12] border-t border-white/[0.08] p-8 text-white/55">\n  <div className="grid grid-cols-3 gap-8">Columns</div>\n  <div className="border-t border-white/[0.06] mt-8 pt-4 flex justify-between">Legal</div>\n</footer>', 'footer-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'footer-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'footer-code' ? 'Code Copied!' : 'Copy Code Footer'}
                  </button>
                </div>
              </div>
            </section>

            {/* Pagination Showcase */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.layout.pagination', 'Pagination control')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 md:p-10 rounded-xl border border-brand-whisper-border flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 w-full max-w-[380px] bg-brand-surface p-4 rounded-xl border border-brand-whisper-border shadow-sm text-brand-text select-none">
                    <span className="text-[10px] font-mono text-brand-text-muted">Showing 1 to 10 of 42 campaigns</span>
                    <div className="flex items-center gap-1.5">
                      <button className="px-2.5 py-1.5 rounded-lg border border-brand-whisper-border bg-brand-canvas text-brand-text-muted text-[10.5px] font-semibold cursor-not-allowed" disabled>Prev</button>
                      <button className="w-8 h-8 rounded-lg bg-[#FFC107] text-[#0D0F12] text-[10.5px] font-bold flex items-center justify-center shadow-sm">1</button>
                      <button className="w-8 h-8 rounded-lg border border-brand-whisper-border bg-brand-surface hover:bg-brand-canvas text-[10.5px] font-semibold flex items-center justify-center transition-colors">2</button>
                      <button className="w-8 h-8 rounded-lg border border-brand-whisper-border bg-brand-surface hover:bg-brand-canvas text-[10.5px] font-semibold flex items-center justify-center transition-colors">3</button>
                      <span className="text-[10px] text-brand-text-muted px-1">...</span>
                      <button className="w-8 h-8 rounded-lg border border-brand-whisper-border bg-brand-surface hover:bg-brand-canvas text-[10.5px] font-semibold flex items-center justify-center transition-colors">5</button>
                      <button className="px-2.5 py-1.5 rounded-lg border border-brand-surface hover:bg-brand-canvas text-[10.5px] font-semibold flex items-center justify-center transition-colors">Next</button>
                    </div>
                  </div>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Button Height', value: '32px (w-8 h-8)', desc: 'Consistent height across numbers and Prev/Next action controls.' },
                      { spec: 'Active State', value: 'bg-[#FFC107] text-dark', desc: 'High-contrast primary yellow highlight on the active page number.' },
                      { spec: 'Gap Spacing', value: 'gap-1.5 (6px)', desc: 'Tight horizontal gap ensures target buttons stay unified together.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<div className="flex items-center gap-2">\n  <button className="px-3 py-1.5 border rounded-lg" disabled>Prev</button>\n  <button className="w-8 h-8 rounded-lg bg-brand-yellow text-brand-navy">1</button>\n  <button className="px-3 py-1.5 border rounded-lg">Next</button>\n</div>', 'pagination-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'pagination-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'pagination-code' ? 'Code Copied!' : 'Copy Code Pagination'}
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ─────────── TAB 2: BUTTONS & NAVIGATION ─────────── */}
        {activeTab === 'buttons' && (
          <div className="space-y-16">
            
            {/* Buttons List */}
            <section>
              <BrandSectionHeading icon={Square} title={t('Buttons', 'Buttons')} />
              <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm flex flex-col divide-y divide-brand-whisper-border">
                {buttonVariants.map((btn) => {
                  const isCopied = copiedCode === `btn-${btn.label}`;
                  return (
                    <div key={btn.label} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 px-5 py-4 hover:bg-brand-canvas/20 transition-colors relative">
                      {isCopied && (
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 animate-fade-in z-10">
                          <Check className="text-[#FFC107] mb-1" size={16} />
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">JSX Code Copied!</span>
                        </div>
                      )}
                      
                      <div className="w-full sm:w-36 shrink-0 bg-brand-canvas dark:bg-[#0D0F12] p-4 rounded-xl border border-brand-whisper-border flex items-center justify-center min-h-[60px] shadow-inner">
                        <button disabled={btn.disabled} className={btn.cls}>
                          {btn.label}
                        </button>
                      </div>

                      <div className="flex-1 min-w-0 text-start">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-brand-text">{btn.label}</span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${btn.tokenCls}`}>{btn.token}</span>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary mt-1 leading-normal">{btn.desc}</p>
                      </div>

                      <button
                        onClick={() => copyCode(btn.code, `btn-${btn.label}`)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text hover:border-brand-blue/50 rounded-lg text-xs font-semibold active:scale-95 transition-all shrink-0"
                      >
                        <Copy size={11} />
                        Copy Code
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Button Anatomy Spec */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.buttons.anatomy', 'Button Anatomy')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-[#07080A] bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] border border-white/[0.08] p-8 sm:p-10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner min-h-[200px]">
                  {/* Schematic Drawing of Button */}
                  <div className="relative border border-dashed border-[#FFC107]/40 bg-[#FFC107]/5 px-6 py-3.5 rounded-lg text-white font-bold text-xs select-none flex items-center gap-2.5">
                    {/* Dimension Arrows */}
                    <div className="absolute inset-x-0 -top-4 text-center text-[8.5px] font-mono text-white/50 border-x border-dashed border-white/20 pt-1">
                      &larr; Padding X: 16px (px-4) &rarr;
                    </div>
                    <div className="absolute inset-y-0 -right-5 flex items-center text-[8.5px] font-mono text-white/50 border-y border-dashed border-white/20 [writing-mode:vertical-lr] pl-1">
                      &larr; Padding Y: 10px &rarr;
                    </div>
                    
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]/30 shrink-0" />
                    <span>Primary Action CTA</span>
                    
                    <div className="absolute -bottom-4 start-1/2 -translate-x-1/2 text-[8px] font-mono text-brand-blue uppercase tracking-wider">
                      Border Radius: 8px (rounded-lg)
                    </div>
                  </div>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { rule: 'Touch Target Target', val: '44 × 44 px', note: 'Visual boundaries can be smaller (e.g. 40px), but input hit area expands via padding or before selectors.' },
                      { rule: 'Border radius limit', val: '8px (rounded-lg)', note: 'Buttons top out at 8px. Never use full capsule rounded pills for buttons.' },
                      { rule: 'Primary Typography', val: 'Poppins Bold 12px', desc: 'Display font Poppins with bold weight keeps buttons punchy and clean.' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.rule}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.val}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.note || item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Tabs (Underline, Pill, Segmented) */}
            <section>
              <BrandSectionHeading icon={Square} title={t('Navigation Tabs', 'Navigation Tabs')} />
              <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm divide-y divide-brand-whisper-border text-start">
                {[
                  { 
                    label: t('Underline tabs', 'Underline tabs'), 
                    type: 'primary', 
                    typeColor: 'bg-brand-blue/10 text-brand-blue', 
                    desc: t('Standard nav — active state uses bottom border + bold weight. Best for top-level navigation.', 'Standard nav — active state uses bottom border + bold weight. Best for top-level navigation.'), 
                    component: (
                      <div className="flex gap-5 border-b border-brand-whisper-border px-1 w-full max-w-[280px]">
                        <button 
                          onClick={() => setDemoUnderlineTab('active')} 
                          className={`text-xs font-bold pb-2 border-b-2 transition-all ${demoUnderlineTab === 'active' ? 'border-brand-blue text-brand-text' : 'border-transparent text-brand-text-secondary hover:text-brand-text'}`}
                        >
                          {t('Active', 'Active')}
                        </button>
                        <button 
                          onClick={() => setDemoUnderlineTab('inactive')} 
                          className={`text-xs font-semibold pb-2 border-b-2 transition-all ${demoUnderlineTab === 'inactive' ? 'border-brand-blue text-brand-text' : 'border-transparent text-brand-text-secondary hover:text-brand-text'}`}
                        >
                          {t('Inactive', 'Inactive')}
                        </button>
                        <button 
                          onClick={() => setDemoUnderlineTab('tab')} 
                          className={`text-xs font-semibold pb-2 border-b-2 transition-all ${demoUnderlineTab === 'tab' ? 'border-brand-blue text-brand-text' : 'border-transparent text-brand-text-secondary hover:text-brand-text'}`}
                        >
                          {t('Tab', 'Tab')}
                        </button>
                      </div>
                    ),
                    code: `<div className="flex gap-6 border-b border-brand-whisper-border px-1">\n  <button className="text-[13px] font-bold text-brand-text border-b-2 border-[#2196F3] pb-2">Active</button>\n  <button className="text-[13px] font-medium text-brand-text-muted pb-2 hover:text-brand-text">Inactive</button>\n</div>` 
                  },
                  { 
                    label: t('Pill tabs', 'Pill tabs'), 
                    type: 'accent', 
                    typeColor: 'bg-[#FFC107]/15 text-[#92610B] dark:text-[#FFC107]', 
                    desc: t('Content-switching pattern — active pill uses brand yellow/blue fill. Used in filter bars.', 'Content-switching pattern — active pill uses brand yellow/blue fill. Used in filter bars.'), 
                    component: (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setDemoPillTab('active')} 
                          className={`px-3.5 py-1.5 rounded-full text-[10.5px] transition-all ${demoPillTab === 'active' ? 'bg-[#2196F3] text-white font-bold' : 'bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary font-semibold hover:text-brand-text'}`}
                        >
                          {t('Active', 'Active')}
                        </button>
                        <button 
                          onClick={() => setDemoPillTab('inactive')} 
                          className={`px-3.5 py-1.5 rounded-full text-[10.5px] transition-all ${demoPillTab === 'inactive' ? 'bg-[#2196F3] text-white font-bold' : 'bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary font-semibold hover:text-brand-text'}`}
                        >
                          {t('Inactive', 'Inactive')}
                        </button>
                        <button 
                          onClick={() => setDemoPillTab('tab')} 
                          className={`px-3.5 py-1.5 rounded-full text-[10.5px] transition-all ${demoPillTab === 'tab' ? 'bg-[#2196F3] text-white font-bold' : 'bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary font-semibold hover:text-brand-text'}`}
                        >
                          {t('Tab', 'Tab')}
                        </button>
                      </div>
                    ),
                    code: `<div className="flex gap-2">\n  <button className="px-4 py-1.5 rounded-full bg-[#2196F3] text-white text-[12px] font-bold">Active</button>\n  <button className="px-4 py-1.5 rounded-full bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary text-[12px] font-medium">Inactive</button>\n</div>` 
                  },
                  { 
                    label: t('Segmented control', 'Segmented control'), 
                    type: 'data', 
                    typeColor: 'bg-purple-500/10 text-purple-500', 
                    desc: t('Toggle between views. Equal-width segments, active state slides between them.', 'Toggle between views. Equal-width segments, active state slides between them.'), 
                    component: (
                      <div className="inline-flex rounded-lg bg-brand-canvas border border-brand-whisper-border p-0.5">
                        <button 
                          onClick={() => setDemoSegmentedTab('day')} 
                          className={`px-3.5 py-1.5 rounded-md text-[10.5px] transition-all ${demoSegmentedTab === 'day' ? 'bg-brand-surface text-brand-text font-bold shadow-sm' : 'text-brand-text-secondary font-semibold hover:text-brand-text'}`}
                        >
                          {t('Day', 'Day')}
                        </button>
                        <button 
                          onClick={() => setDemoSegmentedTab('week')} 
                          className={`px-3.5 py-1.5 rounded-md text-[10.5px] transition-all ${demoSegmentedTab === 'week' ? 'bg-brand-surface text-brand-text font-bold shadow-sm' : 'text-brand-text-secondary font-semibold hover:text-brand-text'}`}
                        >
                          {t('Week', 'Week')}
                        </button>
                        <button 
                          onClick={() => setDemoSegmentedTab('month')} 
                          className={`px-3.5 py-1.5 rounded-md text-[10.5px] transition-all ${demoSegmentedTab === 'month' ? 'bg-brand-surface text-brand-text font-bold shadow-sm' : 'text-brand-text-secondary font-semibold hover:text-brand-text'}`}
                        >
                          {t('Month', 'Month')}
                        </button>
                      </div>
                    ),
                    code: `<div className="inline-flex rounded-lg bg-brand-canvas dark:bg-white/[0.04] p-0.5">\n  <button className="px-4 py-1.5 rounded-md bg-brand-surface text-brand-text text-[12px] font-bold shadow-sm">Day</button>\n  <button className="px-4 py-1.5 rounded-md text-brand-text-secondary text-[12px] font-semibold">Week</button>\n</div>` 
                  },
                ].map((tab, i) => {
                  const isCopied = copiedCode === `tab-${i}`;
                  return (
                    <div key={tab.label} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-5 px-5 py-5 hover:bg-brand-canvas/20 transition-colors relative">
                      {isCopied && (
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 animate-fade-in z-10">
                          <Check className="text-[#FFC107] mb-1" size={16} />
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Tab JSX Code Copied!</span>
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-[240px] bg-brand-canvas dark:bg-[#0D0F12] p-4 rounded-xl border border-brand-whisper-border flex items-center justify-center min-h-[60px] shadow-inner">
                        {tab.component}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-brand-text">{tab.label}</span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${tab.typeColor}`}>{tab.type}</span>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary mt-1 leading-normal">{tab.desc}</p>
                      </div>

                      <button
                        onClick={() => copyCode(tab.code, `tab-${i}`)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text hover:border-brand-blue/50 rounded-lg text-xs font-semibold active:scale-95 transition-all shrink-0 self-start lg:self-center"
                      >
                        <Copy size={11} />
                        Copy Code
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {/* ─────────── TAB 3: INPUTS & FORMS ─────────── */}
        {activeTab === 'forms' && (
          <div className="space-y-16">
            
            {/* Input States */}
            <section>
              <BrandSectionHeading icon={Square} title={t('Form Inputs', 'Form Inputs')} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: t('Default', 'Default'), border: 'border-brand-input-border focus:border-brand-blue/60', val: '', ph: t('e.g. Campaign name', 'e.g. Campaign name'), note: t('Resting state', 'Resting state') },
                  { label: t('Focused', 'Focused'), border: 'border-brand-blue ring-2 ring-brand-blue/10 focus:border-brand-blue', val: t('Spring Campaign', 'Spring Campaign'), ph: '', note: t('Active input', 'Active input') },
                  { label: t('Error', 'Error'), border: 'border-rose-500 ring-2 ring-rose-500/10 focus:border-rose-500', val: t('invalid-format@', 'invalid-format@'), ph: '', note: t('Validation failed', 'Validation failed'), err: t('Enter a valid email address', 'Enter a valid email address') },
                  { label: t('Disabled', 'Disabled'), border: 'border-brand-whisper-border', val: t('Read-only value', 'Read-only value'), ph: '', note: t('Non-interactive', 'Non-interactive'), disabled: true },
                ].map((inp) => (
                  <div key={inp.label} className="bg-brand-surface rounded-xl border border-brand-whisper-border p-5 shadow-sm flex flex-col justify-between min-h-[140px] text-start">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text">{inp.label}</span>
                      <span className="text-[9px] font-mono text-brand-text-muted">{inp.note}</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Campaign Name', 'Campaign Name')}</label>
                      <input
                        readOnly 
                        disabled={inp.disabled}
                        value={inp.val} 
                        placeholder={inp.ph}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-lg border outline-none transition-all bg-brand-surface text-brand-text placeholder:text-brand-muted-steel font-medium ${inp.disabled ? 'bg-brand-canvas dark:bg-white/[0.03] text-brand-text-muted cursor-not-allowed' : ''} ${inp.border}`}
                      />
                      {inp.err && (
                        <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium leading-none">
                          <AlertCircle size={10} />
                          {inp.err}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Form Showcase */}
            <section>
              <div className="bg-brand-canvas border border-brand-whisper-border rounded-xl px-5 py-3 mb-6 text-start">
                <h2 className="text-[13px] font-semibold text-brand-dark-blue dark:text-brand-blue">{t('Contact Form', 'Contact Form Showcase')}</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Visual Form render */}
                <div className="lg:col-span-7 bg-brand-surface border border-brand-whisper-border rounded-xl p-6 sm:p-8 shadow-sm">
                  <h3 className="font-display text-base font-bold text-brand-text mb-1 text-start">{t('Get in touch', 'Start a Project')}</h3>
                  <p className="text-[11.5px] text-brand-text-secondary mb-5 leading-normal text-start">{t('contactDesc', 'Tell us about your project. We respond within one business day with next steps.')}</p>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      setContactSubmitted(true)
                      setTimeout(() => setContactSubmitted(false), 3000)
                    }}
                    className="space-y-4 text-start"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('First name', 'First name')}</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all bg-brand-surface text-brand-text font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Last name', 'Last name')}</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all bg-brand-surface text-brand-text font-medium" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Email address', 'Email address')}</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all bg-brand-surface text-brand-text font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Service', 'Service')}</label>
                      <div className="relative">
                        <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none appearance-none cursor-pointer bg-brand-surface text-brand-text font-medium">
                          <option value="Brand Development">{t('Brand Development', 'Brand Development')}</option>
                          <option value="Digital Growth">{t('Digital Growth', 'Digital Growth')}</option>
                          <option value="Web Solutions">{t('Web Solutions', 'Web Solutions')}</option>
                        </select>
                        <ChevronRight size={13} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted rotate-90 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Message', 'Message')}</label>
                      <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none resize-none leading-relaxed bg-brand-surface text-brand-text font-medium" />
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all font-sans flex items-center justify-center gap-1.5">
                      {contactSubmitted ? (
                        <>
                          <Check size={12} className="text-[#1AD191]" />
                          {t('Submitted!', 'Form Submitted!')}
                        </>
                      ) : (
                        t('Send message', 'Send message')
                      )}
                    </button>
                  </form>
                </div>
                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { rule: t('Labels', 'Labels'), val: '10.5px · font-bold · uppercase', note: t('Sentence case, above the input', 'Always visible, never floating labels.') },
                      { rule: t('Input Height', 'Input Height'), val: 'py-2.5 → ~40px', note: t('44px min on touch devices', 'Minimum 40px, standard offset height.') },
                      { rule: t('Border Resting', 'Border Resting'), val: '1px #E0E0E0', note: t('Neutral, no color distraction', 'Fills in dark theme at white/12%.') },
                      { rule: t('Border Focus', 'Border Focus'), val: '1px #2196F3 + ring-2', note: t('Brand blue + 10% opacity ring', 'Gives clear interactive feedback.') },
                      { rule: t('Border Error', 'Border Error'), val: '1px #DC2626 + ring-2', note: t('Red + 10% opacity ring', 'Fires with alert text below.') },
                    ].map((r) => (
                      <div key={r.rule} className="flex flex-col p-4 gap-1 hover:bg-brand-canvas/30 dark:hover:bg-white/[0.01] transition-colors text-start">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{r.rule}</span>
                          <code className="text-[10.5px] font-mono font-bold text-brand-text">{r.val}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{r.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border p-5 text-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-1.5 block">{t('Validation timing', 'Validation Timing')}</span>
                    <p className="text-xs text-brand-text-secondary leading-relaxed">{t('validationDesc', 'Validate inputs on blur, not on every keystroke. Display error messages directly below the field that failed. Validating on every keystroke frustrates users.')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Date Pickers & Date Picker Anatomy */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.forms.datePicker', 'Date Pickers & Anatomy')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Calendar Spec Panel */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 md:p-10 rounded-xl border border-brand-whisper-border flex flex-col gap-6 shadow-inner">
                  {/* Calendar Widget Container */}
                  <div className="w-full max-w-[320px] bg-brand-surface border border-brand-whisper-border rounded-xl p-5 shadow-md text-brand-text mx-auto text-start select-none">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-brand-whisper-border pb-3 mb-3">
                      <span className="text-xs font-bold font-display text-brand-text">June 2026</span>
                      <div className="flex items-center gap-1">
                        <button className="w-5 h-5 rounded border border-brand-whisper-border flex items-center justify-center text-xs hover:bg-brand-canvas font-bold">&larr;</button>
                        <button className="w-5 h-5 rounded border border-brand-whisper-border flex items-center justify-center text-xs hover:bg-brand-canvas font-bold">&rarr;</button>
                      </div>
                    </div>
                    {/* Week Days */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-brand-text-muted mb-2 uppercase">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>
                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                      {/* Blank offset */}
                      <span className="py-1 text-brand-text-muted/30 select-none pointer-events-none">31</span>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                        const isSelected = isDaySelected(d)
                        const isInRange = isDayInRange(d)
                        return (
                          <span
                            key={d}
                            onClick={() => handleDateClick(d)}
                            className={`py-1 rounded-md cursor-pointer transition-all ${
                              isSelected
                                ? 'font-bold bg-[#FFC107] text-[#0D0F12] shadow-sm relative z-10'
                                : isInRange
                                ? 'bg-[#FFC107]/15 text-brand-text font-semibold'
                                : 'font-medium hover:bg-brand-canvas text-brand-text'
                            }`}
                          >
                            {d}
                          </span>
                        )
                      })}
                      <span className="py-1 text-brand-text-muted/30 select-none pointer-events-none">1</span>
                    </div>
                  </div>

                  {/* Input trigger Anatomy */}
                  <div className="w-full max-w-[320px] mx-auto space-y-1.5 text-start">
                    <label className="block text-[10.5px] font-bold text-brand-text-secondary">Selected Campaign Period</label>
                    <div className="relative">
                      <input 
                        readOnly 
                        value={
                          dateRangeStart && dateRangeEnd
                            ? `2026-06-${String(dateRangeStart).padStart(2, '0')} to 2026-06-${String(dateRangeEnd).padStart(2, '0')}`
                            : dateRangeStart
                            ? `2026-06-${String(dateRangeStart).padStart(2, '0')}`
                            : 'Select a date range...'
                        } 
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-lg border border-brand-blue ring-2 ring-brand-blue/10 bg-brand-surface text-brand-text outline-none font-medium" 
                      />
                      <Calendar size={13} className="absolute start-3 top-1/2 -translate-y-1/2 text-brand-blue" />
                    </div>
                  </div>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Selected Day Highlight', value: '#FFC107 (Vapor Yellow)', desc: 'Active start/end dates use solid yellow fills with rounded corners.' },
                      { spec: 'Active Range Fill', value: '#FFC107 with 15% opacity', desc: 'Days in between the selected range use a transparent yellow background.' },
                      { spec: 'Trigger Input icon', value: 'Calendar (Lucide)', desc: 'The calendar trigger icon sits at the left end of the input (start-3).' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<div className="relative">\n  <input type="text" className="pl-9 pr-4 py-2.5 border rounded-lg" placeholder="YYYY-MM-DD" />\n  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2" />\n</div>', 'datepicker-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'datepicker-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'datepicker-code' ? 'Code Copied!' : 'Copy Code DatePicker'}
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ─────────── TAB 4: DATA DISPLAY ─────────── */}
        {activeTab === 'display' && (
          <div className="space-y-16">
            
            {/* Data Table Showcase */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.display.dataTable', 'Data Table')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 rounded-xl border border-brand-whisper-border overflow-x-auto shadow-inner">
                  <table className="w-full border-collapse bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden text-xs text-start select-none shadow-sm min-w-[500px]">
                    <thead>
                      <tr className="bg-brand-canvas dark:bg-white/[0.02] border-b border-brand-whisper-border text-[10px] font-bold uppercase tracking-wider text-brand-text-muted text-start">
                        <th className="px-4 py-3 text-start w-10">
                          <input 
                            type="checkbox" 
                            checked={checkAll} 
                            onChange={toggleAllRows}
                            className="rounded border-brand-whisper-border cursor-pointer accent-brand-blue" 
                          />
                        </th>
                        <th className="px-4 py-3 text-start">{t('components.table.campaign', 'Campaign')}</th>
                        <th className="px-4 py-3 text-start">{t('components.table.status', 'Status')}</th>
                        <th className="px-4 py-3 text-end">{t('components.table.budget', 'Budget')}</th>
                        <th className="px-4 py-3 text-center w-12">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-whisper-border font-medium">
                      <tr 
                        className={`transition-colors cursor-pointer ${selectedRows['hurghada'] ? 'bg-brand-blue/5' : 'hover:bg-brand-canvas/30'}`}
                        onClick={() => toggleRow('hurghada')}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={selectedRows['hurghada']} 
                            onChange={() => toggleRow('hurghada')}
                            className="rounded cursor-pointer accent-brand-blue" 
                          />
                        </td>
                        <td className="px-4 py-3 font-bold text-brand-text">Hurghada SEO Growth</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Active</span></td>
                        <td className="px-4 py-3 text-end font-mono font-bold">$1,250 / mo</td>
                        <td className="px-4 py-3 text-center text-brand-text-muted hover:text-brand-text cursor-pointer" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={14} className="mx-auto" /></td>
                      </tr>
                      <tr 
                        className={`transition-colors cursor-pointer ${selectedRows['uae'] ? 'bg-brand-blue/5' : 'hover:bg-brand-canvas/30'}`}
                        onClick={() => toggleRow('uae')}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={selectedRows['uae']} 
                            onChange={() => toggleRow('uae')}
                            className="rounded cursor-pointer accent-brand-blue" 
                          />
                        </td>
                        <td className="px-4 py-3 font-bold text-brand-text">UAE Branding Campaign</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#FFC107]/10 text-[#FFB300] dark:text-[#FFC107] border border-[#FFC107]/20">Pending</span></td>
                        <td className="px-4 py-3 text-end font-mono font-bold">$3,500 / mo</td>
                        <td className="px-4 py-3 text-center text-brand-text-muted hover:text-brand-text cursor-pointer" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={14} className="mx-auto" /></td>
                      </tr>
                      <tr 
                        className={`transition-colors cursor-pointer ${selectedRows['egypt'] ? 'bg-brand-blue/5' : 'hover:bg-brand-canvas/30'}`}
                        onClick={() => toggleRow('egypt')}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={selectedRows['egypt']} 
                            onChange={() => toggleRow('egypt')}
                            className="rounded cursor-pointer accent-brand-blue" 
                          />
                        </td>
                        <td className="px-4 py-3 font-bold text-brand-text">Egypt Paid Search</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary">Draft</span></td>
                        <td className="px-4 py-3 text-end font-mono font-bold">$850 / mo</td>
                        <td className="px-4 py-3 text-center text-brand-text-muted hover:text-brand-text cursor-pointer" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={14} className="mx-auto" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Row hover speed', value: 'transition-colors duration-150', desc: 'Slight tint change on hover provides feedback without visual noise.' },
                      { spec: 'Header background', value: 'bg-brand-canvas', desc: 'Visual separation between the table titles and the data records below.' },
                      { spec: 'Numeric Alignment', value: 'text-end + font-mono', desc: 'Align numbers right in monospace to allow direct visual stack comparison.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<table className="w-full border border-brand-whisper-border rounded-xl overflow-hidden">\n  <thead><tr className="bg-brand-canvas">...</tr></thead>\n  <tbody className="divide-y"><tr>...</tr></tbody>\n</table>', 'table-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'table-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'table-code' ? 'Code Copied!' : 'Copy Code Table'}
                  </button>
                </div>
              </div>
            </section>

            {/* Progress Bar Showcase */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.display.progressBar', 'Progress Bar')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-6 sm:p-8 rounded-xl border border-brand-whisper-border flex flex-col gap-5 shadow-inner">
                  {/* Progress 1 */}
                  <div className="space-y-1.5 w-full text-start select-none">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-brand-text-secondary">Branding Asset Upload</span>
                      <span className="font-mono text-brand-blue">{progressVal1}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-brand-whisper-border/60 overflow-hidden border border-brand-whisper-border">
                      <div className="h-full bg-brand-blue rounded-full transition-all duration-700 ease-out shadow-sm" style={{ width: `${progressVal1}%` }} />
                    </div>
                  </div>
                  {/* Progress 2 */}
                  <div className="space-y-1.5 w-full text-start select-none">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-brand-text-secondary">Campaign Publishing</span>
                      <span className="font-mono text-[#FFB300] dark:text-[#FFC107]">{progressVal2}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-brand-whisper-border/60 overflow-hidden border border-brand-whisper-border">
                      <div className="h-full bg-[#FFC107] rounded-full transition-all duration-700 ease-out shadow-sm" style={{ width: `${progressVal2}%` }} />
                    </div>
                  </div>
                  {/* Animation Replay Trigger */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setProgressVal1(0)
                        setProgressVal2(0)
                        setTimeout(() => {
                          setProgressVal1(65)
                          setProgressVal2(90)
                        }, 100)
                      }}
                      className="px-2.5 py-1 rounded border border-brand-whisper-border bg-brand-surface text-[10px] text-brand-text-secondary hover:text-brand-text font-bold active:scale-95 transition-all"
                    >
                      Re-run Progress Animation
                    </button>
                  </div>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Bar Height', value: '8px (h-2)', desc: 'Keeps progress indicators subtle, fitting in table cells or small cards.' },
                      { spec: 'Inner Shadow', value: 'shadow-inner border', desc: 'Outer track utilizes a light inset shadow and border to establish depth.' },
                      { spec: 'Color system', value: 'Accent fill colors', desc: 'Standard blue represents uploading/active states, yellow represents finishing/high-value states.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<div className="w-full h-2 bg-brand-canvas border rounded-full overflow-hidden">\n  <div className="h-full bg-brand-blue" style={{ width: "65%" }} />\n</div>', 'progress-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'progress-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'progress-code' ? 'Code Copied!' : 'Copy Code Progress'}
                  </button>
                </div>
              </div>
            </section>

            {/* Badges & Tags (Existing) */}
            <section>
              <BrandSectionHeading icon={Square} title={t('Badges & Tags', 'Badges & Tags')} />
              <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm flex flex-col divide-y divide-brand-whisper-border text-start">
                {/* Status badges */}
                <div className="p-5 sm:p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-2.5 block">{t('Status Badges', 'Status Badges')}</span>
                  <p className="text-xs text-brand-text-secondary mb-4">{t('badgeDesc', 'Status badges communicate system state at a glance. Each color map below is fixed — do not recolor or reuse colors across states.')}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { label: t('Success', 'Success'), cls: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' },
                      { label: t('Warning', 'Warning'), cls: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' },
                      { label: t('Error', 'Error'), cls: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20' },
                      { label: t('Info', 'Info'), cls: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20' },
                      { label: t('New', 'New'), cls: 'bg-[#FFC107]/10 text-[#FFB300] dark:text-[#FFC107] border border-[#FFC107]/20' },
                      { label: t('Draft', 'Draft'), cls: 'bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary' },
                    ].map((badge) => (
                      <span key={badge.label} className={`px-3 py-1 rounded-full text-[10.5px] font-bold ${badge.cls}`}>{badge.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ─────────── TAB 5: FEEDBACK & OVERLAYS ─────────── */}
        {activeTab === 'feedback' && (
          <div className="space-y-14">
            
            {/* Tooltips */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.feedback.tooltip', 'Tooltips')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-10 rounded-xl border border-brand-whisper-border flex flex-col items-center justify-center min-h-[160px] shadow-inner relative">
                  
                  {/* Interactive Trigger Button */}
                  <div className="relative group select-none">
                    <button
                      type="button"
                      onMouseEnter={() => setTooltipOpen(true)}
                      onMouseLeave={() => setTooltipOpen(false)}
                      className="px-4 py-2.5 rounded-lg border border-brand-whisper-border bg-brand-surface text-brand-text font-bold text-xs shadow-sm hover:bg-brand-canvas active:scale-95 transition-all"
                    >
                      Hover Over Me
                    </button>
                    {/* Tooltip Popup container */}
                    <div 
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-[#0D0F12] border border-white/[0.08] text-white text-[10px] font-medium rounded-lg shadow-md whitespace-nowrap z-30 transition-all duration-200 transform ${
                        tooltipOpen 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                      }`}
                    >
                      <span>A static hover label description.</span>
                    </div>
                  </div>

                  <span className="text-[9.5px] text-brand-text-muted mt-5 block">Hover button to verify active popup position.</span>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Tooltip trigger', value: 'onMouseEnter / focus', desc: 'Fires instantly on hover or keyboard tab focus. Hides on leave/blur.' },
                      { spec: 'Maximum size limit', value: 'whitespace-nowrap', desc: 'Tooltips are designed for short helper labels, never exceed 4-5 words.' },
                      { spec: 'Border outline', value: '1px border-white/8', desc: 'Translucent outline ensures box contrast on dark layouts.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('<div className="relative group">\n  <button>Trigger</button>\n  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0D0F12] text-white text-[10px] rounded px-2 py-1">Tooltip description</div>\n</div>', 'tooltip-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'tooltip-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'tooltip-code' ? 'Code Copied!' : 'Copy Code Tooltip'}
                  </button>
                </div>
              </div>
            </section>

            {/* Toggletips */}
            <section>
              <BrandSectionHeading icon={Square} title={t('components.feedback.toggletip', 'Toggletips')} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Preview */}
                <div className="lg:col-span-7 bg-brand-canvas dark:bg-[#05080e] p-10 rounded-xl border border-brand-whisper-border flex flex-col items-center justify-center min-h-[160px] shadow-inner relative">
                  
                  {/* Toggletip Trigger Icon */}
                  <div className="relative select-none">
                    <button
                      type="button"
                      onClick={() => setToggletipOpen(!toggletipOpen)}
                      className="w-7 h-7 rounded-full border border-brand-whisper-border bg-brand-surface flex items-center justify-center hover:bg-brand-canvas active:scale-95 transition-all"
                      aria-label="Toggle supplementary information"
                    >
                      <HelpCircle size={14} className="text-brand-blue" />
                    </button>
                    {/* Toggletip Popup container */}
                    <div 
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-[220px] bg-brand-surface border border-brand-whisper-border p-3 rounded-xl shadow-md z-30 transition-all duration-200 transform ${
                        toggletipOpen 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="flex flex-col gap-1.5 text-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1">
                          <Info size={9} />
                          Useful Information
                        </span>
                        <p className="text-[10.5px] text-brand-text-secondary leading-relaxed">
                          Toggletips differ from tooltips because they can hold rich HTML text, links, and require user click action to toggle open or close.
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="text-[9.5px] text-brand-text-muted mt-5 block">Click help icon to toggle rich information popup.</span>
                </div>

                {/* Spec details */}
                <div className="lg:col-span-5 space-y-4 text-start">
                  <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                    {[
                      { spec: 'Toggletip trigger', value: 'onClick toggle', desc: 'Opens and closes explicitly on click trigger, allowing users to read longer text blocks.' },
                      { spec: 'Target accessibility', value: 'Role button + aria', desc: 'Trigger is a button key; popup box supports screen reader content.' },
                      { spec: 'Z-index offset', value: 'z-30 (var(--z-dropdown))', desc: 'Sits at the dropdown layer offset to ensure it renders above main cards.' },
                    ].map((item) => (
                      <div key={item.spec} className="p-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.spec}</span>
                          <code className="text-[10px] font-mono font-bold text-brand-text bg-brand-canvas px-1.5 py-0.5 rounded border border-brand-whisper-border">{item.value}</code>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyCode('const [open, setOpen] = useState(false);\nreturn (\n  <div className="relative">\n    <button onClick={() => setOpen(!open)}><HelpIcon /></button>\n    {open && <div className="absolute bottom-full left-1/2 p-3 bg-brand-surface border rounded-xl">Rich HTML content</div>}\n  </div>\n);', 'toggletip-code')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-sm"
                  >
                    {copiedCode === 'toggletip-code' ? <Check size={11} className="text-brand-success" /> : <Copy size={11} />}
                    {copiedCode === 'toggletip-code' ? 'Code Copied!' : 'Copy Code Toggletip'}
                  </button>
                </div>
              </div>
            </section>

            {/* Cards Matrix (Existing) */}
            <section>
              <div className="mb-4 text-start">
                <h2 className="text-[13px] font-semibold text-brand-dark-blue dark:text-brand-blue">{t('Cards', 'Cards')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                {cardVariants.map((c) => (
                  <div key={c.title} className={`rounded-xl overflow-hidden ${c.extra} ${c.cls} shadow-sm transition-all duration-300`}>
                    <div className="p-5 flex flex-col justify-between min-h-[160px] text-start">
                      <div>
                        <div className="flex items-start justify-between mb-3.5">
                          <div>
                            <p className="text-xs font-bold leading-none">{c.title}</p>
                            <p className="text-[9.5px] font-mono mt-1 opacity-60">{c.subtitle}</p>
                          </div>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border font-bold uppercase">CARD</span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed opacity-80">{c.desc}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <button className="px-3.5 py-1.5 rounded-lg text-[10.5px] font-bold bg-[#FFC107] hover:bg-[#FFC107]/90 text-[#0D0F12] active:scale-95 transition-all">
                          {t('View Details', 'View details')}
                        </button>
                        <button className="text-[10.5px] font-bold flex items-center gap-1 text-[#2196F3] hover:underline">
                          {t('See Details', 'See details')} <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm divide-y divide-brand-whisper-border text-start">
                {[
                  { token: 'border-radius', value: '12px (rounded-xl)', note: t('Cards use 12px; never exceed 16px.', 'Rounded corners for cards top out at 12-16px.') },
                  { token: 'border outline', value: '1px solid #E8E8E8', note: t('Single border — no border + shadow pairing.', 'Avoid pairing a 1px border with a soft drop shadow.') },
                  { token: 'shadow resting', value: '0 2px 8px rgba(0,0,0,0.06)', note: t('Subtle lift, always present.', 'Provides micro-depth to surface elements.') },
                  { token: 'shadow hover', value: '0 8px 24px rgba(0,0,0,0.10)', note: t('Decisive lift on interaction.', 'Elevates card visually on pointer hover.') },
                  { token: 'hover offset', value: 'translateY(-2px)', note: t('Paired with shadow intensification.', 'Card physically shifts upwards by 2px.') },
                  { token: 'internal padding', value: 'p-5 (20px) / p-6 (24px)', note: t('Standard internal breathing room.', 'Use 20px padding for small cards, 24px for large dashboard sections.') },
                ].map((item) => (
                  <div key={item.token} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 px-5 py-3.5 hover:bg-brand-canvas/20 transition-colors">
                    <code className="text-[10.5px] font-mono font-bold text-brand-blue w-32 shrink-0">{item.token}</code>
                    <p className="text-xs font-bold text-brand-text w-48 shrink-0">{item.value}</p>
                    <p className="text-xs text-brand-text-secondary">{item.note}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

      </BrandPageContent>
    </div>
  )
}
