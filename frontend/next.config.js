/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.themoviedb.org', 's.gravatar.com'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
