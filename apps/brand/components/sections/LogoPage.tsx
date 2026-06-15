import React from 'react'
import { X, Layers } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function LogoPage() {
  const { t } = useI18n()

  const bgVariants = [
    { bg: '#FFFFFF', bgLabel: t('White'), filter: 'none', label: t('Full Color'), preferred: true },
    { bg: '#072A6B', bgLabel: t('Deep Blue'), filter: 'brightness(0) invert(1)', label: t('White on dark'), preferred: true },
    { bg: '#FAFAFA', bgLabel: t('Canvas'), filter: 'none', label: t('On Canvas White (#FAFAFA)'), preferred: true },
    { bg: '#FFC107', bgLabel: t('Brand Yellow'), filter: 'none', label: t('On Yellow'), preferred: false },
    { bg: '#333333', bgLabel: t('Charcoal'), filter: 'brightness(0) invert(1)', label: t('White on Charcoal (#333)'), preferred: true },
    { bg: '#E3F2FD', bgLabel: t('Blue Tint'), filter: 'none', label: t('On Light Blue (#E3F2FD)'), preferred: true },
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
      <PageHero icon={Layers} kicker={t('Visual Identity')} title={t('Logo')} titleHighlight={t('Logo')} description={t('The MediaBubble mark: a compact symbol combining blue and yellow. Use it consistently, give it room to breathe, and never alter its proportions or colors.')} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">

      {/* Primary mark */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('Primary Mark')}</h2>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
          <div className="bg-[#FAFAFA] flex flex-col items-center justify-center py-20 gap-8">
            <img src="/assets/Logo/mediaBubble_logo_vertical_full_color.svg" alt="MediaBubble logo" className="w-40 h-40" />
            <div className="flex items-center gap-6">
              <img src="/assets/logo.svg" alt="" className="w-20 h-20" />
              <img src="/assets/logo.svg" alt="" className="w-12 h-12" />
              <img src="/assets/logo.svg" alt="" className="w-8 h-8" />
              <img src="/assets/logo.svg" alt="" className="w-6 h-6" />
            </div>
          </div>
          <div className="border-t border-[#E8E8E8] px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: t('Viewport'), value: '90 × 90', color: '#333333' },
              { label: t('Primary blue'), value: '#358DCC', color: '#2196F3' },
              { label: t('Accent yellow'), value: '#FFDE11', color: '#FFC107' },
              { label: t('Min height'), value: '24px', color: '#1565C0' },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9E9E9E]">{spec.label}</p>
                <code className="text-[13px] font-semibold font-mono mt-1 block" style={{ color: spec.color }}>{spec.value}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background variants */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('Background Variants')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bgVariants.map((v) => (
            <div key={v.label} className="rounded-xl overflow-hidden border border-[#E8E8E8] transition-colors hover:bg-black/[0.02]">
              <div className="flex items-center justify-center py-8" style={{ backgroundColor: v.bg }}>
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-12 h-12" style={{ filter: v.filter }} />
              </div>
              <div className="bg-white px-3 py-2.5 border-t border-[#E8E8E8]">
                <p className="text-[11px] font-semibold text-[#333333] leading-tight">{v.label}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full border border-[#E8E8E8]" style={{ backgroundColor: v.bg }} />
                    <p className="text-[9px] font-mono text-[#9E9E9E]">{v.bgLabel}</p>
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
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('Clear Space & Sizing')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-8 flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <div className="border-2 border-dashed border-[#2196F3]/25 rounded-lg p-8 relative">
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-20 h-20 relative z-10" />
                <div className="absolute -top-1 start-1/2 -translate-x-1/2 -translate-y-3">
                  <div className="flex items-center gap-1">
                    <div className="h-px w-6 bg-[#2196F3]/40" />
                    <span className="text-[10px] font-mono text-[#2196F3]/60 whitespace-nowrap">{t('½× logo width')}</span>
                    <div className="h-px w-6 bg-[#2196F3]/40" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-brand.muted-steel text-center max-w-[22ch] leading-relaxed">{t('Maintain clear space equal to half the logo width on all sides')}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E8E8E8] divide-y divide-[#E8E8E8]">
            {[
              { size: '24px', use: t('Favicon, micro UI'), w: 'w-6', h: 'h-6', szCls: 'bg-[#9E9E9E]/20 text-[#666666]' },
              { size: '32px', use: t('Compact header, app icon'), w: 'w-8', h: 'h-8', szCls: 'bg-[#2196F3]/10 text-brand.dark-blue' },
              { size: '48px', use: t('Desktop sidebar, email'), w: 'w-12', h: 'h-12', szCls: 'bg-[#2196F3]/15 text-brand.dark-blue' },
              { size: '72px', use: t('Marketing materials'), w: 'w-[72px]', h: 'h-[72px]', szCls: 'bg-brand.dark-blue/10 text-[#072A6B]' },
              { size: '120px+', use: t('Presentations, print'), w: 'w-[72px]', h: 'h-[72px]', szCls: 'bg-[#072A6B]/10 text-[#072A6B]' },
            ].map((s) => (
              <div key={s.size} className="flex items-center gap-5 px-5 py-3 transition-all hover:bg-black/[0.015]">
                <div className="w-20 flex items-center justify-center shrink-0">
                  <img src="/assets/logo.svg" alt="" className={`${s.w} ${s.h}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <p className="text-[13px] font-semibold text-[#333333]">{s.size}</p>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${s.szCls}`}>{t('size', 'Min. size')}</span>
                  </div>
                  <p className="text-[11px] text-brand.muted-steel mt-0.5">{s.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don'ts */}
      <section className="mb-16">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">{t('Incorrect Usage')}</h2>
          <span className="text-[10px] font-mono text-[#DC2626]/60">{t('Never do this — see approved variants above')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {donts.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden transition-colors hover:bg-black/[0.02]">
              <div className="bg-[#FEF2F2] flex items-center justify-center h-28 relative">
                {item.demo}
                <div className="absolute top-2 end-2 w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center shadow-sm">
                  <X size={9} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-[12px] text-[#666666] leading-snug">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
