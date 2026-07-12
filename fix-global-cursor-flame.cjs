const fs = require('fs');

// 1. Update main.tsx to track the cursor globally on the body, not just on buttons
let main = fs.readFileSync('src/main.tsx', 'utf8');

const oldScriptRegex = /\/\/ Global listener to track mouse position[\s\S]*\}\);/m;

const newScript = `// Global listener to track mouse position for the global cursor flame and smoke effect
let lastSmoke = 0;
let lastX = 0;
let lastTime = 0;
let leanTimeout;

document.addEventListener('mousemove', (e) => {
  // Always track the global cursor position
  document.body.style.setProperty('--cursor-x', \`\${e.clientX}px\`);
  document.body.style.setProperty('--cursor-y', \`\${e.clientY}px\`);

  const now = Date.now();
  const dt = now - lastTime;
  let velocityX = 0;
  if (dt > 0 && dt < 100) {
    velocityX = (e.clientX - lastX) / dt;
  }
  lastX = e.clientX;
  lastTime = now;

  let lean = velocityX * 20; 
  if (lean > 45) lean = 45;
  if (lean < -45) lean = -45;
  document.body.style.setProperty('--flame-lean', \`\${lean}deg\`);

  clearTimeout(leanTimeout);
  leanTimeout = setTimeout(() => {
    document.body.style.setProperty('--flame-lean', '0deg');
  }, 50);

  // Smoke generator - spawn smoke puffs at the global cursor position
  if (now - lastSmoke > 40) {
    lastSmoke = now;
    const smoke = document.createElement('div');
    smoke.className = 'cursor-smoke';
    smoke.style.left = e.clientX + 'px';
    smoke.style.top = (e.clientY - 25) + 'px';
    smoke.style.setProperty('--drift-x', (Math.random() * 40 - 20) + 'px');
    document.body.appendChild(smoke);
    setTimeout(() => smoke.remove(), 800);
  }
});`;

main = main.replace(oldScriptRegex, newScript);
fs.writeFileSync('src/main.tsx', main);

// 2. Update CSS to apply the flame to a global pseudo-element on the body
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove the button-specific flame logic
css = css.replace(/\.lava-pill:hover::before, \.nav-pill:hover::before, \.btn:hover::before, \.btn-primary:hover::before, \.btn-ghost:hover::before, \.qualify-btn:hover::before, \.dv-btn:hover::before, \.oe-btn:hover::before\s*\{[\s\S]*?transform-origin: 50% 90%;\s*\}/, '');

// Add the global cursor flame to the body
css += `
/* Global cursor flame */
body::after {
  content: "";
  position: fixed;
  top: var(--cursor-y, -100px);
  left: var(--cursor-x, -100px);
  width: 35px;
  height: 55px;
  /* Matching the middle row (blue base, yellow body, orange tip) */
  background: radial-gradient(ellipse at bottom, #0033FF 0%, #00BFFF 20%, #FFE600 45%, #FF5E00 75%, transparent 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  pointer-events: none;
  z-index: 99999;
  mix-blend-mode: screen;
  animation: cursorFlame 0.45s infinite linear;
  transform-origin: 50% 90%;
}

/* Hide the default OS cursor everywhere */
* {
  cursor: none !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Made the cursor a global flame.");
