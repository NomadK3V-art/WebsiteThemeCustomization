const fs = require('fs');

// 1. Update CSS: Make the spin animation take 0.75s instead of 0.5s, 
// and increase the total rotations from 3 (1080deg) to 5 (1800deg) so it spins much faster over a slightly longer period.
let css = fs.readFileSync('src/index.css', 'utf8');

// For Left/Right (Y axis)
css = css.replace(/@keyframes spinBoxLeft \{\s*0% \{ transform: perspective\(1200px\) rotateY\(0deg\); \}\s*100% \{ transform: perspective\(1200px\) rotateY\(-1080deg\); \}\s*\}/, `@keyframes spinBoxLeft {
  0% { transform: perspective(1200px) rotateY(0deg); }
  100% { transform: perspective(1200px) rotateY(-1800deg); }
}`);

css = css.replace(/@keyframes spinBoxRight \{\s*0% \{ transform: perspective\(1200px\) rotateY\(0deg\); \}\s*100% \{ transform: perspective\(1200px\) rotateY\(1080deg\); \}\s*\}/, `@keyframes spinBoxRight {
  0% { transform: perspective(1200px) rotateY(0deg); }
  100% { transform: perspective(1200px) rotateY(1800deg); }
}`);

// For Forward/Backward (X axis)
css = css.replace(/@keyframes spinBoxForward \{\s*0% \{ transform: perspective\(1200px\) rotateX\(0deg\); \}\s*100% \{ transform: perspective\(1200px\) rotateX\(1080deg\); \}\s*\}/, `@keyframes spinBoxForward {
  0% { transform: perspective(1200px) rotateX(0deg); }
  100% { transform: perspective(1200px) rotateX(1800deg); }
}`);

css = css.replace(/@keyframes spinBoxBackward \{\s*0% \{ transform: perspective\(1200px\) rotateX\(0deg\); \}\s*100% \{ transform: perspective\(1200px\) rotateX\(-1080deg\); \}\s*\}/, `@keyframes spinBoxBackward {
  0% { transform: perspective(1200px) rotateX(0deg); }
  100% { transform: perspective(1200px) rotateX(-1800deg); }
}`);

// Update animation durations to 0.75s
css = css.replace(/animation: spinBoxLeft 0\.5s/g, 'animation: spinBoxLeft 0.75s');
css = css.replace(/animation: spinBoxRight 0\.5s/g, 'animation: spinBoxRight 0.75s');
css = css.replace(/animation: spinBoxForward 0\.5s/g, 'animation: spinBoxForward 0.75s');
css = css.replace(/animation: spinBoxBackward 0\.5s/g, 'animation: spinBoxBackward 0.75s');

fs.writeFileSync('src/index.css', css);

// 2. Update JS: Delay the page navigation to match the new 0.75s animation
let main = fs.readFileSync('src/main.tsx', 'utf8');

// Change setTimeout from 500ms to 750ms
main = main.replace(/setTimeout\(\(\) => \{\s*if \(link\.target === '_blank'\)/, `setTimeout(() => {\n          if (link.target === '_blank')`);
main = main.replace(/}, 500\);\s*\}\s*\}\s*\}\s*\n\}\);/, `}, 750);\n      }\n    }\n  }\n});`);

fs.writeFileSync('src/main.tsx', main);
console.log("Increased spin rotations and duration");
