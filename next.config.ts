import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wvzctetqhvqohlxkhpxv.supabase.co",
        port: "", // leave empty unless using a custom port
        pathname: "/storage/v1/object/public/**", // optional, restrict to your bucket
      },
    ],
  },
};

export default nextConfig;
