# SvelteRX — Handoff Package

**Project:** svelterx.com — private healthcare network (health insurance, concierge medicine, GLP-1 weight-loss).
**Aesthetic:** "Neon Lava" — neon aqua-blue cursive headlines + "slow burn" orange serif body + neon purple pill buttons on a deep purple night-sky background, with a physics-driven flame cursor.
**Stack:** React 19 + Vite 8 + React Router 7 (`HashRouter`) + Tailwind CSS v4. 16 routed pages.

This document is the single source of truth. Values here were verified against the live code (`src/index.css`, `src/main.tsx`). Where the older `README-CHANGES.md` / `README-CHANGES-FINAL.md` disagree, **trust this file** — it matches the shipped code.

---

## 1. Where everything lives (map for Claude)

| Concern | File | Notes |
|---|---|---|
| Route table | `src/App.tsx` | `HashRouter`, all 16 routes nested under `Layout` |
| Page shell / background | `src/components/Layout.tsx` | wraps `<Outlet/>` in `#05000A` full-height div |
| **Aesthetic system (all CSS)** | `src/index.css` (772 lines) | fonts, tokens, neon glows, box backgrounds, flame + smoke keyframes, spin animations |
| **Flame cursor + smoke particle engine** | `src/main.tsx` | vanilla JS on `document`, runs outside React |
| **Box-spin-on-click engine** | `src/main.tsx` (bottom) | global click listener, intercepts in-box links |
| Countdown timer | `src/components/Countdown.tsx` | React component (rewritten from raw HTML script) |
| Pages | `src/pages/*.tsx` | 16 pages, inline color styles stripped so they inherit global CSS |
| Image assets | `src/imports/*` | backgrounds, flame spec, pills, service-box art |

> ⚠️ **Important for whoever finalizes:** the flame cursor and box-spin are **imperative DOM code in `src/main.tsx`**, not React components. They attach listeners to `document` at module load and mutate `document.body` CSS custom properties / append `<div>`s directly. They are **not** SSR-safe and assume a browser. Keep this in mind if the real site uses Next.js/SSR — this code must run client-side only.

---

## 2. Design tokens (verified — `src/index.css` `:root`)

```css
--purple:   #1A0040;   /* deep purple */
--purple-d: #0D0020;
--red:      #00BFFF;   /* (legacy name) actually deep sky blue accent */
--red-d:    #008B8B;   /* dark cyan */
--ink:      #C0FFF0;   /* headline aqua-white */
--body:     #FF8833;   /* slow-burn orange body text */
--muted:    #FF6600;   /* muted orange */
--bg:       #05000A;   /* global background */
--lav:      #0D0025;   /* box gradient start */
--lav2:     #1A0045;   /* box gradient end */
--line:     rgba(180, 0, 255, 0.35);  /* neon purple hairline */
--neon-shadow: 0 0 4px rgba(0,255,200,.7), 0 0 12px rgba(0,200,255,.6), 0 0 20px rgba(0,255,180,.4);
```

Runtime CSS custom properties set by the flame engine on `document.body`:
`--cursor-x`, `--cursor-y`, `--flame-lean`, `--flame-breeze`, `--flicker-speed`.

---

## 3. Typography

Loaded via Google Fonts `@import` at the top of `src/index.css` (must stay on lines 1–2, before all other rules — CSS spec + PostCSS require `@import` first):

```css
@import url('https://fonts.googleapis.com/css2?family=Damion&family=Rajdhani:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');
```

- **Headlines / logos / counters — `Damion`** (cursive), color `--ink` `#C0FFF0`, glow = `--neon-shadow`.
- **Body / paragraphs / lists / disclaimers — `Playfair Display`** (serif), color `#FF8833` (body) / `#FF6600` (muted), glow `text-shadow: 0 0 3px rgba(255,200,50,.9), 0 0 8px rgba(255,100,0,.7), 0 0 16px rgba(255,50,0,.5)`.
- **UI / nav — `Rajdhani`** (`--ui`).
- **Pill buttons — `Damion`**, text `#F0D0FF`.

---

## 4. Imagery & box backgrounds

All service boxes use image + `rgba(13, 0, 37, 0.7)` dark-purple overlay so neon text stays legible.

| Element | Image (in `src/imports/`) |
|---|---|
| Header nav, bottom CTA, standard service boxes, countdown | `Purple_Night-1.jpg` |
| Pill buttons / tags / CTAs (universal) | `pills.jpg` |
| GLP-1 featured box hover glow | `Blue_flame_spec..jpg` (`mix-blend-mode: screen`, fades in on hover) |
| Private Health Insurance box | `Lettering-1.jpg` |
| Concierge Medicine box | `gg.jpg` |
| Life Insurance box | `LI_pic.jpg` |

---

## 5. Flame cursor + smoke engine (`src/main.tsx`)

Native cursor hidden site-wide (`cursor: none`). A teardrop flame follows `(clientX, clientY)` via body CSS vars. Behaviors:

- **Flicker:** cycles 4 random speeds `['0.35s','0.5s','0.7s','1.2s']` every 2–5s.
- **Breeze:** ambient sway, retargets ±20° every 2–6s, eased at 0.015/frame.
- **Drag lean:** flame leans back proportional to mouse velocity, clamped to ±35°; relaxes to breeze 80ms after motion stops.
- **Moving smoke trail:** while dragging, spawns `.moving-smoke` ribbons every 30ms, life 3.2s.
- **Idle smoke:** while still, puffs `.cursor-smoke` every 120ms, life 2.2s.
- **Smoke rings:** every ~2–4.5s while still. 75% are slow rising/growing rings (life 8–30s); 25% are `.fast-ring` bullets (life ~2.5–3.5s) that shoot up spawning a hollow trailing tube.
- **Raycast ceiling collision:** slow rings raycast upward via `elementFromPoint`; if they hit `.svc, .svc-featured, .service-box, .formcard, .oe-card, header, nav`, they flatten at the box's bottom edge (`--hit-y`). ~35% randomly ignore the ceiling and pass through.

Tick loop runs on `setInterval(..., 20)`. All spawned nodes are `setTimeout`-removed.

---

## 6. Box-spin-on-click engine (`src/main.tsx`, bottom)

Global `click` listener. When a link inside `.svc, .svc-featured, .dv-bar, .service-box` with class `svc-resource | more | qualify-btn | dv-btn` is clicked:
- `preventDefault`, add spin class to the box:
  - `.dv-bar` → `spin-forward` / `spin-backward` (rotateX flip)
  - others → `spin-left` / `spin-right` (rotateY barrel roll, `1800deg`, `perspective(1200px)`)
- Add `body.navigating` (hides flame during transition).
- After 750ms, navigate (`window.location.href` or `window.open` for `_blank`), then clean up classes.

> Note: this uses full-page `window.location` navigation rather than React Router's client navigation. If finalizing on a router-driven site, consider swapping to `navigate()` after the animation to preserve SPA behavior.

---

## 7. Known cleanup items for finalization

1. **~150 `*.cjs` codemod scripts + `svelterx.html` scratch files** sit in the repo root. These were one-off transformation scripts used during the overhaul — safe to delete before publishing; none are imported by the app.
2. **`README-CHANGES.md` / `README-CHANGES-FINAL.md`** are superseded by this file (and contain a few stale hex codes). Remove or archive.
3. **`!important` density** — the neon overrides in `index.css` lean heavily on `!important`. Fine for this template, but worth flattening if integrating into a larger design system.
4. **SSR safety** — see §1 warning; `main.tsx` imperative code is browser-only.
5. **CSS `@import` ordering** — keep the two font `@import`s as the first statements in `index.css`.

---

## 8. Run / build

```bash
pnpm install
pnpm dev      # vite dev server (--host 0.0.0.0)
pnpm build    # production build
pnpm preview  # preview built output
```

Dependencies: `react@19`, `react-dom@19`, `react-router-dom@7`. Dev: Tailwind v4 (`@tailwindcss/vite`), Vite 8, TypeScript 5.7.
