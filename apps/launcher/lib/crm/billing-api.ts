// Shared helpers for CRM invoice/quotation API routes.

import type { Prisma } from '@prisma/client'
import { documentNumber, computeInvoiceTotals, lineAmount, sumLineItems } from '@/lib/crm/billing'
import type { LineItemInput } from '@/lib/crm/billing'
import { prisma } from '@/lib/db/prisma'

export async function nextDocumentNumber(prefix: 'INV' | 'QUO'): Promise<string> {
  const count =
    prefix === 'INV'
      ? await prisma.invoices.count()
      : await prisma.quotations.count()
  return documentNumber(prefix, count + 1)
}

export async function assertActiveClient(clientId: string): Promise<boolean> {
  const client = await prisma.clients.findFirst({
    where: { id: clientId, deleted_at: null },
    select: { id: true },
  })
  return Boolean(client)
}

export function buildInvoiceItemRows(
  items: LineItemInput[],
): Prisma.invoice_itemsCreateWithoutInvoicesInput[] {
  return items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unit_price,
    amount: lineAmount(item.quantity, item.unit_price),
  }))
}

export function buildQuotationItemRows(
  items: LineItemInput[],
): Prisma.quotation_itemsCreateWithoutQuotationsInput[] {
  return items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unit_price,
    amount: lineAmount(item.quantity, item.unit_price),
  }))
}

export { computeInvoiceTotals, sumLineItems, lineAmount }
