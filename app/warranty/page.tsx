import Link from "next/link";

export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Warranty</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Warranty</h1>
      <p className="mt-2 text-sm text-zinc-400">Illustrative policy for the fictional VANTA ARC concept store. No real warranty claim can be filed.</p>
      <section className="mt-8 space-y-4 text-zinc-300 leading-relaxed">
        <div><h2 className="font-bold text-white">Illustrative coverage</h2><p className="mt-1 text-sm">2 years from the illustrative purchase date, covering manufacturing defects in the fictional range.</p></div>
        <div><h2 className="font-bold text-white">Not covered (illustrative)</h2><p className="mt-1 text-sm">Accidental damage, misuse, and normal wear — including cushion wear over time, which is why replacement cushions exist as an accessory.</p></div>
        <div><h2 className="font-bold text-white">How a real claim would work</h2><p className="mt-1 text-sm">In a real store, you would contact support with an order reference. Here, no support inbox, order system, or claim process exists — see the Support page for the honest demo fallback.</p></div>
      </section>
    </div>
  );
}
