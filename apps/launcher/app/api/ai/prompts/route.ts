// GET /api/ai/prompts — list prompts visible to the user.
// POST /api/ai/prompts — create a prompt (Contributor+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { promptListWhere } from '@/lib/ai/access'
import { serializePrompt, variablesToJson } from '@/lib/ai/prompts'
import { createPromptSchema, listPromptsQuerySchema } from '@/lib/ai/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listPromptsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { category, status, q } = parsed.data
  const visibility = promptListWhere(me.id, me.role)
  const rows = await prisma.prompts.findMany({
    where: {
      AND: [
        visibility,
        ...(category ? [{ category }] : []),
        ...(status ? [{ status }] : []),
        ...(q
          ? [
              {
                OR: [
                  { name: { contains: q, mode: 'insensitive' as const } },
                  { description: { contains: q, mode: 'insensitive' as const } },
                ],
              },
            ]
          : []),
      ],
    },
    orderBy: { updated_at: 'desc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializePrompt), 'Prompts retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createPromptSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const isPublic = parsed.data.is_public ?? false
  if (isPublic && !hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required for public prompts', 403))
  }

  const row = await prisma.prompts.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      category: parsed.data.category ?? 'other',
      template: parsed.data.template,
      variables: variablesToJson(parsed.data.variables),
      created_by: me.id,
      is_public: isPublic,
      status: parsed.data.status ?? 'Draft',
      version: 1,
      prompt_versions: {
        create: {
          version: 1,
          template: parsed.data.template,
          changes: 'Initial version',
          created_by: me.id,
        },
      },
    },
  })

  return toResponse(ok(serializePrompt(row), 'Prompt created', 201))
}
