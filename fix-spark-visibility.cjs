const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Ah! clip-path cuts off box-shadows. That's why they disappeared. 
// The browser was clipping all the sparks because they were outside the tiny 2x8 pixel core.
css = css.replace(/clip-path: polygon\([^)]+\);/g, '');

// Make it a simple sharp rectangle to act as the core for the spinning box-shadows
css = css.replace(/width: 2px;\s*height: 8px;/g, 'width: 3px;\n  height: 3px;');

fs.writeFileSync('src/index.css', css);
console.log("Removed clip-path to restore spark visibility");
