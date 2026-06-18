import React from 'react'
import { PageHero } from './PageHero'
import { FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'

/* ─────────────────────────────────────────────────────────────
   Reusable spec-row table used across all three collateral items
   ───────────────────────────────────────────────────────────── */
function SpecTable({ rows }: { rows: { spec: string; value: string; note: string }[] }) {
  return (
    <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden">
      <div className="divide-y divide-brand-whisper-border">
        {rows.map((row) => (
          <div
            key={row.spec}
            className="flex flex-col px-5 py-4 gap-2 hover:bg-brand-canvas/40 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue shrink-0">
                {row.spec}
              </span>
              <code className="text-[10.5px] font-mono font-bold text-brand-text text-end">
                {row.value}
              </code>
            </div>
            <p className="text-[11.5px] text-brand-text-secondary leading-snug">{row.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section separator — full bleed rule with generous vertical space
   ───────────────────────────────────────────────────────────── */
function SectionDivider() {
  return <div className="border-t border-brand-whisper-border my-16 lg:my-20" />
}

/* ─────────────────────────────────────────────────────────────
   Section header row — heading left, spec badge right
   ───────────────────────────────────────────────────────────── */
function SectionHeader({
  icon,
  title,
  specLabel,
}: {
  icon: LucideIcon
  title: string
  specLabel: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
      <BrandSectionHeading icon={icon} title={title} className="mb-0" />
      <span className="text-[10px] font-mono text-brand-text-muted bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border px-3 py-1.5 rounded-md self-start sm:self-auto shrink-0">
        {specLabel}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CollateralPage
   ───────────────────────────────────────────────────────────── */
export function CollateralPage() {
  const { t } = useI18n()

  const cardSpecs = [
    {
      spec: t('collateral.spec.dimensions', 'Dimensions'),
      value: '85 × 54 mm',
      note: t('collateral.spec.dimensionsNote', 'Standard business size. Print at 90 × 59 mm with 2.5mm bleed.'),
    },
    {
      spec: t('collateral.spec.front', 'Front'),
      value: '#0D0F12 background',
      note: t('collateral.spec.frontNote', 'Logo mark in full white. Name in Poppins Bold 14pt, title in Inter Medium 10pt.'),
    },
    {
      spec: t('collateral.spec.back', 'Back'),
      value: '#FFFFFF canvas with blue rules',
      note: t('collateral.spec.backNote', '2px left rule + 1px top/bottom accent in #1565C0; contact in Inter Regular 9pt.'),
    },
    {
      spec: t('collateral.spec.paperStock', 'Paper & Finish'),
      value: '350–400 gsm offset matte',
      note: t('collateral.spec.paperStockNote', 'Matte or soft-touch laminate on front. Avoid high gloss to prevent office reflections.'),
    },
  ]

  const envelopeSpecs = [
    {
      spec: 'Size Format',
      value: 'DL — 220 × 110 mm',
      note: 'Standard international business envelope; fits A4 sheets folded in thirds.',
    },
    {
      spec: 'Flap Design',
      value: 'Obsidian #0D0F12 diagonal flap',
      note: 'Deep brand color anchor on first contact; folds down to seal.',
    },
    {
      spec: 'Accent Strip',
      value: 'Brand Yellow (#FFC107) — 8px',
      note: 'Yellow accent closes the envelope front; matches business card top rule.',
    },
    {
      spec: 'Return Address',
      value: 'Below flap, left-aligned',
      note: 'Logo mark + "MediaBubble" + city/country in Inter Regular 9pt.',
    },
  ]

  const letterheadSpecs = [
    {
      spec: 'Size Format',
      value: 'A4 — 210 × 297 mm',
      note: 'Also supports US Letter (215.9 × 279.4 mm) with minor margin adjustment.',
    },
    {
      spec: 'Header Band',
      value: 'Deep Obsidian full-width header',
      note: 'Logo left, URL right. 4px yellow sub-bar separates header from body.',
    },
    {
      spec: 'Body Margins',
      value: '20mm margins on all sides',
      note: 'Body in Inter Regular 11pt at 1.6 line height; Poppins SemiBold for headings.',
    },
    {
      spec: 'Footer Band',
      value: '#FFC107 + #1565C0 bottom band',
      note: '1px yellow top rule above footer band; email, phone, city in Inter 7pt.',
    },
    {
      spec: 'Printing Specs',
      value: 'Single-sided, 120 gsm',
      note: 'Premium uncoated stock. Suitable for offset or laser printing.',
    },
  ]

  return (
    <div>
      <PageHero
        icon={FileText}
        kicker={t('collateral.hero.kicker', 'Print & Collateral')}
        title={t('collateral.hero.title', 'Collateral')}
        titleHighlight="Collateral"
        description={t(
          'collateral.hero.description',
          'Every printed piece follows the same system: deep obsidian anchored by yellow, logo locked to the brand zone, contact details set in Inter.',
        )}
      />

      <BrandPageContent>

        {/* ── SECTION 1: BUSINESS CARD ── */}
        <section>
          <SectionHeader
            icon={FileText}
            title={t('collateral.businessCard.heading', 'Business Card')}
            specLabel="85 × 54 mm"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Previews */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-brand-canvas dark:bg-brand-canvas/30 p-8 rounded-xl border border-brand-whisper-border">

              {/* CARD FRONT */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider">
                  {t('collateral.front', 'Front')}
                </span>
                <div
                  className="relative bg-[#0D0F12] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 flex flex-col justify-between p-6 w-full max-w-[320px] aspect-[85/54]"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#FFC107] opacity-80" />

                  {/* Card Header */}
                  <div className="flex items-center gap-3">
                    <img src="/assets/logo.svg" alt="MediaBubble" className="w-8 h-8 shrink-0" />
                    <div>
                      <p className="text-white font-bold text-[12px] leading-none font-display">MediaBubble</p>
                      <p className="text-[#FFC107] text-[8.5px] font-bold uppercase tracking-[0.16em] mt-1.5">
                        {t('collateral.marketingAgency', 'Marketing Agency')}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div>
                    <p className="text-white font-bold text-base font-display leading-none">Ahmed Hassan</p>
                    <p className="text-white/50 text-[10px] mt-1.5 font-sans">Creative Director</p>
                    <div className="w-6 h-[2px] bg-[#FFC107] mt-4 rounded-full" />
                  </div>
                </div>
              </div>

              {/* CARD BACK */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider">
                  {t('collateral.back', 'Back')}
                </span>
                <div
                  className="relative bg-white rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-brand-whisper-border flex flex-col justify-center ps-8 pe-6 py-6 w-full max-w-[320px] aspect-[85/54]"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#FFC107]" />
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-[#0D0F12]" />
                  <div className="absolute top-0 start-0 bottom-0 w-1.5 bg-[#0D0F12]" />

                  <div className="space-y-2.5 text-[#0D0F12]">
                    {[
                      { label: t('collateral.contact.email', 'Email'), value: 'hello@mediabubble.com' },
                      { label: t('collateral.contact.phone', 'Phone'), value: '+20 65 555 1234' },
                      { label: t('collateral.contact.web', 'Web'), value: 'mediabubble.com' },
                      { label: t('collateral.contact.location', 'Location'), value: 'Hurghada, Egypt' },
                    ].map((c) => (
                      <div key={c.label} className="flex items-baseline gap-2 text-start">
                        <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#1565C0] w-12 shrink-0">
                          {c.label}
                        </span>
                        <span className="text-[10.5px] font-medium font-sans truncate">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Print specifications */}
            <div className="lg:col-span-5">
              <SpecTable rows={cardSpecs} />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── SECTION 2: ENVELOPE ── */}
        <section>
          <SectionHeader icon={FileText} title="Business Envelope" specLabel="DL — 220 × 110 mm" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Preview */}
            <div className="lg:col-span-7 bg-brand-canvas dark:bg-brand-canvas/30 p-8 rounded-xl border border-brand-whisper-border flex justify-center overflow-x-auto">
              <div
                className="relative bg-white rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-brand-whisper-border shrink-0 aspect-[220/110]"
                style={{ width: '440px' }}
              >
                {/* Flap */}
                <div
                  className="absolute top-0 inset-x-0"
                  style={{
                    borderInlineStart: '220px solid transparent',
                    borderInlineEnd: '220px solid transparent',
                    borderTop: '72px solid #0D0F12',
                  }}
                />

                {/* Bottom accent stripe */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#FFC107]" />

                {/* Return address */}
                <div className="absolute top-[88px] start-8">
                  <div className="flex items-center gap-2 text-start text-[#0D0F12]">
                    <img src="/assets/logo.svg" alt="MediaBubble" className="w-5 h-5" />
                    <div>
                      <p className="text-[10px] font-bold font-display leading-none">MediaBubble</p>
                      <p className="text-[8px] text-brand-text-muted font-sans mt-0.5">Hurghada, Red Sea, Egypt</p>
                    </div>
                  </div>
                </div>

                {/* Address window */}
                <div
                  className="absolute rounded border border-brand-whisper-border bg-[#F9FAFB] text-start"
                  style={{ bottom: '32px', left: '32px', width: '128px', height: '48px', padding: '8px 8px' }}
                >
                  <p className="text-[8px] text-brand-text-secondary font-sans leading-tight">
                    Recipient Name<br />
                    Street Address, Floor 3<br />
                    Cairo, Egypt
                  </p>
                </div>

                {/* Stamp block */}
                <div
                  className="absolute rounded border border-dashed border-brand-whisper-border flex items-center justify-center"
                  style={{ bottom: '32px', insetInlineEnd: '32px', width: '40px', height: '48px' }}
                >
                  <p className="text-[8px] text-brand-muted-steel text-center leading-none font-sans font-semibold">
                    Postage<br />Stamp
                  </p>
                </div>
              </div>
            </div>

            {/* Spec Panel */}
            <div className="lg:col-span-5">
              <SpecTable rows={envelopeSpecs} />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── SECTION 3: LETTERHEAD ── */}
        <section className="pb-4">
          <SectionHeader icon={FileText} title="Company Letterhead" specLabel="A4 — 210 × 297 mm" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Preview */}
            <div className="lg:col-span-7 bg-brand-canvas dark:bg-brand-canvas/30 p-8 rounded-xl border border-brand-whisper-border flex justify-center">
              <div
                className="relative bg-white rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-brand-whisper-border shrink-0 aspect-[210/297] flex flex-col justify-between"
                style={{ width: '280px' }}
              >
                {/* Header Band */}
                <div>
                  <div className="bg-[#0D0F12] px-6 py-4 flex items-center justify-between text-start">
                    <div className="flex items-center gap-2">
                      <img src="/assets/logo.svg" alt="MediaBubble" className="w-5 h-5 shrink-0" />
                      <div>
                        <p className="text-white font-bold text-[10px] font-display leading-none">MediaBubble</p>
                        <p className="text-[#FFC107] text-[7px] font-bold uppercase tracking-[0.14em] mt-0.5">
                          Marketing
                        </p>
                      </div>
                    </div>
                    <p className="text-white/30 text-[8px] font-mono">mediabubble.com</p>
                  </div>
                  <div className="h-0.5 bg-[#FFC107]" />

                  {/* Inner text mockups */}
                  <div className="px-6 pt-6 text-start">
                    <div className="mb-5">
                      <div className="h-1.5 bg-[#E8E8E8] rounded-sm w-12 mb-2" />
                      <div className="h-2 bg-[#D0D0D0] rounded-sm w-24 mb-1" />
                      <div className="h-1.5 bg-[#E8E8E8] rounded-sm w-16" />
                    </div>
                    <div className="h-px bg-[#E8E8E8] mb-5" />

                    {/* Dummy content lines */}
                    {[80, 95, 90, 85, 95, 0, 75, 90, 80, 95, 70].map((w, i) =>
                      w === 0 ? (
                        <div key={i} className="mb-3" />
                      ) : (
                        <div
                          key={i}
                          className="h-1 bg-[#F5F5F5] rounded-sm mb-1.5"
                          style={{ width: `${w}%` }}
                        />
                      ),
                    )}

                    {/* Signature mockup */}
                    <div className="mt-6">
                      <div className="h-4 w-16 border-b border-[#D0D0D0] mb-1.5" />
                      <div className="h-1 bg-[#D0D0D0] rounded-sm w-16 mb-0.5" />
                      <div className="h-1 bg-[#E8E8E8] rounded-sm w-10" />
                    </div>
                  </div>
                </div>

                {/* Footer Band */}
                <div>
                  <div className="h-0.5 bg-[#FFC107]" />
                  <div className="bg-[#0D0F12] px-6 py-2 flex items-center justify-between text-[6px] font-mono text-white/45">
                    <span>hello@mediabubble.com</span>
                    <span>+20 65 555 1234</span>
                    <span>Hurghada, Egypt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Panel */}
            <div className="lg:col-span-5">
              <SpecTable rows={letterheadSpecs} />
            </div>
          </div>
        </section>

      </BrandPageContent>
    </div>
  )
}
