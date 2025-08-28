import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/deck",
        destination: "/rg_deck.pdf",
        permanent: false, // true if you want a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
