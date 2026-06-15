import React, { useState } from 'react'
import { Copy, Check, AlertCircle, ArrowRight, Bell, ChevronRight, Square } from 'lucide-react'
import { getButtonClasses } from '@mediabubble/design-system'
import { PageHero } from './PageHero'
import { BrandPageContent } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

const destructiveBtnCls =
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-brand-error text-white transition-all duration-150 hover:-translate-y-[1px] hover:brightness-105 active:scale-[0.97]'

const disabledBtnCls =
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-brand-canvas text-brand-text-muted cursor-not-allowed dark:bg-white/[0.06] dark:text-brand-text-muted/70'

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
      cls: getButtonClasses('primary', 'sm', 'w-full'),
      token: 'primary',
      tokenCls: 'bg-brand-yellow/15 text-brand-navy dark:text-brand-yellow',
      desc: t('primaryBtnDesc', 'Use for the single primary action per view (save, submit, confirm).'),
      code: `<button className="${getButtonClasses('primary', 'sm')}">Primary CTA</button>`,
    },
    {
      label: t('Secondary', 'Secondary'),
      cls: getButtonClasses('secondary', 'sm', 'w-full'),
      token: 'secondary',
      tokenCls: 'bg-brand-navy/10 text-brand-navy dark:text-brand-off-white',
      desc: t('Secondary navy actions on light surfaces', 'Secondary navy actions on light surfaces'),
      code: `<button className="${getButtonClasses('secondary', 'sm')}">Secondary</button>`,
    },
    {
      label: t('Outline', 'Outline'),
      cls: getButtonClasses('outline', 'sm', 'w-full'),
      token: 'outline',
      tokenCls: 'bg-brand-navy/10 text-brand-navy dark:text-brand-off-white',
      desc: t('Tertiary actions with a visible border', 'Tertiary actions with a visible border'),
      code: `<button className="${getButtonClasses('outline', 'sm')}">Outline</button>`,
    },
    {
      label: t('Ghost', 'Ghost'),
      cls: getButtonClasses('ghost', 'sm', 'w-full'),
      token: 'ghost',
      tokenCls: 'bg-brand-canvas dark:bg-white/[0.06] text-brand-navy dark:text-brand-off-white',
      desc: t('Tertiary, low visual weight', 'Tertiary, low visual weight'),
      code: `<button className="${getButtonClasses('ghost', 'sm')}">Ghost</button>`,
    },
    {
      label: t('Destructive', 'Destructive'),
      cls: destructiveBtnCls,
      token: 'destructive',
      tokenCls: 'bg-brand-error-bg text-brand-error',
      desc: t('destructiveBtnDesc', 'Destructive actions — delete, remove, discard. Always confirm before executing.'),
      code: '<button className="bg-brand-error text-white px-4 py-2 rounded-lg font-semibold">Destructive</button>',
    },
    {
      label: t('Disabled', 'Disabled'),
      cls: disabledBtnCls,
      token: 'disabled',
      tokenCls: 'bg-brand-canvas dark:bg-white/[0.06] text-brand-text-muted',
      desc: t('Non-interactive state', 'Non-interactive state'),
      disabled: true,
      code: '<button className="bg-brand-canvas text-brand-text-muted px-4 py-2 rounded-lg font-semibold cursor-not-allowed dark:bg-white/[0.06]" disabled>Disabled</button>',
    },
  ]

  const cardVariants = [
    {
      title: t('Default card', 'Default card'),
      subtitle: t('rest state', 'Default — no interaction'),
      desc: t('Standard elevation — 1px border, soft shadow. No paired shadow + border.', 'Standard elevation — 1px border, soft shadow. No paired shadow + border.'),
      extra: null,
      cls: 'border border-brand-whisper-border dark:border-brand-light-border shadow-[0_2px_6px_rgba(0,0,0,0.06)]',
    },
    {
      title: t('Hover card', 'Hover card'),
      subtitle: t('interactive state', 'On hover or focus'),
      desc: t('Decisive lift on cursor enter. Shadow scales up, content translates -1px.', 'Decisive lift on cursor enter. Shadow scales up, content translates -1px.'),
      extra: null,
      cls: 'border border-brand-whisper-border dark:border-brand-light-border shadow-[0_8px_24px_rgba(0,0,0,0.1)] -translate-y-[1px]',
    },
    {
      title: t('Accent card', 'Accent card'),
      subtitle: t('brand highlight', 'Emphasize one card per grid'),
      desc: t('Yellow top-border variant. Use when one card in a grid needs to lead.', 'Yellow top-border variant. Use when one card in a grid needs to lead.'),
      extra: 'border-t-[3px] border-t-[#FFC107]',
      cls: 'border border-brand-whisper-border dark:border-brand-light-border shadow-[0_2px_6px_rgba(0,0,0,0.06)]',
    },
    {
      title: t('Dark card', 'Dark card'),
      subtitle: t('inverse surface', 'Dark background — use in hero sections'),
      desc: t('Deep blue surface for hero blocks, feature callouts, and dark sections.', 'Deep blue surface for hero blocks, feature callouts, and dark sections.'),
      extra: 'bg-[#072A6B] text-white',
      cls: '',
    },
  ]

  return (
    <div>
      <PageHero icon={Square} kicker={t('Design System', 'Design System')} title={t('Components', 'Components')} titleHighlight={t('Components', 'Components')} description={t('Every interactive element, every state defined. Consistent vocabulary across every surface — the same button shape, the same form control, the same focus ring everywhere.', 'Every interactive element, every state defined. Consistent vocabulary across every surface — the same button shape, the same form control, the same focus ring everywhere.')} />

      <BrandPageContent>

      {/* Buttons — Variant A (icon heading) */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="4" y="7" width="16" height="10" rx="2"/><path d="M8 12h8"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Buttons', 'Buttons')}</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden divide-y divide-brand-whisper-border dark:divide-brand-light-border">
          {buttonVariants.map((btn) => (
            <div key={btn.label} className="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.04]">
              <div className="w-28 sm:w-36 shrink-0">
                <button
                  disabled={btn.disabled}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${!btn.disabled ? 'hover:-translate-y-[1px] hover:brightness-105 active:scale-[0.97]' : ''} ${btn.cls}`}
                >
                  {btn.label}
                </button>
              </div>
              <div className="flex-1 min-w-0 hidden sm:block">
                <p className="text-[13px] font-semibold text-brand-text">{btn.label}</p>
                <p className="text-[12px] text-brand-muted-steel mt-0.5 leading-snug">{btn.desc}</p>
              </div>
              <span className={`hidden sm:inline-flex text-[10px] font-mono font-semibold px-2 py-1 rounded-md shrink-0 ${btn.tokenCls}`}>{btn.token}</span>
              <button
                onClick={() => copyCode(btn.code, `btn-${btn.label}`)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-brand-text-muted hover:text-brand-text hover:bg-brand-canvas dark:bg-white/[0.06] active:scale-95 transition-all shrink-0"
              >
                {copiedCode === `btn-${btn.label}` ? <><Check size={11} className="text-green-600" /> {t('Copied', 'Copied')}</> : <><Copy size={11} /> {t('Copy', 'Copy')}</>}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Form Inputs — Variant A (icon heading) */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 12h8"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Form Inputs', 'Form Inputs')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: t('Default', 'Default'), border: 'border-brand-input-border', val: '', ph: t('e.g. Spring Campaign 2025', 'e.g. Spring Campaign 2025'), note: t('Resting state', 'Resting state') },
            { label: t('Focused', 'Focused'), border: 'border-[#2196F3] ring-2 ring-[#2196F3]/20', val: t('Spring Campaign', 'Spring Campaign'), ph: '', note: t('Active input', 'Active input') },
            { label: t('Error', 'Error'), border: 'border-[#DC2626] ring-2 ring-[#DC2626]/15', val: t('invalid@', 'invalid@'), ph: '', note: t('Validation failed', 'Validation failed'), err: t('Enter a valid email address', 'Enter a valid email address') },
            { label: t('Disabled', 'Disabled'), border: 'border-brand-whisper-border dark:border-brand-light-border', val: t('Read-only value', 'Read-only value'), ph: '', note: t('Non-interactive', 'Non-interactive'), disabled: true },
          ].map((inp) => (
            <div key={inp.label} className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border shadow-[0_2px_6px_rgba(0,0,0,0.06)] p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-semibold text-brand-dark-blue">{inp.label}</p>
                <span className="text-[10px] font-mono text-brand-muted-steel">{inp.note}</span>
              </div>
              <label className="block text-[12px] font-medium text-brand-text-secondary mb-1.5">{t('Campaign name', 'Campaign name')}</label>
              <input
                readOnly disabled={inp.disabled}
                value={inp.val} placeholder={inp.ph}
                className={`w-full px-3 py-2.5 text-sm rounded-lg border outline-none transition-all bg-brand-surface text-brand-text placeholder:text-brand-muted-steel ${inp.disabled ? 'bg-brand-canvas dark:bg-white/[0.04] text-brand-muted-steel cursor-not-allowed' : ''} ${inp.border}`}
              />
              {inp.err && <p className="text-[11px] text-[#DC2626] mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{inp.err}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form — Variant B (band heading for showcase) */}
      <section className="mb-10">
        <div className="bg-brand-info-bg dark:bg-brand-navy/30 rounded-lg px-4 py-2.5 mb-5">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Contact Form', 'Contact Form')}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Live demo */}
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border p-7">
            <h3 className="font-display text-[17px] font-semibold text-brand-dark-blue mb-1">{t('Get in touch', 'Start a Project')}</h3>
            <p className="text-[13px] text-brand-muted-steel mb-6">{t('contactDesc', 'Tell us about your project. We respond within one business day with next steps.')}</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-brand-text-secondary mb-1.5">{t('First name', 'First name')}</label>
                  <input readOnly value={t('Yasser', 'Yasser')} className="w-full px-3 py-2.5 text-sm rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-brand-text-secondary mb-1.5">{t('Last name', 'Last name')}</label>
                  <input readOnly value={t('Dorgham', 'Dorgham')} className="w-full px-3 py-2.5 text-sm rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-brand-text-secondary mb-1.5">{t('Email address', 'Email address')}</label>
                <input readOnly value={t('hello@mediabubble.com', 'hello@mediabubble.com')} className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#2196F3] ring-2 ring-[#2196F3]/20 bg-brand-surface text-brand-text outline-none" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-brand-text-secondary mb-1.5">{t('Service', 'Service')}</label>
                <div className="relative">
                  <select className="w-full px-3 py-2.5 text-sm rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none appearance-none cursor-pointer">
                    <option>{t('Brand Development', 'Brand Development')}</option>
                    <option>{t('Digital Growth', 'Digital Growth')}</option>
                    <option>{t('Web Solutions', 'Web Solutions')}</option>
                  </select>
                  <ChevronRight size={13} className="absolute end-3 top-1/2 -translate-y-1/2 text-brand-muted-steel rotate-90 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-brand-text-secondary mb-1.5">{t('Message', 'Message')}</label>
                <textarea readOnly rows={3} value={t('Looking forward to working with your team on our rebrand.', 'Looking forward to working with your team on our rebrand.')} className="w-full px-3 py-2.5 text-sm rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none resize-none leading-relaxed" />
              </div>
              <button className="w-full py-2.5 rounded-lg bg-[#2196F3] text-white text-sm font-semibold hover:-translate-y-[1px] hover:brightness-105 active:scale-[0.98] transition-all duration-150">
                {t('Send message', 'Send message')}
              </button>
            </div>
          </div>
          {/* Specs */}
          <div className="space-y-4">
            <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border shadow-[0_2px_6px_rgba(0,0,0,0.06)] divide-y divide-brand-whisper-border dark:divide-brand-light-border">
              {[
                { rule: t('Labels', 'Labels'), val: '12px · font-medium · #444444', note: t('Sentence case, above the input', 'Sentence case, above the input') },
                { rule: t('Input height', 'Input height'), val: 'py-2.5 → ~40px', note: t('44px min on touch devices', '44px min on touch devices') },
                { rule: t('Border resting', 'Border resting'), val: '1px #E0E0E0', note: t('Neutral, no color distraction', 'Neutral, no color distraction') },
                { rule: t('Border focus', 'Border focus'), val: '1px #2196F3 + ring-2', note: t('Brand blue + 20% opacity ring', 'Brand blue + 20% opacity ring') },
                { rule: t('Border error', 'Border error'), val: '1px #DC2626 + ring-2', note: t('Red + 15% opacity ring', 'Red + 15% opacity ring') },
                { rule: t('Submit button', 'Submit button'), val: 'w-full · Primary style', note: t('Full-width, bottom of form', 'Full-width, bottom of form') },
              ].map((r) => (
                <div key={r.rule} className="flex items-start gap-4 px-5 py-3.5">
                  <p className="text-[12px] font-semibold text-brand-dark-blue w-28 shrink-0">{r.rule}</p>
                  <div>
                    <code className="text-[11px] font-mono text-brand-text">{r.val}</code>
                    <p className="text-[11px] text-brand-muted-steel mt-0.5">{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-brand-info-bg dark:bg-brand-navy/30 rounded-xl border border-brand-whisper-border dark:border-brand-light-border p-5">
              <p className="text-[12px] font-semibold text-brand-dark-blue mb-1.5">{t('Validation timing', 'Validation timing')}</p>
              <p className="text-[12px] text-brand-text-secondary leading-relaxed">{t('validationDesc', 'Validate inputs on blur, not on every keystroke. Display error messages directly below the field that failed. Validating on every keystroke frustrates users.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards — Variant C (text heading for reference) */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Cards', 'Cards')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {cardVariants.map((c) => (
            <div key={c.title} className={`rounded-xl overflow-hidden ${c.extra || ''} ${c.cls}`}>
              <div className={`p-5 ${c.extra?.includes('bg-[#072A6B]') ? '' : 'bg-brand-surface'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className={`text-[13px] font-bold ${c.extra?.includes('bg-[#072A6B]') ? 'text-white' : 'text-brand-text'}`}>{c.title}</p>
                    <p className={`text-[11px] font-mono mt-0.5 ${c.extra?.includes('bg-[#072A6B]') ? 'text-white/40' : 'text-brand-muted-steel'}`}>{c.subtitle}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${c.extra?.includes('bg-[#072A6B]') ? 'bg-brand-surface/10 text-white/50' : 'bg-brand-canvas dark:bg-white/[0.04] text-brand-text-muted'}`}>{t('card', 'card')}</span>
                </div>
                <p className={`text-[13px] leading-relaxed ${c.extra?.includes('bg-[#072A6B]') ? 'text-white/65' : 'text-brand-text-secondary'}`}>{c.desc}</p>
                <div className="flex items-center gap-3 mt-4">
                  <button className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all hover:brightness-105 ${c.extra?.includes('bg-[#072A6B]') ? 'bg-[#FFC107] text-[#0D0F12]' : 'bg-[#2196F3] text-white'}`}>
                    {t('View details', 'View details')}
                  </button>
                  <button className={`text-[12px] font-medium flex items-center gap-1 transition-colors ${c.extra?.includes('bg-[#072A6B]') ? 'text-white/50 hover:text-white/80' : 'text-[#2196F3] hover:text-brand-dark-blue'}`}>
                    {t('See details', 'See details')} <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-brand-canvas dark:bg-white/[0.04] rounded-xl divide-y divide-brand-whisper-border">
          {[
            { token: t('border-radius', 'border-radius'), value: '16px (rounded-xl)', note: t('Cards use 16px; never exceed', 'Cards use 16px; never exceed') },
            { token: t('border', 'border'), value: '1px solid #E8E8E8', note: t('Single border — no border + shadow pairing', 'Single border — no border + shadow pairing') },
            { token: t('shadow rest', 'shadow rest'), value: '0 2px 8px rgba(0,0,0,0.06)', note: t('Subtle lift, always present', 'Subtle lift, always present') },
            { token: t('shadow hover', 'shadow hover'), value: '0 8px 24px rgba(0,0,0,0.10)', note: t('Decisive lift on interaction', 'Decisive lift on interaction') },
            { token: t('hover translate', 'hover translate'), value: 'translateY(-1px)', note: t('Paired with shadow intensification', 'Paired with shadow intensification') },
            { token: t('padding', 'padding'), value: 'p-5 (20px)', note: t('Standard internal breathing room', 'Standard internal breathing room') },
          ].map((item) => (
            <div key={item.token} className="flex items-start gap-4 px-5 py-3 transition-colors hover:bg-black/[0.02]">
              <code className="text-[11px] font-mono text-[#2196F3] w-32 shrink-0 mt-0.5">{item.token}</code>
              <p className="text-[12px] font-semibold text-brand-text w-48 shrink-0">{item.value}</p>
              <p className="text-[12px] text-brand-muted-steel">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Tabs — Variant A (icon heading) */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Navigation Tabs', 'Navigation Tabs')}</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border divide-y divide-brand-whisper-border dark:divide-brand-light-border">
          {[
            { label: t('Underline tabs', 'Underline tabs'), type: t('primary', 'primary'), typeColor: 'bg-[#2196F3]/10 text-brand-dark-blue', desc: t('Standard nav — active state uses bottom border + bold weight. Best for top-level navigation.', 'Standard nav — active state uses bottom border + bold weight. Best for top-level navigation.'), code: '<div className="flex gap-6 border-b border-brand-whisper-border dark:border-brand-light-border px-1">\n  <button className="text-[13px] font-semibold text-brand-text border-b-2 border-[#2196F3] pb-2">Active</button>\n  <button className="text-[13px] font-medium text-brand-muted-steel pb-2 hover:text-brand-text">Inactive</button>\n</div>', active: true },
            { label: t('Pill tabs', 'Pill tabs'), type: t('accent', 'accent'), typeColor: 'bg-[#FFC107]/15 text-[#92610B]', desc: t('Content-switching pattern — active pill uses brand blue fill. Used in sub-navigation and filter bars.', 'Content-switching pattern — active pill uses brand blue fill. Used in sub-navigation and filter bars.'), code: '<div className="flex gap-2">\n  <button className="px-4 py-1.5 rounded-full bg-[#2196F3] text-white text-[12px] font-semibold">Active</button>\n  <button className="px-4 py-1.5 rounded-full bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary text-[12px] font-medium hover:bg-[#E8E8E8]">Inactive</button>\n</div>', active: false },
            { label: t('Segmented control', 'Segmented control'), type: t('data', 'data'), typeColor: 'bg-brand-dark-blue/10 text-[#072A6B]', desc: t('Toggle between views. Equal-width segments, active state slides between them.', 'Toggle between views. Equal-width segments, active state slides between them.'), code: '<div className="inline-flex rounded-lg bg-brand-canvas dark:bg-white/[0.04] p-0.5">\n  <button className="px-4 py-1.5 rounded-md bg-brand-surface text-brand-text text-[12px] font-semibold shadow-sm">Day</button>\n  <button className="px-4 py-1.5 rounded-md text-brand-muted-steel text-[12px] font-medium">Week</button>\n  <button className="px-4 py-1.5 rounded-md text-brand-muted-steel text-[12px] font-medium">Month</button>\n</div>', active: true },
          ].map((tab, i) => (
            <div key={tab.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-5 sm:px-6 py-4 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.04]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <span className="text-[13px] font-semibold text-brand-text">{tab.label}</span>
                  <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md ${tab.typeColor}`}>{tab.type}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {tab.active ? (
                    <>
                      <div className="flex gap-4 sm:gap-6 border-b border-brand-whisper-border dark:border-brand-light-border px-1">
                        <button className="text-[13px] font-semibold text-brand-text border-b-2 border-[#2196F3] pb-2">{t('Active', 'Active')}</button>
                        <button className="text-[13px] font-medium text-brand-muted-steel pb-2">{t('Inactive', 'Inactive')}</button>
                        <button className="text-[13px] font-medium text-brand-muted-steel pb-2">{t('Tab', 'Tab')}</button>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 rounded-full bg-[#2196F3] text-white text-[12px] font-semibold">{t('Active', 'Active')}</button>
                      <button className="px-4 py-1.5 rounded-full bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary text-[12px] font-medium">{t('Inactive', 'Inactive')}</button>
                      <button className="px-4 py-1.5 rounded-full bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary text-[12px] font-medium">{t('Tab', 'Tab')}</button>
                    </div>
                  )}
                </div>
                <p className="text-[12px] text-brand-muted-steel leading-snug mt-1">{tab.desc}</p>
              </div>
              <button
                onClick={() => copyCode(tab.code, `tab-${i}`)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-brand-text-muted hover:text-brand-text hover:bg-brand-canvas dark:bg-white/[0.06] active:scale-95 transition-all shrink-0"
              >
                {copiedCode === `tab-${i}` ? <><Check size={11} className="text-green-600" /> {t('Copied', 'Copied')}</> : <><Copy size={11} /> {t('Copy', 'Copy')}</>}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Badges & Tags — Variant A (icon heading) */}
      <section className="mb-16">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Badges & Tags', 'Badges & Tags')}</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#F0F0F0]">
            <p className="text-[12px] text-brand-muted-steel mb-4">{t('badgeDesc', 'Status badges communicate system state at a glance. Each color map below is fixed — do not recolor or reuse colors across states.')}</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: t('Success', 'Success'), cls: 'bg-[#DCFCE7] text-[#16A34A]' },
                { label: t('Warning', 'Warning'), cls: 'bg-[#FEF9C3] text-[#CA8A04]' },
                { label: t('Error', 'Error'), cls: 'bg-[#FEE2E2] text-[#DC2626]' },
                { label: t('Info', 'Info'), cls: 'bg-[#E0F2FE] text-[#0369A1]' },
                { label: t('New', 'New'), cls: 'bg-[#FFC107]/15 text-[#92610B]' },
                { label: t('Draft', 'Draft'), cls: 'bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary' },
              ].map((badge) => (
                <span key={badge.label} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${badge.cls}`}>{badge.label}</span>
              ))}
            </div>
          </div>
          <div className="border-b border-[#F0F0F0] px-5 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-brand-text mb-1">{t('Token badges', 'Token badges')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#2196F3]/10 text-brand-dark-blue text-[10px] font-mono font-semibold">#2196F3</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FFC107]/15 text-[#92610B] text-[10px] font-mono font-semibold">#FFC107</span>
                <span className="px-2 py-0.5 rounded-md bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary text-[10px] font-mono font-semibold">#333333</span>
              </div>
            </div>
            <button
              onClick={() => copyCode('<span className="px-2 py-0.5 rounded-md bg-[#2196F3]/10 text-brand-dark-blue text-[10px] font-mono font-semibold">#2196F3</span>', 'badge-token')}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-brand-text-muted hover:text-brand-text hover:bg-brand-canvas dark:bg-white/[0.06] active:scale-95 transition-all shrink-0"
            >
              {copiedCode === 'badge-token' ? <><Check size={11} className="text-green-600" /> {t('Copied', 'Copied')}</> : <><Copy size={11} /> {t('Copy', 'Copy')}</>}
            </button>
          </div>
          <div className="px-5 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-brand-text mb-1">{t('Count badges', 'Count badges')}</p>
              <div className="flex items-center gap-4">
                <span className="relative inline-flex">
                  <Bell size={16} className="text-brand-text-secondary" />
                  <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2196F3] text-white text-[10px] font-bold min-w-[20px] text-center">42</span>
              </div>
            </div>
            <button
              onClick={() => copyCode('<span className="relative inline-flex">\n  <Bell size={16} className="text-brand-text-secondary" />\n  <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">3</span>\n</span>', 'badge-count')}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-brand-text-muted hover:text-brand-text hover:bg-brand-canvas dark:bg-white/[0.06] active:scale-95 transition-all shrink-0"
            >
              {copiedCode === 'badge-count' ? <><Check size={11} className="text-green-600" /> {t('Copied', 'Copied')}</> : <><Copy size={11} /> {t('Copy', 'Copy')}</>}
            </button>
          </div>
        </div>
      </section>
      </BrandPageContent>
    </div>
  )
}
