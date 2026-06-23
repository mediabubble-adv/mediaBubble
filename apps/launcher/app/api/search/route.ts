import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const querySchema = z.object({
  q: z.string().min(1).max(100),
})

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = querySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { q } = parsed.data
  const filter = { contains: q, mode: 'insensitive' as const }

  const [tasks, clients, invoices] = await Promise.all([
    prisma.tasks.findMany({
      where: { deleted_at: null, title: filter },
      select: { id: true, title: true, status: true, priority: true },
      take: 5,
      orderBy: { updated_at: 'desc' },
    }),
    prisma.clients.findMany({
      where: {
        deleted_at: null,
        OR: [
          { name: filter },
          { primary_contact_name: filter },
          { primary_contact_email: filter },
        ],
      },
      select: { id: true, name: true, status: true, primary_contact_email: true },
      take: 5,
      orderBy: { name: 'asc' },
    }),
    prisma.invoices.findMany({
      where: {
        deleted_at: null,
        OR: [
          { invoice_number: filter },
          { clients: { name: filter } },
        ],
      },
      select: {
        id: true,
        invoice_number: true,
        status: true,
        clients: { select: { name: true } },
      },
      take: 5,
      orderBy: { created_at: 'desc' },
    }),
  ])

  return toResponse(ok({
    tasks: tasks.map((t) => ({
      id: t.id,
      label: t.title,
      meta: `${t.status ?? 'Backlog'} · ${t.priority ?? 'Medium'}`,
      href: `/tasks`,
      type: 'task' as const,
    })),
    clients: clients.map((c) => ({
      id: c.id,
      label: c.name,
      meta: c.primary_contact_email ?? c.status ?? '',
      href: `/crm`,
      type: 'client' as const,
    })),
    invoices: invoices.map((i) => ({
      id: i.id,
      label: i.invoice_number,
      meta: `${i.clients.name} · ${i.status ?? 'Draft'}`,
      href: `/crm`,
      type: 'invoice' as const,
    })),
  }, 'Search results'))
}
