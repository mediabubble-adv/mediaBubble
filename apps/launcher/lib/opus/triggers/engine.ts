// OPUS trigger engine — execute triggers, log runs, update counters.

import { prisma } from '@/lib/db/prisma'
import { publish, createCorrelationId } from '../event-bus'
import { runTriggerAction } from './handlers'
import { serializeTrigger } from './serialize'
import type { OpusTriggerRow } from '../types'

export async function executeTrigger(
  triggerId: string,
  userId: string | null,
): Promise<{ run_id: string; result: Record<string, unknown> }> {
  const trigger = await prisma.opus_triggers.findUnique({ where: { id: triggerId } })
  if (!trigger) throw new Error('Trigger not found')
  if (!trigger.enabled) throw new Error('Trigger is disabled')

  const run = await prisma.opus_trigger_runs.create({
    data: {
      trigger_id: trigger.id,
      status: 'Running',
      triggered_by: userId,
      steps_total: 6,
      steps_done: 0,
    },
  })

  try {
    const result = await runTriggerAction({
      triggerId: trigger.id,
      triggerSlug: trigger.slug,
      action: trigger.action,
      userId,
    })

    await prisma.opus_trigger_runs.update({
      where: { id: run.id },
      data: {
        status: 'Completed',
        steps_total: result.steps_total,
        steps_done: result.steps_done,
        output: result.output as object,
        finished_at: new Date(),
      },
    })

    await prisma.opus_triggers.update({
      where: { id: trigger.id },
      data: {
        last_run_at: new Date(),
        execution_count: { increment: 1 },
      },
    })

    const correlationId = createCorrelationId('trigger')
    await publish({
      type: 'TriggerExecuted',
      payload: { triggerId: trigger.id, runId: run.id, action: trigger.action },
      metadata: { sourceService: 'triggers', correlationId, userId: userId ?? undefined },
    })

    return { run_id: run.id, result: result.output }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Trigger execution failed'
    await prisma.opus_trigger_runs.update({
      where: { id: run.id },
      data: {
        status: 'Failed',
        error_message: message,
        finished_at: new Date(),
      },
    })
    throw err
  }
}

export async function listTriggers(): Promise<OpusTriggerRow[]> {
  const rows = await prisma.opus_triggers.findMany({ orderBy: { name: 'asc' } })
  return rows.map(serializeTrigger)
}

export async function listTriggerRuns(triggerId: string, limit = 20) {
  const rows = await prisma.opus_trigger_runs.findMany({
    where: { trigger_id: triggerId },
    orderBy: { started_at: 'desc' },
    take: limit,
  })
  return rows.map((row) => ({
    id: row.id,
    trigger_id: row.trigger_id,
    status: row.status ?? 'Running',
    steps_total: row.steps_total,
    steps_done: row.steps_done,
    error_message: row.error_message,
    started_at: row.started_at.toISOString(),
    finished_at: row.finished_at?.toISOString() ?? null,
  }))
}
