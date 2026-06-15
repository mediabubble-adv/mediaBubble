import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'

/* ─── Card (primitive) ────────────────────────────────────────────────────── */

export interface CardProps {
  children: React.ReactNode
  hover?: boolean
  padded?: boolean
  className?: string
}

export function Card({ children, hover = false, padded = true, className = '' }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-brand-whisper-border bg-brand-surface',
        'dark:bg-brand-navy/40 dark:border-brand-light-border',
        padded ? 'p-6' : '',
        hover
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-navy/[0.08] hover:border-brand-light-border'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

/* ─── ServiceCard ─────────────────────────────────────────────────────────── */

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  className?: string
}

export function ServiceCard({ icon, title, description, href, className = '' }: ServiceCardProps) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      {...(href ? { href } : {})}
      className={[
        'group relative bg-brand-surface rounded-2xl p-6 border border-brand-whisper-border',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/[0.08]',
        'dark:hover:shadow-brand-navy/20',
        href ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-navy/[0.06] mb-4 text-brand-navy group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-200">
        {icon}
      </div>
      <h3 className="text-[17px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">{title}</h3>
      <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">{description}</p>
    </Tag>
  )
}

/* ─── FeatureCard ─────────────────────────────────────────────────────────── */

interface FeatureCardProps {
  feature: string
  description?: string
  className?: string
}

export function FeatureCard({ feature, description, className = '' }: FeatureCardProps) {
  return (
    <div className={['flex gap-3', className].join(' ')}>
      <CheckCircle2 size={20} className="text-brand-yellow mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white">{feature}</p>
        {description && (
          <p className="text-[13px] text-brand-secondary dark:text-brand-text-muted mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}

/* ─── TestimonialCard ─────────────────────────────────────────────────────── */

interface TestimonialCardProps {
  quote: string
  author: string
  title?: string
  company?: string
  avatarUrl?: string
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  title,
  company,
  avatarUrl,
  className = '',
}: TestimonialCardProps) {
  return (
    <div
      className={[
        'bg-brand-surface rounded-2xl p-6 border border-brand-whisper-border',
        'shadow-sm hover:shadow-md transition-shadow duration-200',
        className,
      ].join(' ')}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFC107" aria-hidden="true">
            <path d="M7 1l1.545 4.756H13.5L9.477 8.488l1.545 4.756L7 10.512l-4.023 2.732 1.546-4.756L.5 5.756h4.955z" />
          </svg>
        ))}
      </div>

      <blockquote>
        <p className="text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-5">"{quote}"</p>
        <footer className="flex items-center gap-3">
          {avatarUrl ? (
            <img src={avatarUrl} alt={author} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-[13px] font-semibold">
              {author.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-[14px] font-semibold text-brand-navy dark:text-brand-off-white">{author}</p>
            {(title || company) && (
              <p className="text-[12px] text-brand-secondary dark:text-brand-text-muted">{[title, company].filter(Boolean).join(', ')}</p>
            )}
          </div>
        </footer>
      </blockquote>
    </div>
  )
}

/* ─── CaseStudyCard ───────────────────────────────────────────────────────── */

interface CaseStudyCardProps {
  metric: string
  metricLabel: string
  description: string
  company: string
  href?: string
  className?: string
}

export function CaseStudyCard({
  metric,
  metricLabel,
  description,
  company,
  href,
  className = '',
}: CaseStudyCardProps) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      {...(href ? { href } : {})}
      className={[
        'group relative bg-brand-navy rounded-2xl p-6 overflow-hidden',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/30',
        href ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" aria-hidden="true" />

      <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">{company}</p>
      <div className="mb-4">
        <span className="text-[42px] font-bold text-brand-yellow leading-none">{metric}</span>
        <p className="text-[13px] font-medium text-white/70 mt-1">{metricLabel}</p>
      </div>
      <p className="text-[14px] text-white/60 leading-relaxed">{description}</p>
      {href && (
        <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          View Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2.5 7h9m-4-4.5L11.5 7l-4 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </Tag>
  )
}
