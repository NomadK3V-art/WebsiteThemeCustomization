const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Update global body and muted text variables to a readable soft burnt orange
css = css.replace(/--body: #[a-zA-Z0-9]+;/g, '--body: #FFB380;'); // Peach/Burnt Orange light
css = css.replace(/--muted: #[a-zA-Z0-9]+;/g, '--muted: #D98C59;'); // Muted burnt orange

// 2. Add neon glow to all basic text (body, p, li) via a global rule
// We need to inject this right after the body rule.
if (!css.includes('text-shadow: 0 0 3px rgba(204, 85, 0, 0.4);')) {
  css += `\n/* Apply soft burnt orange glow to all non-heading text */\n`;
  css += `body, p, li, .disclaimer, .formnote, .trustline, .news-meta, .news-loading, .informed-disc, .foot-grid p, .step p, .cta p, .svc.svc-purple p {
  color: var(--body) !important;
  text-shadow: 0 0 3px rgba(204, 85, 0, 0.4), 0 0 6px rgba(204, 85, 0, 0.2) !important;
}\n`;

  // Apply to muted explicitly
  css += `.formnote, .trustline, .disclaimer, .disclaimer .fine, .news-meta, .news-loading, .informed-disc, .foot-grid p {
  color: var(--muted) !important;
  text-shadow: 0 0 2px rgba(204, 85, 0, 0.3) !important;
}\n`;

  // Fix up specific hardcoded colors in footer / sections that were white or purpleish
  css += `footer { color: var(--body) !important; }\n`;
}

fs.writeFileSync('src/index.css', css);
console.log("Updated body text to glowing soft burnt orange");
