# SvelteRX Aesthetic Overhaul: "Neon Lava to Deep Neon Blue & Slow Burn Orange"

Here is a comprehensive summary of all aesthetic and structural changes made to the SvelteRX template, along with the exact hex codes and CSS styles used, so they can be perfectly ported to Claude or any other system.

## 1. Global Color Palette (Hex Codes)

**Neon Blue/Cyan (Headlines, Buttons, Glows)**
- \`#C0FFF0\` — Base Text Color (Bright Aqua-White)
- \`#00FFFF\` — Primary Cyan Glow
- \`#00BFFF\` — Deep Sky Blue Glow / Outer Drop Shadow
- \`#00FFC8\` — Aqua-Green hint used in text shadows (`rgba(0, 255, 200, 0.7)`)

**Neon Purple (Pill Button Text)**
- \`#F0D0FF\` — Bright Pastel Purple (Pill Text Core)
- \`rgba(180, 0, 255, 0.8)\` — Inner Purple Glow
- \`rgba(139, 0, 255, 0.6)\` — Outer Violet Glow

**"Slow Burn" Orange (Body Text, Lists, Fine Print)**
- \`#FF5E00\` — Primary Body Text (Vibrant Hot Orange)
- \`#E64A19\` — Muted Body Text (Darker Burnt Orange for disclaimers)
- \`rgba(255, 180, 0, 0.8)\` — Inner Glow (Hot Yellow)
- \`rgba(255, 69, 0, 0.6)\` — Mid Glow (Deep Orange)
- \`rgba(255, 0, 0, 0.4)\` — Outer Glow (Dark Ambient Red)

**Backgrounds**
- \`#05000A\` — Solid Deep Black/Purple (Global fallback)
- \`#0D0025\` to \`#1A0045\` — Box Gradients

## 2. Typography

- **Headlines & Logos (\`Damion\`):**
  - Font: `font-family: 'Damion', cursive;`
  - Style: Removed all italicization (to prevent loop crushing) and removed thick outlines for legibility.
- **Body & Paragraphs (\`Playfair Display\`):**
  - Font: `font-family: 'Playfair Display', serif;`
  - Weight: `500` (normal) and `400` (muted).

## 3. Image Integrations

- **\`Purple_Night-1.jpg\`**:
  - Used as the background for the top header navigation, the bottom CTA section, the 3 standard service boxes, and the countdown timer box.
  - Rendered with a \`rgba(13, 0, 37, 0.7)\` gradient overlay so the neon text remains legible on top of it.
- **\`pills.jpg\`**:
  - Used universally as the background for all pill-shaped buttons, tags, and "Get Started" CTAs across the site.
  - Buttons are given a `1px` translucent cyan border.
- **\`Blue_flame_spec..jpg\`**:
  - Used specifically on the **GLP-1 "Featured Program"** box as a background hover effect.
  - Uses \`mix-blend-mode: screen\` to hide the black background of the image and make it glow behind the text.

## 4. Key CSS Animation Effects

**GLP-1 Blue Flame Hover:**
```css
.svc-featured::before {
  background: url('./imports/Blue_flame_spec..jpg') center/cover no-repeat;
  opacity: 0;
  mix-blend-mode: screen;
  transition: opacity 0.5s ease-in-out, transform 3s ease-out;
  transform: scale(1.1);
}
.svc-featured:hover::before {
  opacity: 0.45;
  transform: scale(1);
}
```

**"Slow Burn" Orange Text Glow:**
```css
body, p, li, .disclaimer, .formnote {
  color: #FF5E00 !important;
  font-family: 'Playfair Display', serif !important;
  text-shadow: 0 0 4px rgba(255, 180, 0, 0.8), 0 0 10px rgba(255, 69, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.4) !important;
}
```

## 5. Structural Changes

1. **Countdown Timer:** Rewrote the raw HTML script into a proper, functioning React `<Countdown />` component inside `src/components/Countdown.tsx`.
2. **Service Boxes Layout:** Converted the 3 standard service boxes back to a standard grid format, distinct from the wide horizontal split layout of the GLP-1 featured box.
3. **Global Cleanup:** Stripped hardcoded inline styles (`style={{ color: '#FFE600' }}`) out of all 16 internal `.tsx` pages so they properly inherit the global neon CSS.
