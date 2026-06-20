// Static trigger/action catalogs for Workflow Automation (slice 1 — no cron/WebSocket yet).

export const TRIGGER_TYPES = [
  'manual',
  'task.created',
  'task.status_changed',
  'time_entry.submitted',
] as const

export type TriggerType = (typeof TRIGGER_TYPES)[number]

export const ACTION_TYPES = [
  'log_message',
  'update_task_status',
  'create_task',
  'post_channel_message',
] as const

export type ActionType = (typeof ACTION_TYPES)[number]

export interface CatalogItem {
  id: string
  label: string
  description: string
}

export interface ActionCatalogItem extends CatalogItem {
  params: string[]
}

export const TRIGGER_CATALOG: CatalogItem[] = [
  {
    id: 'manual',
    label: 'Manual test',
    description: 'Run on demand from the Automation UI or test API.',
  },
  {
    id: 'task.created',
    label: 'Task created',
    description: 'Fires when a new task is added to the board (event hook deferred).',
  },
  {
    id: 'task.status_changed',
    label: 'Task status changed',
    description: 'Fires when a task moves between Kanban columns.',
  },
  {
    id: 'time_entry.submitted',
    label: 'Time entry submitted',
    description: 'Fires when a contributor submits a timesheet entry for approval.',
  },
]

export const ACTION_CATALOG: ActionCatalogItem[] = [
  {
    id: 'log_message',
    label: 'Log message',
    description: 'Append an audit line to the execution log (no side effects).',
    params: ['message'],
  },
  {
    id: 'update_task_status',
    label: 'Update task status',
    description: 'Move a task to a new Kanban column (requires trigger_data.task_id).',
    params: ['status'],
  },
  {
    id: 'create_task',
    label: 'Create task',
    description: 'Create a follow-up task on the board.',
    params: ['title', 'description', 'status', 'assigned_to'],
  },
  {
    id: 'post_channel_message',
    label: 'Post channel message',
    description: 'Send a message to a Communication Hub channel.',
    params: ['channel_id', 'content'],
  },
]

export const TEMPLATE_CATEGORIES = ['HR', 'Sales', 'Content', 'Operations'] as const
