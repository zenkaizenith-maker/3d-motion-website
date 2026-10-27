export const BRAND = {
  name: "LUMEN STUDIO",
  tagline: "Immersive 3D & Motion",
  // Brand name / tagline yahan se badlo — poori site isi config se chalti hai.
  email: "hello@lumenstudio.example",
};

export const NAV_LINKS = [
  { label: "Showcase", href: "#showcase" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export type Capability = {
  id: string;
  title: string;
  description: string;
  detail: string;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "3d-design",
    title: "3D Design",
    description: "Real-time 3D worlds, product visuals aur abstract environments.",
    detail: "Three.js / React Three Fiber me geometry, material aur lighting ke saath interactive scenes — sirf flat mockup nahi, asli depth.",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    description: "Cinematic camera moves, scroll-driven reveals aur kinetic type.",
    detail: "GSAP + ScrollTrigger se har section ek scene ki tarah khulta hai — timing, easing aur pacing par poora control.",
  },
  {
    id: "ai-video",
    title: "AI Video Creation",
    description: "Google Flow se cinematic AI footage, story-driven edits ke saath.",
    detail: "Flow videos public/videos me aate hain aur asset config se section-wise attach hote hain — koi fake API nahi.",
  },
  {
    id: "creative-dev",
    title: "Creative Development",
    description: "Next.js + TypeScript par fast, responsive aur accessible builds.",
    detail: "Strict TypeScript, reusable components aur production build jo mobile par bhi smooth chale.",
  },
  {
    id: "interactive",
    title: "Interactive Experiences",
    description: "Mouse, scroll aur hover par react karne wale live experiences.",
    detail: "Custom cursor, magnetic buttons aur 3D hover — sab kaam karte hain, sirf decorative nahi.",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Concept",
    text: "Story, mood aur camera language pehle tay hoti hai — design uske baad.",
  },
  {
    n: "02",
    title: "Design",
    text: "Typography, colour aur layout ka premium system banta hai.",
  },
  {
    n: "03",
    title: "Creation",
    text: "Google Flow se cinematic footage aur 3D assets tayyar hote hain.",
  },
  {
    n: "04",
    title: "Development",
    text: "Three.js scenes, GSAP motion aur responsive layout implement hota hai.",
  },
  {
    n: "05",
    title: "Launch",
    text: "Production build, performance check aur live deployment.",
  },
];

export const SHOWCASE_ITEMS = [
  {
    id: "hero-cinematic",
    title: "Cinematic Opening",
    description: "Dark architectural world, slow camera drift aur soft volumetric light.",
    video: "hero-cinematic.mp4",
    poster: "hero-cinematic.jpg",
  },
  {
    id: "product-orbit",
    title: "Product in Orbit",
    description: "Floating product, studio lighting aur 360-degree camera feel.",
    video: "product-orbit.mp4",
    poster: "product-orbit.jpg",
  },
  {
    id: "abstract-flow",
    title: "Abstract Flow",
    description: "Liquid chrome aur glass forms — motion graphics ka hero shot.",
    video: "abstract-flow.mp4",
    poster: "abstract-flow.jpg",
  },
];
