const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Increase the scale of the element so the base is larger
css = css.replace(/width: 6px;\s*height: 6px;/g, 'width: 8px;\n  height: 8px;');

// Make the animation slightly slower to let the eye catch the brightness
css = css.replace(/animation: shootSparks 0\.35s infinite ease-out;/g, 'animation: shootSparks 0.45s infinite ease-out;');

// Create an intensely bright core (mostly pure white and blinding yellow)
const numSparks = 45; // Even more sparks
const colorsStart = ['#FFFFFF', '#FFFFFF', '#FFFF00', '#FFE600']; // Heavily weighted to white/yellow
// The cooling tail is still hot orange and neon yellow, dropping red so it doesn't get too dark too fast
const colorsEnd = ['#FFFF00', '#FF8C00', '#FF5E00', '#FFFFFF', '#FFD700']; 

let shadows0 = [];
let shadows1 = [];

let seed = 99999;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

for (let i = 0; i < numSparks; i++) {
   let c0 = colorsStart[Math.floor(rand() * colorsStart.length)];
   let c1 = colorsEnd[Math.floor(rand() * colorsEnd.length)];
   
   // Tight cluster with a massive glowing blur radius at start
   let startX = (rand() * 14 - 7).toFixed(1);
   let startY = (rand() * 14 - 7).toFixed(1);
   shadows0.push(`${startX}px ${startY}px 6px 2px ${c0}`);
   
   // Explode outward (between 50px and 160px away)
   let angle = rand() * Math.PI * 2;
   let dist = 50 + rand() * 110; 
   let endX = (Math.cos(angle) * dist).toFixed(1);
   let endY = (Math.sin(angle) * dist).toFixed(1);
   // End with a harsh sharp edge (no spread, just intense color)
   let spread = (rand() * -1).toFixed(1); 
   
   shadows1.push(`${endX}px ${endY}px 8px ${spread}px ${c1}`);
}

const newKeyframes = `@keyframes shootSparks {
  0% {
    box-shadow: 
      ${shadows0.join(',\n      ')};
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.8);
    background: #FFFFFF; /* The core itself is white-hot */
  }
  15% {
    opacity: 1; /* Keep at full brightness slightly longer */
  }
  100% {
    box-shadow: 
      ${shadows1.join(',\n      ')};
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
    background: transparent;
  }
}`;

css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newKeyframes);

fs.writeFileSync('src/index.css', css);
console.log("Boosted spark contrast and brightness");
