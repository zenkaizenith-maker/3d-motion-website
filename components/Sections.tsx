"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Clapperboard,
  Code2,
  MousePointerClick,
  Play,
  Sparkles,
} from "lucide-react";
import { BRAND, CAPABILITIES, PROCESS_STEPS, SHOWCASE_ITEMS } from "@/lib/site-content";
import { FLOW_ASSETS } from "@/lib/flow-assets";
import FlowVideo from "@/components/FlowVideo";
import { Magnetic } from "@/components/Chrome";

// R3F canvas sirf client par — SSR par WebGL try nahi hota.
const HeroScene = dynamic(() => import("@/components/Scene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,#1e293b_0%,#050507_70%)]" />,
});
const MiniScene = dynamic(() => import("@/components/Scene").then((m) => m.MiniScene), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,#1e293b_0%,#050507_70%)]" />,
});

/** Scroll par reveal — IntersectionObserver, GSAP ke baghair bhi reliable. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 60, opacity: 0, duration: 1, stagger: 0.14, ease: "power3.out" });
      gsap.from(".hero-fade", { y: 20, opacity: 0, duration: 0.9, delay: 0.5, stagger: 0.12, ease: "power2.out" });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={headlineRef} className="relative flex min-h-svh flex-col overflow-hidden pt-20">
      {/* Flow background — file aane par video, warna poster/gradient fallback */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <FlowVideo
          file={FLOW_ASSETS.heroBackground.file}
          poster={FLOW_ASSETS.heroBackground.poster}
          label={FLOW_ASSETS.heroBackground.label}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
        <div className="py-16 lg:py-0">
          <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-widest text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            IMMERSIVE 3D & MOTION STUDIO
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="hero-line block">Stories that</span>
            <span className="hero-line block bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
              move in 3D.
            </span>
          </h1>
          <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            {BRAND.name} cinematic 3D scenes, motion graphics aur AI video ko ek premium
            interactive experience me badalta hai — sirf dekhne ke liye nahi, mehsoos karne ke liye.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#showcase" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200">
                <Play size={16} /> Watch the Experience
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#capabilities" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Explore Capabilities <ArrowUpRight size={16} />
              </a>
            </Magnetic>
          </div>
          <p className="hero-fade mt-8 text-xs tracking-widest text-zinc-500">
            NEXT.JS · THREE.JS · REACT THREE FIBER · GSAP
          </p>
        </div>

        {/* Asli interactive 3D — mouse se sculpture halka ghumta hai */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[640px]" aria-label="Interactive 3D scene">
          <HeroScene />
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-zinc-500">
            Mouse ghumao — sculpture respond karega
          </p>
        </div>
      </div>

      <a href="#showcase" className="hero-fade relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-zinc-400" aria-label="Neeche scroll karo">
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="scroll-dot block h-2 w-2 rounded-full bg-cyan-300" />
        </span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}

const CAP_ICONS = [Box, Clapperboard, Sparkles, Code2, MousePointerClick];

export function Showcase() {
  return (
    <section id="showcase" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-xs tracking-[0.3em] text-cyan-300">CREATIVE SHOWCASE</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Cinematic scenes, real 3D depth.
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Har showcase card ke peeche ek Google Flow video attach hoti hai. Jab tak video add nahi
          hoti, card placeholder dikhata hai — layout ya design nahi toot-ta.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SHOWCASE_ITEMS.map((item, i) => (
          <Reveal key={item.id} className={i === 0 ? "md:col-span-2" : ""}>
            <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c10] transition-transform duration-300 hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <FlowVideo
                  file={item.video}
                  poster={item.poster}
                  label={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                <p className="mt-4 font-mono text-xs text-zinc-500">public/videos/{item.video}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const cap = CAPABILITIES[active];
  const Icon = CAP_ICONS[active] ?? Box;

  return (
    <section id="capabilities" className="border-y border-white/10 bg-[#0a0a0e] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-violet-300">CAPABILITIES</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Jo hum banate hain.</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-2" role="tablist" aria-label="Capabilities">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  active === i ? "border-white/30 bg-white/10" : "border-white/10 bg-transparent hover:bg-white/5"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{c.title}</span>
                  <ArrowUpRight size={18} className={active === i ? "text-cyan-300" : "text-zinc-600"} />
                </span>
                <span className="mt-1 block text-sm text-zinc-400">{c.description}</span>
              </button>
            ))}
          </div>
          <Reveal className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#141424] to-[#050507] p-8">
            <span className="inline-flex rounded-2xl bg-white/10 p-3 text-cyan-300">
              <Icon size={28} />
            </span>
            <h3 className="mt-6 text-3xl font-semibold">{cap.title}</h3>
            <p className="mt-4 leading-relaxed text-zinc-300">{cap.detail}</p>
            <p className="mt-6 text-sm text-zinc-500">Click karke har capability ka detail dekho — ye interactive hai, sirf list nahi.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-xs tracking-[0.3em] text-cyan-300">PROCESS</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Idea se launch tak.</h2>
      </Reveal>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {PROCESS_STEPS.map((s) => (
          <li key={s.n} className="process-step rounded-3xl border border-white/10 bg-[#0c0c10] p-6">
            <p className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent">
              {s.n}
            </p>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <FlowVideo
          file={FLOW_ASSETS.finalCta.file}
          poster={FLOW_ASSETS.finalCta.poster}
          label={FLOW_ASSETS.finalCta.label}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Apni kahani ko
            <span className="block bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
              3D me zinda karo.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-zinc-400">
            Ek cinematic, interactive website chahiye jo logon ko rukne par majboor kare?
            Baat shuru karo — pehla concept hum banate hain.
          </p>
          <div className="mt-8">
            <Magnetic>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-zinc-200">
                Start a Project <ArrowUpRight size={16} />
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <div className="relative hidden h-[380px] lg:block" aria-label="Final 3D shape">
          <MiniScene />
        </div>
      </div>
    </section>
  );
}
