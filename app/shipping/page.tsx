import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Shipping & Returns</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Shipping & Returns</h1>
      <p className="mt-2 text-sm text-zinc-400">Illustrative policy for the fictional VANTA ARC concept store. No real shipment or return is processed.</p>
      <section className="mt-8 space-y-4 text-zinc-300 leading-relaxed">
        <div><h2 className="font-bold text-white">Shipping methods (demo)</h2><p className="mt-1 text-sm">Standard: free over $150, otherwise $9, illustrative 3–5 days. Express: $19, illustrative 1–2 days. Totals in cart and checkout follow these demo rules.</p></div>
        <div><h2 className="font-bold text-white">Returns (illustrative)</h2><p className="mt-1 text-sm">Unused concept products may be returned within 30 days in the illustrative policy. No return label, address, or refund is actually issued by this demo.</p></div>
        <div><h2 className="font-bold text-white">What is real here</h2><p className="mt-1 text-sm">Only the demo journey: totals calculate correctly from product data, and the checkout confirmation is clearly labelled as a sample. Everything else on this page is example content.</p></div>
      </section>
    </div>
  );
}
