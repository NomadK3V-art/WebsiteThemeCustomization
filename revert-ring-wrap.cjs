const fs = require('fs');

// 1. Revert JS changes
let main = fs.readFileSync('src/main.tsx', 'utf8');

const durationsRegex = /const durations = \[8000, 10000, 15000, 20000\];\s*const duration = durations\[Math\.floor\(Math\.random\(\) \* durations\.length\)\];\s*ring\.style\.setProperty\('--duration', duration \+ 'ms'\);\s*\/\/ Raycast up to find a ceiling \(UI Box\)\s*let hitY = -1;\s*let boxW = 300;\s*let boxH = 200;\s*for \(let y = startY - 15; y > 0; y -= 30\) \{\s*const el = document\.elementFromPoint\(mouseX, y\);\s*if \(el\) \{\s*const ceilingBox = el\.closest\('\.svc, \.svc-featured, \.service-box, \.formcard, \.oe-card, header, nav'\);\s*if \(ceilingBox\) \{\s*const rect = ceilingBox\.getBoundingClientRect\(\);\s*hitY = rect\.bottom;\s*boxW = rect\.width;\s*boxH = rect\.height;\s*break;\s*\}\s*\}\s*\}/;

const oldDurationsLogic = `const durations = [8000, 10000, 15000];
      const duration = durations[Math.floor(Math.random() * durations.length)];
      ring.style.setProperty('--duration', duration + 'ms');

      // Raycast up to find a ceiling (UI Box)
      let hitY = -1;
      for (let y = startY - 15; y > 0; y -= 30) {
        const el = document.elementFromPoint(mouseX, y);
        if (el) {
          const ceilingBox = el.closest('.svc, .svc-featured, .service-box, .formcard, .oe-card, header, nav');
          if (ceilingBox) {
            hitY = ceilingBox.getBoundingClientRect().bottom;
            break;
          }
        }
      }`;

main = main.replace(durationsRegex, oldDurationsLogic);

const hitRegex = /if \(hitY > 0 && hitY < startY\) \{\s*ring\.classList\.add\('hit-ceiling'\);\s*ring\.style\.setProperty\('--hit-y', `-\$\{startY - hitY\}px`\);\s*ring\.style\.setProperty\('--wrap-scale', \(boxW \/ 14 \* 1\.15\)\.toString\(\)\);\s*ring\.style\.setProperty\('--travel-y', `-\$\{startY - hitY \+ boxH \+ 50\}px`\);\s*\}/;

const oldHitLogic = `if (hitY > 0 && hitY < startY) {
        ring.classList.add('hit-ceiling');
        ring.style.setProperty('--hit-y', \`-\${startY - hitY}px\`);
      }`;

main = main.replace(hitRegex, oldHitLogic);
fs.writeFileSync('src/main.tsx', main);

// 2. Revert CSS keyframes back to just flattening out
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/@keyframes smokeRingCeil\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRingCeil {
  0% { transform: translate(-50%, -50%) scale(0.8) rotateX(65deg); opacity: 0.95; filter: blur(0px); }
  15% { opacity: 0.7; filter: blur(1px); }
  40% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--hit-y)) scale(5) rotateX(82deg); opacity: 0.6; filter: blur(3px); }
  100% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--hit-y)) scaleX(25) scaleY(7) rotateX(88deg); opacity: 0; filter: blur(12px); }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Reverted ring wrapping logic");
