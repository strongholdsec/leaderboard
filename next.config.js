/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  eslint: {
    dirs: ['app', 'features', 'components', 'hooks'],
  },
};

module.exports = nextConfig;
