const fs = require('fs');

// 1. Update JS to periodically change the animation speed
let main = fs.readFileSync('src/main.tsx', 'utf8');

if (!main.includes('flickerSpeeds')) {
  main = main.replace('let lastRing = 0;', "let lastRing = 0;\nlet lastFlickerChange = 0;\nconst flickerSpeeds = ['0.15s', '0.35s', '0.7s', '1.2s']; // 4 different paces");
  
  const flickerLogic = `
  const now = Date.now();
  // Randomly change flicker speed every 2-5 seconds
  if (now - lastFlickerChange > 2000 + Math.random() * 3000) {
    lastFlickerChange = now;
    const newSpeed = flickerSpeeds[Math.floor(Math.random() * flickerSpeeds.length)];
    document.body.style.setProperty('--flicker-speed', newSpeed);
  }
`;
  main = main.replace('const now = Date.now();', flickerLogic);
  fs.writeFileSync('src/main.tsx', main);
}

// 2. Update CSS to use the variable speed and slinkier keyframes
let css = fs.readFileSync('src/index.css', 'utf8');

// Change from fixed duration and 'linear' to variable duration and 'ease-in-out'
css = css.replace(/animation: cursorFlame [^;]+;/, 'animation: cursorFlame var(--flicker-speed, 0.4s) infinite ease-in-out;');

// Update keyframes to incorporate scaling X and Y inversely, and wider translations for a slinky snake-like movement
css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes cursorFlame {
  0% { transform: translate(-50%, -90%) scaleY(0.9) scaleX(1.15) skewX(calc(var(--flame-lean, 0deg) - 5deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
  25% { transform: translate(-42%, -105%) scaleY(1.25) scaleX(0.85) skewX(calc(var(--flame-lean, 0deg) + 8deg)); opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); }
  50% { transform: translate(-58%, -95%) scaleY(0.85) scaleX(1.2) skewX(calc(var(--flame-lean, 0deg) - 7deg)); opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); }
  75% { transform: translate(-44%, -112%) scaleY(1.2) scaleX(0.9) skewX(calc(var(--flame-lean, 0deg) + 6deg)); opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); }
  100% { transform: translate(-50%, -90%) scaleY(0.9) scaleX(1.15) skewX(calc(var(--flame-lean, 0deg) - 5deg)); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Added variable pacing and slinky physics");
