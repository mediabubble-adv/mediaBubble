const { composePlugins, withNx } = require('@nx/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mediabubble/design-system'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  nx: {
    svgr: false,
  },
}

const plugins = [withNx]
module.exports = composePlugins(...plugins)(nextConfig)
