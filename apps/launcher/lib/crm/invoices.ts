// Invoice row helpers for CRM API responses.

import type { invoice_items, invoices, clients } from '@prisma/client'

export interface InvoiceItemRow {
  id: string
  description: string
  quantity: number
  unit_price: number
  amount: number
  task_id: string | null
}

export interface InvoiceRow {
  id: string
  invoice_number: string
  client_id: string
  client_name: string
  status: string | null
  currency: string | null
  subtotal: number
  discount_percentage: number | null
  discount_amount: number | null
  vat_percentage: number | null
  vat_amount: number
  total: number
  due_date: string
  sent_at: string | null
  paid_at: string | null
  created_by: string
  created_at: string
  updated_at: string
  items: InvoiceItemRow[]
}

type InvoiceWithRelations = invoices & {
  clients: Pick<clients, 'name'>
  invoice_items: invoice_items[]
}

function toNumber(value: { toNumber(): number } | number | null | undefined): number | null {
  if (value === null || value === undefined) return null
  return typeof value === 'number' ? value : value.toNumber()
}

export function serializeInvoiceItem(row: invoice_items): InvoiceItemRow {
  return {
    id: row.id,
    description: row.description,
    quantity: Number(row.quantity),
    unit_price: Number(row.unit_price),
    amount: Number(row.amount),
    task_id: row.task_id,
  }
}

export function serializeInvoice(row: InvoiceWithRelations): InvoiceRow {
  return {
    id: row.id,
    invoice_number: row.invoice_number,
    client_id: row.client_id,
    client_name: row.clients.name,
    status: row.status,
    currency: row.currency,
    subtotal: Number(row.subtotal),
    discount_percentage: toNumber(row.discount_percentage),
    discount_amount: toNumber(row.discount_amount),
    vat_percentage: toNumber(row.vat_percentage),
    vat_amount: Number(row.vat_amount),
    total: Number(row.total),
    due_date: row.due_date.toISOString().slice(0, 10),
    sent_at: row.sent_at?.toISOString() ?? null,
    paid_at: row.paid_at?.toISOString() ?? null,
    created_by: row.created_by,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    items: row.invoice_items.map(serializeInvoiceItem),
  }
}

export const invoiceInclude = {
  clients: { select: { name: true } },
  invoice_items: { orderBy: { created_at: 'asc' as const } },
} as const
