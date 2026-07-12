const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the previous background: url('...') for pills with the transparent background
css = css.replace(/background: url\('\.\/imports\/pills\.jpg'\) center\/cover no-repeat !important;/g, 'background: transparent !important;');

fs.writeFileSync('src/index.css', css);
console.log("Made pills transparent");
