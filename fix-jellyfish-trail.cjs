const fs = require('fs');

// 1. Update JS to generate a stringy, tendril-like trail instead of a solid tube
let main = fs.readFileSync('src/main.tsx', 'utf8');

const oldTrailLogic = /const trailInterval = setInterval\(\(\) => \{[\s\S]*?\}, 20\);/m;

const newTrailLogic = `const trailInterval = setInterval(() => {
          if (!document.body.contains(ring)) {
            clearInterval(trailInterval);
            return;
          }
          const rect = ring.getBoundingClientRect();
          if (rect.width === 0) return;
          
          // Spawn 3 distinct thin tendrils per tick instead of one solid block
          for (let i = -1; i <= 1; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-smoke ring-trail';
            // Space the tendrils out across the diameter of the ring
            trail.style.left = (rect.left + rect.width / 2 + (i * rect.width * 0.35)) + 'px';
            trail.style.top = (rect.top + rect.height / 2) + 'px';
            
            // Add erratic stringy movement 
            trail.style.setProperty('--drift-x', (Math.random() * 15 - 7.5) + 'px');
            // Allow them to stretch vertically independently
            trail.style.setProperty('--stretch-y', (1 + Math.random() * 2) + '');
            
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1800);
          }
        }, 30);`;

main = main.replace(oldTrailLogic, newTrailLogic);
fs.writeFileSync('src/main.tsx', main);

// 2. Update CSS to make the trail look like glowing, wavy strings instead of a tube
let css = fs.readFileSync('src/index.css', 'utf8');

const oldTrailCss = /\.ring-trail\s*\{[\s\S]*?@keyframes tubeTrail\s*\{[\s\S]*?\}\s*\}/;

const newTrailCss = `/* Stringy, jellyfish-like tendril trails */
.ring-trail {
  width: 2px;
  height: 12px;
  /* Solid bright cyan lines */
  background: rgba(0, 255, 255, 0.7);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.8), 0 0 10px rgba(0, 191, 255, 0.5);
  border-radius: 2px;
  transform-origin: top center;
  animation: stringyTrail 1.8s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

@keyframes stringyTrail {
  0% { 
    transform: translate(-50%, 0) scaleY(1) rotate(0deg); 
    opacity: 0.9; 
    filter: blur(0px);
  }
  50% { 
    /* The tendril stretches and drifts as it gets pulled */
    transform: translate(calc(-50% + var(--drift-x, 0px)), 40px) scaleY(calc(4 * var(--stretch-y, 1))) rotate(calc(var(--drift-x, 0px) * 2deg)); 
    opacity: 0.6; 
    filter: blur(1px);
  }
  100% { 
    /* Shrinks away into a blurry wave at the end */
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2.5)), 90px) scaleY(calc(8 * var(--stretch-y, 1))) rotate(calc(var(--drift-x, 0px) * 4deg)); 
    opacity: 0; 
    filter: blur(4px);
  }
}`;

css = css.replace(oldTrailCss, newTrailCss);
fs.writeFileSync('src/index.css', css);

console.log("Updated to stringy jellyfish trails");
