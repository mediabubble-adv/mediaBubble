'use client'

import { useState } from 'react'
import { Check, Copy, Download, Share2, Save, AlertCircle, ShieldCheck } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { encodeShare } from '../lib/persistence'
import type { Compliance, GeneratorConfig, ValidationResult } from '../lib/types'

interface PreviewPaneProps {
  prompt: string
  validation: ValidationResult
  config: GeneratorConfig
  storageAvailable: boolean
  onSaveTemplate: (name: string) => void
  onCopied: () => void
}

const COMPLIANCE_TONE: Record<Compliance, string> = {
  excellent: 'text-brand-success',
  good: 'text-brand-success',
  fair: 'text-brand-warning',
  poor: 'text-brand-error',
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const PreviewPane = ({
  prompt,
  validation,
  config,
  storageAvailable,
  onSaveTemplate,
  onCopied,
}: PreviewPaneProps) => {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [notice, setNotice] = useState('')

  const flashCopied = () => {
    setCopied(true)
    onCopied()
    setTimeout(() => setCopied(false), 1800)
  }

  const handleCopy = async () => {
    const ok = await copyText(prompt)
    if (ok) flashCopied()
    else setNotice(t('Copy failed — select the text manually.', 'Copy failed — select the text manually.'))
  }

  const handleExport = (format: 'txt' | 'json') => {
    const body =
      format === 'json'
        ? JSON.stringify({ config, prompt }, null, 2)
        : prompt
    const blob = new Blob([body], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mediabubble-prompt.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    const hash = encodeShare(config)
    if (!hash) return
    const url = `${window.location.origin}${window.location.pathname}${hash}`
    const ok = await copyText(url)
    if (ok) {
      setShared(true)
      setTimeout(() => setShared(false), 1800)
    } else {
      setNotice(t('Could not copy link.', 'Could not copy link.'))
    }
  }

  const handleSave = () => {
    const name = window.prompt(t('Template name', 'Template name')) ?? ''
    if (name.trim()) onSaveTemplate(name)
  }

  return (
    <div className="space-y-4">
      {/* Validation badge */}
      <div className="flex items-center justify-between bg-brand-surface border border-brand-whisper-border rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className={COMPLIANCE_TONE[validation.compliance]} />
          <span className="text-[13px] font-bold text-brand-text">
            {t('Brand score', 'Brand score')}: {validation.score}/100
          </span>
          <span className={`text-[12px] font-semibold capitalize ${COMPLIANCE_TONE[validation.compliance]}`}>
            {t(validation.compliance, validation.compliance)}
          </span>
        </div>
        {validation.issues.length > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-brand-text-muted">
            <AlertCircle size={12} />
            {validation.issues[0].message}
          </span>
        )}
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue text-white text-[12px] font-bold hover:bg-brand-dark-blue active:scale-95 transition-all"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? t('Copied!', 'Copied!') : t('Copy', 'Copy')}
        </button>
        <button
          type="button"
          onClick={() => handleExport('txt')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-whisper-border text-brand-text text-[12px] font-bold hover:border-brand-blue/30 active:scale-95 transition-all"
        >
          <Download size={14} /> .txt
        </button>
        <button
          type="button"
          onClick={() => handleExport('json')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-whisper-border text-brand-text text-[12px] font-bold hover:border-brand-blue/30 active:scale-95 transition-all"
        >
          <Download size={14} /> .json
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-whisper-border text-brand-text text-[12px] font-bold hover:border-brand-blue/30 active:scale-95 transition-all"
        >
          {shared ? <Check size={14} /> : <Share2 size={14} />}
          {shared ? t('Link copied!', 'Link copied!') : t('Share', 'Share')}
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-whisper-border text-brand-text text-[12px] font-bold hover:border-brand-blue/30 active:scale-95 transition-all"
        >
          <Save size={14} /> {t('Save', 'Save')}
        </button>
      </div>

      {!storageAvailable && (
        <p className="text-[11px] text-brand-warning">
          {t('Saving is unavailable in this browser session.', 'Saving is unavailable in this browser session.')}
        </p>
      )}
      {notice && <p className="text-[11px] text-brand-error">{notice}</p>}

      {/* Prompt output */}
      <div className="bg-brand-surface border border-brand-whisper-border rounded-xl p-4">
        <textarea
          readOnly
          value={prompt}
          aria-label={t('Generated prompt', 'Generated prompt')}
          className="w-full min-h-[260px] resize-y bg-transparent font-mono text-[12.5px] leading-relaxed text-brand-text whitespace-pre-wrap focus:outline-none"
        />
      </div>
    </div>
  )
}
