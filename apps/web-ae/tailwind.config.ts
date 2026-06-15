import type { Config } from 'tailwindcss'
import { mbPreset } from '../../packages/design-system/src/tailwind-preset'

const config: Config = {
  presets: [mbPreset as Config],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/design-system/src/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate')],
}

export default config
