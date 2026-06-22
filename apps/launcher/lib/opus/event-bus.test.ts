import { describe, expect, it, beforeEach } from '@jest/globals'
import { publish, subscribe, resetEventBusForTests, createCorrelationId } from './event-bus'

describe('OPUS event bus', () => {
  beforeEach(() => {
    resetEventBusForTests()
  })

  it('delivers events to subscribers', async () => {
    const received: string[] = []
    subscribe('BriefCreated', async (event) => {
      received.push(String(event.payload.briefId))
    })

    await publish({
      type: 'BriefCreated',
      payload: { briefId: 'b1' },
      metadata: { sourceService: 'test', correlationId: createCorrelationId('t') },
    })

    expect(received).toEqual(['b1'])
  })
})
