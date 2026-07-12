const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the ::before rule with a pure CSS repeating gas jet pattern
css = css.replace(/\.svc::before\s*\{[^}]+\}/, `.svc::before {
  content: "";
  position: absolute;
  top: -16px;
  left: 0;
  right: 0;
  height: 16px;
  /* Simulating a row of individual overlapping gas jets */
  background: radial-gradient(circle at bottom, #FFFFFF 0%, #E0FFFF 15%, #00FFFF 40%, rgba(0, 191, 255, 0) 70%) repeat-x;
  background-size: 18px 16px;
  background-position: 0 16px;
  opacity: 0;
  /* Adding the characteristic neon blue glow of gas */
  filter: blur(0.5px) drop-shadow(0 -2px 6px #00BFFF) drop-shadow(0 0 4px #00FFFF);
  transition: opacity 0.3s ease, background-position 0.2s ease-out;
  pointer-events: none;
  z-index: 10;
}`);

// Update hover state
css = css.replace(/\.svc:hover::before\s*\{[^}]+\}/, `.svc:hover::before {
  opacity: 1;
  background-position: 0 0;
  animation: gasFlicker 0.12s infinite alternate ease-in-out;
}`);

// Remove old animation
css = css.replace(/@keyframes blueFire\s*\{[^}]+\}/, '');

// Add new gas flicker animation
if (!css.includes('@keyframes gasFlicker')) {
  css += `\n@keyframes gasFlicker {
  0% {
    background-size: 18px 14px;
    opacity: 0.85;
  }
  100% {
    background-size: 18px 20px;
    opacity: 1;
  }
}\n`;
}

fs.writeFileSync('src/index.css', css);
console.log("Updated to realistic gas stove fire effect");
