const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// I removed the lava-text classes earlier via regex accidentally, let's restore them
// to ensure the headers still glow correctly if any inline styles were stripped!
css += `
.lava-text, .lava-text-sm {
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow) !important;
  -webkit-text-stroke: var(--neon-stroke) !important;
  font-family: var(--display) !important;
}

h1, h2, h3, h4, .lava-text, .lava-text-sm {
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow) !important;
  -webkit-text-stroke: var(--neon-stroke) !important;
  font-family: var(--display) !important;
}
`;

fs.writeFileSync('src/index.css', css);
