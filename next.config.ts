import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '', // Leave empty unless the URL has a specific port
        pathname: '**', // Allow all paths
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '', // Leave empty unless the URL has a specific port
        pathname: '**', // Allow all paths
      },
    ],
  },
};

export default nextConfig;
