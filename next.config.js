/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack').default({
        compiler: 'jsx',
        jsx: 'react'
      })
    )
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skku-chat.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
