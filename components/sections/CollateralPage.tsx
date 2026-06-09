import React from 'react'
import { PageHero } from './PageHero'
import { FileText } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'

export function CollateralPage() {
  const { t } = useI18n()
  return (
    <div>
      <PageHero icon={FileText} kicker={t('collateral.hero.kicker', 'Print & Collateral')} title={t('collateral.hero.title', 'Collateral')} titleHighlight="Collateral" description={t('collateral.hero.description', 'Every printed piece follows the same system: deep blue anchored by yellow, logo locked to the brand zone, contact set in Inter.')} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">

      {/* Business card */}
      <section className="mb-12">
        <div className="w-full mb-5">
          <div className="bg-[#072A6B] rounded-lg px-5 py-2.5 flex items-center justify-between">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{t('collateral.businessCard.heading', 'Business Card')}</h2>
            <span className="text-[10px] font-mono text-[#FFC107]/70">85 × 54 mm</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          {/* Front */}
          <div>
            <p className="text-[11px] font-semibold text-[#9E9E9E] uppercase tracking-[0.12em] mb-3 ms-1">{t('collateral.front', 'Front')}</p>
            <div className="flex justify-center">
              <div
                className="relative bg-[#072A6B] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(7,42,107,0.35)]"
                style={{ width: '340px', height: '215px' }}
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-[#FFC107]" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 pt-7">
                  <div className="flex items-center gap-3">
                    <img src="/assets/logo.svg" alt="MediaBubble" className="w-9 h-9 shrink-0" style={{ filter: 'brightness(0) invert(1)' }} />
                    <div>
                      <p className="text-white font-bold text-[13px] leading-tight font-display">MediaBubble</p>
                      <p className="text-[#FFC107]/55 text-[10px] font-semibold uppercase tracking-[0.18em] mt-0.5">{t('collateral.marketingAgency', 'Marketing Agency')}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-[17px] font-display leading-tight">Ahmed Hassan</p>
                    <p className="text-white/50 text-[11px] mt-1 font-sans">Creative Director</p>
                    <div className="w-8 h-[2px] bg-[#FFC107] mt-3 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Back */}
          <div>
            <p className="text-[11px] font-semibold text-[#9E9E9E] uppercase tracking-[0.12em] mb-3 ms-1">{t('collateral.back', 'Back')}</p>
            <div className="flex justify-center">
              <div
                className="relative bg-white rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#E8E8E8]"
                style={{ width: '340px', height: '215px' }}
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-[#FFC107]" />
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#072A6B]" />
                <div className="absolute top-0 start-0 bottom-0 w-2 bg-[#072A6B]" />
                <div className="absolute inset-0 flex flex-col justify-center ps-10 pe-8 py-6">
                  <div className="space-y-2.5">
                    {[
                      { label: t('collateral.contact.email', 'Email'), value: 'hello@mediabubble.com' },
                      { label: t('collateral.contact.phone', 'Phone'), value: '+20 65 555 1234' },
                      { label: t('collateral.contact.web', 'Web'), value: 'mediabubble.com' },
                      { label: t('collateral.contact.location', 'Location'), value: 'Hurghada, Red Sea, Egypt' },
                    ].map((c) => (
                      <div key={c.label} className="flex items-baseline gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2196F3] w-14 shrink-0">{c.label}</span>
                        <span className="text-[11px] text-[#333333] font-sans">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
          <div className="h-[3px] bg-[#072A6B]" />
          <div className="divide-y divide-[#E8E8E8]">
          {[
            { spec: t('collateral.spec.dimensions', 'Dimensions'), value: '85 × 54 mm', note: t('collateral.spec.dimensionsNote', 'Standard international size. Print at 90 × 55 mm with 2.5mm bleed') },
            { spec: t('collateral.spec.front', 'Front'), value: '#072A6B background', note: t('collateral.spec.frontNote', 'Logo white (filter: invert). Name in Poppins Bold 14pt, title in Inter 10pt') },
            { spec: t('collateral.spec.back', 'Back'), value: '#FFFFFF with blue rules', note: t('collateral.spec.backNote', '2px left rule + 1px top/bottom accent in #072A6B; contact in Inter Regular 9pt') },
            { spec: t('collateral.spec.paperStock', 'Paper & finish'), value: '350–400 gsm', note: t('collateral.spec.paperStockNote', 'Matte or soft-touch laminate on front. Avoid gloss — reflects poorly under office lighting') },
          ].map((row) => (
            <div key={row.spec} className="flex items-start gap-5 px-5 py-3.5 transition-all hover:bg-[#072A6B]/[0.02]">
              <code className="text-[11px] font-mono text-[#2196F3] shrink-0 w-24 mt-0.5">{row.spec}</code>
              <div>
                <p className="text-[12px] font-semibold text-[#333333]">{row.value}</p>
                <p className="text-[11px] text-brand.muted-steel mt-0.5 leading-snug">{row.note}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Envelope */}
      <section className="mb-10">
        <div className="w-full mb-5">
          <div className="bg-[#072A6B] rounded-lg px-5 py-2.5 flex items-center justify-between">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">Envelope</h2>
            <span className="text-[10px] font-mono text-[#FFC107]/70">DL — 220 × 110 mm</span>
          </div>
        </div>
        <div className="flex justify-center mb-5 overflow-x-auto pb-2">
          <div
            className="relative bg-white rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[#E8E8E8] shrink-0"
            style={{ width: '560px', height: '280px' }}
          >
            {/* Flap */}
            <div
              className="absolute top-0 inset-x-0"
              style={{ borderInlineStart: '280px solid transparent', borderInlineEnd: '280px solid transparent', borderTop: '100px solid #072A6B' }}
            />
            {/* Bottom accent */}
            <div className="absolute bottom-0 inset-x-0 h-2 bg-[#FFC107]" />
            {/* Return address — left */}
            <div className="absolute top-[115px] start-9">
              <div className="flex items-center gap-2">
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-6 h-6" />
                <div>
                  <p className="text-[11px] font-bold text-[#072A6B] font-display">MediaBubble</p>
                  <p className="text-[10px] text-[#9E9E9E] font-sans">Hurghada, Red Sea, Egypt</p>
                </div>
              </div>
            </div>
            {/* Address window */}
            <div
              className="absolute rounded border border-[#E8E8E8] bg-[#F9FAFB]"
              style={{ bottom: '44px', left: '44px', width: '170px', height: '70px', padding: '10px 14px' }}
            >
              <p className="text-[10px] text-[#666666] font-sans leading-relaxed">Recipient Name<br />Street Address, Floor 3<br />Cairo, 11511, Egypt</p>
            </div>
            {/* Stamp */}
            <div
              className="absolute rounded border-2 border-dashed border-[#E8E8E8] flex items-center justify-center"
              style={{ bottom: '44px', insetInlineEnd: '44px', width: '52px', height: '70px' }}
            >
              <p className="text-[10px] text-brand.muted-steel text-center leading-tight font-sans">Postage<br />stamp</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
          <div className="h-[3px] bg-[#FFC107]" />
          <div className="divide-y divide-[#E8E8E8]">
          {[
            { spec: 'Size', value: 'DL — 220 × 110 mm', note: 'Standard international business envelope; fits A4 folded in thirds' },
            { spec: 'Flap', value: '#072A6B diagonal', note: 'Brand color on first contact; folds down to seal' },
            { spec: 'Bottom accent strip', value: '#FFC107 — 8px', note: 'Yellow accent closes the envelope front; matches business card top rule' },
            { spec: 'Return address', value: 'Below flap, left-aligned', note: 'Logo mark + "MediaBubble" + city/country in Inter Regular 9pt' },
          ].map((row) => (
            <div key={row.spec} className="flex items-start gap-5 px-5 py-3.5 transition-all hover:bg-[#FFC107]/[0.03]">
              <code className="text-[11px] font-mono text-[#2196F3] shrink-0 w-24 mt-0.5">{row.spec}</code>
              <div>
                <p className="text-[12px] font-semibold text-[#333333]">{row.value}</p>
                <p className="text-[11px] text-brand.muted-steel mt-0.5 leading-snug">{row.note}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Letterhead */}
      <section className="mb-16">
        <div className="w-full mb-5">
          <div className="bg-[#072A6B] rounded-lg px-5 py-2.5 flex items-center justify-between">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">Letterhead</h2>
            <span className="text-[10px] font-mono text-[#FFC107]/70">A4 — 210 × 297 mm</span>
          </div>
        </div>
        <div className="flex justify-center mb-5 overflow-x-auto pb-2">
          <div
            className="relative bg-white rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E8E8E8] shrink-0"
            style={{ width: '360px', height: '510px' }}
          >
            {/* Header */}
            <div className="bg-[#072A6B] px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
                <div>
                  <p className="text-white font-bold text-[13px] font-display leading-tight">MediaBubble</p>
                  <p className="text-[#FFC107]/55 text-[10px] font-semibold uppercase tracking-[0.12em]">Marketing Agency</p>
                </div>
              </div>
              <p className="text-white/30 text-[10px] font-mono">mediabubble.com</p>
            </div>
            <div className="h-1 bg-[#FFC107]" />
            {/* Date + recipient block */}
            <div className="px-8 pt-7 pb-0">
              <div className="mb-5">
                <div className="h-2 bg-[#E8E8E8] rounded-sm w-20 mb-3" />
                <div className="h-2.5 bg-[#D0D0D0] rounded-sm w-36 mb-1.5" />
                <div className="h-2 bg-[#E8E8E8] rounded-sm w-28" />
              </div>
              <div className="h-px bg-[#E8E8E8] mb-5" />
              {/* Body copy lines */}
              {[100, 92, 96, 85, 100, 0, 88, 95, 79, 100, 93, 0, 70].map((w, i) => (
                w === 0
                  ? <div key={i} className="mb-3" />
                  : <div key={i} className="h-1.5 bg-[#F0F0F0] rounded-sm mb-2" style={{ width: `${w}%` }} />
              ))}
              {/* Signature */}
              <div className="mt-6">
                <div className="h-5 w-24 border-b border-[#D0D0D0] mb-2" />
                <div className="h-1.5 bg-[#D0D0D0] rounded-sm w-24 mb-1" />
                <div className="h-1.5 bg-[#E8E8E8] rounded-sm w-16" />
              </div>
            </div>
            {/* Footer */}
            <div className="absolute bottom-0 inset-x-0">
              <div className="h-1 bg-[#FFC107]" />
              <div className="bg-[#072A6B] px-8 py-3 flex items-center justify-between">
                <p className="text-white/35 text-[7px] font-mono">hello@mediabubble.com</p>
                <p className="text-white/35 text-[7px] font-mono">+20 65 555 1234</p>
                <p className="text-white/35 text-[7px] font-mono">Hurghada, Egypt</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
          <div className="h-[3px] bg-[#072A6B]" />
          <div className="divide-y divide-[#E8E8E8]">
          {[
            { spec: 'Size', value: 'A4 — 210 × 297 mm', note: 'Also works at US Letter (215.9 × 279.4 mm) with minor margin adjustment' },
            { spec: 'Header', value: '#072A6B full-width band', note: 'Logo left, URL right. 4px yellow sub-bar separates header from body' },
            { spec: 'Body margins', value: '20mm all sides', note: 'Inter Regular 11pt at 1.6 line height; Poppins SemiBold 14pt for headings' },
            { spec: 'Footer', value: '#FFC107 + #072A6B band', note: '1px yellow top rule above footer band; email, phone, city in Inter 7pt' },
            { spec: 'Paper & printing', value: 'Single-sided, 120 gsm', note: 'Offset or digital print; no lamination required' },
          ].map((row) => (
            <div key={row.spec} className="flex items-start gap-5 px-5 py-3.5 transition-all hover:bg-[#072A6B]/[0.02]">
              <code className="text-[11px] font-mono text-[#2196F3] shrink-0 w-24 mt-0.5">{row.spec}</code>
              <div>
                <p className="text-[12px] font-semibold text-[#333333]">{row.value}</p>
                <p className="text-[11px] text-brand.muted-steel mt-0.5 leading-snug">{row.note}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
