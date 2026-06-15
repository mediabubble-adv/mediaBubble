import inlineScripts from '../inline-scripts.cjs'

/**
 * Runs synchronously in layout `<head>` during dev, before webpack chunks load.
 * Clears stale PWA/service-worker caches and reloads when webpack chunks mismatch.
 */
export const DEV_SW_CLEANUP_SCRIPT = inlineScripts.DEV_SW_CLEANUP_SCRIPT as string
