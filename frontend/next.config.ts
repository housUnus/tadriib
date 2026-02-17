// next.config.js
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ignore TS errors during production build
  },
   publicRuntimeConfig: {
      NEXT_PUBLIC_API_SERVER_BASE_URL: process.env.NEXT_PUBLIC_API_SERVER_BASE_URL,
  },
  productionBrowserSourceMaps: false, // disable source maps in prod to save memory
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'sgp1.vultrobjects.com',
        pathname: '/media/**',
      },
    ],
  },
};

// Wrap with NextIntl plugin
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
