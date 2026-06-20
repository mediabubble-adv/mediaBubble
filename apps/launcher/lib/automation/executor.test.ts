import { executeWorkflowSteps } from './executor'

describe('executeWorkflowSteps', () => {
  it('logs a message step', async () => {
    const result = await executeWorkflowSteps({
      steps: [{ action: 'log_message', params: { message: 'Hello' } }],
      triggerData: {},
      triggeredBy: 'user-1',
      role: 'Manager',
    })
    expect(result.error).toBeUndefined()
    expect(result.stepsExecuted).toBe(1)
    expect(result.results[0]?.detail).toBe('Hello')
  })

  it('fails update_task_status without task_id', async () => {
    const result = await executeWorkflowSteps({
      steps: [{ action: 'update_task_status', params: { status: 'Review' } }],
      triggerData: {},
      triggeredBy: 'user-1',
      role: 'Manager',
    })
    expect(result.error).toContain('task_id')
    expect(result.stepsExecuted).toBe(0)
  })

  it('fails create_task without title', async () => {
    const result = await executeWorkflowSteps({
      steps: [{ action: 'create_task', params: {} }],
      triggerData: {},
      triggeredBy: 'user-1',
      role: 'Manager',
    })
    expect(result.error).toContain('title')
    expect(result.stepsExecuted).toBe(0)
  })
})
