const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Inject aqua green into the global variables
css = css.replace(/--ink: #C0F0FF;/g, '--ink: #C0FFF0;');
css = css.replace(/--neon-shadow: 0 0 4px rgba\(0, 255, 255, 0\.6\), 0 0 10px rgba\(0, 191, 255, 0\.5\);/g, '--neon-shadow: 0 0 4px rgba(0, 255, 200, 0.7), 0 0 12px rgba(0, 200, 255, 0.6), 0 0 20px rgba(0, 255, 180, 0.4);');

// Inject aqua green into the resource links
css = css.replace(/color: #C0F0FF !important;/g, 'color: #C0FFF0 !important;');
css = css.replace(/text-shadow: 0 0 4px rgba\(0, 255, 255, 0\.6\), 0 0 10px rgba\(0, 191, 255, 0\.5\) !important;/g, 'text-shadow: 0 0 4px rgba(0, 255, 200, 0.7), 0 0 12px rgba(0, 200, 255, 0.6), 0 0 20px rgba(0, 255, 180, 0.4) !important;');

css = css.replace(/color: #A0E8FF !important;/g, 'color: #A0FFEB !important;');
css = css.replace(/text-shadow: 0 0 5px rgba\(0, 191, 255, 0\.6\) !important;/g, 'text-shadow: 0 0 6px rgba(0, 255, 180, 0.6), 0 0 12px rgba(0, 191, 255, 0.4) !important;');

css = css.replace(/color: #B0F0FF !important;/g, 'color: #B0FFF0 !important;');
css = css.replace(/text-shadow: 0 0 6px rgba\(0, 191, 255, 0\.6\) !important;/g, 'text-shadow: 0 0 6px rgba(0, 255, 200, 0.7), 0 0 12px rgba(0, 191, 255, 0.5) !important;');

fs.writeFileSync('src/index.css', css);
console.log("Added an aqua-green hint to the blue neon text");
