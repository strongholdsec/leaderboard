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
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      // type: 'json',
      use: 'yaml-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
