#!/usr/bin/env node
/**
 * Google Flow asset verification — no dependencies, Node only.
 *
 * Usage:  node scripts/check-flow-assets.mjs
 *
 * Checks, for every asset in lib/flow-assets.ts:
 *   - public/videos/<file> exists, extension .mp4, MP4 "ftyp" signature, size
 *   - public/images/<poster> exists, extension .jpg/.jpeg, JPEG signature, size
 *   - warns when a file is > 15 MB (FLOW_ASSET_WORKFLOW.md target)
 *
 * Exit code: 0 = all videos + posters READY
 *            1 = koi video/poster missing ya corrupt (site phir bhi chalegi,
 *                placeholder dikhega — ye deploy-readiness check hai, build
 *                failure nahi). Is script ko npm run build se link nahi kiya
 *                gaya taake missing Flow videos build ko rok na saken.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MB = 1024 * 1024;
const WARN_MB = 15;

function fmt(bytes) {
  return bytes >= MB ? `${(bytes / MB).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
}

// Config ko hardcode karne ki bajaye lib/flow-assets.ts se parse karo,
// taake config aur script kabhi out-of-sync na hon.
const configText = readFileSync(join(root, "lib/flow-assets.ts"), "utf8");
const assetRe =
  /file:\s*"([^"]+\.mp4)"[\s\S]*?poster:\s*"([^"]+\.(?:jpg|jpeg))"[\s\S]*?section:\s*"([^"]+)"/g;
const assets = [...configText.matchAll(assetRe)].map((m) => ({
  file: m[1],
  poster: m[2],
  section: m[3],
}));

if (assets.length === 0) {
  console.error("ERROR: lib/flow-assets.ts me koi Flow asset nahi mila.");
  process.exit(2);
}

function checkFile(relPath, kind) {
  const full = join(root, relPath);
  if (!existsSync(full)) return { status: "MISSING", detail: "file nahi mili" };
  const stat = statSync(full);
  if (stat.size === 0) return { status: "EMPTY", detail: "0 bytes — corrupt/empty file" };
  const head = readFileSync(full).subarray(0, 12);
  if (kind === "video") {
    const isMp4 = head.subarray(4, 8).toString("ascii") === "ftyp";
    if (!isMp4) return { status: "BAD FORMAT", detail: "MP4 signature (ftyp) nahi mili" };
  } else {
    const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
    if (!isJpeg) return { status: "BAD FORMAT", detail: "JPEG signature nahi mili" };
  }
  const warn = stat.size > WARN_MB * MB ? `  ⚠ ${WARN_MB} MB se bari — compress karo` : "";
  return { status: "READY", detail: `${fmt(stat.size)}${warn}` };
}

console.log("Google Flow assets — verification");
console.log(`Project: ${root}`);
console.log("=".repeat(60));

let readyVideos = 0;
let readyPosters = 0;
let problems = 0;

for (const a of assets) {
  const v = checkFile(`public/videos/${a.file}`, "video");
  const p = checkFile(`public/images/${a.poster}`, "poster");
  if (v.status === "READY") readyVideos += 1;
  else problems += 1;
  if (p.status === "READY") readyPosters += 1;
  else problems += 1;
  console.log(`\n[${a.section}]`);
  console.log(`  video  public/videos/${a.file}  → ${v.status} (${v.detail})`);
  console.log(`  poster public/images/${a.poster} → ${p.status} (${p.detail})`);
}

// Folders bhi verify karo
for (const dir of ["public/videos", "public/images", "public/models"]) {
  if (!existsSync(join(root, dir))) {
    console.log(`\n⚠ Folder missing: ${dir}`);
    problems += 1;
  }
}

console.log("\n" + "=".repeat(60));
console.log(`Videos:  ${readyVideos}/${assets.length} READY`);
console.log(`Posters: ${readyPosters}/${assets.length} READY`);
if (problems === 0) {
  console.log("✅ Sab assets tayyar — deployment ke liye Flow hissa complete hai.");
  process.exit(0);
} else {
  console.log(
    "⏳ Kuch assets missing/corrupt hain — site placeholder ke saath chalegi, " +
      "lekin deploy se pehle FLOW_PROMPTS_CHECKLIST.md complete karo."
  );
  process.exit(1);
}
