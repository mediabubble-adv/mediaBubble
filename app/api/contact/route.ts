import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  firstName: string
  lastName:  string
  email:     string
  phone?:    string
  service?:  string
  message:   string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: ContactPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, email, message } = body

  // Server-side validation
  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json({ error: 'First and last name are required' }, { status: 422 })
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 })
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json({ error: 'Please provide a message of at least 10 characters' }, { status: 422 })
  }

  // ─── Delivery ────────────────────────────────────────────────────────────────
  // Replace this block with your preferred delivery method:
  //
  // Option A — Resend:
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({ from: '...', to: '...', subject: '...', text: '...' })
  //
  // Option B — Nodemailer / SMTP:
  //   configure via process.env.SMTP_HOST / SMTP_USER / SMTP_PASS
  //
  // Option C — Forward to a CRM webhook:
  //   await fetch(process.env.CRM_WEBHOOK_URL!, { method: 'POST', body: JSON.stringify(body) })
  // ─────────────────────────────────────────────────────────────────────────────

  // Log in development; swap for real delivery in production
  if (process.env.NODE_ENV === 'development') {
    console.log('[Contact form submission]', {
      name:    `${firstName} ${lastName}`,
      email,
      phone:   body.phone ?? '—',
      service: body.service ?? '—',
      message,
    })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
