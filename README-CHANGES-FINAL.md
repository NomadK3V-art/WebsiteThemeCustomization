# SvelteRX Final Aesthetic Summary

Here is the final, comprehensive list of the aesthetic systems and physics engines we built for the SvelteRX template.

## 1. Global Color & Typography Engine
- **Neon Aqua-Blue (Headlines, Counters):** 
  - Font: `Damion` (cursive)
  - Color: `#C0FFF0`
  - Glow: `text-shadow: 0 0 4px rgba(0, 255, 200, 0.7), 0 0 12px rgba(0, 200, 255, 0.6), 0 0 20px rgba(0, 255, 180, 0.4)`
- **"Slow Burn" Orange (Body Text, Disclaimers):**
  - Font: `Playfair Display` (serif)
  - Color: `#FF8833` (Body), `#FF6600` (Muted)
  - Glow: `text-shadow: 0 0 3px rgba(255, 200, 50, 0.9), 0 0 8px rgba(255, 100, 0, 0.7), 0 0 16px rgba(255, 50, 0, 0.5)`
- **Neon Purple (Pill Buttons):**
  - Font: `Damion`
  - Text Color: `#F0D0FF`
  - Background: Universal override to `pills.jpg`
  - Border/Glow: `1px solid rgba(180, 0, 255, 0.5)` with deep violet box shadows.

## 2. Dynamic Service Box Backgrounds
The `.svc` boxes on the homepage feature specific background images integrated with a `rgba(13, 0, 37, 0.7)` dark purple translucent overlay so the neon text pops perfectly.
- **Private Health Insurance:** `Lettering-1.jpg`
- **Concierge Medicine:** `gg.jpg`
- **Life Insurance:** `LI_pic.jpg`
- **Featured GLP-1 Box:** Uses `Blue_flame_spec..jpg` combined with `mix-blend-mode: screen` on hover so the blue fire illuminates from behind the text.

## 3. Global 3D Interactive Physics
- **Universal Box Spin:** Clicking any link inside a service box (`.svc`, `.svc-featured`, `.service-box`) across *all 16 pages* triggers a rapid 5-rotation `1800deg` barrel roll along the `rotateY` axis (in place, utilizing `perspective(1200px)`). 
- **Dental & Vision Flip:** The wide `.dv-bar` automatically detects its shape and flips forward/backward along the `rotateX` axis instead.

## 4. The Global Cursor Flame Particle Engine
The default browser cursor has been disabled (`cursor: none`) across the entire site and replaced with a dynamic, physics-driven particle engine tracking `(e.clientX, e.clientY)`.

- **The Flame Base:** 
  - A sharp 18x55px teardrop shape (`border-radius: 50% / 85% 85% 25% 25%`).
  - Contains a pure white/cyan core (`#00FFFF`, `#00BFFF`) separated from a bright yellow/orange tip by a transparent gap (`#000000` masked via screen blend).
- **Slinky & Drag Physics:** 
  - The flame scales and breathes dynamically while shifting through 4 random flicker speeds. 
  - When dragged, it calculates mouse velocity and smoothly leans backwards up to `35 degrees`.
  - It also includes an ambient breeze engine that calculates random wind resistance and sways the flame when standing still.
- **Moving Smoke Trail:**
  - While dragging, it spawns thick, long ribbons of smoke that trail up to `-380px` behind the cursor and live for `3.2s`.
- **Advanced Raycast Smoke Rings:**
  - When held still, it periodically fires massive smoke rings that rise and grow 10x their size.
  - A raycast function checks the DOM above the cursor. If a ring detects a UI Box (`.service-box`, `nav`, etc.) above it, the ring stops rising, flattens, and scales horizontally 1.15x the box width so the smoke wraps around the corners and slides up the walls before dissipating.
  - Random lifespan modifiers allow some rings to ignore the ceiling and pass completely through.
- **Jellyfish Vortex:**
  - 1 in 4 rings spawns as a "Fast Ring" that doesn't expand. It shoots straight up like a bullet, spawning a trailing hollow tube of smoke that slices perfectly through the slower rings.
