const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Apply the glowing neon style to 'handled with care' and 'RX'
// .logo b span covers the 'RX' in SvelteRX logo
// .hero h1 em covers 'handled with care'
// .foot-logo b span covers the footer logo 'RX'

css = css.replace(/h1, h2, h3, \.logo b \{/g, 'h1, h2, h3, .logo b, .logo b span, .foot-logo b, .foot-logo b span, .hero h1 em {');

// remove any hardcoded overrides that might be interfering
css = css.replace(/\.logo b span\{color:#[a-fA-F0-9]+\}/g, '');
css = css.replace(/\.foot-logo b span\{color:#[a-fA-F0-9]+\}/g, '');
css = css.replace(/\.hero h1 em\{font-style:italic;color:var\(--purple\)\}/g, '.hero h1 em { font-style: italic; }');

fs.writeFileSync('src/index.css', css);
console.log("Updated specific text items to neon glow");
