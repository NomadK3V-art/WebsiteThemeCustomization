const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Reduce the blue flame size (0% to 22%)
// Add a black gap (32% to 45%) which becomes completely transparent/empty space due to the "screen" blend mode
// Start the yellow/orange outer flame further out (60% to 85%)
css = css.replace(
  /background: radial-gradient\(ellipse at bottom, #FFFFFF 0%, #00FFFF 20%, #00BFFF 40%, #FFE600 65%, #FF5E00 85%, transparent 100%\);/,
  'background: radial-gradient(ellipse at bottom, #FFFFFF 0%, #00FFFF 12%, #00BFFF 22%, #000000 32%, #000000 45%, #FFE600 60%, #FF5E00 85%, transparent 100%);'
);

fs.writeFileSync('src/index.css', css);
console.log("Reduced blue flame and added space between inner and outer flame");
