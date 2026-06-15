import { validateEnv } from '@mediabubble/shared/server'

export async function register() {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    validateEnv()
  }
}
