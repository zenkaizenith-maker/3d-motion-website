"use client";

import Link from "next/link";
import { Heart, Scale, ShoppingBag } from "lucide-react";
import { formatPrice, getColor, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductThumb } from "@/components/ProductThumb";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compare, showToast } = useStore();
  const wished = wishlist.includes(product.slug);
  const compared = compare.includes(product.slug);
  const defaultColor = product.colors[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141417] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="relative block" aria-label={`View ${product.name}`}>
        <div className="aspect-[4/3] w-full">
          <ProductThumb product={product} colorId={defaultColor.id} />
        </div>
        {product.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            New
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs tracking-widest text-zinc-500">{product.category === "headphones" ? "HEADPHONES" : "ACCESSORY"}</p>
        <Link href={`/products/${product.slug}`} className="mt-1 text-lg font-semibold hover:text-blue-300">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{product.tagline}</p>
        <div className="mt-3 flex items-center gap-1.5" aria-label="Available colors">
          {product.colors.map((c) => (
            <span key={c.id} title={c.name} className="h-4 w-4 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold">{formatPrice(product.price)}</p>
          <p className="text-xs text-zinc-500">from</p>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => addToCart({ productSlug: product.slug, colorId: defaultColor.id, qty: 1 })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
          <button
            type="button"
            onClick={() => {
              toggleWishlist(product.slug);
              showToast(wished ? "Removed from wishlist." : "Saved to wishlist.");
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className={`rounded-full border p-2.5 ${wished ? "border-red-400 bg-red-400/20 text-red-300" : "border-white/20 text-white hover:bg-white/10"}`}
          >
            <Heart size={16} fill={wished ? "currentColor" : "none"} />
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
            aria-label={compared ? "Remove from comparison" : "Add to comparison"}
            aria-pressed={compared}
            className={`rounded-full border p-2.5 ${compared ? "border-blue-400 bg-blue-400/20 text-blue-300" : "border-white/20 text-white hover:bg-white/10"}`}
          >
            <Scale size={16} />
          </button>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Default finish: {getColor(product, defaultColor.id).name}
        </p>
      </div>
    </article>
  );
}
