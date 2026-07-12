const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/url\('\.\/imports\/Can\.jpg'\)/g, "url('./imports/Skyy.jpg')");

fs.writeFileSync('src/index.css', css);
console.log("Updated Concierge Medicine background to Skyy.jpg");
