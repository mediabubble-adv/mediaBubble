import React, { useState } from 'react'
import { X, Check, MessageSquare, Copy, Zap, ArrowRight, Globe, Filter, Code } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'
import { BrandPageContent, BrandSectionHeading, brandDocCardShell } from '@/components/ui/brand-doc'

export function VoiceTonePage() {
  const { t } = useI18n()

  const [activeSandboxTab, setActiveSandboxTab] = useState<'brand' | 'seo' | 'masri' | 'khaliji'>('brand')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [activeSlopFilter, setActiveSlopFilter] = useState<'all' | 'cliche' | 'hype' | 'opener'>('all')

  const registers = [
    {
      name: 'Register 1: Brand & Website Voice',
      tone: t('voice.register1.tone', 'Confident, visionary, and partnership-oriented'),
      color: 'border-[#FFC107] dark:border-[#FFC107]/50',
      badgeBg: 'bg-[#FFC107]/10 text-[#FFC107]',
      uses: [
        'Homepage & About pages',
        'Brand positioning statements',
        'Client pitches & proposals',
        'Introductory / hero copy',
        'High-level marketing materials',
      ],
      traits: [
        'Addresses client goals directly (“Your targets need a content engine that compounds — not a one-off campaign.”)',
        'Positions the client relationship as a partnership — “strategic allies,” “we collaborate,” not “vendor and client.”',
        'Confident and evidence-based (“We increased organic traffic 340% in six months.”)',
        'Frames every offer around the client’s measurable outcome, not the agency process',
        'Professional but warm and approachable',
      ],
      example: '“We’re your strategic partner — the team that turned a regional resort into a booking-first brand with a 68% direct-booking rate.”',
      phrases: [
        { text: 'Strategic allies', ok: true },
        { text: 'Transform your brand', ok: true },
        { text: 'Drive meaningful growth', ok: true },
        { text: 'Partner with us', ok: true },
        { text: 'Contact us today', ok: false },
        { text: 'Full-service solutions', ok: false },
      ],
    },
    {
      name: 'Register 2: Content & SEO Voice',
      tone: t('voice.register2.tone', 'Energetic, punchy, scannable, and CTA-driven'),
      color: 'border-brand-blue dark:border-brand-blue/50',
      badgeBg: 'bg-brand-blue/10 text-brand-blue',
      uses: [
        'Blog posts & long-form content',
        'Social media captions',
        'Email newsletter copy',
        'SEO-optimized pages',
        'Educational / how-to content',
      ],
      traits: [
        'Alliteration and rhetorical questions (“Be seen, be heard, and be found”)',
        'Breaks information into digestible chunks (lists, short paragraphs)',
        'Direct, second-person address (“You need SEO, and here’s why”)',
        'Clear CTAs at natural stopping points',
        'Conversational but professional',
      ],
      example: '“SEO isn’t a luxury—it’s a must. Here’s why your business can’t afford to wait.”',
      phrases: [
        { text: 'Here’s why…', ok: true },
        { text: 'Real results', ok: true },
        { text: 'Quick wins', ok: true },
        { text: 'Get your free strategy audit', ok: true },
        { text: 'Award-winning team', ok: false },
        { text: 'Cutting-edge / Next-gen', ok: false },
      ],
    },
  ]

  const toneMatrix = [
    { type: 'Homepage / Hero', register: 'Brand & Website', adjustment: 'Aspirational, visionary, confident' },
    { type: 'About Page', register: 'Brand & Website', adjustment: 'Proud, people-focused, mission-driven' },
    { type: 'Service Pages', register: 'Brand & Website', adjustment: 'Solution-oriented, benefit-led' },
    { type: 'Blog Posts', register: 'Content & SEO', adjustment: 'Energetic, scannable, educational' },
    { type: 'Social Media', register: 'Content & SEO', adjustment: 'Conversational, timely, engaging' },
    { type: 'Email', register: 'Content & SEO', adjustment: 'Personal, direct, action-oriented' },
    { type: 'Case Studies', register: 'Brand & Website', adjustment: 'Results-focused, narrative-driven' },
    { type: 'Proposals / Pitches', register: 'Brand & Website', adjustment: 'Professional, strategic, partnership-oriented' },
  ]

  const ctaLevels = [
    {
      level: 'Primary CTA',
      color: '#FFC107',
      label: 'Get your free strategy audit',
      usage: 'Yellow button \u2022 1\u20132x per page \u2022 High prominence',
      desc: 'Used on every service page, hero section, and high-value conversion points',
      component: (
        <button 
          onClick={() => copyCtaText('Get your free strategy audit', 'cta-primary')}
          className="px-4 py-2 bg-[#FFC107] text-[#0D0F12] font-bold text-xs rounded-lg hover:bg-[#FFC107]/90 active:scale-95 transition-all w-full text-center"
        >
          Get your free strategy audit
        </button>
      )
    },
    {
      level: 'Secondary CTA',
      color: '#2196F3',
      label: 'View case studies',
      usage: 'Blue button \u2022 Lower priority \u2022 Supporting actions',
      desc: 'Use “Explore [Service Name]” for service pages, “View case studies” for portfolio. Avoid generic “Learn More”.',
      component: (
        <button 
          onClick={() => copyCtaText('View case studies', 'cta-secondary')}
          className="px-4 py-2 bg-[#2196F3] text-white font-bold text-xs rounded-lg hover:bg-[#2196F3]/90 active:scale-95 transition-all w-full text-center"
        >
          View case studies
        </button>
      )
    },
    {
      level: 'Tertiary CTA',
      color: '#9E9E9E',
      label: 'Discover more \u2022 Read the full post',
      usage: 'Inline text link \u2022 Within content body',
      desc: 'Used inline within content blocks for contextual linking. Always describe destination.',
      component: (
        <button 
          onClick={() => copyCtaText('See how we helped Magnific People', 'cta-tertiary')}
          className="text-xs font-bold text-[#2196F3] hover:underline flex items-center gap-1 mx-auto transition-all"
        >
          See how we helped Magnific People <ArrowRight size={11} />
        </button>
      )
    },
    {
      level: 'Email CTA',
      color: '#1565C0',
      label: 'Claim Your Free Consultation',
      usage: 'Conversational \u2022 First-person \u2022 Benefit-led',
      desc: 'Used in email campaigns or newsletter footer overrides for higher engagement rate.',
      component: (
        <button 
          onClick={() => copyCtaText('Claim Your Free Consultation', 'cta-email')}
          className="px-4 py-2 border border-white/20 hover:bg-white/5 text-white font-bold text-xs rounded-lg active:scale-95 transition-all w-full text-center"
        >
          Claim Your Free Consultation
        </button>
      )
    },
  ]

  const prohibited = [
    { word: 'Full-service solutions', why: 'Industry cliché, meaningless differentiation.', category: 'cliche', fix: 'Strategic SEO, branding, and web development' },
    { word: 'Award-winning team', why: 'Overused phrase in agency marketing — triggers instant skepticism.', category: 'cliche', fix: 'Team of 22+ Hurghada-based specialists' },
    { word: 'Next-gen / Cutting-edge', why: 'Unsubstantiated hype without specifics.', category: 'hype', fix: 'High-performance Next.js application structure' },
    { word: 'Contact us today', why: 'Weak, friction-heavy CTA. Always request a clear commitment.', category: 'opener', fix: 'Schedule a Free Consultation' },
    { word: 'Click here', why: 'No context for link destination; fails basic web accessibility.', category: 'opener', fix: 'Explore our web engineering services' },
    { word: 'Learn more (as primary CTA)', why: 'Too vague, low conversion signal.', category: 'opener', fix: 'Claim your SEO audit report' },
    { word: 'State-of-the-art', why: 'Same problem as cutting-edge. Describe actual features.', category: 'hype', fix: 'Tailwind CSS token structure' },
    { word: 'We try to…', why: 'Signals uncertainty. MediaBubble delivers results, it doesn’t try.', category: 'hype', fix: 'We guarantee a 20%+ conversion uplift' },
    { word: 'One-stop-shop', why: 'Generic, commoditizing agency framing.', category: 'cliche', fix: 'We collaborate as strategic allies' },
    { word: 'In today’s digital world…', why: 'Cliché blog opener. Hook the reader immediately with a problem.', category: 'opener', fix: 'Most business websites lose 40% of leads within 3 seconds' },
  ]

  const copyCtaText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const copySandboxText = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText('sandbox')
    setTimeout(() => setCopiedText(null), 2000)
  }

  const filteredSlop = activeSlopFilter === 'all' 
    ? prohibited 
    : prohibited.filter(p => p.category === activeSlopFilter)

  // Copywriting Sandbox Translations / Registrations data
  const sandboxDrafts = {
    brand: {
      concept: 'SEO & Growth Positioning',
      text: 'We align search intent directly to your commercial business targets, building a content engine that compounds traffic and delivers direct leads.',
      meta: 'Register: Brand & Website (Aspirational, partnership-focused, benefit-led)'
    },
    seo: {
      concept: 'SEO Article Intro',
      text: 'SEO isn’t a marketing luxury — it’s a direct business requirement. We audit your keywords and optimize loading speeds to drive a 3x increase in conversion ROI.',
      meta: 'Register: Content & SEO (Energetic, punchy, scannable, stats-focused)'
    },
    masri: {
      concept: 'Egypt Masri Localization',
      text: 'بنعملك مراجعة كاملة وقوية للـ SEO وبنحسن الكلمات المفتاحية عشان نزود العملاء اللي بيجوا لموقعك بشكل مباشر وملموس.',
      meta: 'Market: Egypt (ar-masri) - Warm, colloquial, trust-building tone'
    },
    khaliji: {
      concept: 'UAE Khaliji Localization',
      text: 'نقوم بإجراء تحليل فني شامل للـ SEO الخاص بك، وتطوير الكلمات المفتاحية الاستراتيجية لزيادة حجم مبيعاتك بشكل مباشر ومضمون.',
      meta: 'Market: UAE (ar-khaliji) - Professional, respectful, Khaliji terms'
    }
  }

  return (
    <div>
      <PageHero
        icon={MessageSquare}
        kicker={t('Brand Communication')}
        title={t('Voice & Tone')}
        titleHighlight={t('Voice')}
        description={t('MediaBubble has two distinct voice registers, each appropriate to different contexts. Both are authentically MediaBubble, but they serve different audiences and purposes.')}
      />

      <BrandPageContent>
        {/* SECTION 1: TWO REGISTERS GRID */}
        <section className="mb-14">
          <BrandSectionHeading icon={MessageSquare} title={t('Voice Registers')} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {registers.map((reg) => (
              <div 
                key={reg.name} 
                className={`${brandDocCardShell} border-s-4 ${reg.color} overflow-hidden shadow-sm flex flex-col justify-between`}
              >
                <div className="p-6 space-y-5">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="font-display text-base font-bold text-brand-text">{t(reg.name)}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${reg.badgeBg}`}>
                      {t(reg.tone)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-text-muted">{t('Used In')}</p>
                      <ul className="space-y-1.5">
                        {reg.uses.map((u) => (
                          <li key={u} className="flex items-start gap-2 text-xs text-brand-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[5px] bg-brand-blue" />
                            <span>{t(u)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-text-muted">{t('Characteristics')}</p>
                      <ul className="space-y-1.5">
                        {reg.traits.map((tr) => (
                          <li key={tr} className="flex items-start gap-2 text-xs text-brand-text-secondary leading-normal">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[5px] bg-[#FFC107]" />
                            <span>{t(tr)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Inner Example card */}
                  <div className="bg-brand-canvas rounded-xl border border-brand-whisper-border p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-brand-text-muted mb-2">{t('Example')}</p>
                    <p className="text-xs text-brand-text italic leading-relaxed">“{t(reg.example)}”</p>
                  </div>
                </div>

                {/* Phrase highlights footer */}
                <div className="px-6 py-4 border-t border-brand-whisper-border bg-brand-canvas/30 dark:bg-black/5 flex flex-wrap gap-2">
                  {reg.phrases.map((p) => (
                    <span
                      key={p.text}
                      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                        p.ok
                          ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/5 text-rose-600 dark:text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {p.ok ? <Check size={10} className="stroke-[2.5]" /> : <X size={10} className="stroke-[2.5]" />}
                      {t(p.text)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE COPYWRITING SANDBOX */}
        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <BrandSectionHeading icon={Globe} title="Bilingual Translation & Tone Sandbox" />
            <span className="text-[10px] font-mono text-brand-text-muted bg-brand-canvas dark:bg-black/20 border border-brand-whisper-border px-2 py-0.5 rounded">
              Interactive Translation Sandbox
            </span>
          </div>

          <div className="bg-brand-surface border border-brand-whisper-border rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            {/* Toggles Panel */}
            <div className="md:w-64 border-b md:border-b-0 md:border-e border-brand-whisper-border p-5 bg-brand-canvas/20 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider block mb-2">Select Register</span>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'brand', label: 'Brand Copy (EN)' },
                    { id: 'seo', label: 'SEO Copy (EN)' },
                    { id: 'masri', label: 'Egypt Masri (AR)' },
                    { id: 'khaliji', label: 'UAE Khaliji (AR)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSandboxTab(tab.id as any)}
                      className={`text-start px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeSandboxTab === tab.id
                          ? 'bg-[#FFC107]/10 border-[#FFC107]/60 text-brand-text font-bold'
                          : 'bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-brand-text-secondary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-brand-whisper-border">
                <p className="text-[9.5px] text-brand-text-muted leading-relaxed">
                  Toggle options to verify how phrasing shifts structurally between English registers and custom localization locales.
                </p>
              </div>
            </div>

            {/* Content Preview Canvas */}
            <div className="flex-1 p-6 sm:p-8 bg-brand-canvas dark:bg-[#090d16] flex flex-col justify-between min-h-[220px] relative">
              {copiedText === 'sandbox' && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4 rounded-xl animate-scale-in z-10">
                  <Check className="text-[#FFC107] mb-1.5" size={18} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Copywriting Snippet Copied!</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                    Concept: {sandboxDrafts[activeSandboxTab].concept}
                  </span>
                  <span className="text-[9.5px] font-mono text-brand-blue">
                    {sandboxDrafts[activeSandboxTab].meta}
                  </span>
                </div>

                <div className="bg-brand-surface rounded-xl border border-brand-whisper-border p-6 shadow-sm">
                  <p className={`text-base font-bold text-brand-text leading-relaxed ${activeSandboxTab === 'masri' || activeSandboxTab === 'khaliji' ? 'text-right font-cairo' : 'font-sans'}`}>
                    {sandboxDrafts[activeSandboxTab].text}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-brand-text-muted font-mono">
                  {activeSandboxTab === 'masri' || activeSandboxTab === 'khaliji' ? 'Direction: RTL (Arabic)' : 'Direction: LTR (English)'}
                </span>
                <button
                  onClick={() => copySandboxText(sandboxDrafts[activeSandboxTab].text)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-semibold hover:bg-brand-blue/90 transition-all self-end"
                >
                  <Copy size={12} />
                  Copy Copywriting Text
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TONE BY CONTEXT MATRIX */}
        <section className="mb-14">
          <BrandSectionHeading icon={Zap} title={t('Tone by Content Type')} />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="bg-[#0D0F12] text-white border-b border-white/[0.08]">
                    <th className="text-start px-6 py-4 font-bold uppercase tracking-wider w-1/3">{t('Content Type')}</th>
                    <th className="text-start px-6 py-4 font-bold uppercase tracking-wider w-1/4">{t('Register')}</th>
                    <th className="text-start px-6 py-4 font-bold uppercase tracking-wider">{t('Tone Adjustment')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-whisper-border">
                  {toneMatrix.map((row) => (
                    <tr key={row.type} className="hover:bg-brand-canvas/30 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-text">{t(row.type)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          row.register === 'Brand & Website'
                            ? 'bg-[#FFC107]/10 text-[#FFB300] dark:text-[#FFC107]'
                            : 'bg-brand-blue/10 text-brand-blue'
                        }`}>
                          {t(row.register)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-brand-text-secondary leading-relaxed">{t(row.adjustment)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: CALL-TO-ACTION STANDARDS */}
        <section className="mb-14">
          <BrandSectionHeading icon={Code} title={t('Call-to-Action Standards')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ctaLevels.map((cta) => {
              const isCopied = copiedText === cta.level.toLowerCase().replace(' ', '-');
              return (
                <div 
                  key={cta.level} 
                  className={`${brandDocCardShell} border border-brand-whisper-border p-6 flex flex-col justify-between gap-5 relative overflow-hidden`}
                >
                  {isCopied && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 animate-fade-in z-10">
                      <Check className="text-[#FFC107] mb-1" size={16} />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{cta.level} Label Copied!</span>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cta.color }} />
                      <h4 className="text-xs font-bold text-brand-text">{t(cta.level)}</h4>
                    </div>
                    
                    <p className="text-sm font-bold text-brand-text-secondary leading-relaxed">
                      &ldquo;{t(cta.label)}&rdquo;
                    </p>
                    <p className="text-[10px] font-mono text-brand-text-muted">{t(cta.usage)}</p>
                    <p className="text-xs text-brand-text-muted leading-relaxed mt-2">{t(cta.desc)}</p>
                  </div>

                  {/* Component Render Block */}
                  <div className="bg-brand-canvas rounded-lg border border-brand-whisper-border p-4 flex flex-col items-center justify-center min-h-[70px]">
                    {cta.component}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: FILTERABLE PROHIBITED SLOP CATALOG */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              <h2 className="text-[13px] font-semibold text-brand-dark-blue dark:text-brand-blue">{t('Prohibited Phrases')}</h2>
              <span className="text-[9.5px] font-mono text-rose-500 bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10 uppercase font-bold">{t('Never use')}</span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1 bg-brand-surface border border-brand-whisper-border p-1 rounded-lg">
              {[
                { id: 'all', label: 'All Phrases' },
                { id: 'cliche', label: 'Clichés' },
                { id: 'hype', label: 'Hype' },
                { id: 'opener', label: 'Openers' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveSlopFilter(btn.id as any)}
                  className={`text-[10px] px-2.5 py-1 rounded-md font-semibold transition-all ${
                    activeSlopFilter === btn.id
                      ? 'bg-rose-500 text-white font-bold'
                      : 'text-brand-text-secondary hover:text-brand-text'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slop Cards Table */}
          <div className="space-y-4">
            {filteredSlop.map((item) => (
              <div 
                key={item.word}
                className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm flex flex-col lg:flex-row"
              >
                {/* Left Block: Slop */}
                <div className="flex-1 p-5 border-b lg:border-b-0 lg:border-e border-brand-whisper-border bg-rose-500/[0.02] flex items-start gap-4">
                  <div className="w-6 h-6 rounded bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={13} className="stroke-[3]" />
                  </div>
                  <div>
                    <code className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 block mb-1">&ldquo;{t(item.word)}&rdquo;</code>
                    <p className="text-xs text-brand-text-secondary leading-relaxed">{t(item.why)}</p>
                  </div>
                </div>

                {/* Right Block: Solution */}
                <div className="flex-1 p-5 bg-emerald-500/[0.01] flex items-start gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} className="stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Rewrite / Recommended Phrasing</span>
                      <p className="text-xs font-semibold text-brand-text leading-relaxed">
                        {t(item.fix)}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyCtaText(item.fix, item.word)}
                    className="p-1.5 text-brand-text-muted hover:text-brand-blue hover:bg-brand-canvas dark:hover:bg-white/5 rounded transition-all relative shrink-0"
                    title="Copy rewrite"
                  >
                    {copiedText === item.word ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
