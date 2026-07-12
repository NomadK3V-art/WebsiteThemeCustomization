const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// For the stationary/slow moving smoke:
// Extend travel distance from -150px to -200px (approx an extra half inch to an inch on standard displays)
// and slightly increase animation duration to make it linger up there.
css = css.replace(/animation: smokeRise 1\.5s forwards linear;/g, 'animation: smokeRise 2.2s forwards linear;');

css = css.replace(/@keyframes smokeRise\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRise {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.9;
  }
  50% {
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 0.5)), -100px) scale(1.5);
    opacity: 0.7;
  }
  100% {
    /* Pushed higher (-220px) to extend the trail length by about half an inch */
    transform: translate(calc(-50% + var(--drift-x, 0px)), -220px) scale(3.5);
    opacity: 0;
  }
}`);

// For the fast moving smoke tail:
// Extend it from -280px to -350px
css = css.replace(/animation: smokeRiseMoving 2\.5s forwards linear;/g, 'animation: smokeRiseMoving 3.2s forwards linear;');

css = css.replace(/@keyframes smokeRiseMoving\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes smokeRiseMoving {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.95;
  }
  50% {
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 1.5)), -170px) scale(2);
    opacity: 0.8;
  }
  100% {
    /* Extended travel distance to -380px for a very long swooping tail */
    transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 3)), -380px) scale(4);
    opacity: 0;
  }
}`);

fs.writeFileSync('src/index.css', css);

// Also need to extend the JS timeout so the DOM elements don't get removed before the animation finishes
let main = fs.readFileSync('src/main.tsx', 'utf8');

// Stationary smoke
main = main.replace(/setTimeout\(\(\) => smoke\.remove\(\), 1500\);/g, 'setTimeout(() => smoke.remove(), 2200);');

// Moving smoke
main = main.replace(/setTimeout\(\(\) => smoke\.remove\(\), 2500\);/g, 'setTimeout(() => smoke.remove(), 3200);');

fs.writeFileSync('src/main.tsx', main);
console.log("Extended smoke trails by another half inch to an inch");
