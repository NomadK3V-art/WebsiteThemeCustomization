// ─────────────────────────────────────────────────────────────────────────
// Theme system types
//
// A Theme is a complete, saveable snapshot of the site's design. It has three
// parts:
//   • tokens  — the "how it looks" CSS custom properties (colors, glows, gradients)
//   • palette — the rainbow color-cycle stops used by the cursor/text animation
//   • engine  — the "how it performs" motion tuning (cycle timing, drop physics)
//
// Saving a design = capturing these three. Swapping seasons = pointing the site
// at a different Theme. See ./index.ts for how one is activated.
// ─────────────────────────────────────────────────────────────────────────

/** One stop in the rainbow color cycle (cursor trail, drops, and neon text). */
export interface ColorStop {
  coreRgba: string;
  mid: string;
  tailStart: string;
  shadowOuter: string;
  shadowInner: string;
  headCore: string;
  headShadow: string;
}

/** Motion / behavior tuning — the "how it performs" half of a design. */
export interface EngineConfig {
  startColorIndex: number;   // where the rainbow cycle begins
  cycleDuration: number;     // ms per color
  textColorOffset: number;   // ms the text cycle trails the cursor cycle
  crossfadeStart: number;    // ms into a cycle when the 1s crossfade begins
  cursor: {
    trailSpeedScale: number;
    maxTrailLength: number;
    velocityDecay: number;
  };
  drops: {
    spawnIntervalMs: number;
    spawnChance: number;
    lifespans: number[];
    gravity: number;
    bounceLoss: number;
    groundFriction: number;
    trailSpeedScale: number;
    maxTrailLength: number;
  };
}

/** A complete, named design preset. */
export interface Theme {
  /** kebab-case id, e.g. "neon-lava" */
  id: string;
  /** Human label, e.g. "Neon Lava" */
  label: string;
  /** Optional note on when to use it, e.g. "Winter / holiday season" */
  season?: string;
  /** CSS custom properties written to :root when this theme is active. */
  tokens: Record<string, string>;
  /** Rainbow cycle stops. */
  palette: ColorStop[];
  /** Motion tuning. */
  engine: EngineConfig;
}
