"use client";

/* eslint-disable react-hooks/set-state-in-effect --
 * The WebGL capability probe is client-only and must run after mount;
 * there is no server-side value for it, so a post-mount setState is the
 * correct, hydration-safe pattern here (not a cascading-render bug).
 */

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import type { Product } from "@/lib/products";

// Canvas is client-only so SSR never tries to create a WebGL context.
const ViewerCanvas = dynamic(() => import("@/components/ViewerCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#141417] text-sm text-zinc-400">
      Loading 3D viewer…
    </div>
  ),
});

type Props = {
  product: Product;
  shellColor: string;
  cushionColor: string;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onReset: () => void;
};

/**
 * Reusable 3D product viewer with a genuine no-WebGL fallback.
 * WebGL support is probed with a real context attempt; if it fails,
 * a clean fallback panel is shown instead of a broken canvas.
 */
export function ProductViewer({ product, shellColor, cushionColor, autoRotate, onToggleAutoRotate, onReset }: Props) {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  // Hydration-safe WebGL probe (see file-level note above).
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      setWebgl(Boolean(ctx));
    } catch {
      setWebgl(false);
    }
  }, []);

  if (webgl === false) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,#23232a_0%,#0a0a0b_70%)] p-6 text-center" role="img" aria-label={`${product.name} — 3D viewer unavailable on this device`}>
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="max-w-sm text-sm text-zinc-400">
          Your device or browser could not start WebGL, so the interactive 3D viewer is unavailable here.
          You can still choose colors, read specifications, and add this product to your cart.
        </p>
      </div>
    );
  }

  if (webgl === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#141417] text-sm text-zinc-400">
        Checking 3D support…
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-[#141417] text-sm text-zinc-400">
            Loading 3D viewer…
          </div>
        }
      >
        <ViewerCanvas product={product} shellColor={shellColor} cushionColor={cushionColor} autoRotate={autoRotate} />
      </Suspense>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={onToggleAutoRotate}
          aria-pressed={autoRotate}
          className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-black/80"
        >
          {autoRotate ? "Pause rotation" : "Auto-rotate"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-black/80"
        >
          <RotateCcw size={13} /> Reset view
        </button>
      </div>
      <p className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}
