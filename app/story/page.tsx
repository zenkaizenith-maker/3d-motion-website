import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FlowVideo from "@/components/FlowVideo";

export default function StoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Our Story</span>
      </nav>
      <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        A fictional brand, designed on purpose.
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        VANTA ARC is a concept brand, not a real company with a real history. This page therefore
        describes design principles and process — not a fabricated founding story, team, or timeline.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
        <FlowVideo file="abstract-flow.mp4" poster="abstract-flow.jpg" label="Cinematic brand video" className="aspect-video w-full object-cover" />
        <p className="bg-[#141417] p-4 text-xs text-zinc-500">
          Cinematic brand video from Google Flow — mood and motion reference for the concept, not company footage.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-[#141417] p-6">
          <h2 className="text-xl font-bold">Brand philosophy</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Sound, shaped by design. The product should disappear; the music should stay. Controls are
            minimal and purposeful, finishes are restrained, and nothing on the product is decoration for its own sake.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-[#141417] p-6">
          <h2 className="text-xl font-bold">Industrial-design principles</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Black and graphite as the base, brushed titanium as the metal accent, warm white as the
            soft alternative, and electric blue used sparingly — one accent, never a rainbow. Oversized
            editorial typography, deep shadows, and controlled negative space carry the rest.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-[#141417] p-6">
          <h2 className="text-xl font-bold">Materials and manufacturing approach (concept)</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            In the concept, shells use metal and matte finishes, cushions use soft foam, and the
            headband is padded for long sessions. No supplier, factory, or material certification is
            claimed, because this is a fictional range.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-[#141417] p-6">
          <h2 className="text-xl font-bold">Design process</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-zinc-400">
            <li>Define the listening job: flagship, everyday, or lightweight.</li>
            <li>Shape the silhouette in 3D before any marketing copy.</li>
            <li>Choose finishes that survive daily use, not just a photo.</li>
            <li>Make cushions and cables replaceable in the concept.</li>
          </ol>
        </article>
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-[#141417] p-6">
        <h2 className="text-xl font-bold">Sustainability and repairability — only what is supportable</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          The only supportable statement in this concept is structural: a product whose cushions and
          cables can be replaced lasts longer in use than one whose parts cannot. No recycled-content
          percentage, carbon claim, or environmental certification is made.
        </p>
        <Link href="/shop" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">
          Shop the concept range <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
