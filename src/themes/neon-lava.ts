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
    '--ink': '#C0FFF0',
    '--body': '#000000',
    '--muted': '#000000',
    '--bg': '#05000A',
    '--lav': '#0D0025',
    '--lav2': '#1A0045',
    '--line': 'rgba(180, 0, 255, 0.35)',
    '--display': "'Yeseva One', serif",
    '--ui': "'Rajdhani', sans-serif",
    '--neon-shadow':
      '0 0 4px rgba(0, 255, 200, 0.7), 0 0 12px rgba(0, 200, 255, 0.6), 0 0 20px rgba(0, 255, 180, 0.4)',
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
    { // Red
      coreRgba: 'rgba(255, 192, 192, 1)',
      mid: 'rgba(255, 0, 100, 0.6)',
      tailStart: 'rgba(255, 0, 0, 0)',
      shadowOuter: '#FF0044',
      shadowInner: '#FF0000',
      headCore: '#FFC0D0',
      headShadow: '0 0 6px rgba(255, 50, 100, 0.8), 0 0 12px rgba(255, 0, 50, 0.6), 0 0 20px rgba(255, 0, 0, 0.4)',
    },
    { // Orange
      coreRgba: 'rgba(255, 224, 192, 1)',
      mid: 'rgba(255, 120, 0, 0.6)',
      tailStart: 'rgba(255, 100, 0, 0)',
      shadowOuter: '#FF8800',
      shadowInner: '#FF4400',
      headCore: '#FFE0C0',
      headShadow: '0 0 6px rgba(255, 150, 50, 0.8), 0 0 12px rgba(255, 100, 0, 0.6), 0 0 20px rgba(255, 50, 0, 0.4)',
    },
    { // Yellow
      coreRgba: 'rgba(255, 255, 192, 1)',
      mid: 'rgba(255, 255, 0, 0.6)',
      tailStart: 'rgba(255, 200, 0, 0)',
      shadowOuter: '#FFCC00',
      shadowInner: '#FFFF00',
      headCore: '#FFFFC0',
      headShadow: '0 0 6px rgba(255, 255, 100, 0.8), 0 0 12px rgba(255, 255, 0, 0.6), 0 0 20px rgba(255, 200, 0, 0.4)',
    },
    { // Green
      coreRgba: 'rgba(192, 255, 192, 1)',
      mid: 'rgba(0, 255, 100, 0.6)',
      tailStart: 'rgba(0, 200, 0, 0)',
      shadowOuter: '#00FF44',
      shadowInner: '#00FF00',
      headCore: '#C0FFD0',
      headShadow: '0 0 6px rgba(50, 255, 100, 0.8), 0 0 12px rgba(0, 255, 50, 0.6), 0 0 20px rgba(0, 255, 0, 0.4)',
    },
    { // Blue (original ink blue)
      coreRgba: 'rgba(192, 255, 240, 1)',
      mid: 'rgba(0, 255, 240, 0.6)',
      tailStart: 'rgba(0, 200, 255, 0)',
      shadowOuter: '#00BFFF',
      shadowInner: '#00FFFF',
      headCore: '#C0FFF0',
      headShadow: '0 0 6px rgba(0, 255, 200, 0.8), 0 0 12px rgba(0, 200, 255, 0.6), 0 0 20px rgba(0, 255, 180, 0.4)',
    },
    { // Indigo
      coreRgba: 'rgba(192, 192, 255, 1)',
      mid: 'rgba(100, 0, 255, 0.6)',
      tailStart: 'rgba(50, 0, 255, 0)',
      shadowOuter: '#4400FF',
      shadowInner: '#8800FF',
      headCore: '#D0C0FF',
      headShadow: '0 0 6px rgba(150, 100, 255, 0.8), 0 0 12px rgba(100, 50, 255, 0.6), 0 0 20px rgba(50, 0, 255, 0.4)',
    },
    { // Violet
      coreRgba: 'rgba(255, 192, 255, 1)',
      mid: 'rgba(255, 0, 255, 0.6)',
      tailStart: 'rgba(200, 0, 255, 0)',
      shadowOuter: '#FF00FF',
      shadowInner: '#FF00BB',
      headCore: '#FFC0FF',
      headShadow: '0 0 6px rgba(255, 100, 255, 0.8), 0 0 12px rgba(255, 50, 255, 0.6), 0 0 20px rgba(200, 0, 255, 0.4)',
    },
  ],

  // The "how it performs" motion tuning.
  engine: {
    startColorIndex: 4, // Blue
    cycleDuration: 10000,
    textColorOffset: 5000,
    crossfadeStart: 9000,
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
