const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// We are going to replace the ring generation logic
const oldRingLogic = /if \(now - lastRing > ringInterval\) \{[\s\S]*?setTimeout\(\(\) => ring\.remove\(\), duration\);\s*\}/;

const newRingLogic = `if (now - lastRing > ringInterval) {
      lastRing = now;
      ringInterval = 2000 + Math.random() * 2500; // 2 to 4.5 seconds

      const ring = document.createElement('div');
      ring.className = 'cursor-smoke-ring';
      ring.style.left = mouseX + 'px';
      const startY = mouseY - 45;
      ring.style.top = startY + 'px';
      ring.style.setProperty('--drift-x', (Math.random() * 10 - 5) + 'px');
      
      // 25% chance this is a "fast ring" that shoots up and leaves a jellyfish trail
      const isFast = Math.random() < 0.25;
      
      let duration;
      if (isFast) {
        ring.classList.add('fast-ring');
        duration = 2500 + Math.random() * 1000; // 2.5 to 3.5 seconds
        
        // Spawn trail particles tracking the ring's position
        const trailInterval = setInterval(() => {
          if (!document.body.contains(ring)) {
            clearInterval(trailInterval);
            return;
          }
          const rect = ring.getBoundingClientRect();
          if (rect.width === 0) return; // Not rendered yet
          
          const trail = document.createElement('div');
          trail.className = 'cursor-smoke ring-trail';
          trail.style.left = (rect.left + rect.width / 2) + 'px';
          // Offset slightly below the center of the ring to form the "tail"
          trail.style.top = (rect.top + rect.height / 2 + 10) + 'px';
          // Very slight random drift so the tail has a natural wispy look
          trail.style.setProperty('--drift-x', (Math.random() * 6 - 3) + 'px');
          document.body.appendChild(trail);
          
          setTimeout(() => trail.remove(), 1200);
        }, 40); // Drop a trail particle every 40ms
        
      } else {
        const durations = [8000, 10000, 15000, 20000, 30000];
        duration = durations[Math.floor(Math.random() * durations.length)];
      }
      
      ring.style.setProperty('--duration', duration + 'ms');

      // Raycast up to find a ceiling (UI Box)
      let hitY = -1;
      const shouldIgnoreCeiling = Math.random() < 0.35;
      
      if (!shouldIgnoreCeiling && !isFast) { // Fast rings punch through ceilings!
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
      }

      if (hitY > 0 && hitY < startY) {
        ring.classList.add('hit-ceiling');
        ring.style.setProperty('--hit-y', \`-\${startY - hitY}px\`);
      } else {
        ring.style.setProperty('--hit-y', \`-600px\`);
      }

      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), duration);
    }`;

main = main.replace(oldRingLogic, newRingLogic);
fs.writeFileSync('src/main.tsx', main);

let css = fs.readFileSync('src/index.css', 'utf8');

// Add the specific trail animation CSS
css += `
/* Fast ring and its jellyfish trail */
.cursor-smoke-ring.fast-ring {
  border-width: 3px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.9), inset 0 0 8px rgba(0, 255, 255, 0.8);
}

.ring-trail {
  width: 12px;
  height: 12px;
  /* Thin, bright core fading to blue */
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(0, 191, 255, 0.4) 30%, transparent 70%);
  animation: ringTrailFade 1.2s forwards ease-out;
}

@keyframes ringTrailFade {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
  50% { transform: translate(calc(-50% + var(--drift-x, 0px)), 15px) scale(1.5); opacity: 0.5; }
  100% { transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), 30px) scale(2.5); opacity: 0; }
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Added fast rings with jellyfish trails");
