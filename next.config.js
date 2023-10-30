/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  basePath,
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  eslint: {
    dirs: ['app', 'features', 'components', 'hooks'],
  },
};

module.exports = nextConfig;
