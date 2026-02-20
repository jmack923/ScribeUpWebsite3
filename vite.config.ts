import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { execSync } from "node:child_process";

function safeGitSha() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

const buildSha =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.COMMIT_SHA ||
  safeGitSha() ||
  "";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwind()],
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha ? buildSha.slice(0, 7) : "dev"),
  },
  server: {
    port: 9000,
    // Prevent stale bundles/CSS in aggressive browser caches while iterating locally.
    headers: {
      "Cache-Control": "no-store",
    },
  },
});
