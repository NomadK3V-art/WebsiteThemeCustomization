const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Update spinBoxLeft to remove scale, opacity fade, and blur
const newLeft = `@keyframes spinBoxLeft {
  0% { transform: perspective(1200px) rotateY(0deg); }
  100% { transform: perspective(1200px) rotateY(-1080deg); }
}`;

// Update spinBoxRight to remove scale, opacity fade, and blur
const newRight = `@keyframes spinBoxRight {
  0% { transform: perspective(1200px) rotateY(0deg); }
  100% { transform: perspective(1200px) rotateY(1080deg); }
}`;

css = css.replace(/@keyframes spinBoxLeft\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newLeft);
css = css.replace(/@keyframes spinBoxRight\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newRight);

fs.writeFileSync('src/index.css', css);
console.log("Updated box spin to stay in place without shrinking or fading");
