const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Increase base ring border thickness
css = css.replace(/border: 1\.5px solid rgba\(0, 255, 255, 0\.7\);/, 'border: 2.5px solid rgba(0, 255, 255, 0.85);');

// Increase distance traveled and max scale before it fades out
css = css.replace(/@keyframes smokeRingRise\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRingRise {
  0% {
    transform: translate(-50%, -50%) scale(0.8) rotateX(65deg);
    opacity: 0.9;
  }
  100% {
    /* Rise much higher (-250px) and scale much larger before fading */
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), -250px) scale(8.5) rotateX(65deg);
    opacity: 0;
  }
}`);

// We also need to increase the animation duration slightly in JS to let it travel that far gracefully.
let main = fs.readFileSync('src/main.tsx', 'utf8');
main = main.replace(/setTimeout\(\(\) => ring\.remove\(\), 2500\);/g, 'setTimeout(() => ring.remove(), 4000);');

fs.writeFileSync('src/index.css', css);
fs.writeFileSync('src/main.tsx', main);

console.log("Made rings thicker and rise higher");
