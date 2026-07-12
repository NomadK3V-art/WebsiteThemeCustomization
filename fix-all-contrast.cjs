const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Update global variables to match the muted link style
css = css.replace(/--ink: #[a-zA-Z0-9]+;/g, '--ink: #C0F0FF;');
css = css.replace(/--neon-shadow: [^;]+;/g, '--neon-shadow: 0 0 4px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 191, 255, 0.5);');
css = css.replace(/--neon-stroke: [^;]+;/g, '--neon-stroke: 0;');

// Update explicit .lava-text classes just in case they are overriding
css = css.replace(/\.lava-text\s*\{[^}]+\}/, `.lava-text {
  color: #C0F0FF !important;
  -webkit-text-stroke: 0 !important;
  text-shadow: 0 0 4px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 191, 255, 0.5) !important;
}`);

css = css.replace(/\.lava-text-sm\s*\{[^}]+\}/, `.lava-text-sm {
  color: #C0F0FF !important;
  -webkit-text-stroke: 0 !important;
  text-shadow: 0 0 4px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 191, 255, 0.5) !important;
}`);

fs.writeFileSync('src/index.css', css);
console.log("Updated all neon text to match the soft link contrast");
