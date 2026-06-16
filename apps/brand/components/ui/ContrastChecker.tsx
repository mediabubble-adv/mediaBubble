import React, { useState } from 'react'
import { Contrast, Copy, Check, Languages } from 'lucide-react'
import { parseHex, contrastRatio } from './utils'
import { BrandSectionHeading } from './brand-doc'
import { useI18n } from '@/lib/i18n/provider'

/**
 * Self-contained WCAG contrast checker with a split layout dashboard.
 * Contains foreground/background inputs, results score, WCAG compliance grid,
 * and a live component visual preview canvas supporting English and Arabic font toggle.
 */
export function ContrastChecker() {
  const { t } = useI18n()
  const [fgInput, setFgInput] = useState('#333333')
  const [bgInput, setBgInput] = useState('#FFFFFF')
  const [lang, setLang] = useState<'en' | 'ar'>('en')

  const validFg = parseHex(fgInput)
  const validBg = parseHex(bgInput)
  const ratio = validFg && validBg ? contrastRatio(validFg, validBg) : null

  return (
    <section className="mb-16">
      <BrandSectionHeading
        icon={Contrast}
        title={
          <span className="flex items-center gap-2">
            {t('colors.contrastChecker')}
            <span className="text-[10px] font-mono font-normal text-brand-muted-steel bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border px-2 py-0.5 rounded">
              {t('colors.wcagBadge', 'WCAG 2.1 AA')}
            </span>
          </span>
        }
      />

      <div className="bg-brand-surface rounded-xl border border-brand-whisper-border p-5 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Inputs, Ratio & Badges */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Color Inputs */}
            <div className="space-y-4">
              {[
                { label: t('colors.foreground', 'Foreground'), value: fgInput, set: setFgInput, valid: validFg, fallback: '#333333' },
                { label: t('colors.background', 'Background'), value: bgInput, set: setBgInput, valid: validBg, fallback: '#FFFFFF' },
              ].map((field) => (
                <div key={field.label} className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-brand-text-muted">
                    {field.label}
                  </label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg shrink-0 border border-brand-whisper-border shadow-sm transition-colors duration-250 relative overflow-hidden" 
                      style={{ backgroundColor: field.valid || field.fallback }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/5 pointer-events-none" />
                    </div>
                    <input
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.fallback}
                      className="flex-1 px-3.5 py-2.5 text-[13px] font-mono rounded-lg border border-brand-input-border bg-brand-canvas dark:bg-brand-surface text-brand-text outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all shadow-inner"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Contrast Ratio Result */}
            {ratio !== null && (
              <div className="pt-4 border-t border-brand-whisper-border/60">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[13px] font-bold text-brand-text-secondary">
                    {t('colors.contrastRatio', 'Contrast Ratio')}
                  </span>
                  <span key={`ratio-${ratio.toFixed(2)}`} className={`text-4xl font-black font-mono tracking-tight animate-scale-in ${
                    ratio >= 4.5 ? 'text-brand-success' : ratio >= 3 ? 'text-brand-warning' : 'text-brand-error'
                  }`}>
                    {ratio.toFixed(2)}:1
                  </span>
                </div>

                {/* Compliance Badges Grid */}
                <div key={`badges-${ratio.toFixed(2)}`} className="grid grid-cols-2 gap-3.5 animate-scale-in">
                  {[
                    { label: t('colors.aaNormal', 'AA Normal'), key: 'AA Normal', pass: ratio >= 4.5, threshold: '4.5:1' },
                    { label: t('colors.aaLarge', 'AA Large'), key: 'AA Large', pass: ratio >= 3, threshold: '3:1' },
                    { label: t('colors.aaaNormal', 'AAA Normal'), key: 'AAA Normal', pass: ratio >= 7, threshold: '7:1' },
                    { label: t('colors.aaaLarge', 'AAA Large'), key: 'AAA Large', pass: ratio >= 4.5, threshold: '4.5:1' },
                  ].map((check) => (
                    <div 
                      key={check.key} 
                      className={`rounded-xl px-4 py-3 text-center border transition-all ${
                        check.pass 
                          ? 'bg-brand-success-bg/40 dark:bg-brand-success/10 border-brand-success/20' 
                          : 'bg-brand-error-bg/40 dark:bg-brand-error/10 border-brand-error/20'
                      }`}
                    >
                      <p className={`text-[12px] font-extrabold uppercase tracking-wide ${check.pass ? 'text-brand-success' : 'text-brand-error'}`}>
                        {check.pass ? t('colors.pass', 'PASS') : t('colors.fail', 'FAIL')}
                      </p>
                      <p className="text-[11px] font-bold text-brand-text-secondary mt-1">{check.label}</p>
                      <p className="text-[9.5px] font-mono text-brand-text-muted/80 mt-0.5">{check.threshold}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-[10px] text-brand-text-muted mt-4 text-center leading-relaxed">
                  {t('colors.wcagDefinition', 'AA = minimum compliance. AAA = enhanced compliance. Large text = 18px+ bold or 24px+ regular.')}
                </p>
              </div>
            )}

          </div>

          {/* RIGHT PANEL: Live Visual Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-brand-whisper-border bg-brand-canvas dark:bg-brand-canvas/30 p-5 sm:p-6 min-h-[340px] shadow-inner relative overflow-hidden">
            
            {/* Toolbar: Canvas title & Font Language Toggle */}
            <div className="flex items-center justify-between gap-3 mb-5 border-b border-brand-whisper-border/50 pb-3 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                {t('colors.previewCanvas', 'Live Typography Preview')}
              </span>
              
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold rounded-lg border border-brand-whisper-border bg-brand-surface hover:bg-brand-canvas dark:hover:bg-white/5 active:scale-95 transition-all text-brand-text shadow-sm"
              >
                <Languages size={12} className="text-brand-blue" />
                {lang === 'en' ? 'English (Inter)' : 'Arabic (Cairo)'}
              </button>
            </div>

            {/* Simulated Live Viewport Card */}
            <div 
              className="flex-1 flex flex-col justify-center rounded-xl p-6 sm:p-8 transition-colors duration-250 border border-brand-whisper-border/30 relative select-none shadow-sm" 
              style={{ backgroundColor: validBg || '#FFFFFF' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

              {lang === 'en' ? (
                <div className="space-y-4 text-start animate-fade-in-up">
                  <h4 className="font-display text-lg sm:text-2xl font-black leading-tight tracking-tight" style={{ color: validFg || '#333333' }}>
                    Obsidian Creative Studio
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-relaxed font-sans" style={{ color: validFg || '#333333' }}>
                    MediaBubble builds sleek, modern applications. This interactive preview canvas verifies how typography contrast levels translate onto headings, paragraph text, and interactive buttons.
                  </p>
                  <div className="pt-2">
                    <span 
                      className="inline-block px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider text-center shadow-sm"
                      style={{ 
                        backgroundColor: validFg || '#333333', 
                        color: validBg || '#FFFFFF' 
                      }}
                    >
                      Action Component Preview
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-end animate-fade-in-up" dir="rtl">
                  <h4 className="font-arabic text-lg sm:text-2xl font-black leading-tight" style={{ color: validFg || '#333333' }}>
                    استوديو ميديا بابل الإبداعي
                  </h4>
                  <p className="font-arabic text-[12.5px] sm:text-[13.5px] leading-relaxed" style={{ color: validFg || '#333333' }}>
                    تقوم ميديا بابل بتطوير تطبيقات وتصاميم ويب متكاملة. تساعدك هذه الأداة على التحقق التلقائي لتباين الألوان لقراءة العناوين والفقرات والأزرار بوضوح تام.
                  </p>
                  <div className="pt-2">
                    <span 
                      className="inline-block px-4 py-2 rounded-lg text-[11px] font-bold text-center font-arabic shadow-sm"
                      style={{ 
                        backgroundColor: validFg || '#333333', 
                        color: validBg || '#FFFFFF' 
                      }}
                    >
                      زر إجراء تفاعلي
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom guideline description */}
            <p className="text-[11px] text-brand-text-muted mt-5 text-center leading-relaxed">
              {t('colors.wcagDescription', 'WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text. AAA requires 7:1 and 4.5:1. Click swatches above to copy hex values.')}
            </p>

          </div>

        </div>
      </div>
    </section>
  )
}
