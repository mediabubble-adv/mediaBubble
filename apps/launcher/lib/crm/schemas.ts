// Zod request schemas for CRM endpoints.

import { z } from 'zod'

export const CLIENT_STATUSES = ['active', 'inactive'] as const
export const CONTRACT_TYPES = ['retainer', 'hourly', 'project'] as const

const email = z.string().trim().email().max(255).optional().nullable()
const phone = z.string().trim().max(50).optional().nullable()

export const createClientSchema = z.object({
  name: z.string().trim().min(1).max(255),
  primary_contact_name: z.string().trim().max(255).optional().nullable(),
  primary_contact_email: email,
  primary_contact_phone: phone,
  contract_type: z.enum(CONTRACT_TYPES).optional(),
  monthly_budget: z.coerce.number().nonnegative().max(999_999_999).optional().nullable(),
  vat_number: z.string().trim().max(100).optional().nullable(),
  status: z.enum(CLIENT_STATUSES).optional(),
  brand_assets_url: z.string().trim().url().max(2_000).optional().nullable(),
})

export const updateClientSchema = createClientSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listClientsQuerySchema = z.object({
  status: z.enum(CLIENT_STATUSES).optional(),
  q: z.string().trim().max(100).optional(),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
export type ListClientsQuery = z.infer<typeof listClientsQuerySchema>

export const CURRENCIES = ['EGP', 'AED', 'USD'] as const
export const INVOICE_STATUSES = ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'] as const
export const QUOTATION_STATUSES = ['Draft', 'Sent', 'Approved', 'Expired', 'Revised'] as const

const lineItemSchema = z.object({
  description: z.string().trim().min(1).max(2_000),
  quantity: z.coerce.number().positive().max(999_999),
  unit_price: z.coerce.number().nonnegative().max(999_999_999),
})

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')

export const createInvoiceSchema = z.object({
  client_id: z.string().uuid(),
  currency: z.enum(CURRENCIES).optional(),
  discount_percentage: z.coerce.number().min(0).max(100).optional(),
  vat_percentage: z.coerce.number().min(0).max(100).optional(),
  due_date: isoDate,
  status: z.enum(INVOICE_STATUSES).optional(),
  items: z.array(lineItemSchema).min(1).max(50),
})

export const updateInvoiceSchema = z
  .object({
    status: z.enum(INVOICE_STATUSES).optional(),
    due_date: isoDate.optional(),
    discount_percentage: z.coerce.number().min(0).max(100).optional(),
    vat_percentage: z.coerce.number().min(0).max(100).optional(),
    items: z.array(lineItemSchema).min(1).max(50).optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listInvoicesQuerySchema = z.object({
  client_id: z.string().uuid().optional(),
  status: z.enum(INVOICE_STATUSES).optional(),
})

export const createQuotationSchema = z.object({
  client_id: z.string().uuid(),
  currency: z.enum(CURRENCIES).optional(),
  valid_until: isoDate.optional().nullable(),
  status: z.enum(QUOTATION_STATUSES).optional(),
  items: z.array(lineItemSchema).min(1).max(50),
})

export const updateQuotationSchema = z
  .object({
    status: z.enum(QUOTATION_STATUSES).optional(),
    valid_until: isoDate.optional().nullable(),
    items: z.array(lineItemSchema).min(1).max(50).optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listQuotationsQuerySchema = z.object({
  client_id: z.string().uuid().optional(),
  status: z.enum(QUOTATION_STATUSES).optional(),
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>
export type CreateQuotationInput = z.infer<typeof createQuotationSchema>
export type UpdateQuotationInput = z.infer<typeof updateQuotationSchema>
