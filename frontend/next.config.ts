// next.config.js
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ignore TS errors during production build
  },
  productionBrowserSourceMaps: false, // disable source maps in prod to save memory
  reactStrictMode: true,
};

// Wrap with NextIntl plugin
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
