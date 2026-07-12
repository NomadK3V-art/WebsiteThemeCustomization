const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The reason it looks like the whole flame is leaning rigidly (like a stick) is because
// skewX transforms the entire element, and even with transform-origin at the bottom, 
// the shape itself remains straight but slanted.

// To make it "bend", we can use a combination of border-radius manipulation AND translation, 
// but the easiest and smoothest way in pure CSS is to use a multi-stop gradient where 
// we shift the center-point of the gradient horizontally based on the lean variable.

// Let's remove the skewX transformation entirely from the keyframes
const oldKeyframes = /@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/;

const newKeyframes = `@keyframes cursorFlame {
  0% { transform: translate(-50%, -90%); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
  25% { transform: translate(-50%, -95%); opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); }
  50% { transform: translate(-50%, -90%); opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); }
  75% { transform: translate(-50%, -92%); opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); }
  100% { transform: translate(-50%, -90%); opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); }
}`;

css = css.replace(oldKeyframes, newKeyframes);

// Now, update the background gradient to bend.
// We can use a conic or radial gradient, but the simplest way to bend the flame 
// is to use CSS clip-path or border-radius manipulation. 
// A better trick: rotate the element, but counter-rotate an inner element... wait, we only have one element.
// Let's use border-radius shifting! If it bends left, the top-right radius gets huge and top-left gets tiny.
// But we need a simpler way that CSS can interpolate.

// Let's just adjust the background radial gradient's X-position at the top!
const bodyAfterOld = /background: radial-gradient\(ellipse at bottom, #0033FF 0%, #00BFFF 20%, #FFE600 45%, #FF5E00 75%, transparent 100%\);/;

// To simulate a bend, the "bottom" stays centered, but the gradient ellipse shifts its top center.
// We can achieve a bend effect by combining a rotation with a skew, but anchored tightly to the very bottom center.
const bodyAfterNew = `background: radial-gradient(ellipse at bottom, #0033FF 0%, #00BFFF 20%, #FFE600 45%, #FF5E00 75%, transparent 100%);
  /* A combination of skew and rotate creates a distinct curve/bend rather than a rigid lean */
  transform: translate(-50%, -90%) rotate(calc(var(--flame-lean, 0deg) * 0.5)) skewX(calc(var(--flame-lean, 0deg) * 0.5));
  transform-origin: 50% 100%;`;

css = css.replace(bodyAfterOld, bodyAfterNew);

// We need to remove the translate/skew from the keyframes so it doesn't fight the base transform we just set
const newKeyframes2 = `@keyframes cursorFlame {
  0% { opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); height: 75px; }
  25% { opacity: 1; filter: drop-shadow(0 0 8px #FF5E00) drop-shadow(0 -2px 15px #B400FF); height: 80px; }
  50% { opacity: 0.85; filter: drop-shadow(0 0 4px #FF5E00) drop-shadow(0 -1px 12px #B400FF); height: 75px; }
  75% { opacity: 1; filter: drop-shadow(0 0 10px #FF5E00) drop-shadow(0 -4px 20px #B400FF); height: 78px; }
  100% { opacity: 0.9; filter: drop-shadow(0 0 5px #FF5E00) drop-shadow(0 0 10px #B400FF); height: 75px; }
}`;

css = css.replace(/@keyframes cursorFlame\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, newKeyframes2);

fs.writeFileSync('src/index.css', css);
console.log("Updated flame physics to bend instead of rigidly leaning");

// Update JS to apply the breeze math smoothly
let main = fs.readFileSync('src/main.tsx', 'utf8');

// Combine breeze + drag into the single --flame-lean variable
const oldJsPhysics = /let lean = velocityX \* 15;[\s\S]*?clearTimeout\(leanTimeout\);\s*leanTimeout = setTimeout\(\(\) => \{\s*document\.body\.style\.setProperty\('--flame-lean', '0deg'\);\s*\}, 80\);/;

const newJsPhysics = `let dragLean = velocityX * 15; 
  if (dragLean > 35) dragLean = 35;
  if (dragLean < -35) dragLean = -35;
  
  // Combine drag and breeze
  let totalLean = dragLean + currentBreeze;
  document.body.style.setProperty('--flame-lean', \`\${totalLean}deg\`);

  clearTimeout(leanTimeout);
  leanTimeout = setTimeout(() => {
    // When stopped dragging, it settles back to just the ambient breeze
    document.body.style.setProperty('--flame-lean', \`\${currentBreeze}deg\`);
  }, 80);`;

main = main.replace(oldJsPhysics, newJsPhysics);
fs.writeFileSync('src/main.tsx', main);

