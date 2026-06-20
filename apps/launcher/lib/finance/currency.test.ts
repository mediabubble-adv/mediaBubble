import { CURRENCIES, isCurrency, convert, formatMoney } from './currency'

describe('currencies', () => {
  it('exposes EGP, AED and USD with symbols', () => {
    expect(Object.keys(CURRENCIES)).toEqual(['EGP', 'AED', 'USD'])
    expect(CURRENCIES.EGP.symbol).toBe('ج.م')
    expect(CURRENCIES.AED.symbol).toBe('د.إ')
    expect(CURRENCIES.USD.symbol).toBe('$')
  })

  it('guards known currency codes', () => {
    expect(isCurrency('USD')).toBe(true)
    expect(isCurrency('GBP')).toBe(false)
  })
})

describe('convert', () => {
  it('returns the same amount for a same-currency conversion', () => {
    expect(convert(100, 'USD', 'USD')).toBe(100)
  })

  it('converts USD to EGP via the rate table', () => {
    // USD->EGP at the table rate; assert via round-trip to avoid pinning a rate.
    const egp = convert(10, 'USD', 'EGP')
    expect(egp).toBeGreaterThan(10)
    expect(convert(egp, 'EGP', 'USD')).toBeCloseTo(10, 6)
  })
})

describe('formatMoney', () => {
  it('prefixes the currency symbol and groups thousands', () => {
    expect(formatMoney(1234.5, 'USD')).toBe('$1,234.50')
  })

  it('uses the EGP symbol', () => {
    expect(formatMoney(50, 'EGP')).toBe('ج.م50.00')
  })
})
