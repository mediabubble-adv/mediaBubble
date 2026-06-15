import { z } from 'zod'

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  HUBSPOT_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_BUSINESS_PHONE: z.string().optional(),
})

export type Env = z.infer<typeof envSchema> & {
  CONTACT_EMAIL: string
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_BUSINESS_PHONE?: string
}

function readRawEnv() {
  return {
    RESEND_API_KEY: process.env['RESEND_API_KEY'] ?? '',
    HUBSPOT_API_KEY: process.env['HUBSPOT_API_KEY'],
    CONTACT_EMAIL: process.env['CONTACT_EMAIL'],
    NEXT_PUBLIC_SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'],
    NEXT_PUBLIC_GA4_ID: process.env['NEXT_PUBLIC_GA4_ID'],
    NEXT_PUBLIC_BUSINESS_PHONE: process.env['NEXT_PUBLIC_BUSINESS_PHONE'],
  }
}

function parseEnv(): Env {
  const parsed = envSchema.safeParse(readRawEnv())

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    const lines = Object.entries(fieldErrors).map(
      ([key, errors]) => `  ${key}: ${errors?.join(', ')}`,
    )
    throw new Error(
      `[env] Invalid environment variable(s):\n${lines.join('\n')}\n` +
        'Copy .env.example → .env.local and fill in the values.',
    )
  }

  return {
    ...parsed.data,
    CONTACT_EMAIL: parsed.data.CONTACT_EMAIL ?? 'hello@mediabubble.com',
    NEXT_PUBLIC_SITE_URL: parsed.data.NEXT_PUBLIC_SITE_URL ?? 'https://mediabubble.com',
  }
}

let cached: Env | null = null

function getEnv(): Env {
  if (!cached) {
    cached = parseEnv()
  }
  return cached
}

export function validateEnv(): void {
  getEnv()

  const warned: string[] = []
  if (!process.env['HUBSPOT_API_KEY']) warned.push('HUBSPOT_API_KEY (CRM sync disabled)')
  if (!process.env['NEXT_PUBLIC_GA4_ID']) warned.push('NEXT_PUBLIC_GA4_ID (analytics disabled)')
  if (warned.length > 0) {
    console.warn(`[env] Optional vars not set — ${warned.join('; ')}`)
  }
}

export const env: Env = {
  get RESEND_API_KEY() {
    return getEnv().RESEND_API_KEY
  },
  get HUBSPOT_API_KEY() {
    return getEnv().HUBSPOT_API_KEY
  },
  get CONTACT_EMAIL() {
    return getEnv().CONTACT_EMAIL
  },
  get NEXT_PUBLIC_SITE_URL() {
    return getEnv().NEXT_PUBLIC_SITE_URL
  },
  get NEXT_PUBLIC_GA4_ID() {
    return getEnv().NEXT_PUBLIC_GA4_ID
  },
  get NEXT_PUBLIC_BUSINESS_PHONE() {
    return getEnv().NEXT_PUBLIC_BUSINESS_PHONE
  },
}
