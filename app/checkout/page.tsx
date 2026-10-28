"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { cartItemUnitPrice, cartSubtotal, demoShipping, formatPrice, getColor, getProduct, validateCheckout } from "@/lib/products";
import { useStore } from "@/lib/store";

type Step = "details" | "review" | "done";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<Step>("details");
  const [method, setMethod] = useState<"standard" | "express">("standard");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postal: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderRef, setOrderRef] = useState("");

  const subtotal = cartSubtotal(cart);
  const shipping = demoShipping(subtotal, method);
  const total = subtotal + shipping;

  const items = useMemo(
    () =>
      cart
        .map((item) => ({ item, product: getProduct(item.productSlug) }))
        .filter((x): x is { item: typeof x.item; product: NonNullable<typeof x.product> } => Boolean(x.product)),
    [cart]
  );

  const submitDetails = (e: FormEvent) => {
    e.preventDefault();
    const found = validateCheckout(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep("review");
  };

  const placeDemoOrder = () => {
    // Illustrative reference only. No payment, no order, no email is sent.
    const ref = `VANTA-DEMO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderRef(ref);
    setStep("done");
    clearCart();
  };

  if (cart.length === 0 && step !== "done") {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Demo checkout.</h1>
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#141417] p-10 text-center">
          <p className="text-xl font-semibold">Your cart is empty, so there is nothing to check out.</p>
          <p className="mt-2 text-zinc-400">Add a product first — the demo confirmation only appears after a valid demo checkout.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
            Browse shop
          </Link>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="rounded-3xl border border-blue-400/40 bg-blue-400/10 p-8">
          <p className="text-xs tracking-[0.3em] text-blue-300">SAMPLE ORDER CONFIRMATION — DEMO ONLY</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Thanks — demo order received.</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-zinc-300">
            Order reference: <strong className="text-white">{orderRef}</strong>. This is an illustrative
            reference generated in your browser. <strong>No payment was taken, no real order was placed,
            and no confirmation email was sent.</strong> A real store would need a payment provider and
            a backend before any of that could happen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">Continue shopping</Link>
            <Link href="/support" className="rounded-full border border-white/20 px-6 py-2.5 text-sm hover:bg-white/10">Visit Support</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <Link href="/cart" className="hover:text-white">Cart</Link> / <span className="text-zinc-300">Checkout (demo)</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Demo checkout.</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        No payment provider is connected. This checkout collects demo contact and shipping details only —
        <strong className="text-zinc-200"> do not enter real card details anywhere here, because no card field exists by design.</strong>
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {step === "details" ? (
          <form onSubmit={submitDetails} className="space-y-4 rounded-3xl border border-white/10 bg-[#141417] p-6" noValidate>
            <h2 className="text-xl font-bold">Contact & shipping</h2>
            {([
              { id: "name", label: "Full name", type: "text" },
              { id: "email", label: "Email address", type: "email" },
              { id: "address", label: "Street address", type: "text" },
              { id: "city", label: "City", type: "text" },
              { id: "postal", label: "Postal code", type: "text" },
            ] as const).map((f) => (
              <div key={f.id}>
                <label htmlFor={`checkout-${f.id}`} className="text-sm font-medium">{f.label}</label>
                <input
                  id={`checkout-${f.id}`}
                  type={f.type}
                  value={form[f.id]}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="mt-1 w-full rounded-full border border-white/20 bg-black/40 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                />
                {errors[f.id] && <p role="alert" className="mt-1 text-sm text-red-300">{errors[f.id]}</p>}
              </div>
            ))}
            <fieldset>
              <legend className="text-sm font-medium">Shipping method (demo)</legend>
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input type="radio" name="method" checked={method === "standard"} onChange={() => setMethod("standard")} className="accent-blue-600" />
                  Standard — {subtotal >= 150 ? "Free (over $150)" : "$9"} · illustrative 3–5 days
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input type="radio" name="method" checked={method === "express"} onChange={() => setMethod("express")} className="accent-blue-600" />
                  Express — $19 · illustrative 1–2 days
                </label>
              </div>
            </fieldset>
            <p className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
              Payment step: <strong className="text-zinc-200">Demo payment — no charge.</strong> No card
              number, expiry, or security code is collected on this page.
            </p>
            <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
              Review demo order
            </button>
          </form>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#141417] p-6">
            <h2 className="text-xl font-bold">Review your demo order</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-zinc-400">Name</dt><dd>{form.name}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-zinc-400">Email</dt><dd>{form.email}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-zinc-400">Address</dt><dd className="text-right">{form.address}, {form.city} {form.postal}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-zinc-400">Shipping</dt><dd>{method === "standard" ? "Standard" : "Express"}</dd></div>
            </dl>
            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              {items.map(({ item, product }) => (
                <li key={`${item.productSlug}-${item.colorId}`} className="flex justify-between gap-4">
                  <span>{product.name} · {getColor(product, item.colorId).name} × {item.qty}</span>
                  <span>{formatPrice(cartItemUnitPrice(item) * item.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-200">
              Confirming here shows a sample confirmation only. Nothing is charged and nothing is shipped.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={placeDemoOrder} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
                Place demo order (no charge)
              </button>
              <button type="button" onClick={() => setStep("details")} className="rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10">
                Back to details
              </button>
            </div>
          </div>
        )}

        <aside className="h-fit rounded-3xl border border-white/10 bg-[#141417] p-6 lg:sticky lg:top-24">
          <h2 className="font-bold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map(({ item, product }) => (
              <li key={`${item.productSlug}-${item.colorId}`} className="flex justify-between gap-4">
                <span className="text-zinc-300">{product.name} × {item.qty}</span>
                <span>{formatPrice(cartItemUnitPrice(item) * item.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-zinc-400">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-zinc-400">Shipping ({method})</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between font-bold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-zinc-500">
            Totals are recalculated from product data and the selected shipping method, not from values supplied by the browser alone.
          </p>
        </aside>
      </div>
    </div>
  );
}
