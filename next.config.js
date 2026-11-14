/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces .next/standalone/server.js — a single, self-contained Node.js
  // entry point that listens on process.env.PORT. Used unchanged as the
  // startup file for both the Hostinger hPanel "Setup Node.js App" feature
  // (Passenger) and PM2 on a VPS — see DEPLOY.md and scripts/copy-standalone-assets.mjs.
  output: "standalone",
  images: {
    // Avoid a hard dependency on the native `sharp` binary, which can fail
    // to install on restricted Hostinger shared hosting.
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Hostinger's build container intermittently failed to resolve a handful
  // of "@/..." aliased imports ("Module not found") even though the same
  // imports resolve fine elsewhere in the same build and locally — a
  // classic symptom of a race condition across Next's parallel build
  // workers. Forcing a single worker trades a little build speed for a
  // deterministic build on shared/constrained hosting.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

module.exports = nextConfig;
