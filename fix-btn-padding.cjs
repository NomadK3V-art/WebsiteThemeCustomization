const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// I also noticed the cursive font might cause spacing issues, let's ensure padding is generous enough
css = css.replace(/font-size: 1\.2rem !important;/, 'font-size: 1.4rem !important;\n  padding: 10px 24px !important;');

fs.writeFileSync('src/index.css', css);
