"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Check } from "lucide-react";
import { BRAND, formatPrice, getProduct, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductViewer } from "@/components/ProductViewer";
import { Reveal } from "@/components/SiteChrome";
import FlowVideo from "@/components/FlowVideo";

const PRO = getProduct("vanta-arc-pro")!;
const HEADPHONES = PRODUCTS.filter((p) => p.category === "headphones");

const FAQS = [
  {
    q: "Is VANTA ARC a real brand I can buy from?",
    a: "No. VANTA ARC is a fictional concept brand created for this demo storefront. Products, prices and specifications are illustrative sample content, and checkout is a demo that never charges you.",
  },
  {
    q: "Can I actually buy these headphones here?",
    a: "No real order is placed. Cart and checkout work as a demo journey: you can browse, customize, add to cart, and see a sample order confirmation with an illustrative reference. No payment provider is connected.",
  },
  {
    q: "What does the 3D viewer show?",
    a: "A procedural 3D headphone model built from real geometry in Three.js — headband, earcups, cushions and hinges. Drag to rotate, scroll to zoom, and change colors to see finishes update in the viewer.",
  },
];

export default function Home() {
  const [colorId, setColorId] = useState(PRO.colors[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewerKey, setViewerKey] = useState(0);
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
      gsap.from(".hero-fade", { y: 20, opacity: 0, duration: 0.8, delay: 0.4, stagger: 0.1, ease: "power2.out" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const submitNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNewsletterMsg("Please enter a valid email address.");
      return;
    }
    setNewsletterMsg("Thanks — this is a demo signup. No email was sent and nothing was stored on a server.");
    setEmail("");
  };

  const shellColor = PRO.colors.find((c) => c.id === colorId)?.hex ?? "#17181c";

  return (
    <>
      {/* HERO — real product, not a decorative object */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="hero-fade text-xs tracking-[0.3em] text-blue-400">FLAGSHIP · VANTA ARC PRO</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="hero-line block">SOUND,</span>
              <span className="hero-line block text-zinc-400">SHAPED BY</span>
              <span className="hero-line block">DESIGN.</span>
            </h1>
            <p className="hero-fade mt-5 max-w-lg text-lg leading-relaxed text-zinc-400">
              {PRO.tagline} Drag the headphone, change its finish, and see a real
              interactive 3D product — then take it to the Studio to customize it.
            </p>
            <div className="hero-fade mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link href="/studio" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Explore 3D Studio
              </Link>
            </div>
            <div className="hero-fade mt-7 flex flex-wrap items-center gap-2" aria-label="Choose hero color">
              <span className="mr-1 text-xs tracking-widest text-zinc-500">FINISH:</span>
              {PRO.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  aria-pressed={colorId === c.id}
                  aria-label={`Finish ${c.name}`}
                  title={c.name}
                  className={`h-8 w-8 rounded-full border-2 ${colorId === c.id ? "border-white" : "border-white/25"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="ml-2 text-sm text-zinc-300">{PRO.colors.find((c) => c.id === colorId)?.name}</span>
            </div>
            <p className="hero-fade mt-4 text-lg font-bold">{formatPrice(PRO.price)} <span className="text-sm font-normal text-zinc-500">· fictional demo price</span></p>
          </div>
          <div key={viewerKey} className="relative h-[420px] sm:h-[520px] lg:h-[600px]">
            <ProductViewer
              product={PRO}
              shellColor={shellColor}
              cushionColor="#1c1d22"
              autoRotate={autoRotate}
              onToggleAutoRotate={() => setAutoRotate((v) => !v)}
              onReset={() => {
                setColorId(PRO.colors[0].id);
                setAutoRotate(true);
                setViewerKey((k) => k + 1);
              }}
            />
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-blue-400">FEATURED COLLECTION</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The ARC family.</h2>
            </div>
            <Link href="/shop" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-white hover:text-blue-300 sm:inline-flex">
              View all <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HEADPHONES.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* COMPARISON PREVIEW */}
      <section className="border-y border-white/10 bg-[#0e0e11] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-blue-400">COMPARE AT A GLANCE</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Three headphones, three jobs.</h2>
          </Reveal>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="p-4 font-medium">Feature (sample specs)</th>
                  {HEADPHONES.map((p) => (
                    <th key={p.slug} className="p-4 font-semibold text-white">
                      <Link href={`/products/${p.slug}`} className="hover:text-blue-300">{p.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-zinc-400">Price (demo)</td>
                  {HEADPHONES.map((p) => (
                    <td key={p.slug} className="p-4 font-bold">{formatPrice(p.price)}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-zinc-400">Listening time (sample)</td>
                  {HEADPHONES.map((p) => (
                    <td key={p.slug} className="p-4">{p.specs.find((s) => s.label.includes("Listening"))?.value ?? "—"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-zinc-400">Weight (sample)</td>
                  {HEADPHONES.map((p) => (
                    <td key={p.slug} className="p-4">{p.specs.find((s) => s.label.includes("Weight"))?.value ?? "—"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <Link href="/compare?ids=vanta-arc-pro,vanta-arc-one,vanta-arc-air" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">
            Open full comparison <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* TECHNOLOGY STORYTELLING + CINEMATIC VIDEO */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-blue-400">AUDIO ENGINEERING</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Built around the ear, not around a spec sheet.</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Acoustic architecture, comfort and materials are presented as illustrative
              concept specifications on the Technology page — not as verified real-world
              claims. What you can verify here is the product journey itself: browse,
              customize, compare, and check out in demo mode.
            </p>
            <ul className="mt-6 space-y-3">
              {["Spatial-audio tuning (illustrative)", "Comfort-first cushions and headband", "Repairable parts concept: cushions and cables"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check size={18} className="mt-0.5 shrink-0 text-blue-400" /> {t}
                </li>
              ))}
            </ul>
            <Link href="/technology" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">
              Explore Technology <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <FlowVideo file="hero-cinematic.mp4" poster="hero-cinematic.jpg" label="Cinematic brand video" className="aspect-video w-full object-cover" />
              <p className="bg-[#141417] p-4 text-xs text-zinc-500">
                Cinematic brand video from Google Flow — supporting storytelling, not a product photograph or a substitute for the interactive 3D viewer above.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop by category.</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Link href="/shop?category=headphones" className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#1c1c22] to-[#0a0a0b] p-8 hover:border-blue-500/50">
            <p className="text-2xl font-bold">Headphones</p>
            <p className="mt-2 text-zinc-400">PRO, ONE and AIR — three over-ear concepts, one design language.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-300">Browse headphones <ArrowRight size={16} /></span>
          </Link>
          <Link href="/shop?category=accessories" className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#1c1c22] to-[#0a0a0b] p-8 hover:border-blue-500/50">
            <p className="text-2xl font-bold">Accessories</p>
            <p className="mt-2 text-zinc-400">Cases, cushions and cables to keep the ARC family going longer.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-300">Browse accessories <ArrowRight size={16} /></span>
          </Link>
        </div>
      </section>

      {/* FAQ + NEWSLETTER */}
      <section className="border-t border-white/10 bg-[#0e0e11] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Questions, answered honestly.</h2>
            <div className="mt-6 space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="rounded-2xl border border-white/10 bg-[#141417] p-5">
                  <summary className="cursor-pointer font-semibold">{f.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                </details>
              ))}
            </div>
            <Link href="/support" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">
              Visit Support <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#141417] p-8">
            <h2 className="text-2xl font-bold">Get concept drops, not spam.</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Demo signup only — submitting here does not subscribe you to a real list.
            </p>
            <form onSubmit={submitNewsletter} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-blue-400"
              />
              <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
                Sign up (demo)
              </button>
            </form>
            {newsletterMsg && <p role="status" className="mt-3 text-sm text-zinc-300">{newsletterMsg}</p>}
            <p className="mt-4 text-xs text-zinc-500">{BRAND.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
