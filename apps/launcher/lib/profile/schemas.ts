import { z } from 'zod'

const HTTPS_URL_MAX = 500

function optionalHttpsUrl(hostnameHint?: string) {
  return z
    .union([z.string().max(HTTPS_URL_MAX), z.literal(''), z.null()])
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined
      if (val === '' || val === null) return null
      return val
    })
    .pipe(
      z
        .string()
        .url('Must be a valid URL')
        .max(HTTPS_URL_MAX)
        .refine((url) => url.startsWith('https://'), 'URL must use https://')
        .refine(
          (url) => {
            if (!hostnameHint) return true
            try {
              const host = new URL(url).hostname.replace(/^www\./, '')
              return host === hostnameHint || host.endsWith(`.${hostnameHint}`)
            } catch {
              return false
            }
          },
          hostnameHint
            ? `URL must be a ${hostnameHint} link`
            : 'Invalid URL',
        )
        .nullable()
        .optional(),
    )
}

export const profilePatchSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(255).optional(),
    avatar_url: z.string().url('Must be a valid URL').max(1024).nullable().optional(),
    bio: z
      .union([z.string().max(500, 'Bio must be 500 characters or fewer'), z.literal(''), z.null()])
      .optional()
      .transform((val) => {
        if (val === undefined) return undefined
        if (val === '' || val === null) return null
        return val
      }),
    linkedin_url: optionalHttpsUrl('linkedin.com'),
    instagram_url: optionalHttpsUrl('instagram.com'),
    behance_url: optionalHttpsUrl('behance.net'),
    website_url: optionalHttpsUrl(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.avatar_url !== undefined ||
      data.bio !== undefined ||
      data.linkedin_url !== undefined ||
      data.instagram_url !== undefined ||
      data.behance_url !== undefined ||
      data.website_url !== undefined,
    { message: 'At least one field must be provided' },
  )

export type ProfilePatchInput = z.infer<typeof profilePatchSchema>

export const PROFILE_SELECT = {
  id: true,
  name: true,
  email: true,
  avatar_url: true,
  role: true,
  department_id: true,
  bio: true,
  linkedin_url: true,
  instagram_url: true,
  behance_url: true,
  website_url: true,
} as const
