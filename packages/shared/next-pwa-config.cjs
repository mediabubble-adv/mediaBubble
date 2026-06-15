/** Workbox runtime caching + offline fallback for market Next.js apps. */

/**
 * @param {{ offlinePath?: string }} [options]
 */
function buildPwaConfig(options = {}) {
  const { offlinePath = '/offline' } = options

  return {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: process.env.NODE_ENV !== 'development',
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    fallbacks: {
      document: offlinePath,
    },
    workboxOptions: {
      disableDevLogs: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /\/_next\/static\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'next-static',
            expiration: { maxEntries: 64, maxAgeSeconds: 365 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /\/assets\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-assets',
            expiration: { maxEntries: 64, maxAgeSeconds: 7 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
            networkTimeoutSeconds: 10,
          },
        },
      ],
    },
  }
}

module.exports = { buildPwaConfig }
