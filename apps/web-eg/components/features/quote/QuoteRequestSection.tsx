'use client'

import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { resolveMarketSiteConfig, trackFormCompleted, trackFormStarted } from '@mediabubble/shared/client'
import { Button, Input } from '@mediabubble/design-system'
import { Container } from '@/components/layout/Container'

const site = resolveMarketSiteConfig('eg')

const SERVICES_OPTIONS = [
  { key: 'quote.form.service.seo',      fallback: 'SEO & Organic Growth' },
  { key: 'quote.form.service.ppc',      fallback: 'Paid Advertising' },
  { key: 'quote.form.service.social',   fallback: 'Social Media Marketing' },
  { key: 'quote.form.service.branding', fallback: 'Branding & Design' },
  { key: 'quote.form.service.web',      fallback: 'Web Development' },
  { key: 'quote.form.service.content',  fallback: 'Content Marketing' },
  { key: 'quote.form.service.events',   fallback: 'Events & Activations' },
  { key: 'quote.form.service.multiple', fallback: 'Multiple Services / Custom Package' },
] as const

const BUDGET_OPTIONS = [
  { value: 'under_5k',   label: 'Under EGP 5,000' },
  { value: '5k_10k',     label: 'EGP 5,000 - 10,000' },
  { value: '10k_25k',    label: 'EGP 10,000 - 25,000' },
  { value: '25k_50k',    label: 'EGP 25,000 - 50,000' },
  { value: 'over_50k',   label: 'EGP 50,000+' },
] as const

const TIMELINE_OPTIONS = [
  { value: 'urgent',    label: 'ASAP (within 2 weeks)' },
  { value: '1_month',   label: '1 month' },
  { value: '2_3_months',label: '2-3 months' },
  { value: 'flexible',  label: 'Flexible / Not sure' },
] as const

const COMPANY_SIZE_OPTIONS = [
  { value: 'startup',      label: 'Startup (1-10 people)' },
  { value: 'small_team',   label: 'Small Team (11-50 people)' },
  { value: 'medium',       label: 'Medium (51-200 people)' },
  { value: 'large',        label: 'Large (200+ people)' },
] as const

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type FormStep = 1 | 2 | 3

const emptyForm = {
  // Step 1: Basic info
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  companySize: '',

  // Step 2: Project details
  service: '',
  budget: '',
  timeline: '',
  currentSituation: '',

  // Step 3: Additional info
  goals: '',
  competitors: '',
  websiteUrl: '',
  additionalRequirements: '',
}

type QuoteForm = typeof emptyForm

function mapServerError(message: string): Partial<Record<keyof QuoteForm, string>> {
  const lower = message.toLowerCase()
  if (lower.includes('email')) {
    return { email: message }
  }
  if (lower.includes('name')) {
    return { firstName: message, lastName: message }
  }
  if (lower.includes('company')) {
    return { companyName: message }
  }
  return {}
}

const fieldClass =
  'w-full px-4 py-3 rounded-xl border text-[14px] text-brand-charcoal bg-brand-surface dark:bg-brand-navy/50 dark:text-brand-off-white dark:border-brand-light-border outline-none transition-all duration-150 placeholder:text-brand-muted-steel focus-visible:ring-2 focus-visible:ring-brand-blue/25 focus-visible:border-brand-blue'

const selectClass = `${fieldClass} cursor-pointer border-brand-input-border`

export function QuoteRequestSection() {
  const { t, dir } = useI18n()
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [state, setState] = useState<FormState>('idle')
  const formStartedRef = useRef(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<QuoteForm>>({})

  function validateStep(step: FormStep): Partial<QuoteForm> {
    const e: Partial<QuoteForm> = {}

    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = t('quote.form.error.required', 'Required')
      if (!form.lastName.trim()) e.lastName = t('quote.form.error.required', 'Required')
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        e.email = t('quote.form.error.email', 'Enter a valid email')
      if (!form.phone.trim()) e.phone = t('quote.form.error.required', 'Required')
      if (!form.companyName.trim()) e.companyName = t('quote.form.error.required', 'Required')
      if (!form.companySize) e.companySize = t('quote.form.error.required', 'Required')
    } else if (step === 2) {
      if (!form.service) e.service = t('quote.form.error.required', 'Required')
      if (!form.budget) e.budget = t('quote.form.error.required', 'Required')
      if (!form.timeline) e.timeline = t('quote.form.error.required', 'Required')
      if (!form.currentSituation.trim()) e.currentSituation = t('quote.form.error.required', 'Required')
    } else if (step === 3) {
      if (!form.goals.trim()) e.goals = t('quote.form.error.required', 'Required')
    }

    return e
  }

  function handleFirstInteraction() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackFormStarted('quote')
  }

  function handleNextStep() {
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...stepErrors }))
      return
    }
    setErrors({})
    setCurrentStep((currentStep + 1) as FormStep)
  }

  function handlePrevStep() {
    setErrors({})
    setCurrentStep((currentStep - 1) as FormStep)
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const finalErrors = validateStep(3)
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors)
      return
    }

    setState('submitting')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
      trackFormCompleted('quote')
    } catch {
      setState('error')
    }
  }

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-canvas" aria-label="Quote Request">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className={marketingKickerClassName}>
              {t('quote.section.kicker', 'Get Started')}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
              {t('quote.section.title', 'Request a Custom Quote')}
            </h2>
            <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-2xl mx-auto">
              {t('quote.section.subtitle', "Tell us about your project. We'll analyze your needs and provide a detailed proposal within 24-48 hours.")}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-brand-surface rounded-2xl border border-brand-whisper-border dark:border-white/10 p-7 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
            {state === 'error' ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-display text-[22px] font-bold text-brand-navy dark:text-brand-off-white mb-2">
                  {t('quote.error.title', 'Something went wrong')}
                </h3>
                <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-sm mb-6">
                  {t('quote.error.body', "We couldn't process your request. Please try again.")}
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="text-[13px] font-semibold text-brand-blue hover:underline"
                >
                  {t('quote.error.retry', 'Try again')}
                </button>
              </div>
            ) : state === 'success' ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7 text-green-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[22px] font-bold text-brand-navy dark:text-brand-off-white mb-2">
                  {t('quote.success.title', 'Thank you!')}
                </h3>
                <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-sm mb-4">
                  {t('quote.success.body', 'We received your quote request. Our team will review your information and send you a customized proposal within 24-48 hours.')}
                </p>
                <p className="text-[13px] text-brand-secondary dark:text-brand-text-muted">
                  {t('quote.success.email', `We'll send it to ${form.email}`)}
                </p>
              </div>
            ) : (
              <>
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[13px] transition-all ${
                          step < currentStep
                            ? 'bg-green-500 text-white'
                            : step === currentStep
                            ? 'bg-brand-blue text-white'
                            : 'bg-brand-whisper text-brand-secondary dark:bg-white/10 dark:text-brand-text-muted'
                        }`}
                      >
                        {step < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded-full ${
                            step < currentStep
                              ? 'bg-green-500'
                              : 'bg-brand-whisper dark:bg-white/10'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleNextStep() }}>
                    <h3 className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white mb-6">
                      {t('quote.step1.title', 'About You')}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        id="firstName"
                        label={t('quote.form.firstName', 'First name')}
                        type="text"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                        onFocus={handleFirstInteraction}
                        placeholder="Yasser"
                        error={errors.firstName}
                      />
                      <Input
                        id="lastName"
                        label={t('quote.form.lastName', 'Last name')}
                        type="text"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                        placeholder="Dorgham"
                        error={errors.lastName}
                      />
                    </div>

                    <Input
                      id="email"
                      label={t('quote.form.email', 'Email address')}
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="hello@yourbusiness.com"
                      error={errors.email}
                    />

                    <Input
                      id="phone"
                      label={t('quote.form.phone', 'Phone number')}
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+20 1xx xxx xxxx"
                      error={errors.phone}
                    />

                    <Input
                      id="companyName"
                      label={t('quote.form.companyName', 'Company name')}
                      type="text"
                      autoComplete="organization"
                      value={form.companyName}
                      onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))}
                      placeholder="Your Company Name"
                      error={errors.companyName}
                    />

                    <div>
                      <label htmlFor="companySize" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.companySize', 'Company size')}
                      </label>
                      <select
                        id="companySize"
                        value={form.companySize}
                        onChange={e => setForm(p => ({ ...p, companySize: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">{t('quote.form.selectSize', 'Select…')}</option>
                        {COMPANY_SIZE_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.companySize && (
                        <p className="text-[12px] text-brand-error mt-1.5">{errors.companySize}</p>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="flex-1 gap-2"
                      >
                        {t('quote.form.next', 'Next')} <ArrowRight size={16} />
                      </Button>
                    </div>
                  </form>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleNextStep() }}>
                    <h3 className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white mb-6">
                      {t('quote.step2.title', 'Project Details')}
                    </h3>

                    <div>
                      <label htmlFor="service" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.service', 'What service are you interested in?')}
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">{t('quote.form.selectService', 'Select a service…')}</option>
                        {SERVICES_OPTIONS.map(opt => (
                          <option key={opt.key} value={opt.fallback}>
                            {t(opt.key, opt.fallback)}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-[12px] text-brand-error mt-1.5">{errors.service}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.budget', 'Budget range')}
                      </label>
                      <select
                        id="budget"
                        value={form.budget}
                        onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">{t('quote.form.selectBudget', 'Select budget…')}</option>
                        {BUDGET_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="text-[12px] text-brand-error mt-1.5">{errors.budget}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.timeline', 'When do you want to start?')}
                      </label>
                      <select
                        id="timeline"
                        value={form.timeline}
                        onChange={e => setForm(p => ({ ...p, timeline: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">{t('quote.form.selectTimeline', 'Select timeline…')}</option>
                        {TIMELINE_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.timeline && (
                        <p className="text-[12px] text-brand-error mt-1.5">{errors.timeline}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="currentSituation" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.currentSituation', 'What is your current situation?')}
                      </label>
                      <textarea
                        id="currentSituation"
                        rows={4}
                        value={form.currentSituation}
                        onChange={e => setForm(p => ({ ...p, currentSituation: e.target.value }))}
                        placeholder={t('quote.form.currentSituationPlaceholder', 'Describe your current marketing efforts, challenges, and what brings you here…')}
                        className={`${fieldClass} resize-none border-brand-input-border`}
                      />
                      {errors.currentSituation && (
                        <p className="text-[12px] text-brand-error mt-1.5">{errors.currentSituation}</p>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={handlePrevStep}
                        className="flex-1"
                      >
                        {t('quote.form.back', 'Back')}
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="flex-1 gap-2"
                      >
                        {t('quote.form.next', 'Next')} <ArrowRight size={16} />
                      </Button>
                    </div>
                  </form>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white mb-6">
                      {t('quote.step3.title', 'Your Goals & Requirements')}
                    </h3>

                    <div>
                      <label htmlFor="goals" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.goals', 'What are your main business goals?')}
                      </label>
                      <textarea
                        id="goals"
                        rows={4}
                        value={form.goals}
                        onChange={e => setForm(p => ({ ...p, goals: e.target.value }))}
                        placeholder={t('quote.form.goalsPlaceholder', 'E.g., increase sales by 50%, build brand awareness, improve customer retention…')}
                        className={`${fieldClass} resize-none border-brand-input-border`}
                      />
                      {errors.goals && (
                        <p className="text-[12px] text-brand-error mt-1.5">{errors.goals}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="competitors" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.competitors', 'Who are your main competitors?')} ({t('quote.form.optional', 'optional')})
                      </label>
                      <input
                        id="competitors"
                        type="text"
                        value={form.competitors}
                        onChange={e => setForm(p => ({ ...p, competitors: e.target.value }))}
                        placeholder="Company A, Company B, Company C…"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="websiteUrl" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.website', 'Your website URL')} ({t('quote.form.optional', 'optional')})
                      </label>
                      <input
                        id="websiteUrl"
                        type="url"
                        value={form.websiteUrl}
                        onChange={e => setForm(p => ({ ...p, websiteUrl: e.target.value }))}
                        placeholder="https://yourbusiness.com"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="additionalRequirements" className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
                        {t('quote.form.additional', 'Additional requirements or questions')} ({t('quote.form.optional', 'optional')})
                      </label>
                      <textarea
                        id="additionalRequirements"
                        rows={3}
                        value={form.additionalRequirements}
                        onChange={e => setForm(p => ({ ...p, additionalRequirements: e.target.value }))}
                        placeholder={t('quote.form.additionalPlaceholder', 'Anything else we should know?…')}
                        className={`${fieldClass} resize-none border-brand-input-border`}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={handlePrevStep}
                        className="flex-1"
                      >
                        {t('quote.form.back', 'Back')}
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={state === 'submitting'}
                        className="flex-1 gap-2"
                      >
                        {state === 'submitting'
                          ? t('quote.form.submitting', 'Submitting…')
                          : t('quote.form.submit', 'Get My Quote')}
                        {state !== 'submitting' && <ArrowRight size={16} aria-hidden="true" />}
                      </Button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
