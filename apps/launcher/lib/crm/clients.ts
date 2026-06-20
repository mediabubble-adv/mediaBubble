// Client row helpers for CRM API responses.

import type { clients } from '@prisma/client'

export interface ClientRow {
  id: string
  name: string
  primary_contact_name: string | null
  primary_contact_email: string | null
  primary_contact_phone: string | null
  contract_type: string | null
  monthly_budget: number | null
  vat_number: string | null
  status: string | null
  brand_assets_url: string | null
  created_at: string
  updated_at: string
}

export function serializeClient(row: clients): ClientRow {
  return {
    id: row.id,
    name: row.name,
    primary_contact_name: row.primary_contact_name,
    primary_contact_email: row.primary_contact_email,
    primary_contact_phone: row.primary_contact_phone,
    contract_type: row.contract_type,
    monthly_budget: row.monthly_budget === null ? null : Number(row.monthly_budget),
    vat_number: row.vat_number,
    status: row.status,
    brand_assets_url: row.brand_assets_url,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}
