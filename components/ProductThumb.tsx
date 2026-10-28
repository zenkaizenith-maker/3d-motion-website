"use client";

import { getColor, type Product } from "@/lib/products";

/**
 * Stylized product illustration for cards and accessory pages.
 * This is NOT a product photograph — headphones get the real interactive
 * 3D viewer on their detail/studio pages; accessories get this clean
 * illustration so we never show an unrelated headphone model for them.
 */
export function ProductThumb({ product, colorId }: { product: Product; colorId: string }) {
  const color = getColor(product, colorId);
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,#23232a_0%,#0a0a0b_70%)]"
      role="img"
      aria-label={`Stylized illustration of ${product.name} in ${color.name}`}
    >
      {product.viewer === "headphone" ? (
        <svg viewBox="0 0 200 140" className="h-3/4 w-3/4" aria-hidden="true">
          <path d="M40 110 V70 a60 60 0 0 1 120 0 V110" fill="none" stroke={color.hex} strokeWidth="14" strokeLinecap="round" />
          <rect x="28" y="95" width="26" height="38" rx="12" fill={color.hex} />
          <rect x="146" y="95" width="26" height="38" rx="12" fill={color.hex} />
          <rect x="36" y="103" width="10" height="22" rx="5" fill="#0a0a0b" opacity="0.55" />
          <rect x="154" y="103" width="10" height="22" rx="5" fill="#0a0a0b" opacity="0.55" />
          <circle cx="159" cy="114" r="4" fill="#2f6bff" />
        </svg>
      ) : (
        <svg viewBox="0 0 200 140" className="h-3/4 w-3/4" aria-hidden="true">
          <rect x="55" y="40" width="90" height="60" rx="18" fill={color.hex} />
          <rect x="55" y="40" width="90" height="60" rx="18" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" />
          <text x="100" y="76" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="sans-serif" opacity="0.9">
            {product.slug === "arc-travel-case" ? "CASE" : product.slug === "arc-replacement-cushions" ? "CUSHIONS" : "USB-C"}
          </text>
        </svg>
      )}
    </div>
  );
}
