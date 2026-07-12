const fs = require('fs');
const html = fs.readFileSync('svelterx.html', 'utf8');

// Extract the body
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) throw new Error("No body found");
let bodyHtml = bodyMatch[1];

// Extract the <style> block from the head
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
let css = styleMatch ? styleMatch[1] : '';

// Override the CSS variables in the style block with lava theme
css = css.replace(/:root\s*\{[^}]+\}/, `:root {
  --purple: #FF1493;
  --purple-d: #8B0066;
  --red: #FF6600;
  --red-d: #CC0000;
  --ink: #FFE600;
  --body: #e0d0ff;
  --muted: #a080c8;
  --bg: #05000A;
  --lav: #0D0025;
  --lav2: #1A0045;
  --line: rgba(180, 0, 255, 0.35);
  --display: 'Yellowtail', cursive;
  --ui: 'Rajdhani', sans-serif;
  --neon-shadow: 0 0 6px #FF6000, 0 0 18px #FF4400, 0 0 35px #FFB300;
  --neon-stroke: 1px #CC0000;
}`);

// Add some specific lava styles
css += `
@import url('https://fonts.googleapis.com/css2?family=Yellowtail&family=Rajdhani:wght@400;500;600;700&display=swap');

h1, h2, h3, .logo b {
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow);
  -webkit-text-stroke: var(--neon-stroke);
  font-family: var(--display) !important;
}

.svc, .svc-featured, .formcard, .why-item, .step, .oe-card, .news-card, .dv-bar {
  background: linear-gradient(145deg, #05000A 0%, #0D0025 40%, #1A0045 80%, #220055 100%) !important;
  border: 1px solid var(--line) !important;
  box-shadow: 0 0 20px rgba(120, 0, 200, 0.15), inset 0 0 30px rgba(60, 0, 120, 0.1) !important;
}

.btn-primary, .qualify-btn, .dv-btn {
  background: linear-gradient(135deg, #FF1493 0%, #8B0066 45%, #1A0040 100%) !important;
  border: 1px solid rgba(255, 20, 147, 0.6) !important;
  color: var(--ink) !important;
  text-shadow: 0 0 8px #FF6000 !important;
}

.hero {
  background: radial-gradient(ellipse at 50% 0%, #1A0040 0%, #05000A 55%) !important;
}
header, .cta, .oe-card {
  background: linear-gradient(135deg, #0D0025, #1A0045, #0D0025) !important;
}
footer {
  background: #05000A !important;
  border-top: 1px solid var(--line);
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Wrote src/index.css");

// Very basic HTML to JSX conversion
let jsx = bodyHtml
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<br>/g, '<br />')
  .replace(/<hr>/g, '<hr />')
  .replace(/<img([^>]+)>/g, '<img$1 />')
  .replace(/<input([^>]+)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<input${p1} />`;
  })
  .replace(/style="([^"]+)"/g, (match, p1) => {
    // skip complex inline styles, just remove them for this prototype to avoid parsing errors
    return '';
  });

const component = `
import React from 'react';

export default function Home() {
  return (
    <div className="svelterx-container">
      ${jsx}
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Home.tsx', component);
console.log("Wrote src/pages/Home.tsx");

