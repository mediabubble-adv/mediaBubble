'use client'

import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={[
          'w-full px-4 py-3 rounded-xl border text-body-md text-brand-charcoal bg-brand-surface',
          'dark:bg-brand-navy/50 dark:text-brand-off-white dark:border-brand-light-border',
          'outline-none transition-all duration-150 placeholder:text-brand-muted-steel',
          'focus-visible:ring-2 focus-visible:ring-brand-blue/25 focus-visible:border-brand-blue',
          error
            ? 'border-brand-error focus-visible:ring-brand-error/25 focus-visible:border-brand-error'
            : 'border-brand-input-border',
          className,
        ].join(' ')}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-[12px] text-brand-error mt-1.5" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-[12px] text-brand-secondary mt-1.5">
          {hint}
        </p>
      )}
    </div>
  )
}
