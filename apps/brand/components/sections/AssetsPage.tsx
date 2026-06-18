import React, { useState } from 'react'
import { Copy, Check, Download, Package } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function AssetsPage() {
  const { t } = useI18n()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const logoFiles = [
    { name: 'logo.svg', format: 'SVG', use: 'Web, app, scalable use', size: 'Vector', bg: 'Transparent', action: '/assets/logo.svg' },
    { name: 'logo-white.svg', format: 'SVG', use: 'Dark backgrounds (use inverted/white version)', size: 'Vector', bg: 'Transparent', action: null },
    { name: 'logo-512.png', format: 'PNG', use: 'App icons, social avatars', size: '512 × 512', bg: 'Transparent', action: null },
    { name: 'logo-192.png', format: 'PNG', use: 'Android home screen icon', size: '192 × 192', bg: 'Transparent', action: null },
    { name: 'apple-touch-icon.png', format: 'PNG', use: 'iOS home screen', size: '180 × 180', bg: 'White', action: null },
    { name: 'favicon.ico', format: 'ICO', use: 'Browser favicon (multi-size)', size: '16/32/48px', bg: 'Transparent', action: null },
  ]

  const colorTokens = [
    { token: '--color-brand-blue', hex: '#2196F3', rgb: '33 150 243' },
    { token: '--color-dark-blue', hex: '#1565C0', rgb: '21 101 192' },
    { token: '--color-brand-yellow', hex: '#FFC107', rgb: '255 193 7' },
    { token: '--color-accent-mint', hex: '#1AD191', rgb: '26 209 145' },
    { token: '--color-deep-charcoal', hex: '#0D0F12', rgb: '13 15 18' },
  ]

  const fontStack = [
    { name: 'Poppins', role: 'Display', source: 'Google Fonts', weights: '400, 600, 700, 900', var: '--font-display' },
    { name: 'Inter', role: 'Body & UI', source: 'Google Fonts', weights: '400, 500, 600', var: '--font-sans' },
    { name: 'JetBrains Mono', role: 'Code', source: 'Google Fonts', weights: '400, 500', var: '--font-mono' },
    { name: 'Cairo', role: 'Arabic', source: 'Google Fonts', weights: '400, 600, 700, 800, 900', var: '--font-cairo' },
  ]

  return (
    <div>
      <PageHero icon={Package} kicker="Downloads & References" title="Asset Library" titleHighlight="Asset" description="All brand files in one place: logo variants, brand colors, and font details. Copy any value or download the files you need." />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">

      {/* Logo files */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">Logo Files</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border">
          {logoFiles.map((file) => (
            <div key={file.name} className="flex items-center gap-4 px-5 py-3.5 transition-all hover:bg-black/[0.015]">
              <div className="w-10 h-10 rounded-xl bg-brand-light-border flex items-center justify-center shrink-0">
                <img src="/assets/logo.svg" alt="" className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <code className="text-[12px] font-mono font-semibold text-brand-charcoal">{file.name}</code>
                <p className="text-[11px] text-brand-muted-steel mt-0.5">{file.use}</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono bg-brand-light-border text-brand-secondary px-2 py-0.5 rounded">{file.format}</span>
                <span className="text-[10px] text-brand-text-muted">{file.size}</span>
                <span className="text-[10px] text-brand-text-muted">{file.bg} bg</span>
              </div>
              {file.action ? (
                <a
                  href={file.action}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#2196F3] bg-[#2196F3]/[0.08] hover:bg-[#2196F3]/[0.15] active:scale-95 transition-all shrink-0"
                >
                  <Download size={12} /> {t('Download', 'Download')}
                </a>
              ) : (
                <span className="text-[10px] font-mono text-brand-muted-steel px-3 py-1.5 shrink-0">
                  {t(
                    'Not exported yet. Request this file from the design team.',
                    'Not exported yet. Request this file from the design team.',
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Color tokens */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">Brand Colors</h2>
          <span className="text-[10px] font-mono text-brand-muted-steel">Click to copy HEX</span>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border">
          {colorTokens.map((t) => (
            <button
              key={t.token}
              onClick={() => copy(t.hex, t.token)}
              className="w-full flex items-center gap-4 px-5 py-3 transition-all hover:bg-black/[0.015] text-start group active:bg-black/[0.03]"
            >
              <div className="w-9 h-9 rounded-xl border border-brand-whisper-border shrink-0 group-hover:scale-105 transition-transform" style={{ backgroundColor: t.hex }} />
              <code className="text-[11px] font-mono text-brand-blue w-44 shrink-0">{t.token}</code>
              <span className="text-[13px] font-mono font-semibold text-brand-charcoal w-20 shrink-0">{t.hex}</span>
              <span className="text-[11px] font-mono text-brand-text-muted hidden sm:block">rgb({t.rgb})</span>
              <span className="ml-auto shrink-0">
                {copiedId === t.token
                  ? <Check size={13} className="text-green-600" />
                  : <Copy size={13} className="text-brand-muted-steel group-hover:text-brand-text-muted transition-colors" />
                }
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Font references */}
      <section className="mb-16">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">Font References</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border">
          {fontStack.map((f) => (
            <div key={f.name} className="flex items-center gap-5 px-5 py-4 transition-all hover:bg-black/[0.015]">
              <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[13px]" style={{ fontFamily: f.name }}>Aa</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-brand-charcoal">{f.name}</p>
                <p className="text-[11px] text-brand-muted-steel">{f.role} · {f.weights}</p>
              </div>
              <code className="text-[10px] font-mono text-brand-text-muted hidden sm:block w-32 shrink-0">{f.var}</code>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono bg-brand-light-border text-brand-secondary px-2 py-0.5 rounded">{f.source}</span>
                <button
                  onClick={() => copy(`font-family: '${f.name}', sans-serif;`, `font-${f.name}`)}
                  className="p-1.5 rounded-lg hover:bg-brand-light-border transition-colors"
                >
                  {copiedId === `font-${f.name}` ? <Check size={13} className="text-green-600" /> : <Copy size={13} className="text-brand-text-muted" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
