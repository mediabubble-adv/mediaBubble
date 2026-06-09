import React, { useEffect } from 'react'
import { Palette, Type, Square, MessageSquare, ArrowRight, BookOpen } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/I18nProvider'

export function GettingStartedPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()

  const steps = [
    {
      icon: Palette,
      step: '01',
      title: t('findYourColors', 'Find Your Colors'),
      description: t('findYourColorsDesc', 'Copy any brand color value with one click. HEX, RGB, and CSS variables ready to paste.'),
      page: 'colors',
      action: t('goToColors', 'Go to Colors'),
    },
    {
      icon: Type,
      step: '02',
      title: t('setYourType', 'Set Your Typography'),
      description: t('setYourTypeDesc', 'View the Poppins, Inter, and Cairo scale. Each size has a role and a CSS class.'),
      page: 'typography',
      action: t('goToTypography', 'Go to Typography'),
    },
    {
      icon: Square,
      step: '03',
      title: t('useComponents', 'Use Components'),
      description: t('useComponentsDesc', 'Buttons, form inputs, cards, and badges — every state defined, every variant ready.'),
      page: 'components',
      action: t('goToComponents', 'Go to Components'),
    },
    {
      icon: MessageSquare,
      step: '04',
      title: t('matchTheTone', 'Match the Tone'),
      description: t('matchTheToneDesc', 'Two voice registers, tone-by-content-type matrix, and a list of prohibited phrases.'),
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

  return (
    <div>
      <PageHero icon={BookOpen} kicker={t('guide', 'Getting Started')} title={t('gettingStarted', 'Getting Started')} titleHighlight={t('gettingStarted', 'Getting Started')} description={t('gettingStartedDesc', 'Your starting point for the MediaBubble brand system. Four steps, three shortcuts, and answers to common questions.')} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">
      {/* Quick stats */}
      <div className="flex items-center gap-6 sm:gap-10 mb-10 px-1">
        {[
          { label: t('fontFamilies', 'Font Families'), value: '4' },
          { label: t('colorTokens', 'Color Tokens'), value: '14' },
          { label: t('pageSections', 'Page Sections'), value: '12' },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 sm:gap-3">
            <span className="text-[28px] sm:text-[32px] font-display font-semibold text-brand.dark-blue leading-none tracking-tight">{s.value}</span>
            <div>
              <p className="text-[11px] text-brand.muted-steel leading-tight">{s.label}</p>
            </div>
            {i < 2 && <span className="w-px h-8 bg-[#E8E8E8] ms-2 sm:ms-4" />}
          </div>
        ))}
      </div>

      {/* Step path */}
      <div className="relative mb-14">
        <div className="hidden sm:block absolute top-12 left-[28px] right-[28px] h-px bg-[#E8E8E8] -z-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-grid">
          {steps.map((s, i) => {
            const IconComponent = s.icon
            return (
              <div
                key={s.step}
                className="relative bg-white rounded-xl border border-[#E8E8E8] p-5 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D0F12] flex items-center justify-center shrink-0">
                    <IconComponent size={18} className="text-[#FFC107]" />
                  </div>
                  <span className="text-[28px] font-display font-bold text-[#E8E8E8] leading-none">{s.step}</span>
                </div>
                <h3 className="font-display text-base font-bold text-[#333333] mb-2">{s.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed mb-4 flex-1">{s.description}</p>
                <button
                  onClick={() => onNavigate(s.page)}
                  className="self-start inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand.dark-blue hover:text-[#0D47A1] transition-colors group"
                >
                  {s.action}
                  <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-[2px]" />
                </button>
                {/* Rail dot */}
                <div className="hidden lg:block absolute -bottom-[34px] start-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FFC107] ring-2 ring-white z-[1]" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/></svg>
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('quickActions', 'Quick Actions')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-grid">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.page)}
              className="bg-white rounded-xl border border-[#E8E8E8] px-5 py-5 text-start transition-all duration-150 group"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13px] font-semibold text-brand.dark-blue group-hover:text-[#0D47A1] transition-colors">{a.label}</p>
                <span className="text-[10px] font-mono text-brand.muted-steel">{a.shortcut}</span>
              </div>
              <p className="text-sm text-[#666666] leading-relaxed">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Common Questions */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('commonQuestions', 'Common Questions')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { q: t('faq1q', 'Can I use the brand colors outside the defined palette?'), a: t('faq1a', 'No. Use only the colors defined in the palette. If a color is missing, request an addition — do not invent your own.') },
            { q: t('faq2q', 'Which font do I use for Arabic content?'), a: t('faq2a', 'Cairo. It pairs with Inter for mixed-direction layouts.') },
            { q: t('faq3q', 'Can I modify the logo mark?'), a: t('faq3a', 'No. Use only the approved variants shown in the Logo section. Do not rotate, recolor, or add effects.') },
            { q: t('faq4q', 'Where do I find downloadable assets?'), a: t('faq4a', 'The Asset Library has logos, color tokens, and font references — all ready to copy or download.') }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E8E8E8] p-5">
              <p className="text-sm font-bold text-[#333333] mb-2">{item.q}</p>
              <p className="text-sm text-[#666666] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="flex items-start gap-0 bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-5">
          <div className="w-9 h-9 rounded-lg bg-[#FFC107]/10 flex items-center justify-center shrink-0">
            <span className="text-[#FFC107] text-base font-bold leading-none">i</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#333333] mb-1">{t('proTipTitle', 'Pro tip')}</p>
            <p className="text-sm text-[#666666] leading-relaxed">
              {t('proTipDesc', 'Press ⌘K (Mac) or Ctrl+K (Windows) to search any page from anywhere in the guide.')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('colors')}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-brand.dark-blue hover:bg-[#0D47A1] active:scale-[0.97] transition-all whitespace-nowrap"
          >
            {t('viewColorPalette', 'View color palette')}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
