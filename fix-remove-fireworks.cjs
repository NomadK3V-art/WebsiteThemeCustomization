const fs = require('fs');

// 1. Remove Fireworks logic from main.tsx
let main = fs.readFileSync('src/main.tsx', 'utf8');

const fireworksRegex = /\/\/ Global listener for Fireworks effect on click[\s\S]*?(?=\n\nReactDOM\.createRoot)/;
main = main.replace(fireworksRegex, '');

fs.writeFileSync('src/main.tsx', main);
console.log("Removed fireworks JS listener");

// 2. Remove Fireworks from CSS
let css = fs.readFileSync('src/index.css', 'utf8');

const fireworksCssRegex = /\/\* Fireworks Animation \*\/[\s\S]*/;
css = css.replace(fireworksCssRegex, '');

fs.writeFileSync('src/index.css', css);
console.log("Removed fireworks CSS");
