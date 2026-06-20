// GET /api/time/entries — list time entries (own, team, or pending approval).
// POST /api/time/entries — create a manual time entry.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { createTimeEntry } from '@/lib/time/entries'
import { listTimeEntriesQuerySchema, timeEntrySchema } from '@/lib/time/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const entryInclude = {
  tasks: { select: { id: true, title: true } },
  users: { select: { id: true, name: true, email: true } },
} as const

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listTimeEntriesQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { from, to, task_id, status, scope } = parsed.data

  if (scope === 'pending') {
    if (!hasAtLeast(me.role, 'Manager')) {
      return toResponse(fail('forbidden', 'Manager access required', 403))
    }
    const entries = await prisma.time_entries.findMany({
      where: {
        status: status ?? 'Submitted',
        user_id: { not: me.id },
        ...(from || to
          ? { date: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } }
          : {}),
      },
      include: entryInclude,
      orderBy: [{ date: 'desc' }, { start_time: 'desc' }],
      take: 100,
    })
    return toResponse(ok(entries, 'Pending time entries retrieved'))
  }

  if (scope === 'team') {
    if (!hasAtLeast(me.role, 'Manager')) {
      return toResponse(fail('forbidden', 'Manager access required', 403))
    }
    const entries = await prisma.time_entries.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(from || to
          ? { date: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } }
          : {}),
      },
      include: entryInclude,
      orderBy: [{ date: 'desc' }, { start_time: 'desc' }],
      take: 200,
    })
    return toResponse(ok(entries, 'Team time entries retrieved'))
  }

  const entries = await prisma.time_entries.findMany({
    where: {
      user_id: me.id,
      ...(task_id ? { task_id } : {}),
      ...(status ? { status } : {}),
      ...(from || to
        ? {
            date: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {}),
    },
    include: entryInclude,
    orderBy: [{ date: 'desc' }, { start_time: 'desc' }],
  })

  return toResponse(ok(entries, 'Time entries retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = timeEntrySchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (parsed.data.task_id) {
    const task = await prisma.tasks.findFirst({
      where: { id: parsed.data.task_id, deleted_at: null },
    })
    if (!task) return toResponse(fail('not_found', 'Task not found', 404))
  }

  const entry = await createTimeEntry(prisma, me.id, parsed.data)
  return toResponse(ok(entry, 'Time entry created', 201))
}
