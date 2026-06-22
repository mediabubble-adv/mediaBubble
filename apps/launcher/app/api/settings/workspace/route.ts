// GET + PATCH /api/settings/workspace — per-user workspace preferences.
// Stored in the `settings` table as (user_id, key) pairs with JSONB values.

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { isCurrency } from '@/lib/finance/currency'

export const runtime = 'nodejs'

const PREF_KEYS = ['ui.timezone', 'ui.default_currency', 'ui.notifications'] as const

const DEFAULT_NOTIFICATIONS = { email_digest: true, task_reminders: true, weekly_report: false }

const notificationsSchema = z.object({
  email_digest: z.boolean(),
  task_reminders: z.boolean(),
  weekly_report: z.boolean(),
})

const patchSchema = z.object({
  timezone: z.string().min(1).max(100).optional(),
  default_currency: z.string().refine(isCurrency, 'Invalid currency code').optional(),
  notifications: notificationsSchema.optional(),
})

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const rows = await prisma.settings.findMany({
    where: { user_id: me.id, key: { in: [...PREF_KEYS] } },
    select: { key: true, value: true },
  })

  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  return toResponse(
    ok({
      timezone: (map['ui.timezone'] as string) ?? 'Africa/Cairo',
      default_currency: (map['ui.default_currency'] as string) ?? 'EGP',
      notifications: (map['ui.notifications'] as typeof DEFAULT_NOTIFICATIONS) ?? DEFAULT_NOTIFICATIONS,
    }),
  )
}

export async function PATCH(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined)
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { timezone, default_currency, notifications } = parsed.data

  const entries: [string, unknown][] = []
  if (timezone !== undefined) entries.push(['ui.timezone', timezone])
  if (default_currency !== undefined) entries.push(['ui.default_currency', default_currency])
  if (notifications !== undefined) entries.push(['ui.notifications', notifications])

  if (entries.length === 0) return toResponse(ok({}, 'No changes'))

  await Promise.all(
    entries.map(([key, value]) =>
      prisma.settings.upsert({
        where: { user_id_key: { user_id: me.id, key } },
        update: { value: value as never, updated_at: new Date() },
        create: { user_id: me.id, key, value: value as never },
      }),
    ),
  )

  return toResponse(ok({}, 'Workspace preferences saved'))
}
