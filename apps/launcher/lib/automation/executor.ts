// Synchronous workflow step executor (slice 1 — event triggers wired via manual test only).

import type { Prisma } from '@prisma/client'
import { canAccessChannel } from '@/lib/comms/access'
import { prisma } from '@/lib/db/prisma'
import { isTaskStatus, statusSideEffects, type TaskStatus } from '@/lib/tasks/status'
import type { ActionType } from './catalog'
import type { WorkflowStepInput } from './schemas'

export interface StepResult {
  action: ActionType
  ok: boolean
  detail: string
}

export interface ExecuteWorkflowInput {
  steps: WorkflowStepInput[]
  triggerData: Record<string, unknown>
  triggeredBy: string
  role: 'Admin' | 'Manager' | 'Contributor' | 'Viewer'
}

export interface ExecuteWorkflowResult {
  results: StepResult[]
  stepsExecuted: number
  error?: string
}

function readString(params: Record<string, unknown>, key: string): string | null {
  const value = params[key]
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

async function runStep(
  step: WorkflowStepInput,
  ctx: ExecuteWorkflowInput,
): Promise<StepResult> {
  const params = step.params ?? {}

  switch (step.action) {
    case 'log_message': {
      const message = readString(params, 'message')
      if (!message) {
        return { action: step.action, ok: false, detail: 'Missing params.message' }
      }
      return { action: step.action, ok: true, detail: message }
    }

    case 'update_task_status': {
      const taskId = ctx.triggerData['task_id']
      const statusRaw = readString(params, 'status')
      if (typeof taskId !== 'string' || !taskId) {
        return { action: step.action, ok: false, detail: 'trigger_data.task_id is required' }
      }
      if (!statusRaw || !isTaskStatus(statusRaw)) {
        return { action: step.action, ok: false, detail: 'Invalid params.status' }
      }
      const status = statusRaw as TaskStatus
      const task = await prisma.tasks.findFirst({
        where: { id: taskId, deleted_at: null },
      })
      if (!task) {
        return { action: step.action, ok: false, detail: 'Task not found' }
      }
      await prisma.tasks.update({
        where: { id: taskId },
        data: { status, ...statusSideEffects(status) },
      })
      return { action: step.action, ok: true, detail: `Task moved to ${status}` }
    }

    case 'create_task': {
      const title = readString(params, 'title')
      if (!title) {
        return { action: step.action, ok: false, detail: 'Missing params.title' }
      }
      const description = readString(params, 'description')
      const statusRaw = readString(params, 'status') ?? 'Backlog'
      const status = isTaskStatus(statusRaw) ? statusRaw : 'Backlog'
      const assignedTo = readString(params, 'assigned_to')
      const row = await prisma.tasks.create({
        data: {
          title,
          description,
          status,
          created_by: ctx.triggeredBy,
          assigned_to: assignedTo,
          ...statusSideEffects(status as TaskStatus),
        },
      })
      return { action: step.action, ok: true, detail: `Created task ${row.id}` }
    }

    case 'post_channel_message': {
      const channelId = readString(params, 'channel_id')
      const content = readString(params, 'content')
      if (!channelId || !content) {
        return { action: step.action, ok: false, detail: 'channel_id and content are required' }
      }
      const channel = await prisma.channels.findFirst({
        where: { id: channelId, archived_at: null },
      })
      if (!channel || !canAccessChannel(channel, ctx.triggeredBy, ctx.role)) {
        return { action: step.action, ok: false, detail: 'Channel not found or not accessible' }
      }
      await prisma.messages.create({
        data: {
          channel_id: channelId,
          user_id: ctx.triggeredBy,
          content,
        },
      })
      return { action: step.action, ok: true, detail: `Posted to channel ${channel.name}` }
    }

    default: {
      const neverAction: never = step.action
      return { action: neverAction, ok: false, detail: 'Unknown action' }
    }
  }
}

export async function executeWorkflowSteps(input: ExecuteWorkflowInput): Promise<ExecuteWorkflowResult> {
  const results: StepResult[] = []
  let stepsExecuted = 0

  for (const step of input.steps) {
    const result = await runStep(step, input)
    results.push(result)
    if (!result.ok) {
      return {
        results,
        stepsExecuted,
        error: result.detail,
      }
    }
    stepsExecuted += 1
  }

  return { results, stepsExecuted }
}

export function resultsToTriggerData(results: StepResult[]): Prisma.InputJsonValue {
  return { step_results: results } as unknown as Prisma.InputJsonValue
}
