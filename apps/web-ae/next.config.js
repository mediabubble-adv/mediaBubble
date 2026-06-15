const { composePlugins, withNx } = require('@nx/next')
const withPWA = require('@ducanh2912/next-pwa').default
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
    optimizePackageImports: ['lucide-react'],
  },
  nx: {
    svgr: false,
  },
}

nextConfig.headers = async () => buildNextHeaders()
nextConfig.webpack = (config, context) => patchWebpackForDev(config, context)

const plugins = [withNx]
if (process.env.NODE_ENV !== 'development') {
  plugins.push(withPWA(buildPwaConfig({ offlinePath: '/offline' })))
}
module.exports = composePlugins(...plugins)(nextConfig)
