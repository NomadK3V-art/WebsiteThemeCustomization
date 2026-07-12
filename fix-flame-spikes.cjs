const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The "spikes" are caused by the horizontal translate (e.g. translate(-42%...) vs translate(-58%...)) combined with extreme skew and stretch during dragging.
// When you drag fast, the skewX goes to 70deg and stretchY goes to 1.8. 
// A heavily stretched/skewed object that also rapidly jumps horizontally 16% back and forth creates a visual artifact that looks like spiky tearing.
// I will normalize the horizontal translation to always stay centered (-50%) and reduce the extreme internal skew offsets from 8deg down to 2deg to smooth it out.

css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes cursorFlame {
  0% { transform: translate(-50%, -90%) scaleY(calc(0.9 * var(--flame-stretch-y, 1))) scaleX(calc(1.1 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) - 2deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
  25% { transform: translate(-50%, -105%) scaleY(calc(1.2 * var(--flame-stretch-y, 1))) scaleX(calc(0.9 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) + 3deg)); opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); }
  50% { transform: translate(-50%, -95%) scaleY(calc(0.85 * var(--flame-stretch-y, 1))) scaleX(calc(1.15 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) - 3deg)); opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); }
  75% { transform: translate(-50%, -102%) scaleY(calc(1.15 * var(--flame-stretch-y, 1))) scaleX(calc(0.95 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) + 2deg)); opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); }
  100% { transform: translate(-50%, -90%) scaleY(calc(0.9 * var(--flame-stretch-y, 1))) scaleX(calc(1.1 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg) - 2deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Fixed horizontal displacement tearing");

// Update main.tsx to ensure the stretching math isn't causing tearing either
let main = fs.readFileSync('src/main.tsx', 'utf8');

// Reduce maximum lean and stretch slightly to prevent visual breaking
main = main.replace(/let lean = velocityX \* 35;/g, 'let lean = velocityX * 25;');
main = main.replace(/if \(lean > 70\) lean = 70;/g, 'if (lean > 55) lean = 55;');
main = main.replace(/if \(lean < -70\) lean = -70;/g, 'if (lean < -55) lean = -55;');

main = main.replace(/let stretchY = 1 \+ speed \* 0\.4;/g, 'let stretchY = 1 + speed * 0.25;');
main = main.replace(/if \(stretchY > 1\.8\) stretchY = 1\.8;/g, 'if (stretchY > 1.5) stretchY = 1.5;');

main = main.replace(/let stretchX = 1 - speed \* 0\.2;/g, 'let stretchX = 1 - speed * 0.15;');
main = main.replace(/if \(stretchX < 0\.5\) stretchX = 0\.5;/g, 'if (stretchX < 0.65) stretchX = 0.65;');

fs.writeFileSync('src/main.tsx', main);
console.log("Reduced drag exaggeration to prevent visual clipping");
