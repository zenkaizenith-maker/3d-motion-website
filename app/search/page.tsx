"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Search</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        {q ? `Results for “${q}”` : "Search products"}
      </h1>
      <p className="mt-2 text-zinc-400" role="status">
        {q ? `${results.length} product${results.length === 1 ? "" : "s"} found.` : "Use the search box in the navigation to search the range."}
      </p>
      {results.length === 0 && q ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#141417] p-10 text-center">
          <p className="text-xl font-semibold">No products match “{q}”.</p>
          <p className="mt-2 text-zinc-400">Try “headphones”, “case”, “cushions”, or “cable”.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-20 text-zinc-400">Searching…</div>}>
      <SearchContent />
    </Suspense>
  );
}
