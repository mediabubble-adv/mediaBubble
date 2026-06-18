import React, { useState } from 'react'
import { Copy, Check, AtSign, Globe, Monitor, Lock, Chrome } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function DigitalAssetsPage() {
  const { t } = useI18n()
  const [copiedSig, setCopiedSig] = useState(false)
  const [sigPreset, setSigPreset] = useState<'blue-mint' | 'yellow-blue'>('blue-mint')
  const [copiedFaviconSize, setCopiedFaviconSize] = useState<number | null>(null)

  const getSignatureHTML = (preset: 'blue-mint' | 'yellow-blue') => {
    const primary = preset === 'blue-mint' ? '#2196F3' : '#FFC107'
    const secondary = preset === 'blue-mint' ? '#1AD191' : '#1565C0'
    const nameColor = preset === 'blue-mint' ? '#2196F3' : '#FFC107'
    
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:13px;line-height:1.5;color:#333333;text-align:left;">
  <tr>
    <td style="padding-right:16px;border-right:2px solid ${primary};vertical-align:middle;">
      <img src="https://mediabubble.com/assets/logo.svg" width="52" height="52" alt="MediaBubble" style="display:block;" />
    </td>
    <td style="padding-left:16px;vertical-align:middle;">
      <p style="margin:0;font-weight:700;font-size:15px;color:${nameColor};">Ahmed Hassan</p>
      <p style="margin:2px 0 0;color:#555555;font-size:12px;">Creative Director · MediaBubble</p>
      <p style="margin:8px 0 0;font-size:11px;color:#9E9E9E;">
        <a href="tel:+20655551234" style="color:#9E9E9E;text-decoration:none;">+20 65 555 1234</a>
        &nbsp;·&nbsp;
        <a href="mailto:ahmed@mediabubble.com" style="color:${primary};text-decoration:none;">ahmed@mediabubble.com</a>
      </p>
      <p style="margin:3px 0 0;font-size:11px;">
        <a href="https://mediabubble.com" style="color:${primary};text-decoration:none;">mediabubble.com</a>
        &nbsp;·&nbsp;Hurghada, Egypt
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top:10px;">
      <div style="height:2px;background:linear-gradient(to right,${primary},${secondary});border-radius:2px;"></div>
    </td>
  </tr>
</table>`
  }

  const faviconSizes = [
    { size: 16, label: 'Browser tab', note: 'favicon.ico' },
    { size: 32, label: 'Browser bookmark', note: 'favicon-32.png' },
    { size: 48, label: 'Windows shortcut', note: 'favicon-48.png' },
    { size: 180, label: 'iOS home screen', note: 'apple-touch-icon.png' },
    { size: 192, label: 'Android home screen icon', note: 'icon-192.png' },
    { size: 512, label: 'PWA splash screen', note: 'icon-512.png' },
  ]

  const avatarVariants = [
    { bg: '#FFFFFF', filter: 'none', shape: 'rounded-full', label: 'Circle · White' },
    { bg: '#0D0F12', filter: 'brightness(0) invert(1)', shape: 'rounded-full', label: 'Circle · Charcoal' },
    { bg: '#2196F3', filter: 'brightness(0) invert(1)', shape: 'rounded-full', label: 'Circle · Brand Blue' },
    { bg: '#1565C0', filter: 'brightness(0) invert(1)', shape: 'rounded-full', label: 'Circle · Dark Blue' },
    { bg: '#FFC107', filter: 'none', shape: 'rounded-2xl', label: 'Rounded · Yellow' },
    { bg: '#1AD191', filter: 'brightness(0) invert(1)', shape: 'rounded-2xl', label: 'Rounded · Mint' },
  ]

  const getFaviconLinkTag = (size: number, note: string) => {
    if (size === 16) return `<link rel="icon" type="image/x-icon" href="/${note}">`
    if (size === 180) return `<link rel="apple-touch-icon" sizes="180x180" href="/${note}">`
    return `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/${note}">`
  }

  const copyFaviconTag = (size: number, note: string) => {
    const tag = getFaviconLinkTag(size, note)
    navigator.clipboard.writeText(tag)
    setCopiedFaviconSize(size)
    setTimeout(() => setCopiedFaviconSize(null), 2000)
  }

  const primaryColor = sigPreset === 'blue-mint' ? '#2196F3' : '#FFC107'
  const secondaryColor = sigPreset === 'blue-mint' ? '#1AD191' : '#1565C0'
  const nameColor = sigPreset === 'blue-mint' ? '#2196F3' : '#FFC107'
  const gradientBg = sigPreset === 'blue-mint' 
    ? 'linear-gradient(to right, #2196F3, #1AD191)' 
    : 'linear-gradient(to right, #FFC107, #1565C0)'

  const specRows = [
    { spec: 'Layout Structure', value: 'HTML <table>', note: 'Standard layout for maximum email client compatibility (Outlook, Gmail, Apple Mail)' },
    { 
      spec: 'Left Border Accent', 
      value: `2px solid ${primaryColor}`, 
      note: sigPreset === 'blue-mint' 
        ? 'Brand Blue vertical line separates the logo from identity copy' 
        : 'Brand Yellow vertical line separates the logo from identity copy' 
    },
    { 
      spec: 'Footer Gradient Accent', 
      value: sigPreset === 'blue-mint' ? '#2196F3 → #1AD191' : '#FFC107 → #1565C0', 
      note: sigPreset === 'blue-mint' 
        ? 'Bottom accent bar transitions from Brand Blue to Mint' 
        : 'Bottom accent bar transitions from Brand Yellow to Dark Blue' 
    },
    { spec: 'Image Hosting Spec', value: 'Absolute URL Required', note: 'Logo assets must reside on a production CDN (HTTPS link)' },
  ]

  return (
    <div>
      <PageHero icon={Monitor} kicker="Digital Branding" title="Digital Assets" titleHighlight="Digital" description="Profile images, favicons, and email signatures that keep MediaBubble consistent across browsers, apps, and email clients." />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto space-y-16">

      {/* Avatar */}
      <section>
        <div className="flex items-center gap-2.5 mb-6 text-start">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-text">Avatar Specs</h2>
          <span className="ml-auto text-[10px] font-mono text-brand-text-muted">400 × 400 px recommended</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {avatarVariants.map((v) => (
            <div key={v.label} className="flex flex-col items-center gap-3 bg-brand-surface p-5 rounded-xl border border-brand-whisper-border hover:border-brand-blue/30 dark:hover:border-brand-blue/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-sm select-none">
              <div
                className={`w-16 h-16 ${v.shape} flex items-center justify-center shadow-inner border border-brand-whisper-border/60 group-hover:scale-105 transition-transform duration-300`}
                style={{ backgroundColor: v.bg }}
              >
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-10 h-10" style={{ filter: v.filter }} />
              </div>
              <div className="space-y-0.5 text-center">
                <p className="text-[11px] font-bold text-brand-text">{v.label.split(' · ')[0]}</p>
                <p className="text-[9px] font-mono text-brand-text-secondary leading-tight">{v.label.split(' · ')[1]}</p>
                <code className="inline-block text-[9px] font-mono text-brand-blue bg-brand-blue/08 px-1.5 py-0.5 rounded mt-1">{v.bg}</code>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border p-6 text-start shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { platform: 'LinkedIn', spec: '400 × 400 px · Circle crop · White bg', note: 'Keep content inside the inner 70% of the circle' },
              { platform: 'Twitter / X', spec: '400 × 400 px · Circle crop · Charcoal bg', note: 'Displayed at 48px; Keep content inside the inner 70% of the circle' },
              { platform: 'Instagram', spec: '400 × 400 px · Circle crop · White bg', note: 'Avoid logo elements in outer 15%' },
            ].map((row) => (
              <div key={row.platform} className="space-y-1">
                <p className="text-[13px] font-bold text-brand-text">{row.platform}</p>
                <p className="text-[11px] font-mono text-brand-blue">{row.spec}</p>
                <p className="text-[11px] text-brand-text-secondary leading-relaxed">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Favicon */}
      <section>
        <div className="flex items-center gap-2.5 mb-6 text-start">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-text">Favicon Standards</h2>
        </div>
        {/* Browser tab mockup */}
        <div className="bg-brand-canvas dark:bg-[#05080e] border border-brand-whisper-border rounded-xl p-5 mb-6 overflow-x-auto shadow-inner">
          <div className="flex items-end gap-1 min-w-max mb-0">
            <div className="bg-brand-surface rounded-t-lg pt-2 pb-2 px-4 flex items-center gap-2 border-t border-l border-r border-brand-whisper-border min-w-[160px] relative">
              <img src="/assets/logo.svg" alt="" className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-semibold text-brand-text truncate max-w-[100px]">MediaBubble</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full hover:bg-brand-whisper-border/55 flex items-center justify-center text-[8px] cursor-pointer text-brand-text-muted">×</span>
            </div>
            <div className="bg-brand-canvas dark:bg-[#0D0F12] rounded-t-lg pt-2 pb-2 px-4 flex items-center gap-2 min-w-[130px] border-b border-brand-whisper-border">
              <Chrome size={12} className="text-brand-text-muted" />
              <span className="text-[11px] text-brand-text-muted truncate">New Tab</span>
            </div>
          </div>
          <div className="bg-brand-surface rounded-b-xl rounded-tr-xl border border-brand-whisper-border p-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm" />
            </div>
            <div className="flex-1 bg-brand-canvas dark:bg-[#0D0F12] border border-brand-whisper-border rounded-lg px-3.5 py-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Lock size={11} className="text-[#1AD191]" />
                <span className="text-[11px] text-brand-text font-medium">https://</span>
                <span className="text-[11px] text-brand-text font-bold">mediabubble.com</span>
              </div>
              <Globe size={12} className="text-brand-text-muted" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        {/* Size grid */}
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border shadow-sm">
          {faviconSizes.map((f) => {
            const szCls = f.size <= 32 
              ? 'bg-brand-canvas text-brand-text-secondary border border-brand-whisper-border' 
              : f.size <= 48 
              ? 'bg-[#2196F3]/10 text-brand-blue' 
              : f.size <= 180 
              ? 'bg-[#1AD191]/10 text-[#1AD191] dark:text-[#1AD191]'
              : 'bg-[#FFC107]/10 text-[#FFB300] dark:text-[#FFC107]'
            return (
            <div key={f.size} className="flex items-center justify-between gap-6 px-6 py-4 transition-all hover:bg-black/[0.015] dark:hover:bg-white/[0.02] group">
              <div className="flex items-center gap-6 min-w-0">
                <div className="w-16 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/logo.svg"
                    alt=""
                    style={{ width: `${Math.min(f.size, 48)}px`, height: `${Math.min(f.size, 48)}px` }}
                  />
                </div>
                <div className="flex-1 min-w-0 text-start">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-[13px] font-bold text-brand-text">{f.size}px</p>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${szCls}`}>{f.size <= 32 ? 'ico' : 'png'}</span>
                    <span className="text-[11px] text-brand-text-secondary">{f.label}</span>
                  </div>
                  <code className="text-[10px] font-mono text-brand-text-muted block mt-0.5">{f.note}</code>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => copyFaviconTag(f.size, f.note)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold bg-brand-surface border border-brand-whisper-border text-brand-text-secondary hover:text-brand-text hover:border-brand-blue/30 dark:hover:border-brand-blue/50 active:scale-95 transition-all shadow-sm"
                >
                  {copiedFaviconSize === f.size ? (
                    <><Check size={11} className="text-[#1AD191]" /> Copied Tag</>
                  ) : (
                    <><Copy size={11} /> Copy Tag</>
                  )}
                </button>
              </div>
            </div>
          )})}
        </div>
      </section>

      {/* Email signature */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="text-start">
            <h2 className="text-[13px] font-semibold text-brand-text font-display">Email Signature Templates</h2>
            <p className="text-[11px] text-brand-text-secondary mt-0.5">Select a brand color configuration below to live preview and copy code.</p>
          </div>
          <div className="flex items-center gap-1 bg-brand-surface p-1 rounded-lg border border-brand-whisper-border self-start sm:self-auto shadow-inner">
            <button
              onClick={() => setSigPreset('blue-mint')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${sigPreset === 'blue-mint' ? 'bg-[#2196F3] text-white shadow-sm' : 'text-brand-text-secondary hover:text-brand-text'}`}
            >
              Blue & Mint
            </button>
            <button
              onClick={() => setSigPreset('yellow-blue')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${sigPreset === 'yellow-blue' ? 'bg-[#FFC107] text-[#0D0F12] shadow-sm' : 'text-brand-text-secondary hover:text-brand-text'}`}
            >
              Yellow & Blue
            </button>
          </div>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden mb-6 shadow-sm">
          {/* Email Composer Header Mockup */}
          <div className="px-5 py-3.5 border-b border-brand-whisper-border bg-brand-canvas dark:bg-[#080b0f] text-start space-y-2 select-none">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-brand-text-muted w-14 shrink-0 font-medium">To:</span>
              <span className="text-brand-text font-semibold bg-brand-whisper-border/20 px-2 py-0.5 rounded text-[10px]">partners@mediabubble.com</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-brand-text-muted w-14 shrink-0 font-medium">Subject:</span>
              <span className="text-brand-text font-bold">MediaBubble Corporate Signature Update</span>
            </div>
          </div>
          {/* Preview */}
          <div className="px-6 py-10 border-b border-brand-whisper-border bg-white flex justify-center">
            <table style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', lineHeight: 1.5, color: '#333333', borderCollapse: 'collapse', textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '16px', borderRight: `2px solid ${primaryColor}`, verticalAlign: 'middle' }}>
                    <img src="/assets/logo.svg" width={52} height={52} alt="MediaBubble" style={{ display: 'block' }} />
                  </td>
                  <td style={{ paddingLeft: '16px', verticalAlign: 'middle' }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: nameColor }}>Ahmed Hassan</p>
                    <p style={{ margin: '2px 0 0', color: '#555555', fontSize: '12px' }}>Creative Director · MediaBubble</p>
                    <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#9E9E9E' }}>
                      +20 65 555 1234 · <span style={{ color: primaryColor }}>ahmed@mediabubble.com</span>
                    </p>
                    <p style={{ margin: '3px 0 0', fontSize: '11px' }}>
                      <span style={{ color: primaryColor }}>mediabubble.com</span> · Hurghada, Egypt
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingTop: '10px' }}>
                    <div style={{ height: '2px', background: gradientBg, borderRadius: '2px' }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Copy bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-brand-canvas border-t border-brand-whisper-border">
            <div className="flex items-center gap-2">
              <AtSign size={13} className="text-brand-text-muted" />
              <p className="text-[11px] text-brand-text-secondary font-medium">HTML table · compatible with Gmail, Outlook, Apple Mail</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(getSignatureHTML(sigPreset))
                setCopiedSig(true)
                setTimeout(() => setCopiedSig(false), 2000)
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold text-white hover:opacity-90 active:scale-[0.97] transition-all shadow-md shrink-0 cursor-pointer"
              style={{ backgroundColor: primaryColor, color: sigPreset === 'yellow-blue' ? '#0D0F12' : '#FFFFFF' }}
            >
              {copiedSig ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy HTML Signature</>}
            </button>
          </div>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border divide-y divide-brand-whisper-border shadow-sm">
          {specRows.map((row) => (
            <div key={row.spec} className="flex items-start gap-5 px-5 py-4 transition-all hover:bg-black/[0.015] dark:hover:bg-white/[0.02] text-start">
              <code className="text-[11px] font-mono font-bold shrink-0 w-36 mt-0.5" style={{ color: primaryColor }}>{row.spec}</code>
              <div>
                <p className="text-[12px] font-semibold text-brand-text">{row.value}</p>
                <p className="text-[11px] text-brand-text-secondary mt-0.5 leading-relaxed">{row.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
