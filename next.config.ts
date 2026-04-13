import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-d7df68395d644bd3bc80d24168d6d8be.r2.dev",
      },
    ],
  },
};

export default nextConfig;
