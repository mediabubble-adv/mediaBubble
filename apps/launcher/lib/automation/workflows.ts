// Workflow row helpers for Automation API responses.

import type { workflow_executions, workflow_templates, workflows } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { WorkflowStepInput, WorkflowTriggerInput } from './schemas'

export interface WorkflowRow {
  id: string
  name: string
  description: string | null
  trigger: WorkflowTriggerInput
  steps: WorkflowStepInput[]
  enabled: boolean
  created_by: string
  last_executed_at: string | null
  execution_count: number
  success_count: number
  created_at: string
  updated_at: string
}

export interface ExecutionRow {
  id: string
  workflow_id: string
  triggered_by: string | null
  trigger_data: Record<string, unknown> | null
  status: string
  steps_executed: number
  error_message: string | null
  execution_time_ms: number | null
  created_at: string
}

export interface TemplateRow {
  id: string
  name: string
  category: string | null
  description: string | null
  workflow_config: { trigger: WorkflowTriggerInput; steps: WorkflowStepInput[] } | null
  created_by: string
  usage_count: number
  created_at: string
}

function parseTrigger(value: Prisma.JsonValue): WorkflowTriggerInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { type: 'manual' }
  }
  const raw = value as Record<string, unknown>
  const type = String(raw['type'] ?? 'manual')
  const conditions =
    raw['conditions'] && typeof raw['conditions'] === 'object' && !Array.isArray(raw['conditions'])
      ? (raw['conditions'] as Record<string, string>)
      : undefined
  return {
    type: type as WorkflowTriggerInput['type'],
    ...(conditions ? { conditions } : {}),
  }
}

function parseSteps(value: Prisma.JsonValue): WorkflowStepInput[] {
  if (!Array.isArray(value)) return []
  const out: WorkflowStepInput[] = []
  for (const raw of value) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) continue
    const item = raw as Record<string, unknown>
    const action = String(item['action'] ?? '').trim()
    if (!action) continue
    const params =
      item['params'] && typeof item['params'] === 'object' && !Array.isArray(item['params'])
        ? (item['params'] as Record<string, unknown>)
        : {}
    out.push({ action: action as WorkflowStepInput['action'], params })
  }
  return out
}

function parseTriggerData(value: Prisma.JsonValue | null): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

export function workflowToJson(
  trigger: WorkflowTriggerInput,
  steps: WorkflowStepInput[],
): { trigger: Prisma.InputJsonValue; steps: Prisma.InputJsonValue } {
  return {
    trigger: trigger as unknown as Prisma.InputJsonValue,
    steps: steps as unknown as Prisma.InputJsonValue,
  }
}

export function serializeWorkflow(row: workflows): WorkflowRow {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    trigger: parseTrigger(row.trigger),
    steps: parseSteps(row.steps),
    enabled: row.enabled ?? true,
    created_by: row.created_by,
    last_executed_at: row.last_executed_at?.toISOString() ?? null,
    execution_count: row.execution_count ?? 0,
    success_count: row.success_count ?? 0,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

export function serializeExecution(row: workflow_executions): ExecutionRow {
  return {
    id: row.id,
    workflow_id: row.workflow_id,
    triggered_by: row.triggered_by,
    trigger_data: parseTriggerData(row.trigger_data),
    status: row.status ?? 'Running',
    steps_executed: row.steps_executed ?? 0,
    error_message: row.error_message,
    execution_time_ms: row.execution_time_ms,
    created_at: row.created_at.toISOString(),
  }
}

export function serializeTemplate(row: workflow_templates): TemplateRow {
  const config = row.workflow_config
  let workflow_config: TemplateRow['workflow_config'] = null
  if (config && typeof config === 'object' && !Array.isArray(config)) {
    const raw = config as Record<string, unknown>
    workflow_config = {
      trigger: parseTrigger(raw['trigger'] as Prisma.JsonValue),
      steps: parseSteps(raw['steps'] as Prisma.JsonValue),
    }
  }
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    workflow_config,
    created_by: row.created_by,
    usage_count: row.usage_count ?? 0,
    created_at: row.created_at.toISOString(),
  }
}
