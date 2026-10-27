"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/site-content";

/** Desktop-only custom cursor — touch devices par bilkul render nahi hota. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block" aria-hidden="true">
      <div ref={ringRef} className="absolute h-9 w-9 rounded-full border border-white/30" />
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300" />
    </div>
  );
}

/** Magnetic hover — button mouse ki taraf halka khinchta hai, chhodne par wapas. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block transition-transform duration-200 ease-out will-change-transform">
      {children}
    </div>
  );
}

/** Loading overlay — window load ya 1.2s me khud fade out ho jata hai. */
export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1200);
    const onLoad = () => setDone(true);
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", onLoad);
    };
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050507]">
      <p className="animate-pulse text-sm tracking-[0.4em] text-zinc-400">{BRAND.name}</p>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050507]/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="text-sm font-semibold tracking-[0.25em] text-white">
          {BRAND.name}
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
            Start a Project
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menu band karo" : "Menu kholo"}
          className="rounded-md border border-white/20 p-2 text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#050507]/95 px-5 py-4 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base text-zinc-200">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-white py-3 text-center text-sm font-medium text-black">
            Start a Project
          </a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.25em]">{BRAND.name}</p>
          <p className="mt-1 text-sm text-zinc-500">{BRAND.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-zinc-400">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${BRAND.email}`} className="text-sm text-zinc-400 hover:text-white">
          {BRAND.email}
        </a>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs text-zinc-600">
        Placeholder brand content — naam, text aur links lib/site-content.ts se badle ja sakte hain.
      </p>
    </footer>
  );
}
