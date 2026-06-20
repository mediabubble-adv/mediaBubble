import { canSubscribeToChannel, parseCommsWsTicketClaims } from './ticket'
import { COMMS_WS_KIND } from './events'

describe('comms ws ticket', () => {
  it('parses valid ticket claims', () => {
    const claims = parseCommsWsTicketClaims({
      sub: 'user-1',
      role: 'Contributor',
      kind: COMMS_WS_KIND,
      channels: ['ch-a', 'ch-b'],
      exp: 9_999_999_999,
      iat: 1,
    })
    expect(claims?.sub).toBe('user-1')
    expect(canSubscribeToChannel(claims!, 'ch-b')).toBe(true)
    expect(canSubscribeToChannel(claims!, 'ch-x')).toBe(false)
  })

  it('rejects wrong kind', () => {
    expect(
      parseCommsWsTicketClaims({
        sub: 'user-1',
        role: 'Contributor',
        kind: 'other',
        channels: [],
      }),
    ).toBeNull()
  })
})
