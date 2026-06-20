// Shared helpers for Campaign & Proposal API routes.

import { documentNumber } from '@/lib/crm/billing'
import { prisma } from '@/lib/db/prisma'

export async function nextProposalNumber(): Promise<string> {
  const count = await prisma.proposals.count()
  return documentNumber('PRP', count + 1)
}

export async function assertActiveClient(clientId: string): Promise<boolean> {
  const client = await prisma.clients.findFirst({
    where: { id: clientId, deleted_at: null },
    select: { id: true },
  })
  return Boolean(client)
}

export function parseDateOnly(value: string | null | undefined): Date | null {
  if (!value) return null
  return new Date(`${value}T00:00:00.000Z`)
}
