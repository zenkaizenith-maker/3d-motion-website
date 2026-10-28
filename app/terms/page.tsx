import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Terms (draft)</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Terms of Use — Draft / Example</h1>
      <p className="mt-2 text-sm text-zinc-400">This is draft example content, not reviewed legal advice and not the terms of a real company.</p>
      <section className="mt-8 space-y-4 text-zinc-300 leading-relaxed text-sm">
        <p><strong className="text-white">Fictional concept:</strong> VANTA ARC, its products, prices and specifications are fictional demonstration content. Nothing on this site is an offer to sell a real product.</p>
        <p><strong className="text-white">Demo checkout:</strong> the checkout is a demonstration. No payment is taken, no order is fulfilled, and the sample confirmation reference has no legal effect.</p>
        <p><strong className="text-white">Content:</strong> product illustrations and the procedural 3D model are original to this concept build. Google Flow videos are cinematic brand videos used as supporting storytelling, not as product photographs.</p>
        <p><strong className="text-white">Use:</strong> use the site in a browser with JavaScript enabled for the full journey. The 3D viewer requires WebGL; a fallback panel is shown where WebGL is unavailable.</p>
      </section>
    </div>
  );
}
