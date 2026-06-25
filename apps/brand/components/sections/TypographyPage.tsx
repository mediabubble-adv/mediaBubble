import React, { useState } from 'react'
import { Copy, Check, ArrowRight, Type, ShieldCheck, ListChecks, ArrowLeftRight, Layers } from 'lucide-react'
import { TooltipHint } from '../ui/TooltipHint'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading } from '../ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function TypographyPage() {
  const { t } = useI18n()

  const fonts = [
    {
      name: 'Poppins',
      role: t('Display & Headlines'),
      cssVar: '--font-display',
      weights: [
        { weight: 700, label: t('Bold') },
        { weight: 800, label: t('ExtraBold') },
        { weight: 900, label: t('Black') },
      ],
      specimen: 'MediaBubble',
      sub: t('Geometric, confident, modern. Used for headings, display type, and brand moments.'),
      features: [t('Geometric letterforms'), t('Open letter shapes (clear at small sizes)'), t('High x-height'), t('Track-tight spacing')],
      fallback: 'sans-serif',
    },
    {
      name: 'Inter',
      role: t('Body & UI'),
      cssVar: '--font-sans',
      weights: [
        { weight: 400, label: t('Regular') },
        { weight: 500, label: t('Medium') },
        { weight: 600, label: t('SemiBold') },
      ],
      specimen: 'Built on creativity, guided by data, and fueled by a passion for innovation.',
      sub: t('Legible, versatile, web-optimized. Used for body copy, labels, and UI elements.'),
      features: [t('Numeric legibility'), t('Neutral personality'), t('Screen-optimized hinting (crisp at small sizes)'), t('65-character line length')],
      fallback: 'sans-serif',
    },
    {
      name: 'JetBrains Mono',
      role: t('Code & Metadata'),
      cssVar: '--font-mono',
      weights: [
        { weight: 400, label: t('Regular') },
        { weight: 500, label: t('Medium') },
      ],
      specimen: 'color-brand-yellow: #FFC107;',
      sub: t('Developer-first monospace. Used for code snippets, metadata, and configuration values.'),
      features: [t('Ligature support'), t('Distinct glyph shapes'), t('Terminal-friendly'), t('Distinct zero vs O glyph')],
      fallback: 'monospace',
    },
    {
      name: 'Cairo',
      role: t('Arabic & Bilingual'),
      cssVar: '--font-cairo',
      weights: [
        { weight: 400, label: t('Regular') },
        { weight: 600, label: t('SemiBold') },
        { weight: 700, label: t('Bold') },
      ],
      specimen: 'ميديابابل',
      sub: t('Full Arabic script support for bilingual layouts. Pairs naturally with Inter for mixed-direction copy.'),
      features: [t('RTL support'), t('Arabic numerals'), t('Latin fallback'), t('High x-height')],
      fallback: 'sans-serif',
    },
  ]

  const scaleSteps = [
    { token: 'Display', size: '48/32px', lh: '1.1', tracking: '-0.02em', weight: 700, family: 'Poppins', familyClass: 'font-display', sample: 'Grow Your Business', cls: 'font-display text-4xl sm:text-5xl font-bold tracking-tight' },
    { token: 'H1', size: '32px', lh: '1.15', tracking: '-0.015em', weight: 700, family: 'Poppins', familyClass: 'font-display', sample: 'Brand Guidelines', cls: 'font-display text-3xl font-bold tracking-tight' },
    { token: 'H2', size: '18px', lh: '1.2', tracking: '-0.01em', weight: 700, family: 'Poppins', familyClass: 'font-display', sample: 'Color Palette', cls: 'font-display text-lg font-bold' },
    { token: 'H3', size: '14px', lh: '1.25', tracking: '0em', weight: 600, family: 'Poppins', familyClass: 'font-display', sample: 'Brand Yellow', cls: 'font-display text-sm font-semibold' },
    { token: 'Body', size: '14px', lh: '1.6', tracking: '0em', weight: 400, family: 'Inter', familyClass: 'font-sans', sample: 'Use for buttons, interactive states, and strategic highlights.', cls: 'font-sans text-sm leading-relaxed' },
    { token: 'Small', size: '11px', lh: '1.5', tracking: '0.02em', weight: 400, family: 'Inter', familyClass: 'font-sans', sample: 'Secondary text, placeholders, metadata', cls: 'font-sans text-[11px]' },
    { token: 'Mono', size: '11px', lh: '1.5', tracking: '0em', weight: 400, family: 'JetBrains Mono', familyClass: 'font-mono', sample: '--color-brand-yellow', cls: 'font-mono text-[11px]' },
  ]

  const [copiedScale, setCopiedScale] = useState<string | null>(null)
  const copyScale = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedScale(id)
    setTimeout(() => setCopiedScale(null), 2000)
  }

  return (
    <div>
      <PageHero icon={Type} kicker={t('Typography')} title={t('Type System')} titleHighlight={t('Type')} description={t('Three families, one system. Poppins leads, Inter reads, JetBrains Mono codes. Every size and weight serves a role, not a decoration.')} />

      <BrandPageContent>
        {/* Font families */}
        <section className="mb-14 scroll-mt-20" id="guideline-typography-font-families">
          <BrandSectionHeading icon={Type} title={t('Font Families')} anchorId="typography-font-families" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-grid">
            {fonts.map((font) => (
              <div
                key={font.name}
                id={`guideline-font-${font.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out overflow-hidden flex flex-col scroll-mt-20"
              >
                <div className="p-5 pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display text-sm font-bold text-brand-text leading-none">{font.name}</h3>
                        <TooltipHint text={font.sub} />
                      </div>
                      <p className="text-[11px] text-brand-text-muted font-medium mt-1.5">{font.role}</p>
                    </div>
                    <span className="text-[10px] font-mono text-brand-text-muted bg-brand-canvas dark:bg-white/[0.04] px-2 py-1 rounded-md border border-brand-whisper-border">{font.cssVar}</span>
                  </div>

                  <div className={`relative py-6 px-3 rounded-lg mb-4 ${font.name === 'JetBrains Mono' ? 'bg-[#0D0F12]' : 'bg-brand-canvas dark:bg-white/[0.04]'}`}>
                    <p
                      className={`${
                        font.name === 'JetBrains Mono' 
                          ? 'font-mono text-brand-yellow' 
                          : font.name === 'Cairo' 
                            ? 'font-arabic text-brand-navy dark:text-brand-blue' 
                            : 'font-display text-brand-text'
                      } text-2xl font-bold truncate transition-opacity duration-200 opacity-90 group-hover:opacity-100`}
                      dir={font.name === 'Cairo' ? 'rtl' : undefined}
                    >
                      {font.specimen}
                    </p>
                    <p className={`text-[10px] font-mono mt-2 ${font.name === 'JetBrains Mono' ? 'text-white/30' : 'text-brand-text-muted'}`}>
                      {font.fallback} &middot; {font.weights.map(w => w.weight).join(' ')}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {font.weights.map((w) => (
                      <span
                        key={w.weight}
                        className="px-2 py-1 rounded-md text-[10px] font-mono transition-all duration-200 bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary group-hover:bg-brand-blue/10 group-hover:text-brand-blue border border-brand-whisper-border"
                      >
                        {w.label} {w.weight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-4 mt-auto">
                  <p className="text-sm text-brand-text-secondary leading-relaxed mb-3">{font.sub}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {font.features.map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-muted-steel/60" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type Scale */}
        <section className="mb-14 scroll-mt-20" id="guideline-typography-scale">
          <BrandSectionHeading icon={Layers} title={t('Type Scale')} anchorId="typography-scale" />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm overflow-hidden">
            {scaleSteps.map((step, i) => (
              <div
                key={step.token}
                className={`flex items-center gap-5 px-6 py-[18px] transition-colors duration-150 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] active:bg-black/[0.03] ${
                  i < scaleSteps.length - 1 ? 'border-b border-brand-whisper-border' : ''
                } ${i === 4 ? 'border-t-2 border-t-brand-whisper-border' : ''}`}
              >
                <div className="w-28 shrink-0 flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        step.familyClass === 'font-display'
                          ? '#2196F3'
                          : step.familyClass === 'font-mono'
                          ? '#FFC107'
                          : '#1AD191',
                    }}
                  />
                  <div>
                    <p className="text-[11px] font-semibold text-brand-text leading-tight">{step.token}</p>
                    <p className="text-[10px] font-mono text-brand-text-muted mt-px">{step.size}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={step.cls}>{step.sample}</p>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-brand-text-muted shrink-0">
                  <span>lh {step.lh}</span>
                  <span>{step.tracking}</span>
                  <span>w{step.weight}</span>
                </div>
                <div className="w-[140px] shrink-0 text-end hidden lg:block">
                  <button
                    onClick={() => copyScale(step.cls.replace('sm:', ''), step.token)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono text-brand-text-muted hover:text-brand-text hover:bg-brand-canvas dark:hover:bg-white/[0.04] border border-brand-whisper-border active:scale-95 transition-all shadow-sm bg-brand-surface dark:bg-transparent"
                  >
                    {copiedScale === step.token ? (
                      <><Check size={10} className="text-brand-success" /> {t('copied')}</>
                    ) : (
                      <><Copy size={10} />{step.cls.replace('sm:', '')}</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Font Pairing */}
        <section className="mb-14 scroll-mt-20" id="guideline-typography-font-pairing">
          <BrandSectionHeading icon={ArrowLeftRight} title={t('Font Pairing')} anchorId="typography-font-pairing" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                context: t('Marketing Hero'),
                heading: t('Growth Starts with Visibility'),
                headingCls: 'font-display text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy dark:text-brand-blue',
                body: t('Poppins headlines capture attention with geometric confidence. Body copy in Inter keeps visitors reading with comfortable line heights and 65 characters per line.'),
                bodyCls: 'font-sans text-sm leading-relaxed text-brand-text-secondary',
                from: 'Poppins 700',
                to: 'Inter 400',
              },
              {
                context: t('Editorial Section'),
                heading: t('Component-Driven Design'),
                headingCls: 'font-display text-xl font-bold text-brand-navy dark:text-brand-blue',
                body: t('For longer-form content, Inter body text at 14px with 1.6 line height ensures readability across devices. Paired with clean Poppins subheads for visual rhythm.'),
                bodyCls: 'font-sans text-sm leading-relaxed text-brand-text-secondary',
                from: 'Poppins 700',
                to: 'Inter 400',
              },
              {
                context: t('UI Card'),
                heading: t('Quick Setup'),
                headingCls: 'font-display text-base font-semibold text-brand-navy dark:text-brand-blue',
                body: t('Compact card layouts use tighter Poppins headings with reduced tracking, paired with dense Inter labels and JetBrains Mono for configuration values.'),
                bodyCls: 'font-sans text-[13px] leading-snug text-brand-text-secondary',
                from: 'Poppins 600',
                to: 'Inter 400',
              },
            ].map((pair) => (
              <div key={pair.context} className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm hover:shadow-md transition-all duration-300 ease-out p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-blue mb-3">{pair.context}</p>
                <p className={pair.headingCls}>{pair.heading}</p>
                <div className="w-8 h-[2px] bg-brand-yellow rounded-full my-3" />
                <p className={pair.bodyCls}>{pair.body}</p>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-brand-whisper-border">
                  <span className="text-[10px] font-mono bg-brand-canvas dark:bg-white/[0.04] px-1.5 py-0.5 rounded text-brand-text-secondary border border-brand-whisper-border">{pair.from}</span>
                  <ArrowRight size={10} className="text-brand-muted-steel" />
                  <span className="text-[10px] font-mono bg-brand-canvas dark:bg-white/[0.04] px-1.5 py-0.5 rounded text-brand-text-secondary border border-brand-whisper-border">{pair.to}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accessible Typography */}
        <section className="mb-14 scroll-mt-20" id="guideline-typography-accessibility">
          <BrandSectionHeading icon={ShieldCheck} title={t('Accessible Typography')} anchorId="typography-accessibility" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-grid">
            {[
              { label: t('Min Body Size'), detail: t('14px minimum'), note: t('WCAG AAA compliant for all body text sizes') },
              { label: t('Line Height'), detail: t('1.6 body \u00B7 1.25 heading'), note: t('Minimum 1.5 ratio recommended for readability') },
              { label: t('Responsive sizing'), detail: t('Headlines fluid, body fixed'), note: t('Headlines scale between breakpoints using CSS clamp(). Body text stays at 14px minimum.') },
              { label: t('Letter Spacing'), detail: t('Display: -2% \u00B7 Body: 0%'), note: t('Tighten for headlines, reset for body clarity') },
            ].map((item) => (
              <div key={item.label} className="bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border rounded-xl p-5 transition-all duration-300 hover:bg-brand-blue/[0.04] dark:hover:bg-white/[0.06] hover:shadow-sm">
                <p className="text-[12px] font-semibold text-brand-navy dark:text-brand-blue mb-1">{item.label}</p>
                <p className="text-[22px] font-display font-bold text-brand-text dark:text-brand-off-white tracking-tight">{item.detail}</p>
                <p className="text-[11px] text-brand-muted-steel mt-2 leading-snug">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Rules */}
        <section className="mb-16 scroll-mt-20" id="guideline-typography-rules">
          <BrandSectionHeading icon={ListChecks} title={t('Typography Rules')} anchorId="typography-rules" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { rule: t('Line Length'), detail: t('Body text at 65ch max. Shorter lines improve readability across all viewports.') },
              { rule: t('Scale Ratio'), detail: t('Minimum 1.25x between steps. Hierarchy through weight and color, not inflated sizes.') },
              { rule: t('Leading'), detail: t('Body at 1.6 line height for comfortable reading. Display text tight but never clipped.') },
              { rule: t('Responsive Type'), detail: t('Headlines use fluid clamp() sizing. Body never smaller than 14px on any device.') },
              { rule: t('Emphasis'), detail: t('Bold or italic within the same family. Never mix families just to add visual interest.') },
              { rule: t('Pairing Rule'), detail: t('Poppins for display moments. Inter for reading. JetBrains Mono for code and data only.') },
            ].map((r) => (
              <div key={r.rule} className="bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border rounded-xl p-5 transition-all duration-300 hover:bg-brand-blue/[0.04] dark:hover:bg-white/[0.06] hover:shadow-sm">
                <p className="text-[13px] font-semibold text-brand-navy dark:text-brand-blue mb-2">{r.rule}</p>
                <p className="text-sm text-brand-text-secondary leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
