const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Update the base class to remove static blur and make the initial border sharper
css = css.replace(/\.cursor-smoke-ring\s*\{[\s\S]*?animation:[^;]+;\s*\}/, `.cursor-smoke-ring {
  position: fixed;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 255, 255, 0.9);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  box-shadow: 0 0 6px rgba(0, 191, 255, 0.8), inset 0 0 4px rgba(0, 191, 255, 0.6);
  animation: smokeRingRise 6s forwards ease-out;
}`);

// Update the keyframes to add a crisp start, holding definition briefly, then heavily blurring at the end
css = css.replace(/@keyframes smokeRingRise\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRingRise {
  0% {
    transform: translate(-50%, -50%) scale(0.8) rotateX(65deg);
    opacity: 0.95;
    filter: blur(0px);
  }
  30% {
    /* At 30% of its life (~2 seconds in), it starts softening but is still recognizable */
    opacity: 0.7;
    filter: blur(1px);
  }
  100% {
    /* At 6 seconds, it's massive, fully blurred out, and gone */
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), -300px) scale(10) rotateX(65deg);
    opacity: 0;
    filter: blur(6px);
  }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Made rings sharp at the start and soft at the end");
