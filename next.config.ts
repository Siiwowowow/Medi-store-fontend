import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**",
      },
    ],
    qualities: [25, 50, 75, 80, 90],
    // Cloudinary already serves optimized images — skip Next.js server-side
    // re-optimization which causes 7s+ fetch timeouts
    unoptimized: true,
    minimumCacheTTL: 60,
  },
  // 👇👇👇 ADD THIS REWRITES CONFIGURATION 👇👇👇
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
  // 👆👆👆 END OF REWRITES 👆👆👆
};

export default nextConfig;