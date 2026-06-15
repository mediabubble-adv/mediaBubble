'use client'

import { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { trackNewsletterSubmitted } from '@mediabubble/shared/client'
import { Input, Button } from '@mediabubble/design-system'

export function BlogNewsletterCta() {
  const { t, dir } = useI18n()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, service_interest: 'newsletter' }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Submission failed')
      }
      setStatus('success')
      trackNewsletterSubmitted(email)
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <aside dir={dir} className="rounded-2xl border border-brand-whisper-border bg-brand-navy p-6 sm:p-8 text-white">
      <div className="flex items-start gap-3 mb-4">
        <Mail size={20} className="text-brand-yellow shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="font-display text-[18px] font-bold mb-1">
            {t('blog.newsletter.title', 'Get marketing insights in your inbox')}
          </h3>
          <p className="text-[14px] text-white/75 leading-relaxed">
            {t('blog.newsletter.description', 'Practical guides for tourism and hospitality brands in the UAE — no fluff, no spam.')}
          </p>
        </div>
      </div>

      {status === 'success' ? (
        <p className="text-[14px] font-medium text-brand-yellow">
          {t('blog.newsletter.success', "Thanks — you're subscribed.")}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            name="email"
            placeholder={t('blog.newsletter.placeholder', 'you@company.com')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            aria-label={t('blog.newsletter.placeholder', 'you@company.com')}
          />
          <Button type="submit" disabled={status === 'submitting'} className="shrink-0">
            {status === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                {t('blog.newsletter.subscribing', 'Subscribing…')}
              </>
            ) : (
              t('blog.newsletter.subscribe', 'Subscribe')
            )}
          </Button>
        </form>
      )}

      {status === 'error' && errorMsg && (
        <p className="mt-2 text-[13px] text-red-300" role="alert">
          {errorMsg}
        </p>
      )}
    </aside>
  )
}
