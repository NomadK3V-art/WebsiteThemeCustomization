const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the hover::before block
const sparkTarget = /\.lava-pill:hover::before, \.nav-pill:hover::before, \.btn:hover::before, \.btn-primary:hover::before, \.btn-ghost:hover::before, \.qualify-btn:hover::before, \.dv-btn:hover::before, \.oe-btn:hover::before\s*\{[\s\S]*?animation:\s*shootSparks[^;]+;\s*\}/;

const newFlame = `.lava-pill:hover::before, .nav-pill:hover::before, .btn:hover::before, .btn-primary:hover::before, .btn-ghost:hover::before, .qualify-btn:hover::before, .dv-btn:hover::before, .oe-btn:hover::before {
  content: "";
  position: absolute;
  top: var(--spark-y, 50%);
  left: var(--spark-x, 50%);
  width: 35px;
  height: 55px;
  /* CSS gradient mimicking a hot flame tip */
  background: radial-gradient(ellipse at bottom, #FFFFFF 0%, #FFE600 20%, #FF5E00 50%, #B400FF 80%, transparent 100%);
  /* Tear-drop shape pointing up */
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: screen;
  animation: cursorFlame 0.15s infinite alternate;
}`;

css = css.replace(sparkTarget, newFlame);

// Replace the keyframes
css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes cursorFlame {
  0% {
    transform: translate(-50%, -85%) scale(0.85) skewX(-3deg);
    filter: blur(2px) drop-shadow(0 0 10px #FF5E00);
  }
  100% {
    transform: translate(-50%, -100%) scale(1.15) skewX(3deg);
    filter: blur(4px) drop-shadow(0 -5px 15px #FF1493);
  }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Replaced sparks with a cursor flame");
