const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// 1. Remove the squashing/stretching variables and tone down the lean
const dragPhysicsRegex = /let lean = velocityX \* 30;[\s\S]*?document\.body\.style\.setProperty\('--flame-stretch-x', '1'\);\s*\}, 80\);/;

const cleanDragPhysics = `let lean = velocityX * 15; 
  if (lean > 40) lean = 40;
  if (lean < -40) lean = -40;
  document.body.style.setProperty('--flame-lean', \`\${lean}deg\`);

  clearTimeout(leanTimeout);
  leanTimeout = setTimeout(() => {
    document.body.style.setProperty('--flame-lean', '0deg');
  }, 80);`;

main = main.replace(dragPhysicsRegex, cleanDragPhysics);

// 2. Remove the "scribble" moving smoke trail entirely
const movingSmokeRegex = /if \(\!isStationary\) \{[\s\S]*?if \(now - lastSmoke > 20\) \{[\s\S]*?setTimeout\(\(\) => smoke\.remove\(\), 2500\);\s*\}\s*\}/;

const cleanMovingSmoke = `if (!isStationary) {
    // Intentionally left blank. Spawning dozens of scattered smoke particles while moving creates a "scribble" effect.
  }`;

main = main.replace(movingSmokeRegex, cleanMovingSmoke);
fs.writeFileSync('src/main.tsx', main);

// 3. Clean up the CSS keyframes to remove the stretching distortion
let css = fs.readFileSync('src/index.css', 'utf8');

const keyframesRegex = /@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/;
const cleanKeyframes = `@keyframes cursorFlame {
  0% { transform: translate(-50%, -90%) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) - 2deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
  25% { transform: translate(-50%, -95%) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) + 3deg)); opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); }
  50% { transform: translate(-50%, -90%) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) - 3deg)); opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); }
  75% { transform: translate(-50%, -92%) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) + 2deg)); opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); }
  100% { transform: translate(-50%, -90%) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) - 2deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
}`;

css = css.replace(keyframesRegex, cleanKeyframes);

fs.writeFileSync('src/index.css', css);
console.log("Removed moving smoke scribble and simplified drag physics");
