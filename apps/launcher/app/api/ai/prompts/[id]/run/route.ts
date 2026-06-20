// POST /api/ai/prompts/:id/run — execute a prompt and log the result.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canReadPrompt } from '@/lib/ai/access'
import { serializeExecution } from '@/lib/ai/prompts'
import { runPromptSchema } from '@/lib/ai/schemas'
import { runPrompt } from '@/lib/ai/runner'
import { applyTemplate } from '@/lib/ai/template'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const prompt = await prisma.prompts.findUnique({ where: { id } })
  if (!prompt || !canReadPrompt(prompt, me.id, me.role)) {
    return toResponse(fail('not_found', 'Prompt not found', 404))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = runPromptSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const variables = parsed.data.variables ?? {}

  try {
    const filled = applyTemplate(prompt.template, variables)
    const result = await runPrompt(prompt.template, variables)

    const execution = await prisma.prompt_executions.create({
      data: {
        prompt_id: prompt.id,
        user_id: me.id,
        variables_used: variables,
        ai_provider: result.provider,
        model: result.model,
        input_text: filled,
        output_text: result.output,
        execution_time_ms: result.execution_time_ms,
      },
    })

    return toResponse(
      ok(
        {
          execution: serializeExecution(execution),
          provider: result.provider,
          model: result.model,
        },
        'Prompt executed',
      ),
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Prompt execution failed'
    return toResponse(fail('provider_error', message, 502))
  }
}
