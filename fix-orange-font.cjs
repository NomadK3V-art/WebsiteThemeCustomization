const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Add Playfair Display font import at the top
if (!css.includes('family=Playfair+Display')) {
  css = css.replace(/@import url\('[^']+'\);/, (match) => {
    return match + "\n@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');";
  });
}

// Update the base colors to a hotter, more vibrant red-orange
css = css.replace(/--body: #[a-zA-Z0-9]+;/g, '--body: #FF5E00;'); // Deep vibrant orange
css = css.replace(/--muted: #[a-zA-Z0-9]+;/g, '--muted: #E64A19;'); // Slightly darker burnt orange

// Update the global text rule to apply the new elegant serif font and the intense slow-burn glow
const targetRule = /body, p, li, \.disclaimer, \.formnote, \.trustline, \.news-meta, \.news-loading, \.informed-disc, \.foot-grid p, \.step p, \.cta p, \.svc\.svc-purple p\s*\{[^}]+\}/;

const newRule = `body, p, li, .disclaimer, .formnote, .trustline, .news-meta, .news-loading, .informed-disc, .foot-grid p, .step p, .cta p, .svc.svc-purple p {
  color: var(--body) !important;
  font-family: 'Playfair Display', serif !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em;
  /* Intense, deep 'slow burn' glow with yellow core and red outer */
  text-shadow: 0 0 4px rgba(255, 180, 0, 0.8), 0 0 10px rgba(255, 69, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.4) !important;
}`;

css = css.replace(targetRule, newRule);

// Update the muted text glow as well
const mutedRule = /\.formnote, \.trustline, \.disclaimer, \.disclaimer \.fine, \.news-meta, \.news-loading, \.informed-disc, \.foot-grid p\s*\{[^}]+\}/;

const newMutedRule = `.formnote, .trustline, .disclaimer, .disclaimer .fine, .news-meta, .news-loading, .informed-disc, .foot-grid p {
  color: var(--muted) !important;
  font-family: 'Playfair Display', serif !important;
  font-weight: 400 !important;
  text-shadow: 0 0 3px rgba(255, 140, 0, 0.6), 0 0 8px rgba(255, 69, 0, 0.5) !important;
}`;

css = css.replace(mutedRule, newMutedRule);

fs.writeFileSync('src/index.css', css);
console.log("Updated orange font and brightness");
