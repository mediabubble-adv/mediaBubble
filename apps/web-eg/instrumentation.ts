import { validateEnv } from '@mediabubble/shared/server'

export async function register() {
  // Only validate on the Node.js server runtime, not Edge
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    validateEnv()
  }
}
