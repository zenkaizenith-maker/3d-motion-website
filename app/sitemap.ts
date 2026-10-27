import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL is the deployed origin when known; the build does not invent one.
  // Vercel supplies the correct origin at runtime, and this file is only a
  // route list for search engines — it is not used to claim a live URL.
  const base = "https://3d-motion-website-indol.vercel.app";
  const staticRoutes = ["", "/shop", "/studio", "/technology", "/story", "/support", "/cart", "/checkout", "/search", "/wishlist", "/compare", "/shipping", "/warranty", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...PRODUCTS.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date() })),
  ];
}
