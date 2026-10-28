"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Heart, Minus, Plus, Scale, ShoppingBag } from "lucide-react";
import { formatPrice, getColor, PRODUCTS, variantPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductViewer } from "@/components/ProductViewer";
import { ProductThumb } from "@/components/ProductThumb";
import { ProductCard } from "@/components/ProductCard";
import FlowVideo from "@/components/FlowVideo";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compare, showToast } = useStore();
  const router = useRouter();
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [qty, setQty] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewerKey, setViewerKey] = useState(0);
  const [gallery, setGallery] = useState<"viewer" | "video">("viewer");

  const color = getColor(product, colorId);
  const price = variantPrice(product, colorId);
  const wished = wishlist.includes(product.slug);
  const compared = compare.includes(product.slug);
  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  const add = () => addToCart({ productSlug: product.slug, colorId, qty });
  const buyNow = () => {
    addToCart({ productSlug: product.slug, colorId, qty });
    router.push("/cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> /{" "}
        <Link href="/shop" className="hover:text-white">Shop</Link> /{" "}
        <span className="text-zinc-300">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Gallery: 3D viewer first for headphones, illustration for accessories */}
        <div>
          <div className="h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#141417] sm:h-[520px]">
            {gallery === "viewer" ? (
              product.viewer === "headphone" ? (
                <div key={viewerKey} className="h-full w-full">
                  <ProductViewer
                    product={product}
                    shellColor={color.hex}
                    cushionColor="#1c1d22"
                    autoRotate={autoRotate}
                    onToggleAutoRotate={() => setAutoRotate((v) => !v)}
                    onReset={() => {
                      setColorId(product.colors[0].id);
                      setAutoRotate(true);
                      setViewerKey((k) => k + 1);
                    }}
                  />
                </div>
              ) : (
                <div className="h-full w-full">
                  <ProductThumb product={product} colorId={colorId} />
                  <p className="sr-only">Accessory illustration — no unrelated headphone model is shown for accessories.</p>
                </div>
              )
            ) : product.video && product.poster ? (
              <FlowVideo file={product.video} poster={product.poster} label={`Cinematic brand video for ${product.name}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-400">
                No cinematic video is assigned to this accessory.
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2" role="group" aria-label="Gallery view">
            <button type="button" onClick={() => setGallery("viewer")} aria-pressed={gallery === "viewer"} className={`rounded-full px-4 py-2 text-sm ${gallery === "viewer" ? "bg-white text-black" : "border border-white/20"}`}>
              {product.viewer === "headphone" ? "3D Viewer" : "Product illustration"}
            </button>
            {product.video && (
              <button type="button" onClick={() => setGallery("video")} aria-pressed={gallery === "video"} className={`rounded-full px-4 py-2 text-sm ${gallery === "video" ? "bg-white text-black" : "border border-white/20"}`}>
                Cinematic video
              </button>
            )}
          </div>
          {gallery === "video" && (
            <p className="mt-2 text-xs text-zinc-500">
              Brand video from Google Flow — supporting storytelling, not a product photograph.
            </p>
          )}
        </div>

        {/* Buy box */}
        <div>
          <p className="text-xs tracking-[0.3em] text-blue-400">{product.category === "headphones" ? "HEADPHONES" : "ACCESSORY"}{product.isNew ? " · NEW" : ""}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-zinc-400">{product.tagline}</p>
          <p className="mt-4 text-3xl font-bold">
            {formatPrice(price)}
            {color.priceDelta > 0 && <span className="ml-2 text-sm font-normal text-zinc-500">includes {formatPrice(color.priceDelta)} finish upgrade</span>}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Fictional demo price. Demo checkout only — no real payment is taken.</p>

          <div className="mt-6">
            <p className="text-sm font-semibold">Finish: <span className="text-zinc-400">{color.name}</span></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  aria-pressed={colorId === c.id}
                  aria-label={`Select finish ${c.name}`}
                  title={c.name}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${colorId === c.id ? "border-white bg-white/10" : "border-white/20 hover:bg-white/5"}`}
                >
                  <span className="h-4 w-4 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                  {c.name}
                  {c.priceDelta > 0 && <span className="text-xs text-zinc-400">+{formatPrice(c.priceDelta)}</span>}
                </button>
              ))}
            </div>
            {product.viewer === "headphone" && (
              <p className="mt-2 text-xs text-zinc-500">The selected finish updates the 3D viewer shells immediately.</p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-white/20">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="p-2.5 hover:text-blue-300"><Minus size={16} /></button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity" className="p-2.5 hover:text-blue-300"><Plus size={16} /></button>
            </div>
            <span className="text-sm text-zinc-400">Quantity</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={add} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200 sm:flex-none sm:px-8">
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button type="button" onClick={buyNow} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 sm:flex-none sm:px-8">
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => {
                toggleWishlist(product.slug);
                showToast(wished ? "Removed from wishlist." : "Saved to wishlist.");
              }}
              aria-pressed={wished}
              className={`rounded-full border p-3 ${wished ? "border-red-400 bg-red-400/20 text-red-300" : "border-white/20 hover:bg-white/10"}`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={18} fill={wished ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (!compared && compare.length >= 3) {
                  showToast("Comparison is limited to 3 products.");
                  return;
                }
                toggleCompare(product.slug);
              }}
              aria-pressed={compared}
              className={`rounded-full border p-3 ${compared ? "border-blue-400 bg-blue-400/20 text-blue-300" : "border-white/20 hover:bg-white/10"}`}
              aria-label={compared ? "Remove from comparison" : "Add to comparison"}
            >
              <Scale size={18} />
            </button>
          </div>

          <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
            <section>
              <h2 className="font-semibold">Key features</h2>
              <ul className="mt-2 space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300"><Check size={16} className="mt-0.5 shrink-0 text-blue-400" /> {f}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold">Specifications (sample content)</h2>
              <dl className="mt-2 divide-y divide-white/10">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-2 text-sm">
                    <dt className="text-zinc-500">{s.label}</dt>
                    <dd className="text-right text-zinc-200">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2 className="font-semibold">Included in the box</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {product.inBox.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold">Shipping, returns & warranty</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Demo information only. See <Link href="/shipping" className="text-blue-300 hover:text-blue-200">Shipping & Returns</Link> and{" "}
                <Link href="/warranty" className="text-blue-300 hover:text-blue-200">Warranty</Link> for the illustrative policies used in this concept store.
                No real fulfilment is offered.
              </p>
            </section>
            <details className="rounded-2xl border border-white/10 p-4">
              <summary className="cursor-pointer font-semibold">Product FAQ</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {product.category === "headphones"
                  ? "The 3D viewer shows the procedural concept model for this headphone. Colors update the shell finish; cushions stay in the dark finish used throughout the concept range."
                  : "Accessories use a stylized illustration rather than a headphone model, so you are never shown an unrelated product as if it were this accessory."}
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Related products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
