import { rmSync, existsSync } from "node:fs";

// Hostinger's build pipeline can persist .next/cache across deploys even
// though it re-clones the repo fresh each time. A stale webpack resolve
// cache from an earlier commit then causes "Module not found" errors for
// files that didn't exist yet when that cache was written. Force a clean
// slate before every build.
if (existsSync(".next")) {
  rmSync(".next", { recursive: true, force: true });
}
