const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the 2D Z-axis rotation with a 3D Y-axis rotation (like a revolving door / rod down the middle)
const oldLeftRegex = /@keyframes spinBoxLeft\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/;
const newLeft = `@keyframes spinBoxLeft {
  0% { transform: perspective(1200px) rotateY(0deg) scale(1); opacity: 1; filter: blur(0px); }
  50% { opacity: 0.8; filter: blur(2px); }
  100% { transform: perspective(1200px) rotateY(-1080deg) scale(0); opacity: 0; filter: blur(10px); }
}`;

const oldRightRegex = /@keyframes spinBoxRight\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/;
const newRight = `@keyframes spinBoxRight {
  0% { transform: perspective(1200px) rotateY(0deg) scale(1); opacity: 1; filter: blur(0px); }
  50% { opacity: 0.8; filter: blur(2px); }
  100% { transform: perspective(1200px) rotateY(1080deg) scale(0); opacity: 0; filter: blur(10px); }
}`;

css = css.replace(oldLeftRegex, newLeft);
css = css.replace(oldRightRegex, newRight);

fs.writeFileSync('src/index.css', css);
console.log("Updated box spin to rotate on the Y-axis (vertical rod)");
