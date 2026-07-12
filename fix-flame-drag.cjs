const fs = require('fs');

// 1. Update JS
let main = fs.readFileSync('src/main.tsx', 'utf8');
const oldScriptRegex = /\/\/ Global listener to track mouse position[\s\S]*\}\);/m;

const newScript = `// Global listener to track mouse position for the spark and smoke effect
let lastSmoke = 0;
let lastX = 0;
let lastTime = 0;
let leanTimeout;

document.addEventListener('mousemove', (e) => {
  const target = e.target;
  if (target && target.closest) {
    const btn = target.closest('.lava-pill, .nav-pill, .btn, .btn-primary, .btn-ghost, .qualify-btn, .dv-btn, .oe-btn, .ftag');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--spark-x', \`\${x}px\`);
      btn.style.setProperty('--spark-y', \`\${y}px\`);

      const now = Date.now();
      const dt = now - lastTime;
      let velocityX = 0;
      if (dt > 0 && dt < 100) {
        velocityX = (e.clientX - lastX) / dt;
      }
      lastX = e.clientX;
      lastTime = now;

      // Physics: flame drags behind cursor. 
      // Moving right (velocity > 0) makes top lean left (positive skewX).
      let lean = velocityX * 20; 
      if (lean > 45) lean = 45;
      if (lean < -45) lean = -45;
      btn.style.setProperty('--flame-lean', \`\${lean}deg\`);

      // Snap back to vertical when cursor stops
      clearTimeout(leanTimeout);
      leanTimeout = setTimeout(() => {
        btn.style.setProperty('--flame-lean', '0deg');
      }, 50);

      // Smoke generator
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
    } else {
      lastX = e.clientX;
      lastTime = Date.now();
    }
  }
});`;

main = main.replace(oldScriptRegex, newScript);
fs.writeFileSync('src/main.tsx', main);

// 2. Update CSS
let css = fs.readFileSync('src/index.css', 'utf8');

// Ensure the flame is anchored at the bottom so skewing doesn't detach it from the cursor
if (!css.includes('transform-origin: 50% 90%;')) {
  css = css.replace(/animation: cursorFlame 0\.3s infinite linear;/, 'animation: cursorFlame 0.3s infinite linear;\n  transform-origin: 50% 90%;');
}

// Inject the variable into the keyframes' skewX
css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, (match) => {
  return match.replace(/skewX\(([-0-9]+)deg\)/g, 'skewX(calc(var(--flame-lean, 0deg) + $1deg))');
});

fs.writeFileSync('src/index.css', css);
console.log("Added physics: flame now leans away from cursor movement");
