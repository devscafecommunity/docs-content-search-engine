/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'raw.githubusercontent.com', 'cafe-content.vercel.app'],
  },
}

module.exports = nextConfig
