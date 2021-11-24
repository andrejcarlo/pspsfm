/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    domains: ['media.giphy.com'],
    //formats: ['image/avif', 'image/webp'],
  },
}
