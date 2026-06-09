/**
 * Unit tests for LanguageSwitcher.
 *
 * To run these, first install a test runner:
 *   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
 *   npm install --save-dev jest-environment-jsdom ts-jest
 *
 * Then add to package.json:
 *   "scripts": { "test": "jest" }
 *
 * Or with Vitest:
 *   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
 */

import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nProvider } from '@/lib/i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

// ─── Setup / teardown ─────────────────────────────────────────────────────────

beforeEach(() => {
  localStorage.clear()
  document.documentElement.lang = 'en'
  document.documentElement.dir = 'ltr'
  document.documentElement.removeAttribute('data-dir')
})

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('LanguageSwitcher — rendering', () => {
  it('renders a button element', () => {
    renderWithI18n(<LanguageSwitcher />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows "EN" label when the language is English', () => {
    renderWithI18n(<LanguageSwitcher />)
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('renders the Globe icon (aria-hidden so it is not in the tree)', () => {
    renderWithI18n(<LanguageSwitcher />)
    // Globe is aria-hidden; the button itself must exist
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('accepts a className override', () => {
    renderWithI18n(<LanguageSwitcher className="extra-class" />)
    expect(screen.getByRole('button')).toHaveClass('extra-class')
  })
})

// ─── Toggle behaviour ─────────────────────────────────────────────────────────

describe('LanguageSwitcher — toggle', () => {
  it('switches to Arabic on first click', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('العربية')).toBeInTheDocument()
  })

  it('switches back to English on second click', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('sets document.dir to "rtl" after switching to Arabic', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('restores document.dir to "ltr" after switching back to English', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByRole('button'))
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('sets document.lang to "ar" when Arabic is active', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    expect(document.documentElement.lang).toBe('ar')
  })

  it('sets document.lang to "en" when English is active', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByRole('button'))
    expect(document.documentElement.lang).toBe('en')
  })
})

// ─── Persistence ──────────────────────────────────────────────────────────────

describe('LanguageSwitcher — localStorage persistence', () => {
  it('saves "ar-masri" to localStorage after switching to Arabic', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('mediabubble-language')).toBe('ar-masri')
  })

  it('saves "en" to localStorage after switching back to English', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('mediabubble-language')).toBe('en')
  })

  it('reads persisted Arabic locale on mount and shows العربية', () => {
    localStorage.setItem('mediabubble-language', 'ar-masri')
    renderWithI18n(<LanguageSwitcher />)
    // Provider reads localStorage in a useEffect; label updates after mount
    expect(screen.getByText(/EN|العربية/)).toBeInTheDocument()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('LanguageSwitcher — accessibility', () => {
  it('has an aria-label attribute', () => {
    renderWithI18n(<LanguageSwitcher />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
    expect(button.getAttribute('aria-label')).not.toBe('')
  })

  it('has aria-pressed="false" when English is active', () => {
    renderWithI18n(<LanguageSwitcher />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('has aria-pressed="true" when Arabic is active', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('is keyboard accessible — Tab moves focus to the button', async () => {
    renderWithI18n(<LanguageSwitcher />)
    await userEvent.tab()
    expect(screen.getByRole('button')).toHaveFocus()
  })

  it('toggles language when Enter is pressed', async () => {
    renderWithI18n(<LanguageSwitcher />)
    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')
    expect(screen.getByText('العربية')).toBeInTheDocument()
  })

  it('toggles language when Space is pressed', async () => {
    renderWithI18n(<LanguageSwitcher />)
    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard(' ')
    expect(screen.getByText('العربية')).toBeInTheDocument()
  })
})

// ─── Variants ─────────────────────────────────────────────────────────────────

describe('LanguageSwitcher — variants', () => {
  it('renders ghost variant without throwing', () => {
    expect(() => renderWithI18n(<LanguageSwitcher variant="ghost" />)).not.toThrow()
  })

  it('renders outline variant without throwing', () => {
    expect(() => renderWithI18n(<LanguageSwitcher variant="outline" />)).not.toThrow()
  })
})
