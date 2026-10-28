"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, formatPrice, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";

function CompareContent() {
  const params = useSearchParams();
  const { compare, toggleCompare, clearCompare } = useStore();
  const idsParam = params.get("ids");
  const ids = idsParam ? idsParam.split(",").filter(Boolean) : compare;
  const items = ids.map((id) => getProduct(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Union of spec labels so the table compares meaningfully, not just price.
  const specLabels = Array.from(new Set(items.flatMap((p) => p.specs.map((s) => s.label))));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Compare</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Compare products.</h1>
      <p className="mt-2 text-zinc-400">
        Add up to 3 products with the scale icon on any product card. Shareable link format: /compare?ids=slug,slug
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#141417] p-10 text-center">
          <p className="text-xl font-semibold">No products selected for comparison.</p>
          <p className="mt-2 text-zinc-400">Open Shop and tap the scale icon on up to 3 products.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
            Browse shop
          </Link>
        </div>
      ) : (
        <>
          {!idsParam && (
            <button type="button" onClick={clearCompare} className="mt-6 rounded-full border border-white/20 px-5 py-2.5 text-sm hover:bg-white/10">
              Clear comparison
            </button>
          )}
          <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 font-medium text-zinc-400">Feature</th>
                  {items.map((p) => (
                    <th key={p.slug} className="p-4">
                      <Link href={`/products/${p.slug}`} className="font-semibold text-white hover:text-blue-300">{p.name}</Link>
                      <span className="block text-xs font-normal text-zinc-500">{p.category}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-zinc-400">Price (demo)</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-4 font-bold">{formatPrice(p.price)}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-zinc-400">Tagline</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-4 text-zinc-300">{p.tagline}</td>
                  ))}
                </tr>
                {specLabels.map((label) => (
                  <tr key={label} className="border-b border-white/10">
                    <td className="p-4 text-zinc-400">{label}</td>
                    {items.map((p) => (
                      <td key={p.slug} className="p-4">{p.specs.find((s) => s.label === label)?.value ?? "—"}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 text-zinc-400">Features</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-4">
                      <ul className="list-disc space-y-1 pl-4 text-zinc-300">
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {!idsParam && (
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((p) => (
                <button key={p.slug} type="button" onClick={() => toggleCompare(p.slug)} className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
                  Remove {p.name}
                </button>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs text-zinc-500">
            All specifications are sample content for the fictional concept range. {PRODUCTS.length} products exist in total.
          </p>
        </>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-20 text-zinc-400">Loading comparison…</div>}>
      <CompareContent />
    </Suspense>
  );
}
