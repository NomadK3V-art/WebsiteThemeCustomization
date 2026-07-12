const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Update the base dimensions in body::after
css = css.replace(/width: 25px;\s*height: 75px;/, 'width: 18px;\n  height: 55px;');

// 2. Update the breathing animation heights in the keyframes
css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes cursorFlame {
  0% { opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); height: 55px; }
  25% { opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); height: 60px; }
  50% { opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); height: 55px; }
  75% { opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); height: 58px; }
  100% { opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); height: 55px; }
}`);

fs.writeFileSync('src/index.css', css);

// 3. Update the smoke spawn position so it perfectly hits the tip of the smaller flame
let main = fs.readFileSync('src/main.tsx', 'utf8');
main = main.replace(/smoke\.style\.top = \(mouseY - 35\) \+ 'px';/g, "smoke.style.top = (mouseY - 45) + 'px';");
main = main.replace(/smoke\.style\.top = \(mouseY - 25\) \+ 'px';/g, "smoke.style.top = (mouseY - 35) + 'px';");

fs.writeFileSync('src/main.tsx', main);

console.log("Scaled down cursor flame and adjusted smoke spawn points");
