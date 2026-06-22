// OPUS workflow orchestration — wires event bus handlers for brief → campaign flows.

import { subscribe } from './event-bus'

let initialized = false

export function initOpusWorkflows(): void {
  if (initialized) return
  initialized = true

  subscribe('BriefCreated', async (_event) => {
    // Stub: enqueue brief processing pipeline
  })

  subscribe('PlanApproved', async (_event) => {
    // Stub: task orchestration after plan approval
  })

  subscribe('TasksCreated', async (_event) => {
    // Stub: content generation queue
  })

  subscribe('TriggerExecuted', async (_event) => {
    // Stub: post-trigger side effects
  })

  subscribe('PerformanceThresholdCrossed', async (_event) => {
    // Stub: optimization workflow
  })
}

export function resetOpusWorkflowsForTests(): void {
  initialized = false
}
