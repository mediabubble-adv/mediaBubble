'use client'

import * as React from 'react'
import {
  buttonSizeClasses,
  buttonVariantClasses,
  type ButtonSize,
  type ButtonVariant,
} from './button-styles'

export type { ButtonSize, ButtonVariant } from './button-styles'
export { getButtonClasses, buttonSizeClasses, buttonVariantClasses } from './button-styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-ripple=""
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center font-semibold whitespace-nowrap',
        'transition-all duration-150 active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin -ms-0.5 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
