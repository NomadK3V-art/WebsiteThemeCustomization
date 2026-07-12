const fs = require('fs');

// 1. Update JS timeout to 6 seconds
let main = fs.readFileSync('src/main.tsx', 'utf8');
main = main.replace(/setTimeout\(\(\) => ring\.remove\(\), 4000\);/g, 'setTimeout(() => ring.remove(), 6000);');
fs.writeFileSync('src/main.tsx', main);

// 2. Update CSS for 6s duration and softer look
let css = fs.readFileSync('src/index.css', 'utf8');

// Change duration
css = css.replace(/animation: smokeRingRise 4s forwards ease-out;/g, 'animation: smokeRingRise 6s forwards ease-out;');

// Soften the base appearance
css = css.replace(/border: 2\.5px solid rgba\(0, 255, 255, 0\.85\);/, 'border: 3px solid rgba(0, 255, 255, 0.4);');
if (!css.includes('filter: blur')) {
  // If no filter on the ring yet, add a base blur to the class
  css = css.replace(/\.cursor-smoke-ring \{/, '.cursor-smoke-ring {\n  filter: blur(1.5px);');
}

// Add increasing blur to the keyframes to simulate smoke diffusing into the air
css = css.replace(/@keyframes smokeRingRise\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRingRise {
  0% {
    transform: translate(-50%, -50%) scale(0.8) rotateX(65deg);
    opacity: 0.7;
    filter: blur(1.5px);
  }
  100% {
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), -300px) scale(10) rotateX(65deg);
    opacity: 0;
    filter: blur(6px);
  }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Made rings softer and last 6 seconds");
