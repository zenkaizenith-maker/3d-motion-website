#!/usr/bin/env node
/**
 * Build-time Flow asset manifest.
 *
 * Usage:  node scripts/generate-flow-manifest.mjs
 * Also runs automatically before `npm run dev` and `npm run build`
 * (package.json: predev / prebuild).
 *
 * Why this exists: missing videos/posters ki har request (chahe <video>
 * tag ho ya fetch HEAD) browser console me 404 error banati hai. Is liye
 * FlowVideo pehle sirf YE EK manifest file mangta hai (jo hamesha
 * maujood hoti hai, 200 deti hai) aur us se jaanta hai ke kaunsi file
 * hai aur kaunsi nahi. Missing file ki request kabhi bheji hi nahi jati,
 * is liye console me koi 404 nahi aata.
 *
 * Trade-off (documented): video public/ me rakhne ke BAAD production ke
 * liye dobara `npm run build` chalana zaroori hai taake manifest fresh ho.
 * Dev me server restart (ya ye script dobara) manifest refresh kar deta hai.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const configText = readFileSync(join(root, "lib/flow-assets.ts"), "utf8");
const assetRe =
  /file:\s*"([^"]+\.mp4)"[\s\S]*?poster:\s*"([^"]+\.(?:jpg|jpeg))"/g;
const assets = [...configText.matchAll(assetRe)].map((m) => ({
  file: m[1],
  poster: m[2],
}));

const manifest = {
  generatedAt: new Date().toISOString(),
  videos: {},
  posters: {},
};
for (const a of assets) {
  manifest.videos[a.file] = existsSync(join(root, "public/videos", a.file));
  manifest.posters[a.poster] = existsSync(join(root, "public/images", a.poster));
}

writeFileSync(
  join(root, "public/flow-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);
console.log(
  `flow-manifest.json likha: ${assets.length} assets, ` +
    `${Object.values(manifest.videos).filter(Boolean).length} videos + ` +
    `${Object.values(manifest.posters).filter(Boolean).length} posters maujood.`
);
