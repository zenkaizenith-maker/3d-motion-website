import Link from "next/link";
import { BRAND } from "@/lib/products";

/** No dynamic date here on purpose: Next 16's prerender of the static
 *  _not-found route rejects new Date() anywhere in the layout, client or
 *  server component alike. The footer therefore carries no year number. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <p className="text-sm font-bold tracking-[0.22em]">{BRAND.name}</p>
          <p className="mt-2 text-sm text-zinc-500">{BRAND.tagline}</p>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">{BRAND.note}</p>
        </div>
        <nav aria-label="Shop">
          <p className="text-xs tracking-widest text-zinc-500">SHOP</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><Link href="/shop" className="hover:text-white">All products</Link></li>
            <li><Link href="/shop?category=headphones" className="hover:text-white">Headphones</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-white">Accessories</Link></li>
            <li><Link href="/studio" className="hover:text-white">Studio customizer</Link></li>
            <li><Link href="/compare" className="hover:text-white">Compare</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="text-xs tracking-widest text-zinc-500">COMPANY</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><Link href="/technology" className="hover:text-white">Technology</Link></li>
            <li><Link href="/story" className="hover:text-white">Our Story</Link></li>
            <li><Link href="/support" className="hover:text-white">Support</Link></li>
            <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
          </ul>
        </nav>
        <nav aria-label="Support and legal">
          <p className="text-xs tracking-widest text-zinc-500">SUPPORT & LEGAL</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><Link href="/shipping" className="hover:text-white">Shipping & Returns</Link></li>
            <li><Link href="/warranty" className="hover:text-white">Warranty</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy (draft)</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms (draft)</Link></li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-zinc-600">
        © VANTA ARC (fictional concept brand). Demo checkout only — no real payment is taken.
      </p>
    </footer>
  );
}
