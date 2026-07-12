const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Make the flame gradient sharper and more high-contrast
css = css.replace(
  /background: radial-gradient\(ellipse at bottom, #FFFFFF 0%, #FFE600 20%, #FF5E00 50%, #B400FF 80%, transparent 100%\);/, 
  'background: radial-gradient(ellipse at bottom, #FFFFFF 0%, #FFFFFF 25%, #FFE600 50%, #FF5E00 75%, #B400FF 90%, transparent 100%);'
);

// 2. Change the simple alternate animation to a linear chaotic multi-step animation
css = css.replace(
  /animation: cursorFlame 0\.15s infinite alternate;/, 
  'animation: cursorFlame 0.3s infinite linear;'
);

// 3. Remove the soft blur and add erratic flickering keyframes
css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes cursorFlame {
  0% { transform: translate(-50%, -90%) scale(0.9) skewX(-2deg); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
  20% { transform: translate(-48%, -105%) scale(1.15) skewX(5deg); opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); }
  40% { transform: translate(-53%, -95%) scale(0.85) skewX(-6deg); opacity: 0.8; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); }
  60% { transform: translate(-49%, -115%) scale(1.25) skewX(4deg); opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); }
  80% { transform: translate(-52%, -85%) scale(0.95) skewX(-4deg); opacity: 0.95; filter: drop-shadow(0 0 6px #FF5E00) drop-shadow(0 0 14px #B400FF); }
  100% { transform: translate(-50%, -90%) scale(0.9) skewX(-2deg); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Sharpened flame and increased flickering");
