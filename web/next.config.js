const path = require('path')
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: projectId ? `/images/${projectId}/**` : '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'app'), path.join(process.cwd(), 'styles')],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule && typeof rule === 'object' && rule.test?.test?.('.svg'),
    )

    if (fileLoaderRule) {
      config.module.rules.push(
        {...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/},
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/],
          },
          use: ['@svgr/webpack'],
        },
      )
      fileLoaderRule.exclude = /\.svg$/i
    }
    return config
  },
}

module.exports = nextConfig
