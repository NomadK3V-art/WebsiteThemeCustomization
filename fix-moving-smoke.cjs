const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

const missingSmokeLogic = `if (!isStationary) {
    // Intentionally left blank. Spawning dozens of scattered smoke particles while moving creates a "scribble" effect.
  }`;

const newMovingSmokeLogic = `if (!isStationary) {
    // Spawn the long trail of smoke while moving, but at a controlled rate to avoid the "scribble"
    if (now - lastSmoke > 30) {
      lastSmoke = now;
      const smoke = document.createElement('div');
      smoke.className = 'cursor-smoke moving-smoke';
      smoke.style.left = mouseX + 'px';
      smoke.style.top = (mouseY - 35) + 'px';
      smoke.style.setProperty('--drift-x', (Math.random() * 30 - 15) + 'px');
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2500);
    }
  }`;

main = main.replace(missingSmokeLogic, newMovingSmokeLogic);

fs.writeFileSync('src/main.tsx', main);
console.log("Restored the moving smoke trail");
