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
  // Hostinger's build container intermittently fails to resolve a
  // *different* small set of "@/..." aliased imports on every single
  // build attempt ("Module not found"), even though every one of those
  // exact imports resolves fine elsewhere in the same build and every
  // time locally. Since it's a different file each time, it isn't a
  // real missing-file bug — it's webpack's resolver cache (and/or its
  // on-disk persistent cache) returning a stale/incomplete result under
  // whatever disk or scheduling constraints this container has. Turning
  // both caches off trades a little build speed for a deterministic
  // build.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  webpack: (config) => {
    config.cache = false;
    config.resolve.unsafeCache = false;
    return config;
  },
};

module.exports = nextConfig;
