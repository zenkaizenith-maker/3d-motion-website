# Google Flow — Copy-Friendly Checklist (4 Videos)

> **Deploy se pehle ye checklist complete karo. Abhi status: 0 / 4 videos maujood.**
> Har prompt ko poora copy karo — style lock ke saath — taake 4 videos
> ek jaisi cinematic duniya lagen, alag-alag clips ka collection nahi.
> **Ye prompts sirf Flow me paste karne ke liye hain. Koi fake video,
> stock footage ya doosri site ki image site me asset ke tor par use
> nahi ki gayi hai.** Tumhare message wali reference images sirf mood
> ke liye hain, unko `public/` me copy mat karo.

## 0. Style lock — har prompt ke saath ye line rakho

```
Deep black / dark charcoal world, soft cinematic lighting, electric-blue +
violet + cyan accents, white minimal typography feel, premium, Apple-style
minimalism, no gamer UI, no glowing borders, no text overlays, no watermark,
no people, no logos.
```

## 1. Hero background — copy, generate, download

- [ ] Flow me prompt paste kiya
- [ ] 2–3 variations me se clean loop wali chuni (start aur end frame qareeb hon)
- [ ] Download kiya aur naam rakha: `hero-cinematic.mp4`
- [ ] Poster (pehla clean frame) naam rakha: `hero-cinematic.jpg`
- [ ] `public/videos/hero-cinematic.mp4` + `public/images/hero-cinematic.jpg` me rakha
- [ ] `node scripts/check-flow-assets.mjs` me iski line READY dikhi

**Section:** Hero (3D scene ke peeche muted layer) · **Ratio:** 16:9 ·
**Duration:** 8–12 s, seamless loop · **Size target:** < 15 MB, 1080p H.264

```
Cinematic slow camera drift through a dark, minimal architectural space
made of matte black stone and glass. Soft volumetric light beams cut
through darkness, a thin electric-blue light line travels along the wall.
A floating chrome abstract sculpture slowly rotates in the centre.
Deep shadows, gentle haze, premium sci-fi minimalism, photorealistic,
16:9, smooth slow motion, no people, no text.
```

Mood reference (sirf dekhne ke liye, asset nahi):
Abstract fluid sculpture with purple and blue lighting —
https://unsplash.com/photos/abstract-fluid-sculpture-with-purple-and-blue-lighting-aAC5RQ25iqY

## 2. Product showcase — copy, generate, download

- [ ] Flow me prompt paste kiya
- [ ] 2–3 variations me se clean loop wali chuni
- [ ] Download kiya aur naam rakha: `product-orbit.mp4`
- [ ] Poster naam rakha: `product-orbit.jpg`
- [ ] `public/videos/product-orbit.mp4` + `public/images/product-orbit.jpg` me rakha
- [ ] `node scripts/check-flow-assets.mjs` me iski line READY dikhi

**Section:** Creative Showcase, card 1 · **Ratio:** 16:9 ·
**Duration:** 6–10 s, loop · **Size target:** < 15 MB, 1080p H.264

```
Studio product shot in a dark void: a sleek, minimal chrome-and-glass
abstract product floats centre-frame and slowly rotates. A soft cyan
rim light traces its edge, a violet reflection glows faintly on the
dark floor below. Camera orbits slowly around it. Premium, Apple-style
product presentation, photorealistic, 16:9, no people, no text, no logos.
```

Mood reference (sirf dekhne ke liye, asset nahi):
Windows 11 Wallpaper + AI Art Exploration (2023) —
https://www.behance.net/gallery/191619709/Windows-11-Wallpaper-AI-Art-Exploration-2023

## 3. Abstract motion — copy, generate, download

- [ ] Flow me prompt paste kiya
- [ ] 2–3 variations me se clean loop wali chuni
- [ ] Download kiya aur naam rakha: `abstract-flow.mp4`
- [ ] Poster naam rakha: `abstract-flow.jpg`
- [ ] `public/videos/abstract-flow.mp4` + `public/images/abstract-flow.jpg` me rakha
- [ ] `node scripts/check-flow-assets.mjs` me iski line READY dikhi

**Section:** Creative Showcase, card 2 · **Ratio:** 16:9 ·
**Duration:** 6–10 s, loop · **Size target:** < 15 MB, 1080p H.264

```
Abstract liquid chrome and glass forms flowing slowly in a dark space,
catching electric-blue and violet reflections. Soft studio lighting,
gentle depth of field, elegant and calm — not chaotic. Cinematic motion
graphics feel, photorealistic render look, 16:9, no people, no text.
```

Mood reference (sirf dekhne ke liye, asset nahi):
Fluid liquid blue glass shapes and spheres abstract background.

## 4. Final CTA background — copy, generate, download

- [ ] Flow me prompt paste kiya
- [ ] 2–3 variations me se clean loop wali chuni
- [ ] Download kiya aur naam rakha: `final-cta.mp4`
- [ ] Poster naam rakha: `final-cta.jpg`
- [ ] `public/videos/final-cta.mp4` + `public/images/final-cta.jpg` me rakha
- [ ] `node scripts/check-flow-assets.mjs` me iski line READY dikhi

**Section:** Final CTA background · **Ratio:** 16:9 ·
**Duration:** 8–12 s, loop · **Size target:** < 15 MB, 1080p H.264

```
Wide cinematic shot: a dark minimal landscape of smooth black geometric
shapes, a horizon line glowing faintly cyan and violet. Slow push-in
camera move toward a single bright point of light. Hopeful, premium,
minimal ending shot, photorealistic, 16:9, no people, no text.
```

Mood reference (sirf dekhne ke liye, asset nahi):
3D abstract neon background, geometric polygonal structure, cyber space
virtual reality, podium — coloured neon lights, retro sci-fi style.

## 5. Sab videos rakhne ke baad — final checks

- [ ] `node scripts/check-flow-assets.mjs` — 4/4 videos + 4/4 posters READY
- [ ] `npm run build` — PASS
- [ ] Live QA me console me koi video/poster 404 nahi
- [ ] Har video muted autoplay + loop chal rahi hai, mobile par bhi
- [ ] Tab jaa kar deployment ki baat hogi — is se pehle deploy nahi

**Agar koi video abhi missing hai:** site phir bhi perfect chalegi.
`FlowVideo` pehle build-time `flow-manifest.json` se check karta hai ke
file hai ya nahi — missing file par video/poster ki request hi nahi
bhejta, is liye console me 404 error nahi aata, sirf gradient
placeholder + filename dikhta hai. Video rakhne ke baad dobara
`npm run build` chalana mat bhoolna taake manifest fresh ho.
