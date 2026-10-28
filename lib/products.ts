/**
 * VANTA ARC — centralized, editable product data.
 *
 * IMPORTANT HONESTY NOTES (do not remove):
 * - VANTA ARC is a FICTIONAL concept brand. Products, prices, specs and
 *   feature lists here are illustrative sample content, not real products.
 * - No real customer reviews, verified ratings, actual stock quantities,
 *   or independent certifications are claimed anywhere in this data.
 * - "Newest" ordering below is editorial (isNew flag), not a real launch date.
 */

export type ProductColor = {
  id: string;
  name: string;
  /** Hex used for swatches AND for the 3D model materials. */
  hex: string;
  /** Extra price for this finish, in USD. 0 = included. */
  priceDelta: number;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: "headphones" | "accessories";
  price: number;
  /** Editorial "new" flag only — not a verified launch date. */
  isNew: boolean;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  inBox: string[];
  colors: ProductColor[];
  /** Which 3D viewer to use: "headphone" for over-ears, "simple" for accessories. */
  viewer: "headphone" | "simple";
  /** Flow brand video that suits this product's storytelling section (optional). */
  video?: string;
  poster?: string;
};

export const BRAND = {
  name: "VANTA ARC",
  tagline: "SOUND, SHAPED BY DESIGN.",
  email: "hello@vanta-arc.example",
  note: "Fictional concept brand — demo storefront, no real orders or payments.",
};

const BLACK: ProductColor = { id: "vanta-black", name: "Vanta Black", hex: "#17181c", priceDelta: 0 };
const GRAPHITE: ProductColor = { id: "graphite", name: "Graphite", hex: "#3a3d42", priceDelta: 0 };
const TITANIUM: ProductColor = { id: "titanium", name: "Brushed Titanium", hex: "#9a9da3", priceDelta: 20 };
const WARM_WHITE: ProductColor = { id: "warm-white", name: "Warm White", hex: "#e8e2d6", priceDelta: 0 };
const ELECTRIC: ProductColor = { id: "electric", name: "Electric Blue", hex: "#2f6bff", priceDelta: 10 };

export const PRODUCTS: Product[] = [
  {
    slug: "vanta-arc-pro",
    name: "VANTA ARC PRO",
    tagline: "Flagship over-ear. Spatial audio, built for long listening.",
    category: "headphones",
    price: 349,
    isNew: true,
    description:
      "Our flagship over-ear headphone. A wide, calm soundstage, illustrative active noise cancellation, and cushions shaped for long sessions — presented here as a fictional concept product.",
    features: [
      "Illustrative spatial-audio tuning",
      "Illustrative active noise cancellation",
      "Memory-foam cushions (sample spec)",
      "Up to 40 hours listening (sample spec)",
      "USB-C charging (sample spec)",
    ],
    specs: [
      { label: "Driver (sample)", value: "40 mm dynamic" },
      { label: "Listening time (sample)", value: "Up to 40 hours" },
      { label: "Charging (sample)", value: "USB-C" },
      { label: "Weight (sample)", value: "254 g" },
      { label: "Connectivity (sample)", value: "Bluetooth + USB-C audio" },
    ],
    inBox: ["VANTA ARC PRO headphones", "Travel case", "USB-C cable", "Quick-start guide"],
    colors: [BLACK, GRAPHITE, TITANIUM, ELECTRIC],
    viewer: "headphone",
    video: "hero-cinematic.mp4",
    poster: "hero-cinematic.jpg",
  },
  {
    slug: "vanta-arc-one",
    name: "VANTA ARC ONE",
    tagline: "Everyday wireless. The balanced all-rounder.",
    category: "headphones",
    price: 229,
    isNew: false,
    description:
      "The everyday wireless headphone: balanced tuning, comfortable fit, and simple controls for work, travel and daily listening.",
    features: [
      "Balanced everyday tuning",
      "Illustrative noise cancellation",
      "Up to 32 hours listening (sample spec)",
      "Foldable design (sample spec)",
    ],
    specs: [
      { label: "Driver (sample)", value: "38 mm dynamic" },
      { label: "Listening time (sample)", value: "Up to 32 hours" },
      { label: "Charging (sample)", value: "USB-C" },
      { label: "Weight (sample)", value: "238 g" },
    ],
    inBox: ["VANTA ARC ONE headphones", "Carry pouch", "USB-C cable"],
    colors: [BLACK, WARM_WHITE, GRAPHITE],
    viewer: "headphone",
    video: "product-orbit.mp4",
    poster: "product-orbit.jpg",
  },
  {
    slug: "vanta-arc-air",
    name: "VANTA ARC AIR",
    tagline: "Lightweight. For all-day wear.",
    category: "headphones",
    price: 149,
    isNew: true,
    description:
      "The lightweight option in the family. Less weight on the head, the same restrained VANTA ARC design language.",
    features: [
      "Lightweight build (sample spec)",
      "Up to 28 hours listening (sample spec)",
      "Breathable cushions (sample spec)",
    ],
    specs: [
      { label: "Driver (sample)", value: "32 mm dynamic" },
      { label: "Listening time (sample)", value: "Up to 28 hours" },
      { label: "Weight (sample)", value: "198 g" },
    ],
    inBox: ["VANTA ARC AIR headphones", "USB-C cable"],
    colors: [WARM_WHITE, BLACK, ELECTRIC],
    viewer: "headphone",
    video: "abstract-flow.mp4",
    poster: "abstract-flow.jpg",
  },
  {
    slug: "arc-travel-case",
    name: "ARC TRAVEL CASE",
    tagline: "Hard-shell protection for ARC headphones.",
    category: "accessories",
    price: 39,
    isNew: false,
    description:
      "A hard-shell travel case sized for ARC over-ear headphones, with a pocket for cables.",
    features: ["Hard-shell protection", "Cable pocket", "Fits ARC over-ear models"],
    specs: [
      { label: "Fits", value: "ARC PRO / ONE / AIR (sample)" },
      { label: "Material (sample)", value: "Moulded shell, fabric cover" },
    ],
    inBox: ["Travel case"],
    colors: [BLACK, GRAPHITE],
    viewer: "simple",
  },
  {
    slug: "arc-replacement-cushions",
    name: "ARC REPLACEMENT CUSHIONS",
    tagline: "Fresh cushions, same fit.",
    category: "accessories",
    price: 29,
    isNew: false,
    description:
      "Replacement ear cushions for ARC over-ear headphones. No tools needed for fitting in this concept design.",
    features: ["Pair included", "Tool-free fitting (concept)"],
    specs: [{ label: "Fits", value: "ARC PRO / ONE (sample)" }],
    inBox: ["Cushion pair (left + right)"],
    colors: [BLACK, WARM_WHITE],
    viewer: "simple",
  },
  {
    slug: "arc-usb-c-audio-cable",
    name: "ARC USB-C AUDIO CABLE",
    tagline: "Wired listening, when you want it.",
    category: "accessories",
    price: 19,
    isNew: false,
    description: "A braided USB-C audio cable for wired listening and charging in this concept range.",
    features: ["Braided cable", "USB-C to USB-C"],
    specs: [
      { label: "Length (sample)", value: "1.2 m" },
      { label: "Connectors", value: "USB-C to USB-C" },
    ],
    inBox: ["USB-C audio cable"],
    colors: [BLACK],
    viewer: "simple",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getColor(product: Product, colorId: string): ProductColor {
  return product.colors.find((c) => c.id === colorId) ?? product.colors[0];
}

export function variantPrice(product: Product, colorId: string): number {
  return product.price + getColor(product, colorId).priceDelta;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2).replace(/\.00$/, "")}`;
}

export type CartItem = {
  productSlug: string;
  colorId: string;
  qty: number;
  /** For studio configurations: a short label, e.g. "Studio: ARC PRO · Titanium". */
  label?: string;
};

export function cartItemKey(item: CartItem): string {
  return `${item.productSlug}::${item.colorId}::${item.label ?? ""}`;
}

export function cartItemUnitPrice(item: CartItem): number {
  const product = getProduct(item.productSlug);
  if (!product) return 0;
  return variantPrice(product, item.colorId);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + cartItemUnitPrice(item) * item.qty, 0);
}

/** Demo shipping only — no real fulfilment. Free over $150, else $9 flat. */
export function demoShipping(subtotal: number, method: "standard" | "express"): number {
  if (subtotal <= 0) return 0;
  if (method === "express") return 19;
  return subtotal >= 150 ? 0 : 9;
}

export function searchProducts(query: string, products: Product[] = PRODUCTS): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [p.name, p.tagline, p.description, p.category, ...p.features]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export function filterProducts(
  products: Product[],
  opts: { category?: string; maxPrice?: number; feature?: string }
): Product[] {
  return products.filter((p) => {
    if (opts.category && opts.category !== "all" && p.category !== opts.category) return false;
    if (opts.maxPrice !== undefined && variantPrice(p, p.colors[0].id) > opts.maxPrice) return false;
    if (opts.feature && !p.features.some((f) => f.toLowerCase().includes(opts.feature!.toLowerCase())))
      return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: string): Product[] {
  const list = [...products];
  if (sort === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return list.sort((a, b) => b.price - a.price);
  if (sort === "newest") return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  return list.sort((a, b) => a.name.localeCompare(b.name));
}

export function validateCheckout(data: {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (data.address.trim().length < 5) errors.address = "Please enter a full street address.";
  if (data.city.trim().length < 2) errors.city = "Please enter your city.";
  if (data.postal.trim().length < 3) errors.postal = "Please enter a postal code.";
  return errors;
}
