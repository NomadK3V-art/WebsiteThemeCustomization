const fs = require('fs');

// 1. Refactor main.tsx to use a continuous setInterval for particles
// This allows particles (like rings) to spawn even when the mouse is NOT moving.
let main = fs.readFileSync('src/main.tsx', 'utf8');

const newScript = `// Global listener to track mouse position for the global cursor flame and smoke effect
let mouseX = -100;
let mouseY = -100;
let lastMouseMoveTime = 0;
let lastX = 0;
let lastTime = 0;
let leanTimeout;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const now = Date.now();
  lastMouseMoveTime = now;

  document.body.style.setProperty('--cursor-x', \`\${mouseX}px\`);
  document.body.style.setProperty('--cursor-y', \`\${mouseY}px\`);

  const dt = now - lastTime;
  let velocityX = 0;
  if (dt > 0 && dt < 100) {
    velocityX = (mouseX - lastX) / dt;
  }
  lastX = mouseX;
  lastTime = now;

  let lean = velocityX * 20; 
  if (lean > 45) lean = 45;
  if (lean < -45) lean = -45;
  document.body.style.setProperty('--flame-lean', \`\${lean}deg\`);

  clearTimeout(leanTimeout);
  leanTimeout = setTimeout(() => {
    document.body.style.setProperty('--flame-lean', '0deg');
  }, 50);
});

let lastSmoke = 0;
let lastRing = 0;

// Continuous particle spawner loop
setInterval(() => {
  if (mouseX < 0 || mouseY < 0) return; // Don't spawn if mouse hasn't entered screen

  const now = Date.now();
  const isStationary = now - lastMouseMoveTime > 50;

  if (!isStationary) {
    // Fast standard smoke when moving
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
    // When stationary, slow normal smoke + distinct Smoke Rings
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

    if (now - lastRing > 800) {
      lastRing = now;
      const ring = document.createElement('div');
      ring.className = 'cursor-smoke-ring';
      ring.style.left = mouseX + 'px';
      ring.style.top = (mouseY - 45) + 'px';
      ring.style.setProperty('--drift-x', (Math.random() * 10 - 5) + 'px');
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 2500);
    }
  }
}, 20);

`;

const startIdx = main.indexOf('// Global listener');
const endIdx = main.indexOf('ReactDOM.createRoot');

if (startIdx !== -1 && endIdx !== -1) {
  main = main.substring(0, startIdx) + newScript + main.substring(endIdx);
  fs.writeFileSync('src/main.tsx', main);
}

// 2. Add CSS for the smoke rings
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Stationary Smoke Rings */
.cursor-smoke-ring {
  position: fixed;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(0, 255, 255, 0.7);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  box-shadow: 0 0 6px rgba(0, 191, 255, 0.6), inset 0 0 6px rgba(0, 191, 255, 0.6);
  animation: smokeRingRise 2.5s forwards ease-out;
}

@keyframes smokeRingRise {
  0% {
    /* rotateX gives it a 3D oval perspective as it looks flat coming up at you */
    transform: translate(-50%, -50%) scale(0.8) rotateX(65deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(-50% + var(--drift-x, 0px)), -140px) scale(5.5) rotateX(65deg);
    opacity: 0;
  }
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Added stationary smoke rings!");
