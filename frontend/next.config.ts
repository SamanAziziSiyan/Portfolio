import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingRoot: path.resolve(__dirname, ".."),
  turbopack: { root: path.resolve(__dirname, "..") },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/projects/:slug", destination: "/#work", permanent: true },
      { source: "/products", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
