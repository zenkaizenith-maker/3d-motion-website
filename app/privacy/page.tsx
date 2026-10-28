import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Privacy (draft)</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Privacy Policy — Draft / Example</h1>
      <p className="mt-2 text-sm text-zinc-400">This is draft example content, not reviewed legal advice and not a policy of a real company.</p>
      <section className="mt-8 space-y-4 text-zinc-300 leading-relaxed text-sm">
        <p><strong className="text-white">What this demo actually stores:</strong> cart, wishlist and comparison selections are stored only in your own browser (localStorage). No account, no server database, and no analytics are used in this build.</p>
        <p><strong className="text-white">What is not collected:</strong> no payment details are collected — the demo checkout has no card field by design. Contact-form text in the demo is validated in your browser and is not delivered or stored on a server.</p>
        <p><strong className="text-white">Third parties:</strong> the deployed site is served by Vercel, which may log standard hosting requests. That is hosting infrastructure, not a VANTA ARC data collection choice, and no such data is used here.</p>
      </section>
    </div>
  );
}
