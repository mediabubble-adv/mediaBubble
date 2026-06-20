// Prompt row helpers for AI API responses.

import type { prompt_executions, prompts } from '@prisma/client'
import type { Prisma } from '@prisma/client'

export interface PromptVariableDef {
  name: string
  label?: string
  default?: string
}

export interface PromptRow {
  id: string
  name: string
  description: string | null
  category: string | null
  template: string
  variables: PromptVariableDef[]
  created_by: string
  is_public: boolean | null
  version: number | null
  status: string | null
  created_at: string
  updated_at: string
}

export interface PromptExecutionRow {
  id: string
  prompt_id: string
  user_id: string
  variables_used: Record<string, string> | null
  ai_provider: string | null
  model: string | null
  input_text: string | null
  output_text: string | null
  execution_time_ms: number | null
  created_at: string
}

function parseVariables(value: Prisma.JsonValue | null): PromptVariableDef[] {
  if (!value || !Array.isArray(value)) return []
  const out: PromptVariableDef[] = []
  for (const raw of value) {
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) continue
    const item = raw as Record<string, unknown>
    const name = String(item['name'] ?? '').trim()
    if (!name) continue
    out.push({
      name,
      label: item['label'] ? String(item['label']) : undefined,
      default: item['default'] ? String(item['default']) : undefined,
    })
  }
  return out
}

export function serializePrompt(row: prompts): PromptRow {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    template: row.template,
    variables: parseVariables(row.variables),
    created_by: row.created_by,
    is_public: row.is_public,
    version: row.version,
    status: row.status,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

export function serializeExecution(row: prompt_executions): PromptExecutionRow {
  const vars =
    row.variables_used && typeof row.variables_used === 'object' && !Array.isArray(row.variables_used)
      ? (row.variables_used as Record<string, string>)
      : null

  return {
    id: row.id,
    prompt_id: row.prompt_id,
    user_id: row.user_id,
    variables_used: vars,
    ai_provider: row.ai_provider,
    model: row.model,
    input_text: row.input_text,
    output_text: row.output_text,
    execution_time_ms: row.execution_time_ms,
    created_at: row.created_at.toISOString(),
  }
}

export function variablesToJson(
  variables: PromptVariableDef[] | undefined,
): Prisma.InputJsonValue | undefined {
  if (!variables?.length) return undefined
  return variables as unknown as Prisma.InputJsonValue
}
