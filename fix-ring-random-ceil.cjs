const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

const raycastRegex = /\/\/ Raycast up to find a ceiling \(UI Box\)[\s\S]*?if \(hitY > 0 && hitY < startY\) \{/;

const newRaycastLogic = `// Raycast up to find a ceiling (UI Box)
      let hitY = -1;
      
      // Give it a random chance (e.g. 35% chance) to ignore the ceiling and pass right through
      const shouldIgnoreCeiling = Math.random() < 0.35;
      
      if (!shouldIgnoreCeiling) {
        for (let y = startY - 15; y > 0; y -= 30) {
          const el = document.elementFromPoint(mouseX, y);
          if (el) {
            const ceilingBox = el.closest('.svc, .svc-featured, .service-box, .formcard, .oe-card, header, nav');
            if (ceilingBox) {
              hitY = ceilingBox.getBoundingClientRect().bottom;
              break;
            }
          }
        }
      }

      if (hitY > 0 && hitY < startY) {`;

main = main.replace(raycastRegex, newRaycastLogic);

fs.writeFileSync('src/main.tsx', main);
console.log("Added random chance for rings to pass through ceilings");
