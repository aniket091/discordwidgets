import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/aniket091/discordwidgets",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/GaczkwfgV9",
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
