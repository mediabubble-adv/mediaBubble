import { canManageWorkflow, workflowListWhere } from './access'
import { ACTION_TYPES, TRIGGER_TYPES } from './catalog'
import { createWorkflowSchema } from './schemas'

describe('automation access', () => {
  const workflow = {
    id: 'wf-1',
    name: 'Test',
    description: null,
    trigger: { type: 'manual' },
    steps: [],
    enabled: true,
    created_by: 'user-a',
    last_executed_at: null,
    execution_count: 0,
    success_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  }

  it('allows managers to read any workflow', () => {
    expect(canManageWorkflow(workflow, 'user-b', 'Manager')).toBe(true)
  })

  it('scopes list to creator for contributors', () => {
    expect(workflowListWhere('user-a', 'Contributor')).toEqual({ created_by: 'user-a' })
    expect(workflowListWhere('user-a', 'Manager')).toEqual({})
  })
})

describe('automation schemas', () => {
  it('accepts a minimal workflow', () => {
    const parsed = createWorkflowSchema.safeParse({
      name: 'Nudge review',
      trigger: { type: 'manual' },
      steps: [{ action: 'log_message', params: { message: 'ok' } }],
    })
    expect(parsed.success).toBe(true)
  })

  it('validates catalog enums', () => {
    expect(TRIGGER_TYPES).toContain('task.created')
    expect(ACTION_TYPES).toContain('create_task')
  })
})
