// POST /api/profile/avatar — upload an avatar image for the current user.

import path from 'path'
import fs from 'fs/promises'
import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const formData = await req.formData()
  const file = formData.get('avatar')

  if (!(file instanceof File)) {
    return toResponse(fail('validation_error', 'No file provided', 400))
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return toResponse(
      fail('validation_error', 'Only JPEG, PNG, WebP, or GIF images are allowed', 400),
    )
  }
  if (file.size > MAX_SIZE) {
    return toResponse(fail('validation_error', 'File must be under 2 MB', 400))
  }

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
  const filename = `${me.id}.${ext}`
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'avatars')
  await fs.mkdir(uploadsDir, { recursive: true })
  const filePath = path.join(uploadsDir, filename)
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)

  const avatarUrl = `/uploads/avatars/${filename}`
  await prisma.users.update({
    where: { id: me.id },
    data: { avatar_url: avatarUrl },
  })

  return toResponse(ok({ avatar_url: avatarUrl }, 'Avatar updated'))
}
