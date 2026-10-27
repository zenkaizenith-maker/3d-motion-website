"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const FAQS = [
  { category: "Shipping", q: "How long does delivery take in this demo?", a: "Demo information only: standard is shown as 3–5 illustrative days, express as 1–2 illustrative days. No real shipment is made." },
  { category: "Shipping", q: "What does shipping cost in the demo?", a: "Standard is free over $150, otherwise $9. Express is $19. These are demo totals calculated from the cart, not real carrier rates." },
  { category: "Returns", q: "Can I return a product?", a: "In the illustrative policy, returns are accepted within 30 days for unused concept products. No real return is processed here." },
  { category: "Warranty", q: "What warranty is shown?", a: "An illustrative 2-year concept warranty covering manufacturing defects in the fictional range. See the Warranty page. No real warranty claim can be filed." },
  { category: "Setup", q: "How do I set up ARC headphones (concept)?", a: "Charge over USB-C, pair over Bluetooth from your device, and use the on-ear controls. This is concept guidance, not a manual for a real device." },
  { category: "Troubleshooting", q: "The 3D viewer does not load. What can I do?", a: "If your browser cannot start WebGL, the viewer shows a clear fallback panel instead of a broken canvas. Try a desktop browser with hardware acceleration enabled, or continue with colors, specs and cart — those do not need WebGL." },
  { category: "Troubleshooting", q: "My cart disappeared after a refresh?", a: "Cart and wishlist are stored in your browser's localStorage. Clearing site data, private mode, or a different browser will start an empty cart. That is expected for this demo — no server account exists." },
];

export default function SupportPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [formDone, setFormDone] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return FAQS.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (!query) return true;
      return `${f.q} ${f.a}`.toLowerCase().includes(query);
    });
  }, [q, category]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setFormError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setFormError("Please enter a valid email address.");
    if (form.message.trim().length < 10) return setFormError("Please describe your question in at least 10 characters.");
    setFormError(null);
    setFormDone(true);
    // Honest fallback: no backend exists, so nothing is actually delivered.
    // The confirmation below says exactly that and offers a mailto link.
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">Support</span>
      </nav>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Support hub.</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Searchable FAQs, shipping and warranty information, setup guides, and a contact form.
        This is a fictional concept brand, so support answers describe the demo, not a real service.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2.5">
          <Search size={16} className="text-zinc-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search support…" aria-label="Search support" className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="FAQ category">
          {["All", "Shipping", "Returns", "Warranty", "Setup", "Troubleshooting"].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c} className={`rounded-full px-4 py-2.5 text-sm ${category === c ? "bg-white text-black" : "border border-white/20 hover:bg-white/5"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-[#141417] p-6 text-zinc-400">
            No support answer matches that search. Try a different word, or use the contact form below.
          </p>
        ) : (
          filtered.map((f) => (
            <details key={f.q} className="rounded-2xl border border-white/10 bg-[#141417] p-5">
              <summary className="cursor-pointer font-semibold">
                <span className="mr-2 text-xs tracking-widest text-blue-400">{f.category.toUpperCase()}</span> {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))
        )}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#141417] p-6">
          <h2 className="text-xl font-bold">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shipping" className="text-blue-300 hover:text-blue-200">Shipping & Returns (illustrative policy)</Link></li>
            <li><Link href="/warranty" className="text-blue-300 hover:text-blue-200">Warranty (illustrative policy)</Link></li>
            <li><Link href="/technology" className="text-blue-300 hover:text-blue-200">Technology and sample specs</Link></li>
            <li><Link href="/studio" className="text-blue-300 hover:text-blue-200">Studio customizer</Link></li>
          </ul>
          <h2 className="mt-6 text-xl font-bold">Contact (demo)</h2>
          <p className="mt-2 text-sm text-zinc-400">
            No real support inbox exists for this fictional brand. For a real message, use the
            mailto link below — it opens your own email app and does not claim delivery.
          </p>
          <a href="mailto:hello@vanta-arc.example?subject=VANTA%20ARC%20demo%20support" className="mt-3 inline-block rounded-full border border-white/20 px-5 py-2.5 text-sm hover:bg-white/10">
            Email via your mail app (mailto)
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#141417] p-6">
          <h2 className="text-xl font-bold">Contact form</h2>
          {formDone ? (
            <div role="status" className="mt-4 rounded-2xl border border-blue-400/40 bg-blue-400/10 p-4 text-sm leading-relaxed text-blue-100">
              Form validated. <strong>This message was NOT delivered</strong> — no backend or email
              integration exists in this demo. If you need a real reply, use the mailto link on the left.
              Your text was not stored on a server.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
              <div>
                <label htmlFor="support-name" className="text-sm font-medium">Name</label>
                <input id="support-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-full border border-white/20 bg-black/40 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="support-email" className="text-sm font-medium">Email</label>
                <input id="support-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-full border border-white/20 bg-black/40 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="support-message" className="text-sm font-medium">Message</label>
                <textarea id="support-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              </div>
              {formError && <p role="alert" className="text-sm text-red-300">{formError}</p>}
              <button type="submit" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
                Validate & show demo confirmation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
