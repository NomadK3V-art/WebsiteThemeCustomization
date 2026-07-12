const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// Replace the single firework logic with the multi-burst logic
const oldFireworksRegex = /\/\/ Global listener for Fireworks effect on click[\s\S]*?(?=\/\/ Global listener to track mouse position)/;

const newFireworksLogic = `// Global listener for Fireworks effect on click
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.closest) {
    const clickable = target.closest('a, button, .btn, .lava-pill, .nav-pill, .qualify-btn, .dv-btn, .oe-btn, .ftag, .svc-resource, .more');
    if (clickable) {
      const rect = clickable.getBoundingClientRect();
      const baseX = rect.left + rect.width / 2;
      const baseY = Math.max(150, rect.top - 280);

      const colors = ['#00FFFF', '#FF5E00', '#F0D0FF', '#FFFFFF', '#FF1493', '#FFE600', '#00BFFF'];
      // Spawn 6 to 8 bursts
      const numBursts = 6 + Math.floor(Math.random() * 3); 

      for (let b = 0; b < numBursts; b++) {
        // Stagger the explosions over 600ms
        setTimeout(() => {
          // Offset each burst slightly in a cluster (up to 200px wide, 100px tall)
          const x = baseX + (Math.random() * 200 - 100);
          const y = baseY + (Math.random() * 100 - 50);

          const container = document.createElement('div');
          container.className = 'firework-container';
          container.style.left = x + 'px';
          container.style.top = y + 'px';

          const flash = document.createElement('div');
          flash.className = 'firework-flash';
          container.appendChild(flash);

          // 40 particles per burst for dense, bright explosions
          for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'firework-particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 140; 
            
            p.style.setProperty('--tx', (Math.cos(angle) * distance) + 'px');
            p.style.setProperty('--ty', (Math.sin(angle) * distance) + 'px');
            p.style.setProperty('--clr', colors[Math.floor(Math.random() * colors.length)]);
            
            p.style.animationDuration = (0.7 + Math.random() * 0.6) + 's';
            container.appendChild(p);
          }

          document.body.appendChild(container);
          setTimeout(() => container.remove(), 1500);
        }, Math.random() * 600);
      }
    }
  }
});

`;

if (main.match(oldFireworksRegex)) {
  main = main.replace(oldFireworksRegex, newFireworksLogic);
  fs.writeFileSync('src/main.tsx', main);
  console.log("Updated main.tsx with multi-burst fireworks");
} else {
  console.log("Could not find fireworks logic in main.tsx");
}

let css = fs.readFileSync('src/index.css', 'utf8');
const oldCssRegex = /\/\* Fireworks Animation \*\/[\s\S]*?@keyframes fireworkExplode\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/;

const newCss = `/* Fireworks Animation */
.firework-container {
  position: fixed;
  pointer-events: none;
  z-index: 999999;
}

.firework-flash {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  background: #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 0 20px 10px #FFFFFF, 0 0 50px 20px #00FFFF;
  mix-blend-mode: screen;
  animation: fireworkFlash 0.25s ease-out forwards;
}

.firework-particle {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FFFFFF;
  /* Harder, brighter contrast glow */
  box-shadow: 0 0 4px #FFFFFF, 0 0 8px var(--clr), 0 0 16px var(--clr);
  mix-blend-mode: screen;
  /* Faster out, slower drift down */
  animation: fireworkExplode 1s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
}

@keyframes fireworkFlash {
  0% { transform: scale(0.1); opacity: 1; filter: blur(0px); }
  100% { transform: scale(2); opacity: 0; filter: blur(4px); }
}

@keyframes fireworkExplode {
  0% { 
    transform: translate(0, 0) scale(1.5); 
    opacity: 1; 
  }
  70% { 
    /* Holds brightness longer before fading */
    opacity: 1; 
  }
  100% { 
    /* Stronger gravity drop (+100px) */
    transform: translate(var(--tx), calc(var(--ty) + 100px)) scale(0); 
    opacity: 0; 
  }
}`;

css = css.replace(oldCssRegex, newCss);
fs.writeFileSync('src/index.css', css);
console.log("Updated CSS for brighter, high-contrast fireworks");

