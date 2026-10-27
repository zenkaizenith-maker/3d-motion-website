"use client";

import { useEffect, useState } from "react";
import { videoUrl, posterUrl } from "@/lib/flow-assets";

type Props = {
  file: string;
  poster: string;
  label: string;
  className?: string;
};

type Manifest = {
  videos: Record<string, boolean>;
  posters: Record<string, boolean>;
};

type AssetState = "checking" | "ready" | "missing";

/**
 * Muted autoplay + loop + playsInline video, with a clean missing-asset path.
 *
 * FIX (2026-10-27, doosri koshish — pehli HEAD wali nahi chali):
 * <video> tag bhi aur fetch HEAD bhi, missing file par browser console me
 * 404 "Failed to load resource" banate hain. Is liye ye component kisi
 * video/poster ki request se PEHLE sirf /flow-manifest.json mangta hai —
 * wo file build waqt scripts/generate-flow-manifest.mjs se banti hai aur
 * hamesha maujood hoti hai (200). Manifest batata hai ke kaunsi file hai
 * aur kaunsi nahi; missing file ki request kabhi bheji hi nahi jati, is
 * liye console me koi 404 nahi aata, sirf gradient placeholder dikhta hai.
 * Video rakhne ke baad production ke liye dobara `npm run build` zaroori
 * hai taake manifest fresh ho (ye pehle se documented tha).
 */
export default function FlowVideo({ file, poster, label, className = "" }: Props) {
  const [videoState, setVideoState] = useState<AssetState>("checking");
  const [posterOk, setPosterOk] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/flow-manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error("manifest missing");
        const manifest = (await res.json()) as Manifest;
        if (cancelled) return;
        setPosterOk(Boolean(manifest.posters?.[poster]));
        setVideoState(manifest.videos?.[file] ? "ready" : "missing");
      } catch {
        // Manifest na mile to safe side: koi request mat bhejo, placeholder dikhao.
        if (!cancelled) setVideoState("missing");
      }
    }

    void check();
    return () => {
      cancelled = true;
    };
  }, [file, poster]);

  if (videoState !== "ready") {
    return (
      <div
        className={`flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#1e293b_0%,#050507_70%)] ${className}`}
        role="img"
        aria-label={`${label} — placeholder, Google Flow video abhi add nahi hui`}
      >
        <p className="max-w-[240px] text-center text-sm text-zinc-400">
          {label}
          <span className="mt-2 block font-mono text-xs text-zinc-500">
            public/videos/{file}
          </span>
        </p>
      </div>
    );
  }

  return (
    <video
      className={className}
      src={videoUrl(file)}
      poster={posterOk ? posterUrl(poster) : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onError={() => setVideoState("missing")}
    />
  );
}
