import React from 'react'
import { X, Check, MessageSquare } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function VoiceTonePage() {
  const { t } = useI18n()

  const registers = [
    {
      name: 'Register 1: Brand & Website Voice',
      tone: 'Confident and partnership-oriented. Secondary: aspirational. Avoid: hype language without evidence.',
      color: '#FFC107',
      uses: [
        'Homepage & About pages',
        'Brand positioning statements',
        'Client pitches & proposals',
        'Introductory / hero copy',
        'High-level marketing materials',
      ],
      traits: [
        'Addresses client goals directly (\u201cYour Q3 targets need a content engine that compounds \u2014 not a one-off campaign.\u201d)',
        'Positions the client relationship as a partnership \u2014 \u201cstrategic allies,\u201d \u201cwe collaborate,\u201d not \u201cvendor and client.\u201d',
        'Confident and evidence-based (\u201cWe increased organic traffic 340% in six months.\u201d)',
        'Frames every offer around the client\u2019s measurable outcome, not the agency process',
        'Professional but warm and approachable',
      ],
      example: '\u201cWe\u2019re your strategic partner \u2014 the team that turned a regional resort into a booking-first brand with a 68% direct-booking rate.\u201d',
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
      tone: 'Energetic, punchy, scannable, CTA-driven, listicle-friendly',
      color: '#2196F3',
      uses: [
        'Blog posts & long-form content',
        'Social media captions',
        'Email newsletter copy',
        'SEO-optimized pages',
        'Educational / how-to content',
      ],
      traits: [
        'Alliteration and rhetorical questions (\u201cBe seen, be heard, and be found\u201d)',
        'Breaks information into digestible chunks',
        'Direct, second-person address (\u201cYou need SEO, and here\u2019s why\u201d)',
        'Clear CTAs at natural stopping points',
        'Conversational but professional',
      ],
      example: '\u201cSEO isn\u2019t a luxury\u2014it\u2019s a must. Here\u2019s why your business can\u2019t afford to wait.\u201d',
      phrases: [
        { text: 'Here\u2019s why\u2026', ok: true },
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
    },
    {
      level: 'Secondary CTA',
      color: '#2196F3',
      label: 'View case studies',
      usage: 'Blue button \u2022 Lower priority \u2022 Supporting actions',
      desc: 'Use \u201cExplore [Service Name]\u201d for service pages, \u201cView case studies\u201d for portfolio. Avoid \u201cLearn More\u201d as a standalone CTA.',
    },
    {
      level: 'Tertiary CTA',
      color: '#9E9E9E',
      label: 'Discover more \u2022 Read the full post \u2022 See how we helped [Client]',
      usage: 'Inline text link \u2022 Within content',
      desc: 'Used inline within content for contextual linking',
    },
    {
      level: 'Email CTA',
      color: '#1565C0',
      label: 'Claim Your Free Consultation / Yes, I Want to Grow My Business / Let\u2019s Talk Strategy',
      usage: 'More conversational \u2022 First-person \u2022 Benefit-led',
      desc: 'Used in email campaigns for higher engagement',
    },
  ]

  const prohibited = [
    { word: 'Full-service solutions', why: 'Industry clich\u00e9, meaningless differentiation' },
    { word: 'Award-winning team', why: 'Most overused phrase in agency marketing \u2014 triggers skepticism' },
    { word: 'Next-gen / Cutting-edge', why: 'Unsubstantiated hype without specifics' },
    { word: 'Contact us today', why: 'Weak CTA, replace with \u201cGet your free strategy audit\u201d' },
    { word: 'Click here', why: 'No context for the link destination' },
    { word: 'Learn more (as primary CTA)', why: 'Too vague, low conversion signal' },
    { word: 'State-of-the-art', why: 'Same problem as cutting-edge \u2014 name specifics instead' },
    { word: 'We try to\u2026', why: 'Signals uncertainty \u2014 MediaBubble delivers, it doesn\u2019t try' },
    { word: 'One-stop-shop', why: 'Generic, commoditizing framing' },
    { word: 'In today\u2019s digital world\u2026', why: 'Overused blog opener \u2014 start with the problem instead' },
  ]

  return (
    <div>
<PageHero
  icon={MessageSquare}
  kicker={t('Brand Communication')}
  title={t('Voice & Tone')}
        titleHighlight={t('Voice')}
        description={t('MediaBubble has two distinct voice registers, each appropriate to different contexts. Both are authentically MediaBubble, but they serve different audiences and purposes.')}
      />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">
      {/* Two Registers */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Voice Registers')}</h2>
        </div>
        <div className="space-y-6">
          {registers.map((reg) => (
            <div key={reg.name} className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden transition-all duration-150">
              <div className="h-1" style={{ backgroundColor: reg.color }} />
              <div className="p-6">
                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                  <h3 className="font-display text-lg font-bold text-brand-text">{t(reg.name)}</h3>
                  <span className="text-[12px] font-medium px-3 py-1 rounded-full bg-brand-canvas dark:bg-white/[0.04] text-brand-text-secondary">{t(reg.tone)}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted mb-2">{t('Used In')}</p>
                    <ul className="space-y-1.5">
                      {reg.uses.map((u) => (
                        <li key={u} className="flex items-start gap-2 text-sm text-brand-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[6px]" style={{ backgroundColor: reg.color }} />
                          {t(u)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted mb-2">{t('Characteristics')}</p>
                    <ul className="space-y-1.5">
                      {reg.traits.map((tr) => (
                        <li key={tr} className="flex items-start gap-2 text-sm text-brand-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[6px]" style={{ backgroundColor: reg.color }} />
                          {t(tr)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#F9F9F9] rounded-lg border border-brand-whisper-border dark:border-brand-light-border p-4 mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted mb-2">{t('Example')}</p>
                  <p className="text-sm text-brand-text italic leading-relaxed">{t(reg.example)}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {reg.phrases.map((p) => (
                    <span
                      key={p.text}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-full ${
                        p.ok
                          ? 'bg-green-50 text-[#16A34A] border border-green-200'
                          : 'bg-red-50 text-[#DC2626] border border-red-200'
                      }`}
                    >
                      {p.ok ? <Check size={11} aria-label={t('Approved')} /> : <X size={11} aria-label={t('Not approved')} />}
                      {t(p.text)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tone by Context Matrix */}
      <section className="mb-10">
        <div className="bg-brand-info-bg dark:bg-brand-navy/30 rounded-lg px-4 py-2.5 mb-5">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Tone by Content Type')}</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0D0F12] text-white">
                <th className="text-start px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">{t('Content Type')}</th>
                <th className="text-start px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">{t('Register')}</th>
                <th className="text-start px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">{t('Tone Adjustment')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-whisper-border">
              {toneMatrix.map((row) => (
                <tr key={row.type} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="px-5 py-3.5 text-[13px] font-medium text-brand-text">{t(row.type)}</td>
                  <td className="px-5 py-3.5 text-[13px] text-brand-text-secondary">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                      row.register === 'Brand & Website'
                        ? 'bg-[#FFF8E1] text-[#92610B]'
                        : 'bg-[#E3F2FD] text-[#0369A1]'
                    }`}>
                      {t(row.register)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-brand-text-secondary">{t(row.adjustment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Standards */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Call-to-Action Standards')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ctaLevels.map((cta) => (
            <div key={cta.level} className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cta.color }} />
                <h3 className="text-[13px] font-bold text-brand-text">{t(cta.level)}</h3>
              </div>
              <p className="text-sm font-medium text-brand-text-secondary mb-1">{t(cta.label)}</p>
              <p className="text-[11px] text-brand-text-muted">{t(cta.usage)}</p>
              <p className="text-[12px] text-brand-muted-steel mt-1.5">{t(cta.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prohibited Phrases */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Prohibited Phrases')}</h2>
          <span className="text-[10px] font-mono text-[#DC2626]/60">{t('Never use')}</span>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden divide-y divide-brand-whisper-border">
          {prohibited.map((item) => (
            <div
              key={item.word}
              className="flex items-start gap-5 px-5 py-3.5 transition-all duration-150 hover:bg-red-50/[0.3]"
            >
              <code className="text-[11px] font-mono font-semibold text-[#DC2626] bg-[#FEF2F2] px-2 py-1 rounded-md shrink-0 mt-0.5 whitespace-nowrap">{t(item.word)}</code>
              <p className="text-sm text-brand-text-secondary leading-relaxed">{t(item.why)}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
