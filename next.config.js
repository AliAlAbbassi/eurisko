/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'http://34.245.213.76:3000/auth/signin' // Proxy to Backend
      },
      {
        source: '/api/articles',
        destination: 'http://34.245.213.76:3000/articles' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
