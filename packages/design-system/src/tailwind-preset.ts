import type { Config } from 'tailwindcss'
import tailwindcssRtl from 'tailwindcss-rtl'

export const mbPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display, var(--font-poppins))', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#FFC107',
          'yellow-dark': '#92610B',
          blue: '#2196F3',
          'dark-blue': '#1565C0',
          navy: '#072A6B',
          charcoal: '#0D0F12',
          'deep-charcoal': '#0D0F12',
          'muted-steel': '#9E9E9E',
          secondary: 'var(--brand-text-secondary, #666666)',
          text: 'var(--brand-text, #333333)',
          'text-muted': 'var(--brand-text-muted, #666666)',
          'off-white': 'var(--brand-off-white, #FFFFFF)',
          'light-border': 'var(--brand-light-border, #F5F5F5)',
          'whisper-border': 'var(--brand-whisper-border, #E8E8E8)',
          'input-border': 'var(--brand-input-border, #E0E0E0)',
          canvas: 'var(--brand-canvas, #FAFAFA)',
          surface: 'var(--brand-surface, #FFFFFF)',
          success: '#16A34A',
          'success-bg': '#DCFCE7',
          warning: '#CA8A04',
          'warning-bg': '#FEF9C3',
          error: '#DC2626',
          'error-bg': '#FEE2E2',
          info: '#0369A1',
          'info-bg': '#E0F2FE',
        },
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        'section-xs': 'var(--space-xs)',
        'section-sm': 'var(--space-sm)',
        'section-md': 'var(--space-md)',
        'section-lg': 'var(--space-lg)',
        'section-xl': 'var(--space-xl)',
        'section-2xl': 'var(--space-2xl)',
        'section-3xl': 'var(--space-3xl)',
        'section-4xl': 'var(--space-4xl)',
        'section-5xl': 'var(--space-5xl)',
        128: '32rem',
        144: '36rem',
      },
      fontSize: {
        'display-sm': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.125rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-lg': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5' }],
        'body-md': ['0.9375rem', { lineHeight: '1.6' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        kicker: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [tailwindcssRtl],
}

export default mbPreset
