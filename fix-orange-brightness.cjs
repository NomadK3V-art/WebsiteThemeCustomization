const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Brighten the main body and muted colors
// Shift from soft peach/muted orange to a brighter, more saturated glowing orange
css = css.replace(/--body: #FFB380;/g, '--body: #FFC099;'); // Brighter, hotter peach
css = css.replace(/--muted: #D98C59;/g, '--muted: #FFA566;'); // Warmer, more vibrant orange

// Intensify the glow slightly to make it pop more
css = css.replace(/text-shadow: 0 0 3px rgba\(204, 85, 0, 0.4\), 0 0 6px rgba\(204, 85, 0, 0.2\) !important;/g, 
  'text-shadow: 0 0 4px rgba(255, 120, 0, 0.6), 0 0 10px rgba(255, 80, 0, 0.4) !important;');

css = css.replace(/text-shadow: 0 0 2px rgba\(204, 85, 0, 0.3\) !important;/g, 
  'text-shadow: 0 0 3px rgba(255, 120, 0, 0.5), 0 0 6px rgba(255, 80, 0, 0.3) !important;');

fs.writeFileSync('src/index.css', css);
console.log("Brightened burnt orange text and glow");
