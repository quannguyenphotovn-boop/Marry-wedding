// PM2 process config for VPS deployment. Not used by Hostinger's hPanel
// "Setup Node.js App" (Passenger) — that feature runs the startup file
// directly. See DEPLOY.md for both paths.
//
// Secrets are NOT set here. Either:
//  (a) create a real .env on the server before `npm run build` — Next.js
//      copies it into .next/standalone/.env automatically, or
//  (b) export real environment variables in the shell/systemd unit that
//      starts PM2 — those always take priority over the copied .env.
module.exports = {
  apps: [
    {
      name: "marry-wedding",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork", // never "cluster" if DATABASE_URL uses the SQLite fallback — see DEPLOY.md
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
