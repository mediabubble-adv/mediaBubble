// Quotation row helpers for CRM API responses.

import type { clients, quotation_items, quotations } from '@prisma/client'

export interface QuotationItemRow {
  id: string
  description: string
  quantity: number
  unit_price: number
  amount: number
}

export interface QuotationRow {
  id: string
  quotation_number: string
  client_id: string
  client_name: string
  status: string | null
  currency: string | null
  subtotal: number
  total: number
  valid_until: string | null
  converted_to_invoice_id: string | null
  created_by: string
  created_at: string
  updated_at: string
  items: QuotationItemRow[]
}

type QuotationWithRelations = quotations & {
  clients: Pick<clients, 'name'>
  quotation_items: quotation_items[]
}

export function serializeQuotationItem(row: quotation_items): QuotationItemRow {
  return {
    id: row.id,
    description: row.description,
    quantity: Number(row.quantity),
    unit_price: Number(row.unit_price),
    amount: Number(row.amount),
  }
}

export function serializeQuotation(row: QuotationWithRelations): QuotationRow {
  return {
    id: row.id,
    quotation_number: row.quotation_number,
    client_id: row.client_id,
    client_name: row.clients.name,
    status: row.status,
    currency: row.currency,
    subtotal: Number(row.subtotal),
    total: Number(row.total),
    valid_until: row.valid_until?.toISOString().slice(0, 10) ?? null,
    converted_to_invoice_id: row.converted_to_invoice_id,
    created_by: row.created_by,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    items: row.quotation_items.map(serializeQuotationItem),
  }
}

export const quotationInclude = {
  clients: { select: { name: true } },
  quotation_items: { orderBy: { created_at: 'asc' as const } },
} as const
