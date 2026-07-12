const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Change Yellowtail to Damion (a more upright, neon-friendly cursive font)
css = css.replace(/Yellowtail/g, 'Damion');

// Remove artificial browser italic slanting on the cursive words
// (The <em> tag forces an extra artificial slant on cursive fonts which makes them unreadable)
css = css.replace(/\.hero h1 em \{ font-style: italic; \}/g, '.hero h1 em { font-style: normal; }');

// Just in case there are other em tags in the neon rules
css = css.replace(/h1, h2, h3, \.logo b, \.logo b span, \.foot-logo b, \.foot-logo b span, \.hero h1 em \{/g, 
`h1, h2, h3, .logo b, .logo b span, .foot-logo b, .foot-logo b span, .hero h1 em {
  font-style: normal !important;`);

fs.writeFileSync('src/index.css', css);
console.log("Updated font to Damion and removed artificial italic slant");
