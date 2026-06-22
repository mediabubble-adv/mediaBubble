// PATCH /api/settings/workspace — upsert workspace preferences for the current user.

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const schema = z.object({
  timezone: z.string().min(1).max(100),
  date_format: z.enum(['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']),
  language: z.enum(['en', 'ar']),
  email_notifications: z.boolean(),
  app_notifications: z.boolean(),
})

export type WorkspacePrefs = z.infer<typeof schema>

export async function PATCH(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = schema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  await prisma.settings.upsert({
    where: { user_id_key: { user_id: me.id, key: 'workspace_prefs' } },
    update: { value: parsed.data, updated_at: new Date() },
    create: { user_id: me.id, key: 'workspace_prefs', value: parsed.data },
  })

  return toResponse(ok(parsed.data, 'Workspace preferences saved'))
}
