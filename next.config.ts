import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tpydtjqfqtbaoyxbgljg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
