import type { Theme } from './types';
import { neonLava } from './neon-lava';

// ─────────────────────────────────────────────────────────────────────────
// THEME REGISTRY
//
// Every saved design lives here. To go live with a different one (e.g. for a
// season), add it to `themes` and change `ACTIVE_THEME_ID`, then publish.
//
//   Swap seasons  → change ACTIVE_THEME_ID below.
//   Save a design → add a new file (copy neon-lava.ts) and register it here.
// ─────────────────────────────────────────────────────────────────────────

export const themes: Record<string, Theme> = {
  [neonLava.id]: neonLava,
  // Future seasonal presets get registered here, e.g.:
  //   [winterFrost.id]: winterFrost,
  //   [autumnEmber.id]: autumnEmber,
};

/** The design currently shipped to the live site. */
export const ACTIVE_THEME_ID = 'neon-lava';

export function getActiveTheme(): Theme {
  return themes[ACTIVE_THEME_ID] ?? neonLava;
}

/** Write a theme's CSS custom properties to :root so the whole site picks them up. */
export function applyThemeTokens(theme: Theme): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(name, value);
  }
}

export type { Theme, ColorStop, EngineConfig } from './types';
