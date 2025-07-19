import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "s3.sellerpintar.com",
      },
      {
        protocol: "https",
        hostname: "assets.example.com",
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
