const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// There's a trailing fragment left from old animations. Line 306-308.
css = css.replace(/50% \{ background-position: 100% 50%; \}\s*100% \{ background-position: 0% 50%; \}\s*\}/g, '');

fs.writeFileSync('src/index.css', css);
console.log("Fixed CSS trailing bracket");
