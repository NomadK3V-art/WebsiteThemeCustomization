const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// I also want to give the sparks themselves a tiny bit of length so they look like shards
css = css.replace(/width: 0px;\s*height: 0px;/g, 'width: 2px;\n  height: 8px;');

fs.writeFileSync('src/index.css', css);
