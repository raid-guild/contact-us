import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/deck",
        destination: "/rg_deck.pdf",
        permanent: false, // true if you want a 308 permanent redirect
      },
      {
        source: "/cohort-xi",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSfvm7FPLE5hH0jQRnPjFAV-PRFHofDGEwm68YOq_-E96P56cA/viewform",
        permanent: false, // true if you want a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
