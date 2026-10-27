"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { filterProducts, PRODUCTS, searchProducts, sortProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const FEATURE_OPTIONS = [
  { id: "", label: "Any feature" },
  { id: "spatial", label: "Spatial audio" },
  { id: "noise", label: "Noise cancellation" },
  { id: "lightweight", label: "Lightweight" },
  { id: "travel", label: "Travel-ready" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [maxPrice, setMaxPrice] = useState(400);
  const [feature, setFeature] = useState("");
  const [sort, setSort] = useState("name");
  const [drawer, setDrawer] = useState(false);

  // Shareable filter state: keep the URL in sync with the chosen filters.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (q.trim()) params.set("q", q.trim());
    if (maxPrice !== 400) params.set("max", String(maxPrice));
    if (feature) params.set("feature", feature);
    if (sort !== "name") params.set("sort", sort);
    const next = params.toString();
    if (next !== searchParams.toString()) {
      router.replace(next ? `/shop?${next}` : "/shop", { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, category, maxPrice, feature, sort]);

  const results = useMemo(() => {
    let list = searchProducts(q, PRODUCTS);
    list = filterProducts(list, { category, maxPrice, feature });
    return sortProducts(list, sort);
  }, [q, category, maxPrice, feature, sort]);

  const activeFilters: string[] = [];
  if (category !== "all") activeFilters.push(category === "headphones" ? "Headphones" : "Accessories");
  if (maxPrice !== 400) activeFilters.push(`Up to $${maxPrice}`);
  if (feature) activeFilters.push(FEATURE_OPTIONS.find((f) => f.id === feature)?.label ?? feature);
  if (q.trim()) activeFilters.push(`Search: ${q.trim()}`);

  const clearAll = () => {
    setQ("");
    setCategory("all");
    setMaxPrice(400);
    setFeature("");
    setSort("name");
  };

  const filters = (
    <div className="space-y-6">
      <div>
        <label htmlFor="shop-search" className="text-xs tracking-widest text-zinc-500">SEARCH</label>
        <div className="mt-2 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2.5">
          <Search size={16} className="text-zinc-500" />
          <input id="shop-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" />
        </div>
      </div>
      <div>
        <p className="text-xs tracking-widest text-zinc-500">CATEGORY</p>
        <div className="mt-2 flex flex-col gap-2">
          {[
            { id: "all", label: "All products" },
            { id: "headphones", label: "Headphones" },
            { id: "accessories", label: "Accessories" },
          ].map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="radio" name="category" checked={category === c.id} onChange={() => setCategory(c.id)} className="accent-blue-600" />
              {c.label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="max-price" className="text-xs tracking-widest text-zinc-500">MAX PRICE: ${maxPrice}</label>
        <input id="max-price" type="range" min={19} max={400} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full accent-blue-600" />
        <div className="flex justify-between text-xs text-zinc-500"><span>$19</span><span>$400</span></div>
      </div>
      <div>
        <label htmlFor="feature-filter" className="text-xs tracking-widest text-zinc-500">FEATURE</label>
        <select id="feature-filter" value={feature} onChange={(e) => setFeature(e.target.value)} className="mt-2 w-full rounded-full border border-white/20 bg-black/40 px-3 py-2.5 text-sm outline-none">
          {FEATURE_OPTIONS.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort-select" className="text-xs tracking-widest text-zinc-500">SORT BY</label>
        <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} className="mt-2 w-full rounded-full border border-white/20 bg-black/40 px-3 py-2.5 text-sm outline-none">
          <option value="name">Name (A–Z)</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="newest">Newest (editorial)</option>
        </select>
      </div>
      {activeFilters.length > 0 && (
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          <X size={14} /> Clear filters ({activeFilters.length})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Shop</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Shop VANTA ARC.</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        All 6 fictional concept products. Filters and sorting actually change the grid below — they are not decorative.
      </p>

      <div className="mt-8 lg:hidden">
        <button type="button" onClick={() => setDrawer((v) => !v)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm">
          <SlidersHorizontal size={16} /> {drawer ? "Hide filters" : "Show filters"}
        </button>
        {drawer && <div className="mt-4 rounded-3xl border border-white/10 bg-[#141417] p-5">{filters}</div>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-white/10 bg-[#141417] p-5">{filters}</div>
        </aside>
        <div>
          {activeFilters.length > 0 && (
            <p className="mb-4 text-sm text-zinc-400">
              Active filters: {activeFilters.join(" · ")}
            </p>
          )}
          <p className="mb-4 text-sm text-zinc-400" role="status">
            {results.length} product{results.length === 1 ? "" : "s"} found.
          </p>
          {results.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#141417] p-10 text-center">
              <p className="text-xl font-semibold">No products match those filters.</p>
              <p className="mt-2 text-zinc-400">Try widening the price range or clearing the search.</p>
              <button type="button" onClick={clearAll} className="mt-5 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-20 text-zinc-400">Loading shop…</div>}>
      <ShopContent />
    </Suspense>
  );
}
