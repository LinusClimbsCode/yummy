import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      // add any other domains you want to support
    ],
  },
};

export default nextConfig;
