// Shared line-item math for CRM invoices and quotations.

export interface LineItemInput {
  description: string
  quantity: number
  unit_price: number
}

export interface InvoiceTotals {
  subtotal: number
  discount_amount: number
  vat_amount: number
  total: number
}

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}

export function lineAmount(quantity: number, unitPrice: number): number {
  return roundMoney(quantity * unitPrice)
}

export function sumLineItems(items: LineItemInput[]): number {
  return roundMoney(items.reduce((sum, item) => sum + lineAmount(item.quantity, item.unit_price), 0))
}

export function computeInvoiceTotals(
  items: LineItemInput[],
  discountPercentage = 0,
  vatPercentage = 14,
): InvoiceTotals {
  const subtotal = sumLineItems(items)
  const discount_amount = roundMoney(subtotal * (discountPercentage / 100))
  const taxable = roundMoney(subtotal - discount_amount)
  const vat_amount = roundMoney(taxable * (vatPercentage / 100))
  const total = roundMoney(taxable + vat_amount)
  return { subtotal, discount_amount, vat_amount, total }
}

export function documentNumber(prefix: 'INV' | 'QUO' | 'PRP', sequence: number): string {
  const year = new Date().getUTCFullYear()
  return `${prefix}-${year}-${String(sequence).padStart(4, '0')}`
}
