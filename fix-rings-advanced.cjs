const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');
const jsStart = main.indexOf('let lastSmoke = 0;');
const jsEnd = main.indexOf('ReactDOM.createRoot');

if (jsStart !== -1 && jsEnd !== -1) {
  const newJs = `let lastSmoke = 0;
let lastRing = 0;
let ringInterval = 2500;

// Continuous particle spawner loop
setInterval(() => {
  if (mouseX < 0 || mouseY < 0) return;

  const now = Date.now();
  const isStationary = now - lastMouseMoveTime > 50;

  if (!isStationary) {
    if (now - lastSmoke > 25) {
      lastSmoke = now;
      const smoke = document.createElement('div');
      smoke.className = 'cursor-smoke';
      smoke.style.left = mouseX + 'px';
      smoke.style.top = (mouseY - 25) + 'px';
      smoke.style.setProperty('--drift-x', (Math.random() * 40 - 20) + 'px');
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1500);
    }
  } else {
    if (now - lastSmoke > 120) {
      lastSmoke = now;
      const smoke = document.createElement('div');
      smoke.className = 'cursor-smoke';
      smoke.style.left = mouseX + 'px';
      smoke.style.top = (mouseY - 25) + 'px';
      smoke.style.setProperty('--drift-x', (Math.random() * 20 - 10) + 'px');
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1500);
    }

    if (now - lastRing > ringInterval) {
      lastRing = now;
      ringInterval = 2000 + Math.random() * 2500; // 2 to 4.5 seconds

      const ring = document.createElement('div');
      ring.className = 'cursor-smoke-ring';
      ring.style.left = mouseX + 'px';
      const startY = mouseY - 45;
      ring.style.top = startY + 'px';
      ring.style.setProperty('--drift-x', (Math.random() * 10 - 5) + 'px');
      
      const durations = [8000, 10000, 15000];
      const duration = durations[Math.floor(Math.random() * durations.length)];
      ring.style.setProperty('--duration', duration + 'ms');

      // Raycast up to find a ceiling (UI Box)
      let hitY = -1;
      for (let y = startY - 15; y > 0; y -= 30) {
        const el = document.elementFromPoint(mouseX, y);
        if (el) {
          const ceilingBox = el.closest('.svc, .svc-featured, .service-box, .formcard, .oe-card, header, nav');
          if (ceilingBox) {
            hitY = ceilingBox.getBoundingClientRect().bottom;
            break;
          }
        }
      }

      if (hitY > 0 && hitY < startY) {
        ring.classList.add('hit-ceiling');
        ring.style.setProperty('--hit-y', \`-\${startY - hitY}px\`);
      } else {
        ring.style.setProperty('--hit-y', \`-600px\`);
      }

      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), duration);
    }
  }
}, 20);

`;
  main = main.substring(0, jsStart) + newJs + main.substring(jsEnd);
  fs.writeFileSync('src/main.tsx', main);
}

let css = fs.readFileSync('src/index.css', 'utf8');

// Remove old ring class and keyframes
css = css.replace(/\.cursor-smoke-ring\s*\{[\s\S]*?@keyframes smokeRingRise\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, '');

css += `
.cursor-smoke-ring {
  position: fixed;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 255, 255, 0.9);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  box-shadow: 0 0 6px rgba(0, 191, 255, 0.8), inset 0 0 4px rgba(0, 191, 255, 0.6);
  animation: smokeRingFree var(--duration, 8s) forwards linear;
}

.cursor-smoke-ring.hit-ceiling {
  animation: smokeRingCeil var(--duration, 8s) forwards ease-out;
}

@keyframes smokeRingFree {
  0% { transform: translate(-50%, -50%) scale(0.8) rotateX(65deg); opacity: 0.95; filter: blur(0px); }
  15% { opacity: 0.7; filter: blur(1px); }
  100% { transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 3)), var(--hit-y, -600px)) scale(14) rotateX(65deg); opacity: 0; filter: blur(8px); }
}

@keyframes smokeRingCeil {
  0% { transform: translate(-50%, -50%) scale(0.8) rotateX(65deg); opacity: 0.95; filter: blur(0px); }
  15% { opacity: 0.7; filter: blur(1px); }
  40% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--hit-y)) scale(5) rotateX(82deg); opacity: 0.6; filter: blur(3px); }
  100% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--hit-y)) scaleX(25) scaleY(7) rotateX(88deg); opacity: 0; filter: blur(12px); }
}
`;
fs.writeFileSync('src/index.css', css);

console.log("Updated rings with advanced ceiling detection and long lifespans");
