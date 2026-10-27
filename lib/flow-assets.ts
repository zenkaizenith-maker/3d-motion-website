/**
 * Google Flow asset config — single source of truth.
 *
 * Flow se MP4 download karke sirf public/videos/ me rakho, isi naam se.
 * Agar file maujood nahi, to FlowVideo component khud poster/gradient
 * fallback dikhata hai — site kabhi tooti hui nazar nahi aati.
 * Koi Google Flow API, private account access ya undocumented endpoint
 * use nahi hota. Ye sirf local file mapping hai.
 */

export type FlowAsset = {
  /** public/videos/ ke andar filename, jese "hero-cinematic.mp4" */
  file: string;
  /** public/images/ ke andar poster, jese "hero-cinematic.jpg" */
  poster: string;
  section: string;
  label: string;
};

export const FLOW_ASSETS: Record<string, FlowAsset> = {
  heroBackground: {
    file: "hero-cinematic.mp4",
    poster: "hero-cinematic.jpg",
    section: "Hero",
    label: "Cinematic hero background",
  },
  showcaseProduct: {
    file: "product-orbit.mp4",
    poster: "product-orbit.jpg",
    section: "Creative Showcase",
    label: "Product orbit showcase",
  },
  showcaseAbstract: {
    file: "abstract-flow.mp4",
    poster: "abstract-flow.jpg",
    section: "Creative Showcase",
    label: "Abstract flow showcase",
  },
  finalCta: {
    file: "final-cta.mp4",
    poster: "final-cta.jpg",
    section: "Final CTA",
    label: "Final CTA background",
  },
};

export function videoUrl(file: string) {
  return `/videos/${file}`;
}

export function posterUrl(file: string) {
  return `/images/${file}`;
}
