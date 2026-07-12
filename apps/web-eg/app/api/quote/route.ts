import { NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  env,
  isValidEmail,
  sendContactEmail,
  syncContactToHubSpot,
} from '@mediabubble/shared/server'

interface QuotePayload {
  // Step 1
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  companySize: string

  // Step 2
  service: string
  budget: string
  timeline: string
  currentSituation: string

  // Step 3
  goals: string
  competitors?: string
  websiteUrl?: string
  additionalRequirements?: string
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const limit = checkRateLimit(`quote:${ip}`, 3, 60 * 60 * 1000) // 3 per hour
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many quote requests. Please wait before submitting again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    )
  }

  let body: QuotePayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, email, phone, companyName, companySize, service, budget, timeline, currentSituation, goals } = body

  // Validation
  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json({ error: 'First and last name are required' }, { status: 422 })
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 })
  }
  if (!phone?.trim()) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 422 })
  }
  if (!companyName?.trim()) {
    return NextResponse.json({ error: 'Company name is required' }, { status: 422 })
  }
  if (!service?.trim()) {
    return NextResponse.json({ error: 'Service selection is required' }, { status: 422 })
  }
  if (!budget?.trim()) {
    return NextResponse.json({ error: 'Budget range is required' }, { status: 422 })
  }
  if (!currentSituation?.trim()) {
    return NextResponse.json({ error: 'Current situation description is required' }, { status: 422 })
  }
  if (!goals?.trim()) {
    return NextResponse.json({ error: 'Business goals are required' }, { status: 422 })
  }

  try {
    // Send internal notification email
    await sendContactEmail({
      firstName,
      lastName,
      email,
      phone,
      service,
      message: `Quote Request\n\nCompany: ${companyName}\nSize: ${companySize}\nBudget: ${budget}\nTimeline: ${timeline}\n\nCurrent Situation:\n${currentSituation}\n\nGoals:\n${goals}\n${body.competitors ? `\nCompetitors: ${body.competitors}` : ''}${body.websiteUrl ? `\nWebsite: ${body.websiteUrl}` : ''}${body.additionalRequirements ? `\n\nAdditional Requirements:\n${body.additionalRequirements}` : ''}`,
    })
  } catch (err) {
    console.error('[Quote] Email delivery error:', err)
    return NextResponse.json({ error: 'Failed to process quote request. Please try again.' }, { status: 500 })
  }

  try {
    // Sync to HubSpot as deal/contact
    await syncContactToHubSpot({
      email,
      firstName,
      lastName,
      phone,
      service,
    })
  } catch (err) {
    console.error('[Quote] HubSpot sync error:', err)
    // Continue even if HubSpot sync fails - the email was sent successfully
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
