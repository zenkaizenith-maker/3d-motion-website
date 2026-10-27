"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { formatPrice, getProduct, PRODUCTS, variantPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductViewer } from "@/components/ProductViewer";

const HEADPHONES = PRODUCTS.filter((p) => p.category === "headphones");

export default function StudioPage() {
  const { addToCart } = useStore();
  const [slug, setSlug] = useState(HEADPHONES[0].slug);
  const product = getProduct(slug)!;
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [cushion, setCushion] = useState<"dark" | "light">("dark");
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewerKey, setViewerKey] = useState(0);

  const selectModel = (next: string) => {
    setSlug(next);
    const nextProduct = getProduct(next)!;
    setColorId(nextProduct.colors[0].id);
    setViewerKey((k) => k + 1);
  };

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const price = variantPrice(product, colorId);
  const cushionColor = cushion === "dark" ? "#1c1d22" : "#d8d2c4";

  // Unsupported combination, stated plainly instead of silently allowed:
  // Electric Blue finish is not offered with the light cushion in this concept.
  const unsupported = color.id === "electric" && cushion === "light";

  const reset = () => {
    setSlug(HEADPHONES[0].slug);
    setColorId(getProduct(HEADPHONES[0].slug)!.colors[0].id);
    setCushion("dark");
    setAutoRotate(true);
    setViewerKey((k) => k + 1);
  };

  // Plain string concat — no memo needed for a cheap value.
  const summary = `${product.name} · ${color.name} · ${cushion === "dark" ? "Dark cushions" : "Light cushions"}`;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Studio</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Studio — customize in 3D.</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Choose a headphone, pick a finish, and watch the 3D model update. Your exact configuration is preserved in the cart.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div key={viewerKey} className="h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#141417] sm:h-[560px]">
          <ProductViewer
            product={product}
            shellColor={color.hex}
            cushionColor={cushionColor}
            autoRotate={autoRotate}
            onToggleAutoRotate={() => setAutoRotate((v) => !v)}
            onReset={reset}
          />
        </div>

        <div>
          <fieldset>
            <legend className="font-semibold">1. Model</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {HEADPHONES.map((p) => (
                <button key={p.slug} type="button" onClick={() => selectModel(p.slug)} aria-pressed={slug === p.slug} className={`rounded-full px-4 py-2.5 text-sm ${slug === p.slug ? "bg-white text-black" : "border border-white/20 hover:bg-white/5"}`}>
                  {p.name} · {formatPrice(p.price)}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="font-semibold">2. Finish</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c.id} type="button" onClick={() => setColorId(c.id)} aria-pressed={colorId === c.id} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${colorId === c.id ? "border-white bg-white/10" : "border-white/20 hover:bg-white/5"}`}>
                  <span className="h-4 w-4 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                  {c.name}
                  {c.priceDelta > 0 && <span className="text-xs text-zinc-400">+{formatPrice(c.priceDelta)}</span>}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="font-semibold">3. Cushions</legend>
            <div className="mt-2 flex gap-2">
              {([
                { id: "dark", label: "Dark cushions" },
                { id: "light", label: "Light cushions" },
              ] as const).map((o) => (
                <button key={o.id} type="button" onClick={() => setCushion(o.id)} aria-pressed={cushion === o.id} className={`rounded-full px-4 py-2.5 text-sm ${cushion === o.id ? "bg-white text-black" : "border border-white/20 hover:bg-white/5"}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          {unsupported && (
            <p role="alert" className="mt-4 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-200">
              This combination is not supported in the concept range: Electric Blue finish with light cushions.
              Choose dark cushions, or a different finish, to add this configuration to the cart.
            </p>
          )}

          <div className="mt-6 rounded-3xl border border-white/10 bg-[#141417] p-5">
            <p className="text-sm text-zinc-400">Your configuration</p>
            <p className="mt-1 font-semibold">{summary}</p>
            <p className="mt-2 text-2xl font-bold">{formatPrice(price)}</p>
            <p className="mt-1 text-xs text-zinc-500">Fictional demo price. Configuration label is saved with the cart item.</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={unsupported}
              onClick={() =>
                addToCart({
                  productSlug: product.slug,
                  colorId,
                  qty: 1,
                  label: `Studio: ${summary}`,
                })
              }
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add configured product to cart
            </button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10">
              <RotateCcw size={16} /> Reset configuration
            </button>
            <Link href={`/products/${product.slug}`} className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10">
              View product page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
