const TASK_FILES_BUCKET = 'task-files'
const MAX_FILE_BYTES = 25 * 1024 * 1024

const ALLOWED_MIME_PREFIXES = ['image/'] as const
const ALLOWED_MIME_EXACT = new Set([
  'application/pdf',
  'application/zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.ms-excel',
])

export function isAllowedTaskMime(mime: string): boolean {
  if (ALLOWED_MIME_PREFIXES.some((p) => mime.startsWith(p))) return true
  return ALLOWED_MIME_EXACT.has(mime)
}

export function assertFileSize(size: number): void {
  if (size > MAX_FILE_BYTES) {
    throw new Error(`File exceeds ${MAX_FILE_BYTES / (1024 * 1024)} MB limit`)
  }
}

export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200)
}

export function buildTaskStoragePath(taskId: string, fileName: string): string {
  const id = crypto.randomUUID()
  return `${taskId}/${id}-${sanitizeFileName(fileName)}`
}

function requireSupabaseEnv(): { url: string; key: string } {
  const url = process.env['SUPABASE_URL']?.trim()
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY']?.trim()
  if (!url || !key) {
    throw new Error('Supabase storage is not configured (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)')
  }
  return { url: url.replace(/\/$/, ''), key }
}

export async function uploadTaskFile(
  storagePath: string,
  body: Buffer,
  mimeType: string,
): Promise<void> {
  const { url, key } = requireSupabaseEnv()
  const res = await fetch(`${url}/storage/v1/object/${TASK_FILES_BUCKET}/${storagePath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': mimeType,
      'x-upsert': 'false',
    },
    body: new Uint8Array(body),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Upload failed (${res.status}): ${text || res.statusText}`)
  }
}

export async function createTaskFileSignedUrl(
  storagePath: string,
  expiresIn = 3600,
): Promise<string> {
  const { url, key } = requireSupabaseEnv()
  const res = await fetch(
    `${url}/storage/v1/object/sign/${TASK_FILES_BUCKET}/${storagePath}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expiresIn }),
    },
  )
  if (!res.ok) {
    throw new Error(`Signed URL failed (${res.status})`)
  }
  const json = (await res.json()) as { signedURL?: string }
  if (!json.signedURL) throw new Error('Signed URL missing from response')
  return json.signedURL.startsWith('http') ? json.signedURL : `${url}/storage/v1${json.signedURL}`
}

export async function deleteTaskFile(storagePath: string): Promise<void> {
  const { url, key } = requireSupabaseEnv()
  await fetch(`${url}/storage/v1/object/${TASK_FILES_BUCKET}/${storagePath}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${key}` },
  })
}

export { TASK_FILES_BUCKET, MAX_FILE_BYTES }
