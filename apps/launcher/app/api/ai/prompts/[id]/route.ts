// GET /api/ai/prompts/:id — fetch one prompt.
// PUT /api/ai/prompts/:id — update a prompt.
// DELETE /api/ai/prompts/:id — archive a prompt.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canManagePrompt, canReadPrompt } from '@/lib/ai/access'
import { serializePrompt, variablesToJson } from '@/lib/ai/prompts'
import { updatePromptSchema } from '@/lib/ai/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const row = await prisma.prompts.findUnique({ where: { id } })
  if (!row || !canReadPrompt(row, me.id, me.role)) {
    return toResponse(fail('not_found', 'Prompt not found', 404))
  }

  return toResponse(ok(serializePrompt(row), 'Prompt retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.prompts.findUnique({ where: { id } })
  if (!existing || !canManagePrompt(existing, me.id, me.role)) {
    return toResponse(fail('not_found', 'Prompt not found', 404))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updatePromptSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (parsed.data.is_public && !hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required for public prompts', 403))
  }

  const nextVersion =
    parsed.data.template && parsed.data.template !== existing.template
      ? (existing.version ?? 1) + 1
      : (existing.version ?? 1)

  const row = await prisma.$transaction(async (tx) => {
    if (parsed.data.template && parsed.data.template !== existing.template) {
      await tx.prompt_versions.create({
        data: {
          prompt_id: id,
          version: nextVersion,
          template: parsed.data.template,
          changes: 'Template updated',
          created_by: me.id,
        },
      })
    }

    return tx.prompts.update({
      where: { id },
      data: {
        ...(parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
        ...(parsed.data.description !== undefined ? { description: parsed.data.description } : {}),
        ...(parsed.data.category !== undefined ? { category: parsed.data.category } : {}),
        ...(parsed.data.template !== undefined ? { template: parsed.data.template, version: nextVersion } : {}),
        ...(parsed.data.variables !== undefined
          ? { variables: variablesToJson(parsed.data.variables) }
          : {}),
        ...(parsed.data.is_public !== undefined ? { is_public: parsed.data.is_public } : {}),
        ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
      },
    })
  })

  return toResponse(ok(serializePrompt(row), 'Prompt updated'))
}

export async function DELETE(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.prompts.findUnique({ where: { id } })
  if (!existing || !canManagePrompt(existing, me.id, me.role)) {
    return toResponse(fail('not_found', 'Prompt not found', 404))
  }

  await prisma.prompts.update({
    where: { id },
    data: { status: 'Archived' },
  })

  return toResponse(ok({ id }, 'Prompt archived'))
}
