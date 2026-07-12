const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Increase base spark size from 4px to 6px
css = css.replace(/width: 4px;\s*height: 4px;/g, 'width: 6px;\n  height: 6px;');

// Generate a much denser cloud of sparks
const numSparks = 36;
const colorsStart = ['#FFFFFF', '#FFE600', '#FF5E00'];
const colorsEnd = ['#FF0000', '#FF5E00', '#FFE600', '#FFFFFF', '#8B0000'];

let shadows0 = [];
let shadows1 = [];

// Deterministic random so the generated CSS is stable
let seed = 12345;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

for (let i = 0; i < numSparks; i++) {
   let c0 = colorsStart[Math.floor(rand() * colorsStart.length)];
   let c1 = colorsEnd[Math.floor(rand() * colorsEnd.length)];
   
   // Cluster tightly at the start
   let startX = (rand() * 10 - 5).toFixed(1);
   let startY = (rand() * 10 - 5).toFixed(1);
   shadows0.push(`${startX}px ${startY}px 2px 0px ${c0}`);
   
   // Explode outward dynamically (between 40px and 120px away)
   let angle = rand() * Math.PI * 2;
   let dist = 40 + rand() * 80; 
   let endX = (Math.cos(angle) * dist).toFixed(1);
   let endY = (Math.sin(angle) * dist).toFixed(1);
   let spread = (rand() * -2 - 1).toFixed(1); // negative spread shrinks them further
   
   shadows1.push(`${endX}px ${endY}px 5px ${spread}px ${c1}`);
}

const newKeyframes = `@keyframes shootSparks {
  0% {
    box-shadow: 
      ${shadows0.join(',\n      ')};
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    box-shadow: 
      ${shadows1.join(',\n      ')};
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.15);
  }
}`;

css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newKeyframes);

fs.writeFileSync('src/index.css', css);
console.log("Increased size and amount of sparks");
