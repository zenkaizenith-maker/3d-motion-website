"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartItemKey, cartItemUnitPrice, cartSubtotal, demoShipping, formatPrice, getColor, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductThumb } from "@/components/ProductThumb";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useStore();
  const subtotal = cartSubtotal(cart);
  const shipping = demoShipping(subtotal, "standard");
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Cart</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Your cart.</h1>

      {cart.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#141417] p-10 text-center">
          <p className="text-xl font-semibold">Your cart is empty.</p>
          <p className="mt-2 text-zinc-400">Browse the range, customize a headphone in the Studio, or save items to your wishlist.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">Browse shop</Link>
            <Link href="/studio" className="rounded-full border border-white/20 px-6 py-2.5 text-sm hover:bg-white/10">Open Studio</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cart.map((item) => {
              const product = getProduct(item.productSlug);
              if (!product) return null;
              const color = getColor(product, item.colorId);
              const key = cartItemKey(item);
              const unit = cartItemUnitPrice(item);
              return (
                <article key={key} className="flex gap-4 rounded-3xl border border-white/10 bg-[#141417] p-4">
                  <div className="h-24 w-28 shrink-0 overflow-hidden rounded-2xl">
                    <ProductThumb product={product} colorId={item.colorId} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${product.slug}`} className="font-semibold hover:text-blue-300">{product.name}</Link>
                    <p className="text-sm text-zinc-400">{color.name}{item.label ? ` · ${item.label}` : ""}</p>
                    <p className="mt-1 text-sm text-zinc-400">{formatPrice(unit)} each</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-white/20">
                        <button type="button" onClick={() => updateQty(key, item.qty - 1)} aria-label="Decrease quantity" className="p-2 hover:text-blue-300"><Minus size={15} /></button>
                        <span className="w-7 text-center text-sm font-semibold" aria-live="polite">{item.qty}</span>
                        <button type="button" onClick={() => updateQty(key, item.qty + 1)} aria-label="Increase quantity" className="p-2 hover:text-blue-300"><Plus size={15} /></button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(key)} className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-red-300">
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 font-bold">{formatPrice(unit * item.qty)}</p>
                </article>
              );
            })}
            <button type="button" onClick={clearCart} className="rounded-full border border-white/20 px-5 py-2.5 text-sm hover:bg-white/10">
              Empty cart
            </button>
          </div>

          <aside className="h-fit rounded-3xl border border-white/10 bg-[#141417] p-6 lg:sticky lg:top-24">
            <h2 className="font-bold">Order summary (demo)</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-zinc-400">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-400">Standard shipping (demo)</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-bold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-zinc-500">
              Totals are recalculated from product data in the cart. Standard shipping is free over $150, otherwise $9 (demo rules).
            </p>
            <Link href="/checkout" className="mt-5 block rounded-full bg-white py-3 text-center text-sm font-semibold text-black hover:bg-zinc-200">
              Go to demo checkout
            </Link>
            <Link href="/shop" className="mt-2 block rounded-full border border-white/20 py-3 text-center text-sm hover:bg-white/10">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
