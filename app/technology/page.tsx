import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FlowVideo from "@/components/FlowVideo";

const SECTIONS = [
  {
    title: "Acoustic architecture",
    body: "A wide, calm soundstage is the design goal for the ARC PRO concept: drivers, chamber shape and cushion seal are tuned together in the concept description. All figures here are illustrative sample content, not measurements from a real product.",
  },
  {
    title: "Spatial-audio experience",
    body: "Spatial audio in this concept means a sense of width and placement around the listener, not a claim about a specific licensed technology. No real certification or licensed format is claimed.",
  },
  {
    title: "Active noise cancellation (illustrative)",
    body: "Noise cancellation is presented as an illustrative product feature of the fictional range. No measured decibel reduction, test standard, or certification is claimed.",
  },
  {
    title: "Comfort and materials",
    body: "Memory-foam cushions, a padded headband and restrained finishes (black, graphite, brushed titanium, warm white, electric blue) define the concept range. Materials are described as sample content, not verified supplier data.",
  },
  {
    title: "Battery and charging",
    body: "Sample listening times: ARC PRO up to 40 hours, ARC ONE up to 32 hours, ARC AIR up to 28 hours. These are fictional sample specifications for the demo, not tested battery results. Charging is USB-C in the concept.",
  },
  {
    title: "Connectivity",
    body: "Bluetooth plus USB-C audio in the concept range. No specific Bluetooth version, codec, or multipoint claim is made, because none is verified for a fictional product.",
  },
  {
    title: "Maintenance and repairability",
    body: "The repairability concept is simple: cushions and cables are replaceable parts in the accessories range. No repair service, spare-parts availability, or warranty outcome is promised — see the Warranty page for the illustrative policy.",
  },
];

export default function TechnologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Technology</span>
      </nav>
      <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        Technology, explained without fake claims.
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Everything on this page describes the fictional VANTA ARC concept. Where a figure appears, it is labelled as a sample specification.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
        <FlowVideo file="product-orbit.mp4" poster="product-orbit.jpg" label="Cinematic brand video" className="aspect-video w-full object-cover" />
        <p className="bg-[#141417] p-4 text-xs text-zinc-500">
          Cinematic brand video from Google Flow — supporting storytelling, not a technical diagram or product photograph.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SECTIONS.map((s) => (
          <article key={s.title} className="rounded-3xl border border-white/10 bg-[#141417] p-6">
            <h2 className="text-xl font-bold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-[#141417] p-6">
        <h2 className="text-xl font-bold">Interactive diagram — concept only</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Driver → chamber → cushion seal → ear. In the concept, each step shapes the sound before it reaches you.
          The real interactive experience is the 3D viewer: open any headphone, drag to rotate, and change finishes.
        </p>
        <Link href="/studio" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">
          Open the 3D Studio <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
