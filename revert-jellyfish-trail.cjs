const fs = require('fs');

// 1. Revert JS
let main = fs.readFileSync('src/main.tsx', 'utf8');

const stringyTrailRegex = /const trailInterval = setInterval\(\(\) => \{[\s\S]*?\}, 30\);/;

const tubeTrailLogic = `const trailInterval = setInterval(() => {
          if (!document.body.contains(ring)) {
            clearInterval(trailInterval);
            return;
          }
          const rect = ring.getBoundingClientRect();
          if (rect.width === 0) return;
          
          const trail = document.createElement('div');
          trail.className = 'cursor-smoke ring-trail';
          trail.style.left = (rect.left + rect.width / 2) + 'px';
          trail.style.top = (rect.top + rect.height / 2) + "px";
          trail.style.setProperty("--drift-x", (Math.random() * 2 - 1) + "px");
          document.body.appendChild(trail);
          
          setTimeout(() => trail.remove(), 1200);
        }, 20);`;

main = main.replace(stringyTrailRegex, tubeTrailLogic);
fs.writeFileSync('src/main.tsx', main);

// 2. Revert CSS
let css = fs.readFileSync('src/index.css', 'utf8');

const stringyCssRegex = /\/\* Stringy, jellyfish-like tendril trails \*\/[\s\S]*?@keyframes stringyTrail\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/;

const tubeCss = `/* Make the trail exactly match the diameter of the ring and create a tube effect */
.ring-trail {
  /* Using width/height to match the actual visual dimension of the ring (14px * 1.5 scale) */
  width: 21px; 
  height: 21px;
  /* Thin white edges with a hollow transparent center (a tube!) */
  background: radial-gradient(circle, transparent 40%, rgba(255, 255, 255, 0.4) 60%, rgba(0, 191, 255, 0.2) 80%, transparent 100%);
  /* Start oval shaped to match the ring's rotateX perspective */
  transform: translate(-50%, -50%) scaleY(0.4); 
  animation: tubeTrail 1.8s forwards ease-out !important;
}

@keyframes tubeTrail {
  0% { transform: translate(-50%, -50%) scaleX(1) scaleY(0.4); opacity: 0.7; }
  50% { transform: translate(calc(-50% + var(--drift-x, 0px)), 20px) scaleX(1.1) scaleY(0.5); opacity: 0.4; }
  100% { transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), 40px) scaleX(1.3) scaleY(0.6); opacity: 0; }
}`;

css = css.replace(stringyCssRegex, tubeCss);
fs.writeFileSync('src/index.css', css);

console.log("Reverted to hollow tube trail");
