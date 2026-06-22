// OPUS brief service — structured brief → optional campaign creation.

import type { opus_briefs } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { createCorrelationId, publish } from '../event-bus'
import type { CreateOpusBriefInput } from '../schemas'
import type { OpusBriefGoal, OpusBriefRow, OpusBriefStatus } from '../types'
import { consumeUsage } from '../billing/enforcement'

function parseKeyMessages(value: Prisma.JsonValue | null): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function parsePlatforms(value: Prisma.JsonValue | null): Record<string, boolean> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const out: Record<string, boolean> = {}
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (typeof val === 'boolean') out[key] = val
  }
  return out
}

export function serializeBrief(row: opus_briefs): OpusBriefRow {
  return {
    id: row.id,
    campaign_id: row.campaign_id,
    client_id: row.client_id,
    name: row.name,
    goal: row.goal as OpusBriefGoal,
    audience: row.audience,
    budget: row.budget ? Number(row.budget) : null,
    currency: row.currency,
    channels: row.channels ?? [],
    key_messages: parseKeyMessages(row.key_messages),
    platforms: parsePlatforms(row.platforms),
    status: (row.status ?? 'draft') as OpusBriefStatus,
    created_by: row.created_by,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

export async function createBrief(
  input: CreateOpusBriefInput,
  userId: string,
): Promise<OpusBriefRow> {
  const usage = await consumeUsage('api_call')
  if (!usage.allowed) {
    throw new Error(usage.message)
  }

  let campaignId: string | null = null
  if (input.create_campaign) {
    const launchCheck = await consumeUsage('campaign_launch')
    if (!launchCheck.allowed) throw new Error(launchCheck.message)

    const campaign = await prisma.campaigns.create({
      data: {
        client_id: input.client_id,
        name: input.name,
        brief: input.audience ?? null,
        market: 'eg',
        channels: input.channels ?? [],
        budget: input.budget ?? null,
        currency: input.currency ?? 'EGP',
        status: 'Planning',
        created_by: userId,
      },
    })
    campaignId = campaign.id
  }

  const row = await prisma.opus_briefs.create({
    data: {
      client_id: input.client_id,
      campaign_id: campaignId,
      name: input.name,
      goal: input.goal ?? 'leads',
      audience: input.audience ?? null,
      budget: input.budget ?? null,
      currency: input.currency ?? 'EGP',
      channels: input.channels ?? [],
      key_messages: (input.key_messages ?? []) as unknown as Prisma.InputJsonValue,
      platforms: (input.platforms ?? {}) as unknown as Prisma.InputJsonValue,
      status: 'draft',
      created_by: userId,
    },
  })

  const correlationId = createCorrelationId('brief')
  await publish({
    type: 'BriefCreated',
    payload: { briefId: row.id, campaignId, clientId: input.client_id },
    metadata: { sourceService: 'brief', correlationId, userId },
  })

  return serializeBrief(row)
}

export async function listBriefs(limit = 50): Promise<OpusBriefRow[]> {
  const rows = await prisma.opus_briefs.findMany({
    orderBy: { updated_at: 'desc' },
    take: limit,
  })
  return rows.map(serializeBrief)
}

export async function getBrief(id: string): Promise<OpusBriefRow | null> {
  const row = await prisma.opus_briefs.findUnique({ where: { id } })
  return row ? serializeBrief(row) : null
}
