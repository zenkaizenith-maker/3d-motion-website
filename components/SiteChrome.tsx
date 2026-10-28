"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { BRAND } from "@/lib/products";
import { useStore } from "@/lib/store";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Studio", href: "/studio" },
  { label: "Technology", href: "/technology" },
  { label: "Our Story", href: "/story" },
  { label: "Support", href: "/support" },
];

export function Navbar() {
  const { cart, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="shrink-0 text-sm font-bold tracking-[0.22em] text-white">
          {BRAND.name}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-zinc-400 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <form onSubmit={submitSearch} role="search" className="hidden flex-1 max-w-xs items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 md:flex">
          <Search size={16} className="text-zinc-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </form>
        <div className="flex items-center gap-2">
          <Link href="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative rounded-full border border-white/15 p-2 text-white hover:bg-white/10">
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="relative rounded-full border border-white/15 p-2 text-white hover:bg-white/10">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Menu band karo" : "Menu kholo"} className="rounded-full border border-white/15 p-2 text-white lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0b] px-5 py-4 lg:hidden">
          <form onSubmit={submitSearch} role="search" className="mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 md:hidden">
            <Search size={16} className="text-zinc-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" aria-label="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" />
          </form>
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-base text-zinc-200">
              {l.label}
            </Link>
          ))}
          <Link href="/compare" onClick={() => setOpen(false)} className="block py-2.5 text-base text-zinc-200">
            Compare
          </Link>
        </div>
      )}
    </header>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div role="status" className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-xl">
      {toast}
    </div>
  );
}

/** Small reveal helper (IntersectionObserver, no GSAP dependency for lists). */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${visible ? "reveal is-visible" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}
