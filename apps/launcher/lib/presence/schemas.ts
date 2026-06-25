import { z } from 'zod'
import { USER_SETTABLE_PRESENCE } from './constants'

export const presencePatchSchema = z.object({
  status: z.enum(USER_SETTABLE_PRESENCE),
  status_message: z
    .union([z.string().max(100, 'Status message must be 100 characters or fewer'), z.literal(''), z.null()])
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined
      if (val === '' || val === null) return null
      return val
    }),
})

export type PresencePatchInput = z.infer<typeof presencePatchSchema>
