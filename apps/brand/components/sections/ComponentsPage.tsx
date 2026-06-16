import React, { useState } from 'react'
import { Copy, Check, AlertCircle, ArrowRight, Bell, ChevronRight, Square, Code } from 'lucide-react'
import { getButtonClasses } from '@mediabubble/design-system'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading, brandDocCardShell } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

const destructiveBtnCls =
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold bg-[#DC2626] text-white hover:bg-[#DC2626]/90 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'

const disabledBtnCls =
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold bg-brand-canvas text-brand-text-muted cursor-not-allowed dark:bg-white/[0.04] dark:text-brand-text-muted/60'

export function ComponentsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { t } = useI18n()

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 1500)
  }

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
        {/* SECTION 1: BUTTONS PREVIEW GRID */}
        <section className="mb-14">
          <BrandSectionHeading icon={Square} title={t('Buttons', 'Buttons')} />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm flex flex-col divide-y divide-brand-whisper-border">
            {buttonVariants.map((btn) => {
              const isCopied = copiedCode === `btn-${btn.label}`;
              return (
                <div key={btn.label} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 px-5 py-4.5 hover:bg-brand-canvas/20 transition-colors relative">
                  {isCopied && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 animate-fade-in z-10">
                      <Check className="text-[#FFC107] mb-1" size={16} />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">JSX Code Copied!</span>
                    </div>
                  )}

                  {/* Component Render Box */}
                  <div className="w-full sm:w-36 shrink-0 bg-brand-canvas dark:bg-[#0D0F12] p-4 rounded-xl border border-brand-whisper-border flex items-center justify-center min-h-[60px] shadow-inner">
                    <button
                      disabled={btn.disabled}
                      className={btn.cls}
                    >
                      {btn.label}
                    </button>
                  </div>

                  {/* Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-brand-text">{btn.label}</span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${btn.tokenCls}`}>{btn.token}</span>
                    </div>
                    <p className="text-[11px] text-brand-text-secondary mt-1 leading-normal">{btn.desc}</p>
                  </div>

                  {/* Action Copy */}
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

        {/* SECTION 2: FORM INPUTS GRID */}
        <section className="mb-14">
          <BrandSectionHeading icon={Square} title={t('Form Inputs', 'Form Inputs')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: t('Default', 'Default'), border: 'border-brand-input-border focus:border-brand-blue/60', val: '', ph: t('e.g. Campaign name', 'e.g. Campaign name'), note: t('Resting state', 'Resting state') },
              { label: t('Focused', 'Focused'), border: 'border-brand-blue ring-2 ring-brand-blue/10 focus:border-brand-blue', val: t('Spring Campaign', 'Spring Campaign'), ph: '', note: t('Active input', 'Active input') },
              { label: t('Error', 'Error'), border: 'border-rose-500 ring-2 ring-rose-500/10 focus:border-rose-500', val: t('invalid-format@', 'invalid-format@'), ph: '', note: t('Validation failed', 'Validation failed'), err: t('Enter a valid email address', 'Enter a valid email address') },
              { label: t('Disabled', 'Disabled'), border: 'border-brand-whisper-border', val: t('Read-only value', 'Read-only value'), ph: '', note: t('Non-interactive', 'Non-interactive'), disabled: true },
            ].map((inp) => (
              <div key={inp.label} className="bg-brand-surface rounded-xl border border-brand-whisper-border p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
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

        {/* SECTION 3: CONTACT FORM SHOWCASE */}
        <section className="mb-14">
          <div className="bg-brand-canvas border border-brand-whisper-border rounded-xl px-5 py-3 mb-6">
            <h2 className="text-[13px] font-semibold text-brand-dark-blue dark:text-brand-blue">{t('Contact Form', 'Contact Form Showcase')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Visual Form render */}
            <div className="lg:col-span-7 bg-brand-surface border border-brand-whisper-border rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-base font-bold text-brand-text mb-1">{t('Get in touch', 'Start a Project')}</h3>
              <p className="text-[11.5px] text-brand-text-secondary mb-5 leading-normal">{t('contactDesc', 'Tell us about your project. We respond within one business day with next steps.')}</p>
              
              <div className="space-y-4 text-start">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('First name', 'First name')}</label>
                    <input readOnly value="Yasser" className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none font-medium" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Last name', 'Last name')}</label>
                    <input readOnly value="Dorgham" className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none font-medium" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Email address', 'Email address')}</label>
                  <input readOnly value="hello@mediabubble.com" className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-blue ring-2 ring-brand-blue/10 bg-brand-surface text-brand-text outline-none font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Service', 'Service')}</label>
                  <div className="relative">
                    <select className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none appearance-none cursor-pointer font-medium">
                      <option>{t('Brand Development', 'Brand Development')}</option>
                      <option>{t('Digital Growth', 'Digital Growth')}</option>
                      <option>{t('Web Solutions', 'Web Solutions')}</option>
                    </select>
                    <ChevronRight size={13} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold text-brand-text-secondary">{t('Message', 'Message')}</label>
                  <textarea readOnly rows={3} value="Looking forward to working with your team on our rebrand." className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none resize-none leading-relaxed font-medium" />
                </div>
                <button className="w-full py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all font-sans">
                  {t('Send message', 'Send message')}
                </button>
              </div>
            </div>

            {/* Spec Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-brand-surface rounded-xl border border-brand-whisper-border shadow-sm divide-y divide-brand-whisper-border">
                {[
                  { rule: t('Labels', 'Labels'), val: '10.5px · font-bold · uppercase', note: t('Sentence case, above the input', 'Always visible, never floating labels.') },
                  { rule: t('Input Height', 'Input Height'), val: 'py-2.5 → ~40px', note: t('44px min on touch devices', 'Minimum 40px, standard offset height.') },
                  { rule: t('Border Resting', 'Border Resting'), val: '1px #E0E0E0', note: t('Neutral, no color distraction', 'Fills in dark theme at white/12%.') },
                  { rule: t('Border Focus', 'Border Focus'), val: '1px #2196F3 + ring-2', note: t('Brand blue + 10% opacity ring', 'Gives clear interactive feedback.') },
                  { rule: t('Border Error', 'Border Error'), val: '1px #DC2626 + ring-2', note: t('Red + 10% opacity ring', 'Fires with alert text below.') },
                ].map((r) => (
                  <div key={r.rule} className="flex flex-col p-4.5 gap-1 hover:bg-brand-canvas/30 dark:hover:bg-white/[0.01] transition-colors text-start">
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

        {/* SECTION 4: CARDS MATRIX */}
        <section className="mb-14">
          <div className="mb-4">
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
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm divide-y divide-brand-whisper-border">
            {[
              { token: 'border-radius', value: '12px (rounded-xl)', note: t('Cards use 12px; never exceed 16px.', 'Rounded corners for cards top out at 12-16px.') },
              { token: 'border outline', value: '1px solid #E8E8E8', note: t('Single border — no border + shadow pairing.', 'Avoid pairing a 1px border with a soft drop shadow.') },
              { token: 'shadow resting', value: '0 2px 8px rgba(0,0,0,0.06)', note: t('Subtle lift, always present.', 'Provides micro-depth to surface elements.') },
              { token: 'shadow hover', value: '0 8px 24px rgba(0,0,0,0.10)', note: t('Decisive lift on interaction.', 'Elevates card visually on pointer hover.') },
              { token: 'hover offset', value: 'translateY(-2px)', note: t('Paired with shadow intensification.', 'Card physically shifts upwards by 2px.') },
              { token: 'internal padding', value: 'p-5 (20px) / p-6 (24px)', note: t('Standard internal breathing room.', 'Use 20px padding for small cards, 24px for large dashboard sections.') },
            ].map((item) => (
              <div key={item.token} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 px-5 py-3.5 hover:bg-brand-canvas/20 transition-colors text-start">
                <code className="text-[10.5px] font-mono font-bold text-brand-blue w-32 shrink-0">{item.token}</code>
                <p className="text-xs font-bold text-brand-text w-48 shrink-0">{item.value}</p>
                <p className="text-xs text-brand-text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: NAVIGATION TABS */}
        <section className="mb-14">
          <BrandSectionHeading icon={Square} title={t('Navigation Tabs', 'Navigation Tabs')} />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm divide-y divide-brand-whisper-border">
            {[
              { 
                label: t('Underline tabs', 'Underline tabs'), 
                type: 'primary', 
                typeColor: 'bg-brand-blue/10 text-brand-blue', 
                desc: t('Standard nav — active state uses bottom border + bold weight. Best for top-level navigation.', 'Standard nav — active state uses bottom border + bold weight. Best for top-level navigation.'), 
                component: (
                  <div className="flex gap-5 border-b border-brand-whisper-border px-1 w-full max-w-[280px]">
                    <button className="text-xs font-bold text-brand-text border-b-2 border-brand-blue pb-2">{t('Active', 'Active')}</button>
                    <button className="text-xs font-semibold text-brand-text-secondary pb-2">{t('Inactive', 'Inactive')}</button>
                    <button className="text-xs font-semibold text-brand-text-secondary pb-2">{t('Tab', 'Tab')}</button>
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
                    <button className="px-3.5 py-1.5 rounded-full bg-[#2196F3] text-white text-[10.5px] font-bold">{t('Active', 'Active')}</button>
                    <button className="px-3.5 py-1.5 rounded-full bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary text-[10.5px] font-semibold">{t('Inactive', 'Inactive')}</button>
                    <button className="px-3.5 py-1.5 rounded-full bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border text-brand-text-secondary text-[10.5px] font-semibold">{t('Tab', 'Tab')}</button>
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
                    <button className="px-3.5 py-1.5 rounded-md bg-brand-surface text-brand-text text-[10.5px] font-bold shadow-sm">{t('Day', 'Day')}</button>
                    <button className="px-3.5 py-1.5 rounded-md text-brand-text-secondary text-[10.5px] font-semibold">{t('Week', 'Week')}</button>
                    <button className="px-3.5 py-1.5 rounded-md text-brand-text-secondary text-[10.5px] font-semibold">{t('Month', 'Month')}</button>
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

                  {/* Component Render Box */}
                  <div className="flex-1 min-w-[240px] bg-brand-canvas dark:bg-[#0D0F12] p-4 rounded-xl border border-brand-whisper-border flex items-center justify-center min-h-[60px] shadow-inner">
                    {tab.component}
                  </div>

                  {/* Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-brand-text">{tab.label}</span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${tab.typeColor}`}>{tab.type}</span>
                    </div>
                    <p className="text-[11px] text-brand-text-secondary mt-1 leading-normal">{tab.desc}</p>
                  </div>

                  {/* Action Copy */}
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

        {/* SECTION 6: BADGES & TAGS */}
        <section className="mb-16">
          <BrandSectionHeading icon={Square} title={t('Badges & Tags', 'Badges & Tags')} />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden shadow-sm flex flex-col divide-y divide-brand-whisper-border">
            
            {/* Status badges */}
            <div className="p-5 sm:p-6 text-start">
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

            {/* Token badges */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-start relative">
              {copiedCode === 'badge-token' && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 z-10">
                  <Check className="text-[#FFC107] mb-1" size={16} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Token Badge Code Copied!</span>
                </div>
              )}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-2.5 block">{t('Token Badges', 'Token Badges')}</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#2196F3]/10 text-brand-blue text-[10px] font-mono font-bold border border-brand-blue/20">#2196F3</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFC107]/10 text-[#FFB300] dark:text-[#FFC107] text-[10px] font-mono font-bold border border-[#FFC107]/20">#FFC107</span>
                  <span className="px-2 py-0.5 rounded-md bg-brand-canvas dark:bg-white/5 text-brand-text-secondary text-[10px] font-mono font-bold border border-brand-whisper-border">#0D0F12</span>
                </div>
              </div>
              <button
                onClick={() => copyCode('<span className="px-2 py-0.5 rounded-md bg-[#2196F3]/10 text-brand-blue text-[10px] font-mono font-bold border border-brand-blue/20">#2196F3</span>', 'badge-token')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text hover:border-brand-blue/50 rounded-lg text-xs font-semibold active:scale-95 transition-all shrink-0"
              >
                <Copy size={11} />
                Copy Code
              </button>
            </div>

            {/* Count badges */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-start relative">
              {copiedCode === 'badge-count' && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-2 z-10">
                  <Check className="text-[#FFC107] mb-1" size={16} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Count Badge Code Copied!</span>
                </div>
              )}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-2.5 block">{t('Count Badges', 'Count Badges')}</span>
                <div className="flex items-center gap-5">
                  <span className="relative inline-flex">
                    <Bell size={18} className="text-brand-text-secondary" />
                    <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center">3</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2196F3] text-white text-[10px] font-bold min-w-[22px] text-center shadow-sm">42</span>
                </div>
              </div>
              <button
                onClick={() => copyCode('<span className="relative inline-flex">\n  <Bell size={18} className="text-brand-text-secondary" />\n  <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center">3</span>\n</span>', 'badge-count')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text hover:border-brand-blue/50 rounded-lg text-xs font-semibold active:scale-95 transition-all shrink-0"
              >
                <Copy size={11} />
                Copy Code
              </button>
            </div>

          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
