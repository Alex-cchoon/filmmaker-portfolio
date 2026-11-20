import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
  // The site is now one page — old page links go to the matching section.
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/hire", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
