// Shared Prisma helpers for creating and updating time_entries rows.

import type { PrismaClient } from '@prisma/client'
import { durationMinutes } from '@/lib/tasks/time'
import type { TimeEntryInput, UpdateTimeEntryInput } from './schemas'

type Db = Pick<PrismaClient, 'time_entries'>

export async function createTimeEntry(
  db: Db,
  userId: string,
  input: TimeEntryInput & { task_id?: string | null },
) {
  const { start_time, end_time, description, billable, task_id } = input
  return db.time_entries.create({
    data: {
      user_id: userId,
      task_id: task_id ?? null,
      date: start_time,
      start_time,
      end_time,
      duration_minutes: durationMinutes(start_time, end_time),
      description,
      billable: billable ?? false,
      status: 'Draft',
    },
  })
}

export async function updateTimeEntry(
  db: Db,
  id: string,
  input: UpdateTimeEntryInput,
) {
  const existing = await db.time_entries.findUnique({ where: { id } })
  if (!existing) return null

  const start = input.start_time ?? existing.start_time
  const end = input.end_time ?? existing.end_time
  const duration =
    input.start_time !== undefined || input.end_time !== undefined
      ? durationMinutes(start, end)
      : existing.duration_minutes

  return db.time_entries.update({
    where: { id },
    data: {
      ...(input.start_time !== undefined ? { start_time: input.start_time, date: input.start_time } : {}),
      ...(input.end_time !== undefined ? { end_time: input.end_time } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.billable !== undefined ? { billable: input.billable } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.task_id !== undefined ? { task_id: input.task_id } : {}),
      ...(input.start_time !== undefined || input.end_time !== undefined
        ? { duration_minutes: duration }
        : {}),
      updated_at: new Date(),
    },
  })
}
