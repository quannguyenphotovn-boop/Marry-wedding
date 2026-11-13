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
};

module.exports = nextConfig;
