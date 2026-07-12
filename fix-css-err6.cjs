const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// There's a trailing fragment left from an old animation at line 290!
css = css.replace(/100% \{ transform: translateY\(-15px\) scale\(1\.05\); filter: blur\(1px\) hue-rotate\(15deg\); \} \/\* Smooth blue smoke effect \*\//, '/* Removed broken css fragment */');

fs.writeFileSync('src/index.css', css);
console.log("Fixed final CSS error");
