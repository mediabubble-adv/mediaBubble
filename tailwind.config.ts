import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          yellow: '#FFC107',
          'yellow-dark': '#92610B',
          blue: '#2196F3',
          'dark-blue': '#1565C0',
          navy: '#072A6B',
          charcoal: '#333333',
          'deep-charcoal': '#0D0F12',
          'muted-steel': '#9E9E9E',
          'secondary': '#666666',
          'light-border': '#F5F5F5',
          'whisper-border': '#E8E8E8',
          'input-border': '#E0E0E0',
          canvas: '#FAFAFA',
          surface: '#FFFFFF',
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
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
} satisfies Config

export default config
