const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// I will adjust the gradient to inject a sharp blue core.
// Real super-hot flames often have a bright blue base/core surrounded by yellow and orange.
css = css.replace(
  /background: radial-gradient\(ellipse at bottom, #FFFFFF 0%, #FFFFFF 25%, #FFE600 50%, #FF5E00 75%, #B400FF 90%, transparent 100%\);/,
  'background: radial-gradient(ellipse at bottom, #FFFFFF 0%, #00FFFF 20%, #00BFFF 40%, #FFE600 65%, #FF5E00 85%, transparent 100%);'
);

fs.writeFileSync('src/index.css', css);
console.log("Added blue core to flame");
