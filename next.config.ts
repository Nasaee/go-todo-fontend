import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // This is the source domain
        // You may optionally restrict to specific paths if needed,
        // but for this example, we allow all paths from this host.
      },
    ],
  },
};

export default nextConfig;
