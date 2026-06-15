import React, { useState } from 'react'
import { Copy, Check, AtSign, Globe, Monitor } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function DigitalAssetsPage() {
  const { t } = useI18n()
  const [copiedSig, setCopiedSig] = useState(false)

  const emailSignatureHTML = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:13px;line-height:1.5;color:#333333;">
  <tr>
    <td style="padding-right:16px;border-right:2px solid #2196F3;vertical-align:middle;">
      <img src="https://mediabubble.com/assets/logo.svg" width="52" height="52" alt="MediaBubble" style="display:block;" />
    </td>
    <td style="padding-left:16px;vertical-align:middle;">
      <p style="margin:0;font-weight:700;font-size:15px;color:#1565C0;">Ahmed Hassan</p>
      <p style="margin:2px 0 0;color:#555555;font-size:12px;">Creative Director · MediaBubble</p>
      <p style="margin:8px 0 0;font-size:11px;color:#9E9E9E;">
        <a href="tel:+20655551234" style="color:#9E9E9E;text-decoration:none;">+20 65 555 1234</a>
        &nbsp;·&nbsp;
        <a href="mailto:ahmed@mediabubble.com" style="color:#2196F3;text-decoration:none;">ahmed@mediabubble.com</a>
      </p>
      <p style="margin:3px 0 0;font-size:11px;">
        <a href="https://mediabubble.com" style="color:#2196F3;text-decoration:none;">mediabubble.com</a>
        &nbsp;·&nbsp;Hurghada, Egypt
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top:10px;">
      <div style="height:2px;background:linear-gradient(to right,#2196F3,#1565C0,#072A6B);border-radius:2px;"></div>
    </td>
  </tr>
</table>`

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
    { bg: '#072A6B', filter: 'brightness(0) invert(1)', shape: 'rounded-full', label: 'Circle · Dark Blue' },
    { bg: '#2196F3', filter: 'brightness(0) invert(1)', shape: 'rounded-full', label: 'Circle · Brand Blue' },
    { bg: '#FAFAFA', filter: 'none', shape: 'rounded-2xl', label: 'Rounded · Canvas' },
    { bg: '#072A6B', filter: 'brightness(0) invert(1)', shape: 'rounded-2xl', label: 'Rounded · Dark Blue' },
    { bg: '#FFC107', filter: 'none', shape: 'rounded-2xl', label: 'Rounded · Yellow' },
  ]

  return (
    <div>
      <PageHero icon={Monitor} kicker="Digital Branding" title="Digital Assets" titleHighlight="Digital" description="Profile images, favicons, and email signatures that keep MediaBubble consistent across browsers, apps, and email clients." />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">

      {/* Avatar */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">Avatar</h2>
          <span className="ml-auto text-[10px] font-mono text-[#9E9E9E]">400 × 400 px recommended</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-5">
          {avatarVariants.map((v) => (
            <div key={v.label} className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 ${v.shape} flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-[#E8E8E8]`}
                style={{ backgroundColor: v.bg }}
              >
                <img src="/assets/logo.svg" alt="MediaBubble" className="w-10 h-10" style={{ filter: v.filter }} />
              </div>
              <p className="text-[10px] font-mono text-[#9E9E9E] text-center leading-tight">{v.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { platform: 'LinkedIn', spec: '400 × 400 px · Circle crop · White bg', note: 'Keep content inside the inner 70% of the circle' },
              { platform: 'Twitter / X', spec: '400 × 400 px · Circle crop · Dark blue bg', note: 'Displayed at 48px; Keep content inside the inner 70% of the circle' },
              { platform: 'Instagram', spec: '400 × 400 px · Circle crop · White bg', note: 'Avoid logo elements in outer 15%' },
            ].map((row) => (
              <div key={row.platform}>
                <p className="text-[13px] font-semibold text-brand.dark-blue mb-1">{row.platform}</p>
                <p className="text-[11px] font-mono text-[#666666] mb-1">{row.spec}</p>
                <p className="text-[11px] text-brand.muted-steel leading-snug">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Favicon */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">Favicon</h2>
        </div>
        {/* Browser tab mockup */}
        <div className="bg-[#E8E8E8] rounded-xl p-4 mb-5 overflow-x-auto">
          <div className="flex items-end gap-0.5 min-w-max mb-0">
            <div className="bg-white rounded-t-lg pt-2 pb-2 px-4 flex items-center gap-2 border-t border-l border-r border-[#D0D0D0] min-w-[160px]">
              <img src="/assets/logo.svg" alt="" style={{ width: '16px', height: '16px' }} />
              <span className="text-[11px] text-[#333333] truncate max-w-[100px]">MediaBubble</span>
            </div>
            <div className="bg-[#EEEEEE] rounded-t-lg pt-2 pb-2 px-4 flex items-center gap-2 min-w-[130px]">
              <div className="w-4 h-4 rounded-sm bg-[#D0D0D0]" />
              <span className="text-[11px] text-[#9E9E9E] truncate">New Tab</span>
            </div>
          </div>
          <div className="bg-white rounded-b-xl rounded-tr-xl border border-[#D0D0D0] p-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-[#F5F5F5] rounded-lg px-3 py-1.5 flex items-center gap-2">
              <Globe size={12} className="text-[#9E9E9E]" strokeWidth={1.5} />
              <span className="text-[11px] text-[#9E9E9E]">mediabubble.com</span>
            </div>
          </div>
        </div>
        {/* Size grid */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] divide-y divide-[#E8E8E8]">
          {faviconSizes.map((f) => {
            const szCls = f.size <= 32 ? 'bg-[#9E9E9E]/20 text-[#666666]' : f.size <= 48 ? 'bg-[#2196F3]/10 text-brand.dark-blue' : 'bg-brand.dark-blue/10 text-[#072A6B]'
            return (
            <div key={f.size} className="flex items-center gap-5 px-5 py-3.5 transition-all hover:bg-black/[0.015]">
              <div className="w-16 flex items-center justify-center shrink-0">
                <img
                  src="/assets/logo.svg"
                  alt=""
                  style={{ width: `${Math.min(f.size, 48)}px`, height: `${Math.min(f.size, 48)}px` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="text-[13px] font-semibold text-[#333333]">{f.size}px</p>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${szCls}`}>image</span>
                  <span className="text-[11px] text-brand.muted-steel">{f.label}</span>
                </div>
                <code className="text-[10px] font-mono text-[#9E9E9E]">{f.note}</code>
              </div>
            </div>
            )})}
        </div>
      </section>

      {/* Email signature */}
      <section className="mb-16">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand.dark-blue">Email Signature</h2>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden mb-4">
          {/* Preview */}
          <div className="px-6 py-8 border-b border-[#F5F5F5]">
            <table style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', lineHeight: 1.5, color: '#333333', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ paddingInlineEnd: '16px', borderInlineEnd: '2px solid #2196F3', verticalAlign: 'middle' }}>
                    <img src="/assets/logo.svg" width={52} height={52} alt="MediaBubble" style={{ display: 'block' }} />
                  </td>
                  <td style={{ paddingInlineStart: '16px', verticalAlign: 'middle' }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: '#1565C0' }}>Ahmed Hassan</p>
                    <p style={{ margin: '2px 0 0', color: '#555555', fontSize: '12px' }}>Creative Director · MediaBubble</p>
                    <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#9E9E9E' }}>
                      +20 65 555 1234 · <span style={{ color: '#2196F3' }}>ahmed@mediabubble.com</span>
                    </p>
                    <p style={{ margin: '3px 0 0', fontSize: '11px' }}>
                      <span style={{ color: '#2196F3' }}>mediabubble.com</span> · Hurghada, Egypt
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingTop: '10px' }}>
                    <div style={{ height: '2px', background: 'linear-gradient(to right,#2196F3,#1565C0,#072A6B)', borderRadius: '2px' }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Copy bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#FAFAFA]">
            <div className="flex items-center gap-2">
              <AtSign size={13} className="text-[#9E9E9E]" />
              <p className="text-[11px] text-brand.muted-steel">HTML table · works in Gmail, Outlook, Apple Mail</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(emailSignatureHTML)
                setCopiedSig(true)
                setTimeout(() => setCopiedSig(false), 2000)
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#2196F3] text-white hover:bg-[#1976D2] active:scale-[0.97] transition-all"
            >
              {copiedSig ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy HTML</>}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E8] divide-y divide-[#E8E8E8]">
          {[
            { spec: 'Layout', value: 'HTML <table>', note: 'Table layout for maximum email client compatibility (Outlook, Gmail, Apple Mail)' },
            { spec: 'Divider', value: '2px solid #2196F3', note: 'Vertical separator between logo and name/contact block' },
            { spec: 'Footer gradient bar', value: '#2196F3 → #072A6B', note: 'Bottom accent line mirrors the letterhead footer treatment' },
            { spec: 'Image hosting', value: 'Absolute URL required', note: 'Host the logo on a CDN or static domain' },
          ].map((row) => (
            <div key={row.spec} className="flex items-start gap-5 px-5 py-3 transition-all hover:bg-black/[0.015]">
              <code className="text-[11px] font-mono text-[#2196F3] shrink-0 w-24 mt-0.5">{row.spec}</code>
              <div>
                <p className="text-[12px] font-semibold text-[#333333]">{row.value}</p>
                <p className="text-[11px] text-brand.muted-steel mt-0.5 leading-snug">{row.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
