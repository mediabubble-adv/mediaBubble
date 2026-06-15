const { composePlugins, withNx } = require('@nx/next')
const {
  buildImageRemotePatterns,
  buildNextHeaders,
} = require('../../packages/shared/security-headers.cjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mediabubble/design-system'],
  images: {
    remotePatterns: buildImageRemotePatterns(),
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  nx: {
    svgr: false,
  },
}

nextConfig.headers = async () => buildNextHeaders()

const plugins = [withNx]
module.exports = composePlugins(...plugins)(nextConfig)
