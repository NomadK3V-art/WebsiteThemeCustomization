const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// There's a trailing fragment at the bottom of the file from the regex replace
css = css.replace(/100% \{ background-size: 22px 22px; opacity: 1; \}\s*\}/, '');

fs.writeFileSync('src/index.css', css);
console.log("Fixed CSS trailing bracket");
