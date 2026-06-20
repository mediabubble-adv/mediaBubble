import {
  computeInvoiceTotals,
  documentNumber,
  lineAmount,
  roundMoney,
  sumLineItems,
} from './billing'

describe('billing helpers', () => {
  it('computes line amounts and invoice totals with VAT', () => {
    const items = [
      { description: 'Retainer', quantity: 1, unit_price: 10_000 },
      { description: 'Ads management', quantity: 2, unit_price: 2_500 },
    ]
    expect(lineAmount(2, 2_500)).toBe(5_000)
    expect(sumLineItems(items)).toBe(15_000)
    const totals = computeInvoiceTotals(items, 10, 14)
    expect(totals.discount_amount).toBe(1_500)
    expect(totals.vat_amount).toBe(1_890)
    expect(totals.total).toBe(15_390)
    expect(roundMoney(10.126)).toBe(10.13)
  })

  it('formats document numbers', () => {
    expect(documentNumber('INV', 3)).toMatch(/^INV-\d{4}-0003$/)
    expect(documentNumber('QUO', 12)).toMatch(/^QUO-\d{4}-0012$/)
  })
})
