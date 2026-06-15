import React, { useState } from 'react'
import { Copy, Check, Info, Download } from 'lucide-react'
import { PageHero } from './PageHero'

export function ResourcesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [downloadedId, setDownloadedId] = useState<string | null>(null)

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const download = (content: string, filename: string, id: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    setDownloadedId(id)
    setTimeout(() => setDownloadedId(null), 3000)
  }

  const resources = [
    {
      group: 'Color',
      items: [
        {
          label: 'CSS Variables',
          desc: 'Full brand color set as CSS variables. Paste into your project root.',
          preview: '/* MediaBubble Brand Colors */\n:root {\n  --color-brand-blue: #2196F3;\n  --color-brand-yellow: #FFC107;\n  --color-dark-blue: #1565C0;\n  --color-accent-gold: #E8B506;\n  --color-deep-charcoal: #0D0F12;\n  --color-sidebar: #072A6B;\n  --color-white: #FFFFFF;\n  --neutral-50: #F5F5F5;\n  --neutral-100: #E8E8E8;\n  --neutral-200: #D0D0D0;\n  --neutral-400: #9E9E9E;\n  --neutral-500: #888888;\n  --neutral-600: #666666;\n  --neutral-700: #555555;\n  --neutral-900: #333333;\n  --neutral-950: #0D0F12;\n}',
          filename: 'media-bubble-colors.css',
        },
        {
          label: 'Tailwind Config',
          desc: 'Add MediaBubble brand values to your tailwind.config so they work in utility classes.',
          preview: '// tailwind.config.js\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          blue: \'#2196F3\',\n          \'dark-blue\': \'#1565C0\',\n          yellow: \'#FFC107\',\n          \'accent-gold\': \'#E8B506\',\n        },\n        charcoal: {\n          deep: \'#0D0F12\',\n          sidebar: \'#072A6B\',\n        },\n        neutral: {\n          50: \'#F5F5F5\',\n          100: \'#E8E8E8\',\n          400: \'#9E9E9E\',\n          900: \'#333333\',\n        },\n      },\n    },\n  },\n}',
          filename: 'media-bubble-tailwind.js',
        },
        {
          label: 'Color JSON',
          desc: 'Structured color data in JSON format, ready for design tools, CMS configuration, or automation scripts.',
          preview: '{\n  "palette": {\n    "brand": {\n      "blue": "#2196F3",\n      "darkBlue": "#1565C0",\n      "yellow": "#FFC107",\n      "accentGold": "#E8B506"\n    },\n    "charcoal": {\n      "deep": "#0D0F12",\n      "sidebar": "#072A6B"\n    },\n    "neutral": {\n      "50": "#F5F5F5",\n      "100": "#E8E8E8",\n      "400": "#9E9E9E",\n      "900": "#333333"\n    }\n  }\n}',
          filename: 'media-bubble-palette.json',
        },
      ],
    },
    {
      group: 'Typography',
      items: [
        {
          label: 'Google Fonts Link',
          desc: 'HTML link tags for loading all brand fonts from Google Fonts. Drop into your `<head>`.',
          preview: '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">',
          filename: 'fonts-head.html',
        },
        {
          label: 'Font Declarations',
          desc: 'CSS @font-face rules for self-hosted font files. Adjust paths to your asset directory.',
          preview: '/* Poppins - Display */\n@font-face {\n  font-family: \'Poppins\';\n  src: url(\'/fonts/Poppins-Bold.woff2\') format(\'woff2\');\n  font-weight: 700;\n  font-display: swap;\n}\n\n/* Inter - Body */\n@font-face {\n  font-family: \'Inter\';\n  src: url(\'/fonts/Inter-Regular.woff2\') format(\'woff2\');\n  font-weight: 400;\n  font-display: swap;\n}\n\n/* JetBrains Mono - Code */\n@font-face {\n  font-family: \'JetBrains Mono\';\n  src: url(\'/fonts/JetBrainsMono-Regular.woff2\') format(\'woff2\');\n  font-weight: 400;\n  font-display: swap;\n}',
          filename: 'fonts-face.css',
        },
        {
          label: 'Font Weight Guide',
          desc: 'Complete weight-to-usage mapping for all three brand font families.',
          preview: 'Font Weight Reference\n══════════════════\n\nPoppins\n  Black (900)   → Ultra-bold display, posters\n  ExtraBold (800)→ Hero headings, large type\n  Bold (700)     → Standard headings, section titles\n  SemiBold (600) → Subheadings, card titles\n\nInter\n  SemiBold (600) → Emphasized UI, active states\n  Medium (500)   → Navigation, buttons\n  Regular (400)  → Body text, paragraphs, labels\n\nJetBrains Mono\n  Medium (500)   → Emphasized code, constants\n  Regular (400)  → Code snippets, filenames, metadata',
          filename: 'font-weight-matrix.txt',
        },
      ],
    },
    {
      group: 'Checklists',
      items: [
        {
          label: 'Brand Consistency',
          desc: 'Pre-launch checklist covering colors, typography, spacing, and logo usage.',
          preview: 'Brand Consistency Checklist\n══════════════════════════\n\n□ Logo uses correct variant (full, icon, horizontal)\n□ Clear space maintained (1.6× logo height)\n□ Primary palette only — brand blue, brand yellow, charcoal\n□ No unapproved gradient usage\n□ Font families match spec (Poppins / Inter / JetBrains Mono)\n□ Body text at minimum 14px\n□ Line height at 1.6 for body copy\n□ 65ch max line length for paragraphs\n□ 8px grid system in use\n□ Active state feedback on all interactive elements\n□ Reduced motion respected\n□ WCAG AA contrast (4.5:1 normal, 3:1 large text)',
          filename: 'brand-consistency-checklist.md',
        },
        {
          label: 'Design Review',
          desc: 'Peer review checklist for catching layout, spacing, and accessibility issues before shipping.',
          preview: 'Design Review Checklist\n══════════════════════\n\n□ Visual hierarchy clear without relying on size alone\n□ Spacing follows 8px grid (4px allowed in exception cases)\n□ All text meets WCAG AA contrast minimum\n□ Interactive elements have hover + active states\n□ Touch targets ≥ 44px on mobile\n□ Form labels visible and associated\n□ Error states shown for all form inputs\n□ Loading states present for async operations\n□ Empty states handle zero-data scenarios\n□ Focus indicators visible on all interactive elements\n□ Reduced motion media query respected',
          filename: 'design-review-checklist.md',
        },
      ],
    },
  ]

  return (
    <div>
      <PageHero kicker="Resources" title="Resources" titleHighlight="Resources" description="Download color definitions, font snippets, and checklists to add MediaBubble's brand to any project." />


      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">

      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/20 mb-8">
        <Info size={14} className="text-[#92610B] shrink-0" />
        <p className="text-[12px] text-brand-text-secondary leading-relaxed">
          These are reference snippets — not the original design files. For the actual brand files (logo SVGs, font files, templates), see the <strong className="font-semibold text-brand-text">Asset Library</strong> page.
        </p>
      </div>

      {resources.map((group) => (
        <section key={group.group} className={group.group === 'Checklists' ? 'mb-16' : group.group === 'Typography' ? 'mb-8' : 'mb-10'}>
          <div className="mb-4">
            <h2 className="text-[13px] font-semibold text-brand-dark-blue">{group.group}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {group.items.map((item) => (
              <div key={item.label} className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden transition-all duration-150 flex flex-col">
                <div className="p-5 pb-0">
                  <h3 className="font-display text-sm font-semibold text-brand-dark-blue mb-1">{item.label}</h3>
                  <p className="text-[12px] text-brand-text-secondary leading-snug mb-4">{item.desc}</p>
                </div>
                <div className="mx-5 px-3 py-3 rounded-lg bg-[#F9F9F9] border border-brand-whisper-border dark:border-brand-light-border font-mono text-[10px] text-brand-text-secondary leading-relaxed overflow-hidden max-h-[120px] relative mb-4">
                  <pre className="truncate whitespace-pre-wrap line-clamp-6">{item.preview}</pre>
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#F9F9F9] to-transparent pointer-events-none" />
                </div>
                <div className="mt-auto px-5 pb-5 flex items-center gap-2">
                  <button
                    onClick={() => copy(item.preview, `copy-${item.label}`)}
                    className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-lg text-[11px] font-semibold text-white bg-brand-dark-blue hover:bg-[#1250A0] active:scale-[0.97] transition-all"
                  >
                    {copiedId === `copy-${item.label}` ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                  </button>
                  <button
                    onClick={() => download(item.preview, item.filename, `dl-${item.label}`)}
                    className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-lg text-[11px] font-semibold text-brand-dark-blue bg-[#E8F0FE] hover:bg-[#D0E0FC] active:scale-[0.97] transition-all"
                  >
                    {downloadedId === `dl-${item.label}` ? <><Check size={13} /> Saved</> : <><Download size={13} /> Download</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      </div>
    </div>
  )
}
