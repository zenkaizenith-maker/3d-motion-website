# Google Flow Asset Workflow — 3D Motion Website

> **Important, pehle ye samajh lo:** Is project me Google Flow ka koi API,
> automation ya private-account access nahi hai — aur aisa koi official
> integration available nahi jo Flow ko seedha website se connect kare.
> Workflow ye hai: **Flow me video generate karo → MP4 download karo →
> neeche wale exact naam se `public/videos/` me rakho → site khud use
> kar legi.** Koi code change zaroori nahi. Config `lib/flow-assets.ts` me hai.

## 1. Website ko kaunsi videos chahiye

| # | Section | Exact filename | Poster | Aspect ratio | Duration | Role |
|---|---------|---------------|--------|--------------|----------|-------|
| 1 | Hero background | `hero-cinematic.mp4` | `hero-cinematic.jpg` | 16:9 | 8–12 s, seamless loop | Hero ke peeche muted cinematic layer (3D scene uske upar rehta hai) |
| 2 | Creative Showcase — Product | `product-orbit.mp4` | `product-orbit.jpg` | 16:9 | 6–10 s, loop | Showcase card 1 |
| 3 | Creative Showcase — Abstract | `abstract-flow.mp4` | `abstract-flow.jpg` | 16:9 | 6–10 s, loop | Showcase card 2 |
| 4 | Final CTA background | `final-cta.mp4` | `final-cta.jpg` | 16:9 | 8–12 s, loop | Final CTA ke peeche |

Poster: video ka pehla clean frame, JPG, `public/images/` me. Agar poster
na ho to bhi site chalegi — video load hone tak gradient fallback dikhega.

## 2. Google Flow me generate karne ke prompts

Style lock (har prompt me same rakho taake footage consistent lage):
**Deep black / dark charcoal world, soft cinematic lighting, electric-blue +
violet + cyan accents, white minimal typography feel, premium, Apple-style
minimalism, no gamer UI, no glowing borders, no text overlays, no watermark.**

### Video 1 — hero-cinematic.mp4 (Hero)
> Cinematic slow camera drift through a dark, minimal architectural space
> made of matte black stone and glass. Soft volumetric light beams cut
> through darkness, a thin electric-blue light line travels along the wall.
> A floating chrome abstract sculpture slowly rotates in the centre.
> Deep shadows, gentle haze, premium sci-fi minimalism, photorealistic,
> 16:9, smooth slow motion, no people, no text.

### Video 2 — product-orbit.mp4 (Showcase — Product)
> Studio product shot in a dark void: a sleek, minimal chrome-and-glass
> abstract product floats centre-frame and slowly rotates. A soft cyan
> rim light traces its edge, a violet reflection glows faintly on the
> dark floor below. Camera orbits slowly around it. Premium, Apple-style
> product presentation, photorealistic, 16:9, no people, no text, no logos.

### Video 3 — abstract-flow.mp4 (Showcase — Abstract)
> Abstract liquid chrome and glass forms flowing slowly in a dark space,
> catching electric-blue and violet reflections. Soft studio lighting,
> gentle depth of field, elegant and calm — not chaotic. Cinematic motion
> graphics feel, photorealistic render look, 16:9, no people, no text.

### Video 4 — final-cta.mp4 (Final CTA)
> Wide cinematic shot: a dark minimal landscape of smooth black geometric
> shapes, a horizon line glowing faintly cyan and violet. Slow push-in
> camera move toward a single bright point of light. Hopeful, premium,
> minimal ending shot, photorealistic, 16:9, no people, no text.

**Flow Agent tip (tumhare Step 3 ke mutabiq):** Flow me Agent option par
upar wala style lock + ek video ka prompt paste karo, phir us se 2–3
variations banwao aur sab se clean loop wali variation choose karo.
Loop ke liye start aur end frame visually qareeb hone chahiye.

## 3. Videos replace karne ka tareeqa (step by step)

1. Flow se MP4 download karo.
2. File ka naam **bilkul exact** rakho — jese `hero-cinematic.mp4`
   (capitalization aur spelling farq kare to site use nahi milegi).
3. File ko `public/videos/` me copy karo. Poster JPG ko `public/images/` me.
4. Dev server chal raha ho to wo auto-reload karega; production ke liye
   dobara `npm run build` chalao.
5. Agar koi video abhi generate nahi hui, to kuch karne ki zaroorat nahi —
   us section me gradient placeholder + filename dikhega, site nahi tootegi.

## 4. Technical notes (videos ke liye)

- Sab videos **muted, autoplay, loop, playsInline** hain
  (`components/FlowVideo.tsx`).
- `preload="metadata"` hai taake page jaldi load ho.
- Video load fail ho to component khud fallback dikhata hai (koi error page nahi).
- **Missing-asset 404 fix (2026-10-27, final):** component video/poster ki
  request se pehle sirf build-time `public/flow-manifest.json` mangta hai
  (script: `scripts/generate-flow-manifest.mjs`, `predev`/`prebuild` par
  auto-chalta hai). Missing file ki request kabhi nahi bhejta — is liye
  console me 404 error nahi aata, sirf gradient placeholder + filename
  dikhta hai. NOTE: video rakhne ke baad production ke liye dobara
  `npm run build` zaroori hai taake manifest fresh ho. (Pehli HEAD-request
  wali koshish nakaam hui thi — Chromium fetch ke 404 ko bhi console
  error ke tor par log karta hai, is liye manifest wala tareeqa apnaya gaya.)
- Verify karne ke liye: `node scripts/check-flow-assets.mjs` (filenames,
  format signature aur size check karta hai; copy-friendly prompts ke liye
  `FLOW_PROMPTS_CHECKLIST.md` dekho).
- Heavy 4K files mat rakho — 1080p, H.264 MP4, har file ideally **< 15 MB**.
- 3D models ke liye `public/models/` folder tayyar hai (GLB/GLTF yahan rakho),
  lekin is version me koi external model load nahi hota — sab geometry code se banti hai.
- Mobile par 3D canvas ke saath video background halka (opacity 40%) rakha gaya
  hai taake performance achi rahe. Reduced-motion preference ka ehtram hota hai.

## 5. Run karna

```bash
cd 3d-motion-website
npm install
npm run dev      # http://localhost:3000
npm run build    # production build test
npm start        # production server
```
