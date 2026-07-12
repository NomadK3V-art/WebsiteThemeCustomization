const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// The regex might have failed. Let's just locate the index of the start and end of the click listener
const clickStart = main.indexOf("// Global listener for Fireworks effect on click");
const clickEnd = main.indexOf("// Global listener to track mouse position");

if (clickStart !== -1 && clickEnd !== -1) {
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

  main = main.substring(0, clickStart) + newFireworksLogic + main.substring(clickEnd);
  fs.writeFileSync('src/main.tsx', main);
  console.log("Fixed main.tsx fireworks logic!");
}
