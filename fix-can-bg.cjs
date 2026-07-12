const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/url\('\.\/imports\/Con\.jpg'\)/g, "url('./imports/Can.jpg')");

fs.writeFileSync('src/index.css', css);
console.log("Updated Concierge Medicine background to Can.jpg");
