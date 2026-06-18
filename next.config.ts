import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.zillowstatic.com",
        port: "",
        pathname: "/fp/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
