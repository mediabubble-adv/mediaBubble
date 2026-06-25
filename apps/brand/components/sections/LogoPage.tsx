import React from 'react'
import { X, Layers } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'
import { BrandBody, BrandInfoBand, BrandMetaPill, BrandSectionHeading } from '@/components/ui/brand-doc'

export function LogoPage() {
  const { t } = useI18n()

  const bgVariants = [
    { bg: '#FFFFFF', bgLabel: t('White'), filter: 'none', label: t('mediaBubble_logo_horizontal_full_color.svg'), preferred: true, anchor: 'logo-bg-white' },
    { bg: '#1565C0', bgLabel: t('Deep Blue'), filter: 'brightness(0) invert(1)', label: t('mediaBubble_logo_horizontal_text_white.svg'), preferred: true, anchor: 'logo-bg-deep-blue' },
    { bg: '#FAFAFA', bgLabel: t('Canvas'), filter: 'none', label: t('mediaBubble_logo_vertical_full_color.svg'), preferred: true, anchor: 'logo-bg-canvas' },
    { bg: '#FFC107', bgLabel: t('Brand Yellow'), filter: 'none', label: t('Yellow background reference'), preferred: false, anchor: 'logo-bg-yellow' },
    { bg: '#333333', bgLabel: t('Charcoal'), filter: 'brightness(0) invert(1)', label: t('White on Charcoal (#333)'), preferred: true, anchor: 'logo-bg-charcoal' },
    { bg: '#E3F2FD', bgLabel: t('Blue Tint'), filter: 'none', label: t('Light blue reference'), preferred: true, anchor: 'logo-bg-blue-tint' },
  ]

  const donts = [
    { label: t('Stretch proportions'), demo: <img src="/assets/logo.svg" alt="" className="w-14 h-8" /> },
    { label: t('Rotate or flip'), demo: <img src="/assets/logo.svg" alt="" className="w-10 h-10 rotate-45" /> },
    { label: t('Apply drop shadows'), demo: <img src="/assets/logo.svg" alt="" className="w-10 h-10 drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]" /> },
    { label: t('Recolor elements'), demo: <img src="/assets/logo.svg" alt="" className="w-10 h-10" style={{ filter: 'hue-rotate(140deg) saturate(2)' }} /> },
    { label: t('Use on busy photo'), demo: (
      <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 flex items-center justify-center">
        <img src="/assets/logo.svg" alt="" className="w-10 h-10" />
      </div>
    )},
    { label: t('Add outline / stroke'), demo: <img src="/assets/logo.svg" alt="" className="w-10 h-10" style={{ filter: 'drop-shadow(0 0 3px #000) drop-shadow(0 0 3px #000)' }} /> },
    { label: t('Use on low-contrast bg'), demo: (
      <div className="w-full h-full bg-[#BBDEFB] flex items-center justify-center">
        <img src="/assets/logo.svg" alt="" className="w-10 h-10" style={{ filter: 'brightness(0) invert(1) opacity(0.4)' }} />
      </div>
    )},
    { label: t('Scale below 24px'), demo: <img src="/assets/logo.svg" alt="" style={{ width: '18px', height: '18px' }} /> },
  ]

  return (
    <div>
      <PageHero icon={Layers} kicker={t('Visual Identity')} title={t('Logo')} titleHighlight={t('Logo')} description={t('Use the approved logo file first. The guide shows where each variant belongs and which backgrounds are safe, but it does not invent new marks or styles.')} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">
      <BrandInfoBand className="flex flex-wrap items-start gap-3">
        <BrandMetaPill tone="canonical">{t('Canonical identity rules')}</BrandMetaPill>
        <BrandBody className="max-w-3xl text-[13px]">
          {t('Approved logo files and usage constraints on this page are canonical. Background examples and cautions help selection, but they do not authorize new variants.')}
        </BrandBody>
      </BrandInfoBand>

      {/* Primary mark */}
      <section className="mb-10 scroll-mt-20" id="guideline-logo-primary-mark">
        <div className="flex items-center gap-2.5 mb-4">
          <BrandSectionHeading icon={Layers} title={t('Primary Mark')} anchorId="logo-primary-mark" className="mb-0" />
          <BrandMetaPill tone="canonical">{t('Canonical')}</BrandMetaPill>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden">
          <div className="bg-brand-canvas dark:bg-[#121418] flex flex-col items-center justify-center py-20 gap-8">
            <img src="/assets/Logo/mediaBubble_logo_vertical_full_color.svg" alt="MediaBubble logo" className="w-40 h-40" />
            <div className="flex items-center gap-6">
              <img src="/assets/logo.svg" alt="" className="w-20 h-20" />
              <img src="/assets/logo.svg" alt="" className="w-12 h-12" />
              <img src="/assets/logo.svg" alt="" className="w-8 h-8" />
              <img src="/assets/logo.svg" alt="" className="w-6 h-6" />
            </div>
          </div>
          <div className="border-t border-brand-whisper-border px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: t('Viewport'), value: '90 × 90', color: '#888888' },
              { label: t('Primary blue'), value: '#2196F3', color: '#2196F3' },
              { label: t('Accent yellow'), value: '#FFC107', color: '#FFC107' },
              { label: t('Min height'), value: '24px', color: '#1565C0' },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted">{spec.label}</p>
                <code className="text-[13px] font-semibold font-mono mt-1 block" style={{ color: spec.color }}>{spec.value}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background variants */}
      <section className="mb-10 scroll-mt-20" id="guideline-logo-background-variants">
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <BrandSectionHeading title={t('Background Variants')} anchorId="logo-background-variants" className="mb-0" />
            <BrandMetaPill tone="reference">{t('Selection reference')}</BrandMetaPill>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bgVariants.map((v) => (
            <div key={v.label} id={`guideline-${v.anchor}`} className="rounded-xl overflow-hidden border border-brand-whisper-border transition-colors hover:bg-black/[0.02] scroll-mt-20">
              <div className="flex items-center justify-center py-8" style={{ backgroundColor: v.bg }}>
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-12 h-12" style={{ filter: v.filter }} />
              </div>
              <div className="bg-brand-surface px-3 py-2.5 border-t border-brand-whisper-border">
                <p className="text-[11px] font-semibold text-brand-text leading-tight">{v.label}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full border border-brand-whisper-border" style={{ backgroundColor: v.bg }} />
                    <p className="text-[9px] font-mono text-brand-text-muted">{v.bgLabel}</p>
                  </div>
                  {!v.preferred && (
                    <span className="text-[10px] font-bold text-[#DC2626]">{t('Caution')}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clear space & sizing */}
      <section className="mb-8 scroll-mt-20" id="guideline-logo-clear-space-sizing">
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <BrandSectionHeading title={t('Clear Space & Sizing')} anchorId="logo-clear-space-sizing" className="mb-0" />
            <BrandMetaPill tone="canonical">{t('Canonical')}</BrandMetaPill>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-[#07080A] bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] border border-white/[0.08] rounded-xl p-8 flex flex-col items-center justify-center gap-3 min-h-[260px] shadow-inner relative">
            <div className="relative">
              {/* Outer boundary representing the clear space box */}
              <div className="border-2 border-dashed border-brand-blue/40 bg-brand-blue/[0.03] rounded-lg p-8 relative">
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-20 h-20 relative z-10 brightness-0 invert" />
                
                {/* Top alignment guideline */}
                <div className="absolute -top-1 start-1/2 -translate-x-1/2 -translate-y-3 flex items-center gap-1 z-20">
                  <div className="h-px w-6 bg-brand-blue/50" />
                  <span className="text-[9px] font-mono font-bold text-brand-blue whitespace-nowrap bg-[#07080A] px-1">½X</span>
                  <div className="h-px w-6 bg-brand-blue/50" />
                </div>

                {/* Bottom alignment guideline */}
                <div className="absolute -bottom-1 start-1/2 -translate-x-1/2 translate-y-3 flex items-center gap-1 z-20">
                  <div className="h-px w-6 bg-brand-blue/50" />
                  <span className="text-[9px] font-mono font-bold text-brand-blue whitespace-nowrap bg-[#07080A] px-1">½X</span>
                  <div className="h-px w-6 bg-brand-blue/50" />
                </div>

                {/* Left alignment guideline */}
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-3 flex flex-col items-center gap-1 z-20">
                  <div className="w-px h-6 bg-brand-blue/50" />
                  <span className="text-[9px] font-mono font-bold text-brand-blue whitespace-nowrap bg-[#07080A] py-0.5">½X</span>
                  <div className="w-px h-6 bg-brand-blue/50" />
                </div>

                {/* Right alignment guideline */}
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-3 flex flex-col items-center gap-1 z-20">
                  <div className="w-px h-6 bg-brand-blue/50" />
                  <span className="text-[9px] font-mono font-bold text-brand-blue whitespace-nowrap bg-[#07080A] py-0.5">½X</span>
                  <div className="w-px h-6 bg-brand-blue/50" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-brand-blue/80 font-mono text-center max-w-[28ch] leading-relaxed relative z-10 mt-2">
              {t('Maintain clear space equal to half the logo width (½X) on all sides')}
            </p>
          </div>
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border">
            {[
              { size: '24px', use: t('Favicon, micro UI'), w: 'w-6', h: 'h-6', szCls: 'bg-brand-canvas text-brand-text-secondary border border-brand-whisper-border' },
              { size: '32px', use: t('Compact header, app icon'), w: 'w-8', h: 'h-8', szCls: 'bg-[#2196F3]/10 text-[#2196F3]' },
              { size: '48px', use: t('Desktop sidebar, email'), w: 'w-12', h: 'h-12', szCls: 'bg-[#2196F3]/10 text-[#2196F3]' },
              { size: '72px', use: t('Marketing materials'), w: 'w-[72px]', h: 'h-[72px]', szCls: 'bg-[#FFC107]/10 text-[#FFC107]' },
              { size: '120px+', use: t('Presentations, print'), w: 'w-[72px]', h: 'h-[72px]', szCls: 'bg-[#FFC107]/10 text-[#FFC107]' },
            ].map((s) => (
              <div key={s.size} className="flex items-center gap-5 px-5 py-3 transition-all hover:bg-black/[0.015] dark:hover:bg-white/[0.02]">
                <div className="w-20 flex items-center justify-center shrink-0">
                  <img src="/assets/logo.svg" alt="" className={`${s.w} ${s.h}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <p className="text-[13px] font-semibold text-brand-text">{s.size}</p>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${s.szCls}`}>{t('size', 'Min. size')}</span>
                  </div>
                  <p className="text-[11px] text-brand-text-muted mt-0.5">{s.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don'ts */}
      <section className="mb-16 scroll-mt-20" id="guideline-logo-incorrect-usage">
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <BrandSectionHeading title={t('Incorrect Usage')} anchorId="logo-incorrect-usage" className="mb-0" />
            <BrandMetaPill tone="reference">{t('Guardrail reference')}</BrandMetaPill>
          </div>
          <span className="text-[10px] font-mono text-[#DC2626]/60">{t('Never do this — see approved variants above')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {donts.map((item, i) => (
            <div key={i} className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden transition-colors hover:bg-black/[0.02]">
              <div className="bg-red-500/[0.03] dark:bg-red-950/10 flex items-center justify-center h-28 relative border-b border-brand-whisper-border">
                {item.demo}
                <div className="absolute top-2 end-2 w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center shadow-sm">
                  <X size={9} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-[12px] text-brand-text-secondary leading-snug">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
