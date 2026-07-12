const fs = require('fs');

// 1. Update main.tsx to spawn smoke particles globally
let main = fs.readFileSync('src/main.tsx', 'utf8');
const oldScriptRegex = /\/\/ Global listener to track mouse position[\s\S]*\}\);/m;

const newScript = `// Global listener to track mouse position for the spark and smoke effect
let lastSmoke = 0;
document.addEventListener('mousemove', (e) => {
  const target = e.target;
  if (target && target.closest) {
    // Use closest() so it works even if you hover over text inside the button
    const btn = target.closest('.lava-pill, .nav-pill, .btn, .btn-primary, .btn-ghost, .qualify-btn, .dv-btn, .oe-btn, .ftag');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--spark-x', \`\${x}px\`);
      btn.style.setProperty('--spark-y', \`\${y}px\`);

      const now = Date.now();
      // Spawn a smoke puff every 40 milliseconds
      if (now - lastSmoke > 40) {
        lastSmoke = now;
        const smoke = document.createElement('div');
        smoke.className = 'cursor-smoke';
        // Position globally where the mouse is, offset up slightly to be at the flame tip
        smoke.style.left = e.clientX + 'px';
        smoke.style.top = (e.clientY - 25) + 'px';
        // Random horizontal drift as it rises
        smoke.style.setProperty('--drift-x', (Math.random() * 40 - 20) + 'px');
        document.body.appendChild(smoke);
        // Remove the DOM element after animation finishes
        setTimeout(() => smoke.remove(), 800);
      }
    }
  }
});`;

main = main.replace(oldScriptRegex, newScript);
fs.writeFileSync('src/main.tsx', main);

// 2. Add the .cursor-smoke CSS to index.css
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Lingering smoke trail for the cursor flame */
.cursor-smoke {
  position: fixed;
  width: 18px;
  height: 18px;
  /* Dark bluish-grey smoke */
  background: radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(30, 30, 40, 0.4) 40%, transparent 80%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  /* Animation travels up ~1 inch (96px) before fading out */
  animation: smokeRise 0.8s forwards linear;
}

@keyframes smokeRise {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(-50% + var(--drift-x, 0px)), -96px) scale(2.5);
    opacity: 0;
  }
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Added dynamic lingering smoke trail");
