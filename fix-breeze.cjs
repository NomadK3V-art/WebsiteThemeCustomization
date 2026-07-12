const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// 1. Remove the frantic 0.15s flicker speed and replace it with a moderate 0.5s pace
main = main.replace(/'0\.15s',\s*'0\.35s',\s*'0\.7s',\s*'1\.2s'/, "'0.35s', '0.5s', '0.7s', '1.2s'");

// 2. Inject variables for the breeze system
if (!main.includes('targetBreeze')) {
  main = main.replace(/let ringInterval = 2500;/, "let ringInterval = 2500;\nlet targetBreeze = 0;\nlet currentBreeze = 0;\nlet lastBreezeChange = 0;");
  
  // 3. Add the continuous smooth breeze logic into the particle interval loop
  const breezeInjection = `const isStationary = now - lastMouseMoveTime > 50;

  // Breeze Physics Engine
  if (now - lastBreezeChange > 2000 + Math.random() * 4000) {
    lastBreezeChange = now;
    // Generate a random breeze direction between -20 and +20 degrees
    targetBreeze = (Math.random() * 40) - 20;
  }
  // Smoothly interpolate (lerp) the current lean toward the target breeze
  currentBreeze += (targetBreeze - currentBreeze) * 0.015;
  document.body.style.setProperty('--flame-breeze', \`\${currentBreeze}deg\`);
`;

  main = main.replace(/const isStationary = now - lastMouseMoveTime > 50;/, breezeInjection);
  fs.writeFileSync('src/main.tsx', main);
}

// 4. Update CSS keyframes to mathematically add the breeze to the existing drag physics
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/var\(--flame-lean, 0deg\)/g, '(var(--flame-lean, 0deg) + var(--flame-breeze, 0deg))');

fs.writeFileSync('src/index.css', css);
console.log("Removed hyper-fast flicker and added smooth ambient breeze");
