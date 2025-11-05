/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["via.placeholder.com"],
    unoptimized: false,
  },
  // Remove configurações experimentais que podem causar problemas no Vercel
  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, '../'),
  // },
};

module.exports = nextConfig;
