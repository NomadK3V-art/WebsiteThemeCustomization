const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const numSparks = 40;
// True fire colors: White-hot, bright yellow, hot orange, burning red
const colorsStart = ['#FFFFFF', '#FFE600', '#FF8C00', '#FF4500']; 
// Cooling fire colors: Orange-red, deep red, dark embers
const colorsEnd = ['#FF4500', '#FF0000', '#B22222', '#8B0000']; 

let shadows0 = [];
let shadows1 = [];

let seed = 88888; // deterministic seed
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

for (let i = 0; i < numSparks; i++) {
   let c0 = colorsStart[Math.floor(rand() * colorsStart.length)];
   let c1 = colorsEnd[Math.floor(rand() * colorsEnd.length)];
   
   let startX = (rand() * 10 - 5).toFixed(1);
   let startY = (rand() * 10 - 5).toFixed(1);
   shadows0.push(`${startX}px ${startY}px 0px 2px ${c0}`);
   
   let angle = rand() * Math.PI * 2;
   let dist = 60 + rand() * 100; 
   let endX = (Math.cos(angle) * dist).toFixed(1);
   let endY = (Math.sin(angle) * dist).toFixed(1);
   let spread = (rand() * 1.5).toFixed(1); 
   
   shadows1.push(`${endX}px ${endY}px 1px ${spread}px ${c1}`);
}

const newKeyframes = `@keyframes shootSparks {
  0% {
    box-shadow: 
      ${shadows0.join(',\n      ')};
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  20% {
    opacity: 1;
  }
  100% {
    box-shadow: 
      ${shadows1.join(',\n      ')};
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.1) rotate(1080deg);
  }
}`;

css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newKeyframes);

fs.writeFileSync('src/index.css', css);
console.log("Updated sparks to pure fire colors");
