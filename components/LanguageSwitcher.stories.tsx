/**
 * Storybook stories for LanguageSwitcher.
 *
 * To run these, first install Storybook:
 *   npx storybook@latest init
 *
 * Then start with:
 *   npm run storybook
 */

import type { Meta, StoryObj } from '@storybook/react'
import { I18nProvider } from '@/lib/i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      // All stories are wrapped in I18nProvider so the hook has context
      <I18nProvider>
        <div className="flex items-center justify-center min-h-20 p-8 bg-white">
          <Story />
        </div>
      </I18nProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Toggles the UI language between English (LTR) and Arabic/Masri (RTL). ' +
          'Persists the selection to `localStorage` and updates `document.documentElement.dir`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'outline'],
      description: 'Visual style of the button',
    },
    className: {
      control: 'text',
      description: 'Extra Tailwind classes forwarded to the root button',
    },
  },
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default ghost variant — blends into navigation bars */
export const Ghost: Story = {
  args: { variant: 'ghost' },
}

/** Outlined variant — useful on canvas-white backgrounds */
export const Outline: Story = {
  args: { variant: 'outline' },
}

/** Both variants side-by-side for comparison */
export const BothVariants: Story = {
  render: () => (
    <I18nProvider>
      <div className="flex items-center gap-4">
        <LanguageSwitcher variant="ghost" />
        <LanguageSwitcher variant="outline" />
      </div>
    </I18nProvider>
  ),
}

/** As it would appear inside a typical topbar */
export const InTopbar: Story = {
  render: () => (
    <I18nProvider>
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#E8E8E8] bg-white w-full max-w-xl">
        <span className="text-[13px] font-semibold text-[#0D0F12]">MediaBubble</span>
        <LanguageSwitcher variant="ghost" />
      </div>
    </I18nProvider>
  ),
}

/** On a dark sidebar surface */
export const OnDarkSurface: Story = {
  render: () => (
    <I18nProvider>
      <div className="flex items-center justify-center p-6 bg-[#0D0F12] rounded-xl">
        {/* Override colours with className for dark bg usage */}
        <LanguageSwitcher
          variant="ghost"
          className="text-white/50 hover:text-white hover:bg-white/10"
        />
      </div>
    </I18nProvider>
  ),
}
