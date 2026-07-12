const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/url\('\.\/imports\/Skyy\.jpg'\)/g, "url('./imports/gg.jpg')");

fs.writeFileSync('src/index.css', css);
console.log("Updated Concierge Medicine background to gg.jpg");
