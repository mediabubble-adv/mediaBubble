// Currency model for Finance. Amounts are stored per-transaction in their own
// currency; the UI converts everything to a chosen display currency via a
// static rate table (live FX is a later-phase concern). Rates are units per 1
// USD, so convert() routes through USD as the pivot.

export interface Currency {
  symbol: string
  label: string
  /** Units of this currency per 1 USD. */
  perUsd: number
}

export const CURRENCIES = {
  EGP: { symbol: 'ج.م', label: 'Egyptian Pound', perUsd: 48 },
  AED: { symbol: 'د.إ', label: 'UAE Dirham', perUsd: 3.6725 },
  USD: { symbol: '$', label: 'US Dollar', perUsd: 1 },
} as const satisfies Record<string, Currency>

export type CurrencyCode = keyof typeof CURRENCIES

export function isCurrency(value: unknown): value is CurrencyCode {
  return typeof value === 'string' && value in CURRENCIES
}

/** Convert an amount between currencies via the USD pivot. */
export function convert(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return amount
  const usd = amount / CURRENCIES[from].perUsd
  return usd * CURRENCIES[to].perUsd
}

/** Symbol-prefixed amount with grouped thousands and two decimals. */
export function formatMoney(amount: number, currency: CurrencyCode): string {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${CURRENCIES[currency].symbol}${formatted}`
}
