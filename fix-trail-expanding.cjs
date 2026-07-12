const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Give the fast ring an animation that doesn't expand
if (!css.includes('@keyframes fastRingRise')) {
css += `
.cursor-smoke-ring.fast-ring {
  animation: fastRingRise var(--duration, 3s) forwards linear !important;
}

@keyframes fastRingRise {
  0% { transform: translate(-50%, -50%) scale(1.5) rotateX(65deg); opacity: 0.95; filter: blur(0px); }
  100% { transform: translate(-50%, var(--hit-y, -600px)) scale(1.5) rotateX(65deg); opacity: 0; filter: blur(3px); }
}
`;
}

// Stop the tube trail from expanding
css = css.replace(/@keyframes tubeTrail\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes tubeTrail {
  0% { transform: translate(-50%, -50%) scaleX(1) scaleY(0.4); opacity: 0.7; }
  100% { transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), 60px) scaleX(1) scaleY(0.4); opacity: 0; }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Stopped the trail and the fast ring from expanding");
