const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// To make them look like sharp glitter/sparks instead of soft dust:
// 1. Remove the large blur radius (the 3rd parameter in box-shadow)
// 2. Add an intense solid core size to the sparks
// 3. Make them spin/rotate rapidly as they fly out so they catch the light like sharp jagged pieces of metal

css = css.replace(/width: 8px;\s*height: 8px;/g, 'width: 0px;\n  height: 0px;');

const numSparks = 40;
const colorsStart = ['#FFFFFF', '#FFFFFF', '#FFFF00', '#00FFFF']; 
const colorsEnd = ['#FFFF00', '#FF8C00', '#00FFFF', '#FFFFFF']; 

let shadows0 = [];
let shadows1 = [];

let seed = 77777;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

for (let i = 0; i < numSparks; i++) {
   let c0 = colorsStart[Math.floor(rand() * colorsStart.length)];
   let c1 = colorsEnd[Math.floor(rand() * colorsEnd.length)];
   
   // Sharp, un-blurred core dots
   let startX = (rand() * 10 - 5).toFixed(1);
   let startY = (rand() * 10 - 5).toFixed(1);
   shadows0.push(`${startX}px ${startY}px 0px 2px ${c0}`);
   
   let angle = rand() * Math.PI * 2;
   let dist = 60 + rand() * 100; 
   let endX = (Math.cos(angle) * dist).toFixed(1);
   let endY = (Math.sin(angle) * dist).toFixed(1);
   // Hard sharp trailing pieces
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
    /* Massive rotation creates the jagged "glitter" tumbling effect */
    transform: translate(-50%, -50%) scale(0.1) rotate(1080deg);
  }
}`;

css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newKeyframes);

// Make the pseudo-element itself a sharp square instead of a circle, to further the glitter/jagged look
css = css.replace(/border-radius: 50%;/g, 'border-radius: 0; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);');

fs.writeFileSync('src/index.css', css);
console.log("Updated to sharp rotating glitter sparks");
