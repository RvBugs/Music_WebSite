import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ['wandlike-scrimpiest-emelda.ngrok-free.dev'],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    }
  }
}

export default nextConfig
