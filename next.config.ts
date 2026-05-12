import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "7d08-2401-4900-1c46-c3d0-bc48-99ba-b14a-99fd.ngrok-free.app",
    "*.ngrok-free.app",
  ],
  images: {
    qualities: [75, 80, 90, 92, 100],
  },
};

export default nextConfig;
