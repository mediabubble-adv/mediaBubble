import React from 'react'
import { Check, ArrowRight, LayoutGrid, Shield, BookOpen } from 'lucide-react'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading } from '../ui/brand-doc'

export function ImplementationGuidePage() {
  const quickStarts = [
    {
      step: '01',
      title: 'Install dependencies',
      code: 'npm install next react react-dom tailwindcss postcss autoprefixer @next/font',
      desc: 'Next.js with Tailwind CSS is the recommended stack. All tokens are defined in tailwind.config.ts.',
    },
    {
      step: '02',
      title: 'Import fonts',
      code: `import { Poppins, Inter } from '@next/font'

const poppins = Poppins({ subsets: ['latin'], weight: ['700','800','900'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-sans' })`,
      desc: 'Load Poppins and Inter through next/font for zero-layout-shift font loading. JetBrains Mono is optional.',
    },
    {
      step: '03',
      title: 'Copy CSS variables',
      code: `--color-brand-blue: #2196F3;
--color-brand-yellow: #FFC107;
--color-dark-blue: #1565C0;
--color-mint: #1AD191;
--color-deep-charcoal: #0D0F12;`,
      desc: 'Define these in your :root block. Use the CSS custom properties directly or map them to Tailwind colors.',
    },
    {
      step: '04',
      title: 'Use brand components',
      code: `<button className="bg-[#2196F3] text-white px-4 py-2 rounded-lg font-semibold hover:brightness-105 active:scale-[0.97]">
  Primary
</button>`,
      desc: 'Copy component code from the Components page. Every variant includes a working snippet with hover and active states.',
    },
  ]

  const colorTokens = [
    { token: '--color-brand-blue', hex: '#2196F3', use: 'Primary UI, navigation, links, interactive states' },
    { token: '--color-brand-yellow', hex: '#FFC107', use: 'Accent color for call-to-action buttons and highlights. Use yellow sparingly — at most once per screen.' },
    { token: '--color-dark-blue', hex: '#1565C0', use: 'Text emphasis on light, hover states, dark mode anchor' },
    { token: '--color-mint', hex: '#1AD191', use: 'Success states, analytics highlights, tertiary CTAs' },
    { token: '--color-deep-charcoal', hex: '#0D0F12', use: 'Dark surfaces, sidebar, footer' },
  ]

  const tailwindTokens = [
    { token: 'font-display', value: 'Poppins', use: 'Headings, display type, brand moments' },
    { token: 'font-sans', value: 'Inter', use: 'Body copy, labels, UI elements' },
    { token: 'font-mono', value: 'JetBrains Mono', use: 'Code snippets, metadata, hex values' },
  ]

  const a11yChecklist = [
    { check: 'Color contrast', detail: 'Body text 4.5:1 minimum. Large text 3:1 minimum. Test every foreground/background pair.', done: true },
    { check: 'Focus indicators', detail: 'Every interactive element needs a visible focus ring. Use :focus-visible for keyboard-only outlines.', done: true },
    { check: 'Touch targets', detail: 'All interactive elements must be at least 44x44px on touch devices. WCAG 2.1 requirement.', done: true },
    { check: 'Reduced motion', detail: 'Every animation needs a @media (prefers-reduced-motion: reduce) fallback. Never skip this.', done: true },
    { check: 'Semantic HTML', detail: 'Use landmark elements (nav, main, footer), proper heading hierarchy (h1-h6), and descriptive alt text.', done: false },
    { check: 'Keyboard navigation', detail: 'All functionality must be operable through keyboard alone. Test with Tab and Enter/Space.', done: false },
    { check: 'Screen reader testing', detail: 'Test with VoiceOver (macOS) and NVDA (Windows). Ensure dynamic content is announced.', done: false },
  ]

  const implementationNotes = [
    'Use the Components page as the definitive reference — every button, input, and card variant is documented with working code.',
    'Never override brand tokens with custom values. If a color or size does not exist in the system, request an addition — do not invent your own.',
    'Test every UI against WCAG 2.1 AA before shipping. Verify foreground/background pairs meet 4.5:1 for body text and 3:1 for large text.',
    'Keep font loading in layout.tsx. Do not load fonts in individual components — it causes layout shift and duplicate requests.',
  ]

  return (
    <div>
      <PageHero
        kicker="Development"
        title="Implementation Guide"
        titleHighlight="Implementation"
        description="Go from design tokens to working code. Set up, configure, and ship the brand system in any project."
      />

      <BrandPageContent>
        {/* Quick Start */}
        <section className="mb-12">
          <BrandSectionHeading icon={ArrowRight} title="Quick Start" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-grid">
            {quickStarts.map((qs) => (
              <div key={qs.step} className="bg-brand-surface rounded-xl border border-brand-whisper-border p-5 pt-[18px] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-[10px] font-mono text-brand-blue font-semibold mb-2 block">{qs.step}</span>
                <h3 className="font-display text-sm font-bold text-brand-text mb-3">{qs.title}</h3>
                <pre className="bg-[#0D0F12] rounded-lg p-3.5 mb-3 overflow-x-auto">
                  <code className="text-[11px] font-mono text-brand-yellow leading-relaxed whitespace-pre">{qs.code}</code>
                </pre>
                <p className="text-[12px] text-brand-text-secondary leading-relaxed">{qs.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tailwind Config */}
        <section className="mb-12">
          <BrandSectionHeading icon={LayoutGrid} title="Tailwind Configuration" />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-brand-whisper-border">
              <p className="text-[13px] text-brand-text-secondary mb-4">
                Map brand values to your Tailwind config so every utility class uses the right color and font:
              </p>
              <pre className="bg-[#0D0F12] rounded-lg p-4 overflow-x-auto">
                <code className="text-[11px] font-mono text-brand-yellow leading-relaxed whitespace-pre">{`// tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)'],
  sans: ['var(--font-sans)'],
  mono: ['var(--font-mono)'],
},
colors: {
  brand: {
    blue: '#2196F3',
    yellow: '#FFC107',
    'dark-blue': '#1565C0',
    mint: '#1AD191',
    charcoal: '#0D0F12',
  },
}`}</code>
              </pre>
            </div>
            <div className="divide-y divide-brand-whisper-border">
              {tailwindTokens.map((t) => (
                <div key={t.token} className="flex items-start gap-4 px-5 sm:px-6 py-3.5">
                  <code className="text-[11px] font-mono text-brand-blue w-28 shrink-0 mt-0.5">{t.token}</code>
                  <p className="text-[12px] font-semibold text-brand-text w-28 shrink-0">{t.value}</p>
                  <p className="text-[12px] text-brand-text-muted">{t.use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color Tokens */}
        <section className="mb-12">
          <BrandSectionHeading icon={BookOpen} title="Color Reference" />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-brand-whisper-border">
              <p className="text-[13px] text-brand-text-secondary">
                Use CSS variables if you need to change colors at runtime. Use Tailwind classes if you want utility helpers. Pick one per project and stay consistent.
              </p>
            </div>
            <div className="divide-y divide-brand-whisper-border">
              {colorTokens.map((c) => (
                <div key={c.token} className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-brand-canvas dark:hover:bg-white/[0.02] transition-colors">
                  <div
                    className="w-8 h-8 rounded-lg shrink-0 ring-1 ring-inset ring-black/[0.06]"
                    style={{ backgroundColor: c.hex }}
                  />
                  <code className="text-[11px] font-mono text-brand-text w-44 shrink-0">{c.token}</code>
                  <code className="text-[11px] font-mono text-brand-text-muted w-20 shrink-0">{c.hex}</code>
                  <p className="text-[12px] text-brand-text-muted">{c.use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessibility Checklist */}
        <section className="mb-12">
          <BrandSectionHeading icon={Shield} title="Accessibility Checklist" />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border overflow-hidden">
            {a11yChecklist.map((item) => (
              <div key={item.check} className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-brand-canvas dark:hover:bg-white/[0.02] transition-colors">
                <div
                  className="w-5 h-5 rounded-md shrink-0 mt-0.5 flex items-center justify-center"
                  style={{
                    backgroundColor: item.done ? 'rgba(26, 209, 145, 0.12)' : undefined,
                  }}
                  data-done={item.done}
                >
                  {item.done
                    ? <Check size={12} style={{ color: '#1AD191' }} />
                    : <span className="w-1 h-1 rounded-full bg-brand-text-muted/60 block" />
                  }
                </div>
                <div className="flex-1">
                  <p className={`text-[13px] font-semibold ${item.done ? 'text-brand-text' : 'text-brand-text-secondary'}`}>
                    {item.check}
                  </p>
                  <p className="text-[12px] text-brand-text-muted mt-0.5 leading-snug">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-brand-yellow/[0.04] rounded-xl border border-brand-yellow/[0.15] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-brand-yellow text-sm font-bold font-mono">!</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-text mb-3">Implementation notes</p>
              <ul className="space-y-2">
                {implementationNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-[13px] text-brand-text-secondary leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0 mt-2" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
