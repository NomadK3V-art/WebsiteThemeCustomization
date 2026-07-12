const fs = require('fs');

// 1. Update JS to calculate box width and height for wrapping and sliding up the sides
let main = fs.readFileSync('src/main.tsx', 'utf8');

const durationsRegex = /const durations = \[8000, 10000, 15000\];\s*const duration = durations\[Math\.floor\(Math\.random\(\) \* durations\.length\)\];\s*ring\.style\.setProperty\('--duration', duration \+ 'ms'\);\s*\/\/ Raycast up to find a ceiling \(UI Box\)\s*let hitY = -1;\s*for \(let y = startY - 15; y > 0; y -= 30\) \{\s*const el = document\.elementFromPoint\(mouseX, y\);\s*if \(el\) \{\s*const ceilingBox = el\.closest\('\.svc, \.svc-featured, \.service-box, \.formcard, \.oe-card, header, nav'\);\s*if \(ceilingBox\) \{\s*hitY = ceilingBox\.getBoundingClientRect\(\)\.bottom;\s*break;\s*\}\s*\}\s*\}/;

const newDurationsLogic = `const durations = [8000, 10000, 15000, 20000];
      const duration = durations[Math.floor(Math.random() * durations.length)];
      ring.style.setProperty('--duration', duration + 'ms');

      // Raycast up to find a ceiling (UI Box)
      let hitY = -1;
      let boxW = 300;
      let boxH = 200;
      for (let y = startY - 15; y > 0; y -= 30) {
        const el = document.elementFromPoint(mouseX, y);
        if (el) {
          const ceilingBox = el.closest('.svc, .svc-featured, .service-box, .formcard, .oe-card, header, nav');
          if (ceilingBox) {
            const rect = ceilingBox.getBoundingClientRect();
            hitY = rect.bottom;
            boxW = rect.width;
            boxH = rect.height;
            break;
          }
        }
      }`;

main = main.replace(durationsRegex, newDurationsLogic);

const hitRegex = /if \(hitY > 0 && hitY < startY\) \{\s*ring\.classList\.add\('hit-ceiling'\);\s*ring\.style\.setProperty\('--hit-y', `-\$\{startY - hitY\}px`\);\s*\}/;

const newHitLogic = `if (hitY > 0 && hitY < startY) {
        ring.classList.add('hit-ceiling');
        ring.style.setProperty('--hit-y', \`-\${startY - hitY}px\`);
        ring.style.setProperty('--wrap-scale', (boxW / 14 * 1.15).toString());
        ring.style.setProperty('--travel-y', \`-\${startY - hitY + boxH + 50}px\`);
      }`;

main = main.replace(hitRegex, newHitLogic);
fs.writeFileSync('src/main.tsx', main);


// 2. Update CSS keyframes so the ring hits the ceiling, wraps corners, and slides up the wall
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/@keyframes smokeRingCeil\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRingCeil {
  0% { transform: translate(-50%, -50%) scale(0.8) rotateX(65deg); opacity: 0.95; filter: blur(0px); }
  15% { opacity: 0.7; filter: blur(1px); }
  35% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--hit-y)) scaleX(calc(var(--wrap-scale, 25) * 0.8)) scaleY(5) rotateX(85deg); opacity: 0.6; filter: blur(3px); }
  50% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--hit-y)) scaleX(var(--wrap-scale, 35)) scaleY(8) rotateX(88deg); opacity: 0.5; filter: blur(5px); }
  100% { transform: translate(calc(-50% + var(--drift-x, 0px)), var(--travel-y, calc(var(--hit-y) - 200px))) scaleX(calc(var(--wrap-scale, 35) * 1.1)) scaleY(12) rotateX(89deg); opacity: 0; filter: blur(12px); }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Updated ring physics to wrap corners and slide up the walls");
