/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  images: {
    domains: ['media.giphy.com'],
    //formats: ['image/avif', 'image/webp'],
  },
}
