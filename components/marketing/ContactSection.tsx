'use client'

import { useState } from 'react'
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

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

export function ContactSection() {
  const { t, dir } = useI18n()
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.firstName.trim()) e.firstName = t('contact.form.error.required', 'Required')
    if (!form.lastName.trim())  e.lastName  = t('contact.form.error.required', 'Required')
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = t('contact.form.error.email', 'Enter a valid email')
    if (!form.message.trim()) e.message = t('contact.form.error.required', 'Required')
    return e
  }

  function handleBlur(field: keyof typeof form) {
    const e = validate()
    setErrors(prev => ({ ...prev, [field]: e[field] }))
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setState('success')
    } catch {
      setState('error')
    }
  }

  const inputBase =
    'w-full px-4 py-3 rounded-xl border text-[14px] text-[#333] bg-white outline-none transition-all duration-150 placeholder:text-[#BBB] focus:ring-2 focus:ring-[#2196F3]/25 focus:border-[#2196F3]'
  const inputIdle  = 'border-[#E0E0E0]'
  const inputError = 'border-red-400 focus:ring-red-400/25 focus:border-red-400'

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-[#FAFAFA]" aria-label="Contact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Info panel */}
          <div className="lg:col-span-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
              {t('contact.info.kicker', "Let's Talk")}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#072A6B] leading-tight mb-4">
              {t('contact.info.title', 'Get Your Free Strategy Audit')}
            </h2>
            <p className="text-[15px] text-[#666] leading-relaxed mb-8">
              {t('contact.info.subtitle', "Tell us about your business. We'll review your current marketing and come back with a prioritised plan — no cost, no commitment.")}
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-[#2196F3]/[0.08] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#2196F3]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#999] mb-0.5">
                    {t('contact.info.emailLabel', 'Email')}
                  </p>
                  <a
                    href={`mailto:${t('contact.info.email', 'hello@mediabubble.com')}`}
                    className="text-[14px] text-[#333] hover:text-[#2196F3] transition-colors"
                  >
                    {t('contact.info.email', 'hello@mediabubble.com')}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-[#2196F3]/[0.08] flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#2196F3]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#999] mb-0.5">
                    {t('contact.info.phoneLabel', 'Phone')}
                  </p>
                  <a
                    href={`tel:${t('contact.info.phone', '+20123456789')}`}
                    className="text-[14px] text-[#333] hover:text-[#2196F3] transition-colors"
                  >
                    {t('contact.info.phone', '+20 123 456 7890')}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-[#2196F3]/[0.08] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#2196F3]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#999] mb-0.5">
                    {t('contact.info.addressLabel', 'Office')}
                  </p>
                  <p className="text-[14px] text-[#333]">
                    {t('contact.info.address', 'Hurghada, Red Sea Governorate, Egypt')}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-[#2196F3]/[0.08] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#2196F3]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#999] mb-0.5">
                    {t('contact.info.hoursLabel', 'Hours')}
                  </p>
                  <p className="text-[14px] text-[#333]">
                    {t('contact.info.hours', 'Sunday – Thursday, 9 AM – 6 PM (EET)')}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[#E8E8E8] p-7 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              {state === 'error' ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-[#072A6B] mb-2">
                    {t('contact.error.title', 'Something went wrong')}
                  </h3>
                  <p className="text-[15px] text-[#666] leading-relaxed max-w-sm mb-6">
                    {t('contact.error.body', "We couldn't send your message. Please try again or email us directly.")}
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="text-[13px] font-semibold text-[#2196F3] hover:underline"
                  >
                    {t('contact.error.retry', 'Try again')}
                  </button>
                </div>
              ) : state === 'success' ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-[#072A6B] mb-2">
                    {t('contact.success.title', "We'll be in touch soon")}
                  </h3>
                  <p className="text-[15px] text-[#666] leading-relaxed max-w-sm">
                    {t('contact.success.body', "Thanks for reaching out. We typically respond within one business day.")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#444] mb-1.5" htmlFor="firstName">
                        {t('contact.form.firstName', 'First name')}
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                        onBlur={() => handleBlur('firstName')}
                        placeholder={t('contact.form.firstNamePlaceholder', 'Yasser')}
                        className={`${inputBase} ${errors.firstName ? inputError : inputIdle}`}
                      />
                      {errors.firstName && <p className="mt-1 text-[11px] text-red-500">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#444] mb-1.5" htmlFor="lastName">
                        {t('contact.form.lastName', 'Last name')}
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                        onBlur={() => handleBlur('lastName')}
                        placeholder={t('contact.form.lastNamePlaceholder', 'Dorgham')}
                        className={`${inputBase} ${errors.lastName ? inputError : inputIdle}`}
                      />
                      {errors.lastName && <p className="mt-1 text-[11px] text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-[#444] mb-1.5" htmlFor="email">
                      {t('contact.form.email', 'Email address')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      onBlur={() => handleBlur('email')}
                      placeholder={t('contact.form.emailPlaceholder', 'hello@yourbusiness.com')}
                      className={`${inputBase} ${errors.email ? inputError : inputIdle}`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-[#444] mb-1.5" htmlFor="phone">
                      {t('contact.form.phone', 'Phone')}
                      <span className="text-[#BBB] font-normal ms-1">({t('contact.form.optional', 'optional')})</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder={t('contact.form.phonePlaceholder', '+20 1xx xxx xxxx')}
                      className={`${inputBase} ${inputIdle}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-[#444] mb-1.5" htmlFor="service">
                      {t('contact.form.serviceLabel', "What can we help with?")}
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      className={`${inputBase} ${inputIdle} cursor-pointer`}
                    >
                      <option value="">{t('contact.form.servicePlaceholder', 'Select a service…')}</option>
                      {SERVICES_OPTIONS.map(opt => (
                        <option key={opt.key} value={opt.fallback}>
                          {t(opt.key, opt.fallback)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[12px] font-semibold text-[#444] mb-1.5" htmlFor="message">
                      {t('contact.form.message', 'Message')}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      onBlur={() => handleBlur('message')}
                      placeholder={t('contact.form.messagePlaceholder', "Tell us about your business and goals…")}
                      className={`${inputBase} ${errors.message ? inputError : inputIdle} resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-[#2196F3] text-white hover:bg-[#1976D2] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-md shadow-[#2196F3]/25"
                  >
                    {state === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
                        </svg>
                        {t('contact.form.sending', 'Sending…')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.submit', 'Send Message')}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
