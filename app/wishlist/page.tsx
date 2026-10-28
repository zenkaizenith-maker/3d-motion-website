"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Wishlist</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Your wishlist.</h1>
      <p className="mt-2 text-zinc-400">Saved in your browser, so it survives reloads on this device.</p>
      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#141417] p-10 text-center">
          <p className="text-xl font-semibold">Nothing saved yet.</p>
          <p className="mt-2 text-zinc-400">Tap the heart on any product card to save it here.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
            Browse shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
