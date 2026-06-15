'use client'

import { useCallback, useState } from 'react'
import { Check, Link2, Linkedin, Share2 } from 'lucide-react'

interface Props {
  title: string
  url: string
  layout?: 'horizontal' | 'vertical'
}

export function BlogShareButtons({ title, url, layout = 'horizontal' }: Props) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }, [url])

  const shareNative = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        /* user cancelled or unsupported */
      }
    }
    void copyLink()
  }, [title, url, copyLink])

  const btnClass =
    'inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-whisper-border bg-white px-3 py-2 text-[12px] font-semibold text-brand-secondary hover:border-brand-blue/30 hover:text-brand-navy transition-colors'

  const containerClass =
    layout === 'vertical' ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2'

  return (
    <div className={containerClass} aria-label="Share this article">
      <button type="button" onClick={() => void shareNative()} className={btnClass}>
        <Share2 size={14} aria-hidden="true" />
        Share
      </button>
      <button type="button" onClick={() => void copyLink()} className={btnClass}>
        {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
      >
        <Linkedin size={14} aria-hidden="true" />
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
      >
        X
      </a>
    </div>
  )
}
