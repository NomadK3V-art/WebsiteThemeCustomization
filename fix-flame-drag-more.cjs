const fs = require('fs');

// 1. Update JS to exaggerate lean, add stretching, and spawn longer-lasting moving smoke
let main = fs.readFileSync('src/main.tsx', 'utf8');

const jsDragLogicOld = /const dt = now - lastTime;[\s\S]*?\}, 50\);/;
const jsDragLogicNew = `const dt = now - lastTime;
  let velocityX = 0;
  let speed = 0;
  if (dt > 0 && dt < 100) {
    velocityX = (mouseX - lastX) / dt;
    speed = Math.abs(velocityX);
  }
  lastX = mouseX;
  lastTime = now;

  // Exaggerate lean
  let lean = velocityX * 35; 
  if (lean > 70) lean = 70;
  if (lean < -70) lean = -70;
  document.body.style.setProperty('--flame-lean', \`\${lean}deg\`);

  // Stretch taller and thinner the faster it moves
  let stretchY = 1 + speed * 0.4;
  if (stretchY > 1.8) stretchY = 1.8;
  let stretchX = 1 - speed * 0.2;
  if (stretchX < 0.5) stretchX = 0.5;
  document.body.style.setProperty('--flame-stretch-y', stretchY.toString());
  document.body.style.setProperty('--flame-stretch-x', stretchX.toString());

  clearTimeout(leanTimeout);
  leanTimeout = setTimeout(() => {
    document.body.style.setProperty('--flame-lean', '0deg');
    document.body.style.setProperty('--flame-stretch-y', '1');
    document.body.style.setProperty('--flame-stretch-x', '1');
  }, 80);`;

main = main.replace(jsDragLogicOld, jsDragLogicNew);

// Update smoke spawning when moving
const movingSmokeOld = /if \(\!isStationary\) \{[\s\S]*?if \(now - lastSmoke > 25\) \{[\s\S]*?lastSmoke = now;[\s\S]*?const smoke = document\.createElement\('div'\);[\s\S]*?smoke\.className = 'cursor-smoke';[\s\S]*?smoke\.style\.left = mouseX \+ 'px';[\s\S]*?smoke\.style\.top = \(mouseY - 25\) \+ 'px';[\s\S]*?smoke\.style\.setProperty\('--drift-x', \(Math\.random\(\) \* 40 - 20\) \+ 'px'\);[\s\S]*?document\.body\.appendChild\(smoke\);[\s\S]*?setTimeout\(\(\) => smoke\.remove\(\), 1500\);[\s\S]*?\}[\s\S]*?\}/;

const movingSmokeNew = `if (!isStationary) {
    // Spawn faster and make it live longer
    if (now - lastSmoke > 20) {
      lastSmoke = now;
      const smoke = document.createElement('div');
      smoke.className = 'cursor-smoke moving-smoke';
      smoke.style.left = mouseX + 'px';
      smoke.style.top = (mouseY - 35) + 'px';
      smoke.style.setProperty('--drift-x', (Math.random() * 40 - 20) + 'px');
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2500);
    }
  }`;

main = main.replace(movingSmokeOld, movingSmokeNew);

fs.writeFileSync('src/main.tsx', main);

// 2. Update CSS to apply stretch variables and longer smoke trail animation
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes cursorFlame {
  0% { transform: translate(-50%, -90%) scaleY(calc(0.9 * var(--flame-stretch-y, 1))) scaleX(calc(1.15 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) - 5deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
  25% { transform: translate(-42%, -105%) scaleY(calc(1.25 * var(--flame-stretch-y, 1))) scaleX(calc(0.85 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + 8deg)); opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); }
  50% { transform: translate(-58%, -95%) scaleY(calc(0.85 * var(--flame-stretch-y, 1))) scaleX(calc(1.2 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) - 7deg)); opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); }
  75% { transform: translate(-44%, -112%) scaleY(calc(1.2 * var(--flame-stretch-y, 1))) scaleX(calc(0.9 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) + 6deg)); opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); }
  100% { transform: translate(-50%, -90%) scaleY(calc(0.9 * var(--flame-stretch-y, 1))) scaleX(calc(1.15 * var(--flame-stretch-x, 1))) skewX(calc(var(--flame-lean, 0deg) - 5deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
}`);

css += `
/* Longer smoke trail when cursor is moving */
.moving-smoke {
  animation: smokeRiseMoving 2.5s forwards linear;
}

@keyframes smokeRiseMoving {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.95;
  }
  50% {
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 1.5)), -120px) scale(2);
    opacity: 0.8;
  }
  100% {
    /* Travels significantly higher (-280px) over 2.5 seconds to form a very long tail */
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 3)), -280px) scale(4);
    opacity: 0;
  }
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Increased drag physics and smoke trail length");
