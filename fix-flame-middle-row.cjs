const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Update the gradient to match the middle row (blue base, yellow body, orange tip, no gap)
css = css.replace(
  /background: radial-gradient\(ellipse at bottom, #FFFFFF 0%, #00FFFF 12%, #00BFFF 22%, #000000 32%, #000000 45%, #FFE600 60%, #FF5E00 85%, transparent 100%\);/,
  'background: radial-gradient(ellipse at bottom, #0033FF 0%, #00BFFF 20%, #FFE600 45%, #FF5E00 75%, transparent 100%);'
);

// Slow down the flickering slightly
css = css.replace(
  /animation: cursorFlame 0\.3s infinite linear;/,
  'animation: cursorFlame 0.45s infinite linear;'
);

fs.writeFileSync('src/index.css', css);
console.log("Updated flame gradient and slowed down flickering.");
