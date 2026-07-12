const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the linear-gradient for header and .cta with the Purple_Night image
css = css.replace(/header, \.cta, \.oe-card \{[\s\n]*background: linear-gradient[^!]+!important;[\s\n]*\}/, 
`header, .cta, .oe-card {
  background: url('../imports/Purple_Night.jpg') center/cover no-repeat !important;
}`);

// To ensure text and structure remains readable, we might want to add a semi-transparent overlay 
// on top of the image inside the header/cta, or just let the image do its thing. 
// A nice approach is using multiple backgrounds:
css = css.replace(/background: url\('\.\.\/imports\/Purple_Night\.jpg'\) center\/cover no-repeat !important;/, 
`background: linear-gradient(rgba(13, 0, 37, 0.8), rgba(13, 0, 37, 0.8)), url('/src/imports/Purple_Night.jpg') center/cover no-repeat !important;`);

fs.writeFileSync('src/index.css', css);
console.log("Updated backgrounds");
