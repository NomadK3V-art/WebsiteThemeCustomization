const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Change the ink color to pure white for better core legibility
css = css.replace(/--ink: #[a-zA-Z0-9]+;/g, '--ink: #FFFFFF;');

// Soften the neon shadow and give it a white inner core glow
css = css.replace(/--neon-shadow: [^;]+;/g, '--neon-shadow: 0 0 2px #FFFFFF, 0 0 8px #00FFFF, 0 0 16px #00BFFF, 0 0 25px #00BFFF;');

// Remove or drastically thin the stroke. A heavy stroke on cursive fonts destroys legibility.
css = css.replace(/--neon-stroke: [^;]+;/g, '--neon-stroke: 0.2px rgba(0, 191, 255, 0.4);');

// If there are explicit .lava-text or .lava-text-sm rules, fix them too just in case
css = css.replace(/\.lava-text\s*\{[^}]+\}/, `.lava-text {
  color: #FFFFFF;
  -webkit-text-stroke: 0.2px rgba(0, 191, 255, 0.4);
  text-shadow: 0 0 2px #FFFFFF, 0 0 8px #00FFFF, 0 0 16px #00BFFF, 0 0 25px #00BFFF;
}`);

css = css.replace(/\.lava-text-sm\s*\{[^}]+\}/, `.lava-text-sm {
  color: #FFFFFF;
  -webkit-text-stroke: 0.2px rgba(0, 191, 255, 0.4);
  text-shadow: 0 0 2px #FFFFFF, 0 0 6px #00FFFF, 0 0 12px #00BFFF;
}`);

fs.writeFileSync('src/index.css', css);
console.log("Reduced neon brightness and stroke for better legibility");
