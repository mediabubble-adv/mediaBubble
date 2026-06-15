import React from 'react'
import { PageHero } from './PageHero'
import { Zap } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'

export function RealWorldExamplesPage() {
  const { t } = useI18n()
  const studies = [
    {
      title: t('Email Signature'),
      subtitle: t('Consistent branding in every email you send'),
      before: t('A plain-text signature with a mismatched font, a generic blue link, and no brand identity. Recipients could not tell it was from MediaBubble.'),
      after: t('A polished HTML signature using the brand blue divider, the correct Inter font stack, and a dark blue gradient footer bar. The logo anchors the left column, contact details sit on the right.'),
      improvements: [
        t('Replaced Arial with Inter font family'),
        t('Added 2px #2196F3 divider between logo and contact block'),
        t('Applied #2196F3 → #072A6B gradient footer bar'),
        t('Used #333333 for body text, #666666 for labels'),
      ],
      tokens: ['Inter', '#2196F3', '#072A6B', '#333333'],
    },
    {
      title: t('Social Media Template'),
      subtitle: t('Matching look and feel on every social platform'),
      before: t('Each platform had its own color treatment. Instagram used a warm filter, LinkedIn used a blue gradient, Twitter had no consistent treatment. The brand appeared fragmented.'),
      after: t('A unified template system across all social platforms. Brand Yellow used for the accent bar at the bottom, brand blue for the headline text, and a consistent #072A6B top section. Logo locked to the top-left.'),
      improvements: [
        t('Unified top banner color to #072A6B across all platforms'),
        t('Added consistent #FFC107 accent bar at base'),
        t('Standardized headline in Poppins Bold, body in Inter'),
        t('Locked logo position — top-left on every asset'),
      ],
      tokens: ['#072A6B', '#FFC107', '#2196F3', 'Poppins', 'Inter'],
    },
    {
      title: t('Presentation Template'),
      subtitle: t('Presentation slides that look unmistakably MediaBubble'),
      before: t('A mix of slide templates — some with stock photos, some with flat colors, inconsistent heading sizes, and no typography system. The deck felt assembled rather than designed.'),
      after: t('A clean slide system with defined roles: Poppins for slide titles, Inter for body copy, brand yellow for accent lines and callout boxes, and a deep blue footer bar on every slide.'),
      improvements: [
        t('Applied Poppins Bold for all slide titles at consistent size'),
        t('Introduced Inter for body copy across all slides'),
        t('Added #FFC107 accent line as section divider on title slides'),
        t('Deep blue (#072A6B) footer bar on every slide template'),
      ],
      tokens: ['Poppins', 'Inter', '#FFC107', '#072A6B'],
    },
  ]

  return (
    <div>
      <PageHero icon={Zap} kicker={t("Brand in Practice")} title={t("Real-World Examples")} titleHighlight={t("Real-World")} description={t("epDesc", "Three before-and-after case studies showing the brand system applied to real MediaBubble materials. Every example follows the same color, type, and component rules covered elsewhere in this guide.")} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">

      {studies.map((study, i) => (
        <section key={study.title} className={`${i < studies.length - 1 ? 'mb-12' : 'mb-16'}`}>
          <div className="mb-4">
            <h2 className="text-[13px] font-semibold text-brand-dark-blue">{study.title}</h2>
            <p className="text-[11px] text-brand-muted-steel mt-0.5">{study.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Before */}
            <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden">
              <div className="bg-red-50 px-5 py-2 border-b border-red-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#DC2626]">{t("Before")}</span>
                </div>
              </div>
              <div className="p-5">
                {i === 0 && (
                  <div className="relative rounded-lg overflow-hidden mb-4 min-h-[120px] bg-[#F9FAFB] border border-brand-whisper-border dark:border-brand-light-border">
                    <img src="/assets/Real-Photos/real-printing-outdoor-01.jpeg" alt="" className="w-full h-full object-cover absolute inset-0 opacity-20" />
                    <div className="relative p-4 flex items-center justify-center min-h-[120px]">
                      <p className="text-[13px] text-brand-muted-steel text-center italic leading-relaxed">{study.before}</p>
                    </div>
                  </div>
                )}
                {i !== 0 && (
                  <div className="bg-[#F9FAFB] rounded-lg border border-brand-whisper-border dark:border-brand-light-border p-4 mb-4 min-h-[80px] flex items-center justify-center">
                    <p className="text-[13px] text-brand-muted-steel text-center italic leading-relaxed">{study.before}</p>
                  </div>
                )}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#DC2626] mb-2">{t("Problems")}</p>
                  <ul className="space-y-1.5">
                    {study.before.split('. ').filter(s => s.trim()).slice(0, 3).map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[12px] text-brand-text-secondary leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-[#DC2626] shrink-0 mt-1.5" />
                        {point.replace(/\.$/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden">
              <div className="bg-green-50 px-5 py-2 border-b border-green-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#16A34A]">{t("After")}</span>
                </div>
              </div>
              <div className="p-5">
                {i === 2 && (
                  <div className="relative rounded-lg overflow-hidden mb-4 min-h-[120px] bg-[#F9FAFB] border border-brand-whisper-border dark:border-brand-light-border">
                    <img src="/assets/Real-Photos/IMG-20250706-WA0040.jpg" alt="" className="w-full h-full object-cover absolute inset-0 opacity-20" />
                    <div className="relative p-4 flex items-center justify-center min-h-[120px]">
                      <p className="text-[13px] text-brand-text leading-relaxed">{study.after}</p>
                    </div>
                  </div>
                )}
                {i !== 2 && (
                  <div className="bg-[#F0F9F6] rounded-lg border border-[#B8E6D3] p-4 mb-4 min-h-[80px] flex items-center justify-center">
                    <p className="text-[13px] text-brand-text leading-relaxed">{study.after}</p>
                  </div>
                )}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#16A34A] mb-2">{t("Improvements")}</p>
                  <ul className="space-y-1.5">
                    {study.improvements.map((imp) => (
                      <li key={imp} className="flex items-start gap-2 text-[12px] text-brand-text-secondary leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-[#16A34A] shrink-0 mt-1.5" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tokens used */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-brand-canvas dark:bg-white/[0.04] rounded-lg">
            <span className="text-[10px] font-mono font-semibold text-brand-text-muted shrink-0">{t("Design tokens")}</span>
            <div className="flex flex-wrap gap-2">
              {study.tokens.map((token) => (
                <span
                  key={token}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${
                    token.startsWith('#') ? 'bg-brand-surface ring-1 ring-black/[0.06] text-brand-text-secondary' : 'bg-[#E0E7FF] text-[#4338CA]'
                  }`}
                >
                  {token}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}
      </div>
    </div>
  )
}
