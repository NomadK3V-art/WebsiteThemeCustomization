const fs = require('fs');

// 1. Add click listener to main.tsx
let main = fs.readFileSync('src/main.tsx', 'utf8');

const fireworksLogic = `
// Global listener for Fireworks effect on click
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.closest) {
    const clickable = target.closest('a, button, .btn, .lava-pill, .nav-pill, .qualify-btn, .dv-btn, .oe-btn, .ftag, .svc-resource, .more');
    if (clickable) {
      const rect = clickable.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      // 3 inches is roughly 288 pixels. We use Math.max to ensure it doesn't explode off the top of the screen.
      const y = Math.max(80, rect.top - 280);

      const container = document.createElement('div');
      container.className = 'firework-container';
      container.style.left = x + 'px';
      container.style.top = y + 'px';

      // Add a central flash
      const flash = document.createElement('div');
      flash.className = 'firework-flash';
      container.appendChild(flash);

      // Add 45 particles
      const colors = ['#00FFFF', '#FF5E00', '#F0D0FF', '#FFFFFF', '#FF1493', '#FFE600', '#00BFFF'];
      for (let i = 0; i < 45; i++) {
        const p = document.createElement('div');
        p.className = 'firework-particle';
        
        // Random spherical explosion
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 120; // travel distance
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');
        p.style.setProperty('--clr', colors[Math.floor(Math.random() * colors.length)]);
        
        // Randomize the animation duration slightly for an organic stagger
        p.style.animationDuration = (0.8 + Math.random() * 0.5) + 's';
        
        container.appendChild(p);
      }

      document.body.appendChild(container);
      setTimeout(() => container.remove(), 1500);
    }
  }
});
`;

if (!main.includes('Fireworks effect on click')) {
  main = main.replace("document.addEventListener('mousemove', (e) => {", fireworksLogic + "\ndocument.addEventListener('mousemove', (e) => {");
  fs.writeFileSync('src/main.tsx', main);
}


// 2. Add Firework CSS
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Fireworks Animation */
.firework-container {
  position: fixed;
  pointer-events: none;
  z-index: 999999;
}

.firework-flash {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 0 40px 20px #FFFFFF, 0 0 80px 40px #00FFFF;
  mix-blend-mode: screen;
  animation: fireworkFlash 0.3s ease-out forwards;
}

.firework-particle {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 0 6px var(--clr), 0 0 12px var(--clr), 0 0 20px var(--clr);
  mix-blend-mode: screen;
  /* Gravity is simulated by calculating a secondary Y drop in the keyframes */
  animation: fireworkExplode 1s cubic-bezier(0.15, 1, 0.3, 1) forwards;
}

@keyframes fireworkFlash {
  0% { transform: scale(0.2); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

@keyframes fireworkExplode {
  0% { 
    transform: translate(0, 0) scale(1); 
    opacity: 1; 
  }
  50% { 
    opacity: 1; 
  }
  100% { 
    /* The +80px on the Y axis simulates gravity pulling the particles down into an arc */
    transform: translate(var(--tx), calc(var(--ty) + 80px)) scale(0); 
    opacity: 0; 
  }
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Added interactive fireworks on click!");
