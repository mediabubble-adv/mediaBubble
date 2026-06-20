// Campaign row helpers for Campaign & Proposal API responses.

import type { campaigns, clients } from '@prisma/client'

export interface CampaignRow {
  id: string
  client_id: string
  client_name: string
  name: string
  brief: string | null
  market: string | null
  channels: string[]
  budget: number | null
  currency: string | null
  start_date: string | null
  end_date: string | null
  status: string | null
  proposal_id: string | null
  created_by: string
  created_at: string
  updated_at: string
}

type CampaignWithClient = campaigns & {
  clients: Pick<clients, 'name'>
}

export function serializeCampaign(row: CampaignWithClient): CampaignRow {
  return {
    id: row.id,
    client_id: row.client_id,
    client_name: row.clients.name,
    name: row.name,
    brief: row.brief,
    market: row.market,
    channels: row.channels,
    budget: row.budget !== null ? Number(row.budget) : null,
    currency: row.currency,
    start_date: row.start_date?.toISOString().slice(0, 10) ?? null,
    end_date: row.end_date?.toISOString().slice(0, 10) ?? null,
    status: row.status,
    proposal_id: row.proposal_id,
    created_by: row.created_by,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

export const campaignInclude = {
  clients: { select: { name: true } },
} as const
