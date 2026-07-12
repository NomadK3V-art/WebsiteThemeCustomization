const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The current flame has width: 35px; height: 55px;
// I will thin it out to 25px and make it taller (75px)
css = css.replace(/width: 35px;\s*height: 55px;/g, 'width: 25px;\n  height: 75px;');

fs.writeFileSync('src/index.css', css);
console.log("Made cursor flame taller and thinner");
