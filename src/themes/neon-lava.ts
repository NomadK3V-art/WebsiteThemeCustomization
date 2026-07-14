import type { Theme } from './types';

// ─────────────────────────────────────────────────────────────────────────
// NEON LAVA — the current live design, saved as version 1.
// This is the default theme. To create a seasonal variant, copy this file,
// rename the id/label, tweak the values, and register it in ./index.ts.
// ─────────────────────────────────────────────────────────────────────────
export const neonLava: Theme = {
  id: 'neon-lava',
  label: 'Neon Lava',
  season: 'Default / year-round',

  // The "how it looks" tokens. These mirror the :root block in index.css and
  // are written to :root at startup so this file is the source of truth.
  // (--ink, --neon-shadow, and --cursor-* are overwritten at runtime by the
  // color cycle; the values here are just their opening frame.)
  tokens: {
    '--purple': '#1A0040',
    '--purple-d': '#0D0020',
    '--red': '#00BFFF',
    '--red-d': '#008B8B',
    '--ink': '#FFFFFF',
    '--body': '#FFFFFF',
    '--muted': '#F0F0F0',
    '--bg': '#05000A',
    '--lav': '#0D0025',
    '--lav2': '#1A0045',
    '--line': 'rgba(180, 0, 255, 0.35)',
    '--display': "'Yeseva One', serif",
    '--ui': "'Rajdhani', sans-serif",
    '--neon-shadow': 'none',
    '--neon-stroke': '0',
    '--box-gradient':
      'linear-gradient(145deg, #1A0045 0%, #440088 40%, #5D15A6 80%, #7B2CBF 100%)',
    '--card-shadow':
      '0 0 20px rgba(120, 0, 200, 0.15), inset 0 0 30px rgba(60, 0, 120, 0.1)',
    '--elevation': '0 14px 34px rgba(103,49,161,.14), 0 4px 12px rgba(28,22,38,.07)',
    // Burnt-orange text is matte (no glow)
    '--body-glow': 'none',
    '--muted-glow': 'none',
  },

  // The 7-stop rainbow cycle (R, O, Y, G, B, I, V). Cursor starts at Blue.
      palette: [
    { // Neon Cyan forced for drops
      coreRgba: 'rgba(150, 255, 240, 1)',
      mid: 'rgba(0, 255, 205, 0.6)',
      tailStart: 'rgba(0, 255, 205, 0)',
      shadowOuter: '#00FFCD',
      shadowInner: '#00CCAA',
      headCore: '#D0FFF8',
      headShadow: '0 0 6px rgba(0, 255, 205, 0.8), 0 0 12px rgba(0, 255, 205, 0.6), 0 0 20px rgba(0, 255, 205, 0.4)',
    },
  ],

  // The "how it performs" motion tuning.
  engine: {
    startColorIndex: 0, // Green
    cycleDuration: 6000,
    textColorOffset: 5000,
    crossfadeStart: 5000,
    cursor: {
      trailSpeedScale: 1000,
      maxTrailLength: 4000,
      velocityDecay: 0.992,
    },
    drops: {
      spawnIntervalMs: 300,
      spawnChance: 0.85,
      lifespans: [5000, 7000, 10000, 15000],
      gravity: 0.6,
      bounceLoss: 0.65,
      groundFriction: 0.85,
      trailSpeedScale: 45,
      maxTrailLength: 300,
    },
  },
};
