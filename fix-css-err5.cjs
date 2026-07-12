const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// There's a trailing fragment left from old smoke animation. Line 303-306.
css = css.replace(/@keyframes smokeBillow\s*\{\s*0%\s*\{\s*transform:\s*translateY\(0\)\s*scale\(1\);\s*filter:\s*blur\(0px\)\s*hue-rotate\(0deg\);\s*\}\s*100%\s*\{\s*transform:\s*translateY\(-15px\)\s*scale\(1\.05\);\s*filter:\s*blur\(1px\)\s*hue-rotate\(15deg\);\s*\}\s*\}/g, '');

fs.writeFileSync('src/index.css', css);
console.log("Fixed CSS trailing bracket again");
