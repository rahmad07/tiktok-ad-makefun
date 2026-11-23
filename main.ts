// main.ts — entry program for the bring-the-humans-03 bounty.
// Copies VIDEO.json from this repository to /output, nothing else.
// The house reads the TikTok video itself from the URL in VIDEO.json,
// and writes its own reading of the video's counts to /output/video.counts.json.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

// Fail fast on a malformed VIDEO.json instead of copying a broken file.
const video = JSON.parse(readFileSync(join(botDir, "VIDEO.json"), "utf8"));
if (typeof video.url !== "string" || !video.url.startsWith("https://www.tiktok.com/")) {
  throw new Error("VIDEO.json must name a tiktok.com video URL");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
