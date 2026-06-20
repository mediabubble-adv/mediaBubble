// Proposal row helpers for Campaign & Proposal API responses.

import type { Prisma, clients, proposals } from '@prisma/client'
import type { ProposalDeliverable } from './schemas'

export interface ProposalRow {
  id: string
  proposal_number: string
  client_id: string
  client_name: string
  title: string
  summary: string | null
  objectives: string[]
  deliverables: ProposalDeliverable[]
  timeline_weeks: number | null
  budget_estimate: number | null
  currency: string | null
  status: string | null
  quotation_id: string | null
  campaign_id: string | null
  created_by: string
  created_at: string
  updated_at: string
}

type ProposalWithClient = proposals & {
  clients: Pick<clients, 'name'>
  campaigns?: { id: string } | null
}

function parseStringArray(value: Prisma.JsonValue | null): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
}

function parseDeliverables(value: Prisma.JsonValue | null): ProposalDeliverable[] {
  if (!Array.isArray(value)) return []
  const out: ProposalDeliverable[] = []
  for (const raw of value) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) continue
    const item = raw as Record<string, unknown>
    const title = String(item['title'] ?? '').trim()
    if (!title) continue
    out.push({
      title,
      description: item['description'] ? String(item['description']) : undefined,
    })
  }
  return out
}

export function objectivesToJson(objectives: string[] | undefined): Prisma.InputJsonValue | undefined {
  if (!objectives) return undefined
  return objectives as unknown as Prisma.InputJsonValue
}

export function deliverablesToJson(
  deliverables: ProposalDeliverable[] | undefined,
): Prisma.InputJsonValue | undefined {
  if (!deliverables) return undefined
  return deliverables as unknown as Prisma.InputJsonValue
}

export function serializeProposal(row: ProposalWithClient): ProposalRow {
  return {
    id: row.id,
    proposal_number: row.proposal_number,
    client_id: row.client_id,
    client_name: row.clients.name,
    title: row.title,
    summary: row.summary,
    objectives: parseStringArray(row.objectives),
    deliverables: parseDeliverables(row.deliverables),
    timeline_weeks: row.timeline_weeks,
    budget_estimate: row.budget_estimate !== null ? Number(row.budget_estimate) : null,
    currency: row.currency,
    status: row.status,
    quotation_id: row.quotation_id,
    campaign_id: row.campaigns?.id ?? null,
    created_by: row.created_by,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

export const proposalInclude = {
  clients: { select: { name: true } },
  campaigns: { select: { id: true } },
} as const
