const path = require('path')

/**
 * Dev-only webpack tweaks for Next.js market apps.
 * Disables persistent pack cache, pins workspace packages to source (not stale dist),
 * and keeps shared client/server entrypoints on one module graph.
 */
function patchWebpackForDev(config, { dev, dir }) {
  if (!dev) return config

  config.cache = false

  const sharedSrc = path.resolve(dir, '../../packages/shared/src')
  const designSystemSrc = path.resolve(dir, '../../packages/design-system/src')

  config.resolve.alias = {
    ...config.resolve.alias,
    '@mediabubble/shared/client': path.join(sharedSrc, 'client.ts'),
    '@mediabubble/shared/server': path.join(sharedSrc, 'server.ts'),
    '@mediabubble/shared/ui/marketing-kicker': path.join(
      sharedSrc,
      'ui/marketing-kicker.ts',
    ),
    '@mediabubble/design-system': path.join(designSystemSrc, 'index.ts'),
    '@mediabubble/design-system/tailwind-preset': path.join(
      designSystemSrc,
      'tailwind-preset.ts',
    ),
  }

  // Workspace packages change often; don't treat them as immutable node_modules snapshots.
  config.snapshot = {
    ...(config.snapshot ?? {}),
    managedPaths: [],
  }

  return config
}

module.exports = { patchWebpackForDev }
