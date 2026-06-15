import { NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  env,
  isValidEmail,
  sendContactEmail,
  syncContactToHubSpot,
} from '@mediabubble/shared/server'

interface ContactPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  service?: string
  message: string
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const limit = checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000)
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

  let body: ContactPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, email, message } = body

  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json({ error: 'First and last name are required' }, { status: 422 })
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 })
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json(
      { error: 'Please provide a message of at least 10 characters' },
      { status: 422 },
    )
  }

  try {
    await sendContactEmail(body)
  } catch (err) {
    console.error('[Contact] Email delivery error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  try {
    await syncContactToHubSpot({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      service: body.service,
    })
  } catch (err) {
    console.error('[Contact] HubSpot sync error:', err)
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
