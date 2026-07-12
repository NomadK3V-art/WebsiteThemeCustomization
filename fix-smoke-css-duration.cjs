const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Match the CSS animation duration to the new JS timeout duration
css = css.replace(/animation: smokeRingRise 2\.5s forwards ease-out;/g, 'animation: smokeRingRise 4s forwards ease-out;');

fs.writeFileSync('src/index.css', css);
console.log("Synced CSS animation duration");
