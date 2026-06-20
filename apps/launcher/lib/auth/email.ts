import { isProduction } from './config'

const RESEND_API_KEY = process.env['RESEND_API_KEY']
const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3003'

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  if (!RESEND_API_KEY) {
    if (isProduction()) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    // eslint-disable-next-line no-console
    console.log(`[Email Mock] Verification email to ${email}: token=${token}`)
    return
  }

  const link = `${SITE_URL}/verify-email?token=${token}`
  const html = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #1f2128; border-radius: 12px; background-color: #121418; color: #e8e8e8;">
      <h2 style="color: #3b82f6; margin-top: 0;">Verify your email address</h2>
      <p style="font-size: 14px; line-height: 1.5; color: #a0aec0;">
        Thank you for signing up for the MediaBubble Launcher operations platform. Click the button below to verify your email address and activate your account:
      </p>
      <div style="margin: 24px 0; text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: bold; color: #ffffff; background-color: #3b82f6; border-radius: 8px; text-decoration: none;">
          Verify Email
        </a>
      </div>
      <p style="font-size: 12px; color: #718096; margin-bottom: 0;">
        If the button above does not work, copy and paste the link below into your browser:
        <br />
        <a href="${link}" style="color: #3b82f6; word-break: break-all;">${link}</a>
      </p>
    </div>
  `

  await deliver({
    to: email,
    subject: 'Verify your email address - MediaBubble Launcher',
    html,
  })
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  if (!RESEND_API_KEY) {
    if (isProduction()) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    // eslint-disable-next-line no-console
    console.log(`[Email Mock] Password reset email to ${email}: token=${token}`)
    return
  }

  const link = `${SITE_URL}/reset-password?token=${token}`
  const html = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #1f2128; border-radius: 12px; background-color: #121418; color: #e8e8e8;">
      <h2 style="color: #3b82f6; margin-top: 0;">Reset your password</h2>
      <p style="font-size: 14px; line-height: 1.5; color: #a0aec0;">
        A password reset request was made for your MediaBubble Launcher account. Click the button below to choose a new password:
      </p>
      <div style="margin: 24px 0; text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: bold; color: #ffffff; background-color: #3b82f6; border-radius: 8px; text-decoration: none;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 12px; color: #718096; margin-bottom: 0;">
        If you did not request a password reset, please ignore this email. The link will expire in 2 hours.
        <br /><br />
        If the button above does not work, copy and paste the link below into your browser:
        <br />
        <a href="${link}" style="color: #3b82f6; word-break: break-all;">${link}</a>
      </p>
    </div>
  `

  await deliver({
    to: email,
    subject: 'Reset your password - MediaBubble Launcher',
    html,
  })
}

async function deliver(payload: { to: string; subject: string; html: string }): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MediaBubble Launcher <noreply@mediabubble.com>',
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend delivery failed (${res.status}): ${detail}`)
  }
}
