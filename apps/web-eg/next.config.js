const { composePlugins, withNx } = require('@nx/next')
const withPWA = require('@ducanh2912/next-pwa').default
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const {
  buildNextHeaders,
} = require('../../packages/shared/security-headers.cjs')
const { buildNextImageConfig } = require('../../packages/shared/next-image-config.cjs')
const { buildPwaConfig } = require('../../packages/shared/next-pwa-config.cjs')
const { patchWebpackForDev } = require('../../packages/shared/next-webpack-dev.cjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mediabubble/design-system'],
  images: buildNextImageConfig(),
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  nx: {
    svgr: false,
  },
}

nextConfig.headers = async () => buildNextHeaders()
nextConfig.redirects = async () => [
  // SEO: preserve old URLs after blog→insights / portfolio→case-studies rename
  { source: '/blog', destination: '/insights', permanent: true },
  { source: '/blog/:path*', destination: '/insights/:path*', permanent: true },
  { source: '/portfolio', destination: '/case-studies', permanent: true },
  { source: '/portfolio/:path*', destination: '/case-studies/:path*', permanent: true },
]
nextConfig.webpack = (config, context) => patchWebpackForDev(config, context)

const plugins = [withNx, withBundleAnalyzer]
if (process.env.NODE_ENV !== 'development') {
  plugins.push(withPWA(buildPwaConfig({ offlinePath: '/offline' })))
}
module.exports = composePlugins(...plugins)(nextConfig)
