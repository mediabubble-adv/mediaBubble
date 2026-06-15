'use client'

import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { useRef, useState } from 'react'
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { resolveMarketSiteConfig, trackFormCompleted, trackFormStarted } from '@mediabubble/shared/client'
import { Button, Input } from '@mediabubble/design-system'
import { Container } from '@/components/layout/Container'

const site = resolveMarketSiteConfig('ae')

const SERVICES_OPTIONS = [
  { key: 'contact.form.service.seo',      fallback: 'SEO & Organic Growth' },
  { key: 'contact.form.service.ppc',      fallback: 'Paid Advertising' },
  { key: 'contact.form.service.social',   fallback: 'Social Media Marketing' },
  { key: 'contact.form.service.branding', fallback: 'Branding & Design' },
  { key: 'contact.form.service.web',      fallback: 'Web Development' },
  { key: 'contact.form.service.content',  fallback: 'Content Marketing' },
  { key: 'contact.form.service.events',   fallback: 'Events & Activations' },
  { key: 'contact.form.service.other',    fallback: "I'm not sure yet" },
] as const

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

function mapServerError(message: string): Partial<Record<keyof typeof emptyForm, string>> {
  const lower = message.toLowerCase()
  if (lower.includes('name')) {
    return { firstName: message, lastName: message }
  }
  if (lower.includes('email')) {
    return { email: message }
  }
  if (lower.includes('message')) {
    return { message: message }
  }
  return {}
}

const fieldClass =
  'w-full px-4 py-3 rounded-xl border text-[14px] text-brand-charcoal bg-brand-surface dark:bg-brand-navy/50 dark:text-brand-off-white dark:border-brand-light-border outline-none transition-all duration-150 placeholder:text-brand-muted-steel focus-visible:ring-2 focus-visible:ring-brand-blue/25 focus-visible:border-brand-blue'

export function ContactSection() {
  const { t, dir } = useI18n()
  const [state, setState] = useState<FormState>('idle')
  const formStartedRef = useRef(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({})

  function validate() {
    const e: Partial<typeof emptyForm> = {}
    if (!form.firstName.trim()) e.firstName = t('contact.form.error.required', 'Required')
    if (!form.lastName.trim())  e.lastName  = t('contact.form.error.required', 'Required')
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = t('contact.form.error.email', 'Enter a valid email')
    if (!form.message.trim()) {
      e.message = t('contact.form.error.required', 'Required')
    } else if (form.message.trim().length < 10) {
      e.message = t('contact.form.error.messageLength', 'Please provide at least 10 characters')
    }
    return e
  }

  function handleFirstInteraction() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackFormStarted('contact')
  }

  function handleBlur(field: keyof typeof emptyForm) {
    const e = validate()
    setErrors(prev => ({ ...prev, [field]: e[field] }))
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      const firstErrorField = (['firstName', 'lastName', 'email', 'message'] as const).find(field => e[field])
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField)
        if (el) {
          el.focus()
        }
      }
      return
    }
    setState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        if (res.status === 422 && data.error) {
          const mapped = mapServerError(data.error)
          if (Object.keys(mapped).length > 0) {
            setErrors(prev => ({ ...prev, ...mapped }))
            setState('idle')
            return
          }
        }
        throw new Error(data.error ?? 'Request failed')
      }
      setState('success')
      trackFormCompleted('contact')
    } catch {
      setState('error')
    }
  }

  const selectClass = `${fieldClass} cursor-pointer border-brand-input-border`

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-canvas" aria-label="Contact">
      <Container>
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Info panel */}
          <div className="lg:col-span-2">
            <p className={marketingKickerClassName}>
              {t('contact.info.kicker', "Let's Talk")}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
              {t('contact.info.title', 'Free audit')}
            </h2>
            <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-8">
              {t('contact.info.subtitle', 'Tell us about your business. We will review your current marketing and reply with a prioritised plan. Free, no commitment.')}
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-brand-blue/[0.08] dark:bg-brand-blue/15 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-blue" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary/60 dark:text-brand-text-muted mb-0.5">
                    {t('contact.info.emailLabel', 'Email')}
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[14px] text-brand-navy dark:text-brand-off-white hover:text-brand-blue transition-colors"
                  >
                    {t('contact.info.email', site.email)}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-brand-blue/[0.08] dark:bg-brand-blue/15 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-brand-blue" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary/60 dark:text-brand-text-muted mb-0.5">
                    {t('contact.info.phoneLabel', 'Phone')}
                  </p>
                  <a
                    href={`tel:${site.phone}`}
                    dir="ltr"
                    className="text-[14px] text-brand-navy dark:text-brand-off-white hover:text-brand-blue transition-colors tabular-nums [unicode-bidi:isolate]"
                  >
                    {t('contact.info.phone', site.phone)}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-brand-blue/[0.08] dark:bg-brand-blue/15 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-blue" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary/60 dark:text-brand-text-muted mb-0.5">
                    {t('contact.info.addressLabel', 'Office')}
                  </p>
                  <p className="text-[14px] text-brand-navy dark:text-brand-off-white">
                    {t('contact.info.address', `${site.locality}, UAE`)}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-brand-blue/[0.08] dark:bg-brand-blue/15 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-brand-blue" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary/60 dark:text-brand-text-muted mb-0.5">
                    {t('contact.info.hoursLabel', 'Hours')}
                  </p>
                  <p className="text-[14px] text-brand-navy dark:text-brand-off-white">
                    {t('contact.info.hours', 'Sunday to Thursday, 9 AM to 6 PM (EET)')}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-brand-surface rounded-2xl border border-brand-whisper-border dark:border-white/10 p-7 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
              {state === 'error' ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-brand-navy dark:text-brand-off-white mb-2">
                    {t('contact.error.title', 'Something went wrong')}
                  </h3>
                  <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-sm mb-6">
                    {t('contact.error.body', "We couldn't send your message. Please try again or email us directly.")}
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="text-[13px] font-semibold text-brand-blue hover:underline"
                  >
                    {t('contact.error.retry', 'Try again')}
                  </button>
                </div>
              ) : state === 'success' ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-brand-navy dark:text-brand-off-white mb-2">
                    {t('contact.success.title', "We'll be in touch soon")}
                  </h3>
                  <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-sm">
                    {t('contact.success.body', "Thanks for reaching out. We typically respond within one business day.")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {Object.keys(errors).length > 0 && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-brand-error/10 border border-brand-error/20 text-brand-error text-[14px]"
                    >
                      <p className="font-semibold mb-2">{t('contact.form.errorSummary.title', 'Please correct the following errors:')}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {errors.firstName && (
                          <li>
                            <a href="#firstName" className="underline hover:opacity-85">
                              {t('contact.form.firstName', 'First name')}: {errors.firstName}
                            </a>
                          </li>
                        )}
                        {errors.lastName && (
                          <li>
                            <a href="#lastName" className="underline hover:opacity-85">
                              {t('contact.form.lastName', 'Last name')}: {errors.lastName}
                            </a>
                          </li>
                        )}
                        {errors.email && (
                          <li>
                            <a href="#email" className="underline hover:opacity-85">
                              {t('contact.form.email', 'Email address')}: {errors.email}
                            </a>
                          </li>
                        )}
                        {errors.message && (
                          <li>
                            <a href="#message" className="underline hover:opacity-85">
                              {t('contact.form.message', 'Message')}: {errors.message}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="firstName"
                      label={t('contact.form.firstName', 'First name')}
                      type="text"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                      onFocus={handleFirstInteraction}
                      onBlur={() => handleBlur('firstName')}
                      placeholder={t('contact.form.firstNamePlaceholder', 'Yasser')}
                      error={errors.firstName}
                    />
                    <Input
                      id="lastName"
                      label={t('contact.form.lastName', 'Last name')}
                      type="text"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                      onBlur={() => handleBlur('lastName')}
                      placeholder={t('contact.form.lastNamePlaceholder', 'Dorgham')}
                      error={errors.lastName}
                    />
                  </div>

                  <Input
                    id="email"
                    label={t('contact.form.email', 'Email address')}
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    onBlur={() => handleBlur('email')}
                    placeholder={t('contact.form.emailPlaceholder', 'hello@yourbusiness.com')}
                    error={errors.email}
                  />

                  <Input
                    id="phone"
                    label={`${t('contact.form.phone', 'Phone')} (${t('contact.form.optional', 'optional')})`}
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder={t('contact.form.phonePlaceholder', '+20 1xx xxx xxxx')}
                  />

                  <div>
                    <label htmlFor="service" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                      {t('contact.form.serviceLabel', 'What can we help with?')}
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      className={selectClass}
                    >
                      <option value="">{t('contact.form.servicePlaceholder', 'Select a service…')}</option>
                      {SERVICES_OPTIONS.map(opt => (
                        <option key={opt.key} value={opt.fallback}>
                          {t(opt.key, opt.fallback)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                      {t('contact.form.message', 'Message')}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      onBlur={() => handleBlur('message')}
                      placeholder={t('contact.form.messagePlaceholder', 'Tell us about your business and goals…')}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={[
                        fieldClass,
                        'resize-none',
                        errors.message ? 'border-brand-error focus-visible:ring-brand-error/25' : 'border-brand-input-border',
                      ].join(' ')}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-[12px] text-brand-error mt-1.5" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={state === 'submitting'}
                    className="w-full mt-2 gap-2"
                  >
                    {state === 'submitting'
                      ? t('contact.form.sending', 'Sending…')
                      : t('contact.form.submit', 'Send message')}
                    {state !== 'submitting' && <ArrowRight size={16} aria-hidden="true" />}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
