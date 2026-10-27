import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
      <p className="text-xs tracking-[0.3em] text-blue-400">404 — PAGE NOT FOUND</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">This page does not exist in the VANTA ARC store.</h1>
      <p className="mt-3 text-zinc-400">
        Check the address, or start again from the shop. Every link in the navigation and footer points to a real route in this build.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">Go home</Link>
        <Link href="/shop" className="rounded-full border border-white/20 px-6 py-2.5 text-sm hover:bg-white/10">Browse shop</Link>
      </div>
    </div>
  );
}
