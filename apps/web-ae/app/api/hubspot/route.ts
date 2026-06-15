import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp, upsertContact } from '@mediabubble/shared/server'

interface ContactPayload {
  email: string
  name?: string
  phone?: string
  service_interest?: string
}

function validatePayload(
  body: unknown,
): { data: ContactPayload; error?: never } | { data?: never; error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request body' }
  const { email, name, phone, service_interest } = body as Record<string, unknown>

  if (!email || typeof email !== 'string') return { error: 'email is required' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'email is invalid' }
  if (name !== undefined && typeof name !== 'string') return { error: 'name must be a string' }
  if (phone !== undefined && typeof phone !== 'string') return { error: 'phone must be a string' }
  if (service_interest !== undefined && typeof service_interest !== 'string') {
    return { error: 'service_interest must be a string' }
  }

  return {
    data: {
      email,
      name: name as string | undefined,
      phone: phone as string | undefined,
      service_interest: service_interest as string | undefined,
    },
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const limit = checkRateLimit(`hubspot:${ip}`, 10, 15 * 60 * 1000)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before submitting again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 })
  }

  const validation = validatePayload(body)
  if (validation.error) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  try {
    const { contactId } = await upsertContact(validation.data!)
    return NextResponse.json({ success: true, contactId })
  } catch (err) {
    console.error('[HubSpot API error]:', err)
    return NextResponse.json(
      { error: 'Unable to save your details. Please try again later.' },
      { status: 500 },
    )
  }
}
