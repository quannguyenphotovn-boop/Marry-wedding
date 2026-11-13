// Next.js `output: "standalone"` does not copy `public/` or `.next/static/`
// into the standalone bundle — this is documented, expected behavior, not a
// bug. This script copies both into place after every build so that
// `.next/standalone/server.js` can run completely on its own (the exact
// requirement for Hostinger's single-entry-file Node.js App hosting).
import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

async function copyIfExists(from, to) {
  if (!existsSync(from)) return;
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
  console.log(`copied ${path.relative(root, from)} -> ${path.relative(root, to)}`);
}

async function main() {
  if (!existsSync(standaloneDir)) {
    console.log("No .next/standalone directory found — skipping asset copy.");
    return;
  }

  await copyIfExists(path.join(root, "public"), path.join(standaloneDir, "public"));
  await copyIfExists(
    path.join(root, ".next", "static"),
    path.join(standaloneDir, ".next", "static"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
