const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The .oe-num class lost some properties during a previous regex replace.
css = css.replace(/\.oe-num\s*\{\s*background: none !important;\s*-webkit-text-fill-color: initial !important;\s*\}/, `.oe-num {
  background: none !important;
  -webkit-text-fill-color: initial !important;
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow) !important;
  -webkit-text-stroke: var(--neon-stroke) !important;
  font-family: var(--display) !important;
}`);

fs.writeFileSync('src/index.css', css);
console.log("Restored neon blue letters for countdown numbers");
