const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// Replace the "blowtorch" stretching (taller and thinner) with "natural flame" dragging (squashing and trailing)
const oldStretchY = /let stretchY = 1 \+ speed \* 0\.25;[\s\S]*?if \(stretchY > 1\.5\) stretchY = 1\.5;/;
const newStretchY = `let stretchY = 1 - speed * 0.15;
  if (stretchY < 0.6) stretchY = 0.6;`;

const oldStretchX = /let stretchX = 1 - speed \* 0\.15;[\s\S]*?if \(stretchX < 0\.65\) stretchX = 0\.65;/;
const newStretchX = `let stretchX = 1 + speed * 0.1;
  if (stretchX > 1.4) stretchX = 1.4;`;

main = main.replace(oldStretchY, newStretchY);
main = main.replace(oldStretchX, newStretchX);

// We can also let it lean a little bit more naturally
main = main.replace(/let lean = velocityX \* 25;/g, 'let lean = velocityX * 30;');
main = main.replace(/if \(lean > 55\) lean = 55;/g, 'if (lean > 65) lean = 65;');
main = main.replace(/if \(lean < -55\) lean = -55;/g, 'if (lean < -65) lean = -65;');

fs.writeFileSync('src/main.tsx', main);
console.log("Updated flame to trail naturally instead of acting like a torch");
