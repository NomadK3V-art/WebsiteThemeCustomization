const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// I will just manually strip out all the messy empty whitespace and any dangling brackets from earlier regex replacements.
// It seems there's a dangling '}' around line 290. Let's find it.
css = css.replace(/\}\s*\}\s*\/\* Smooth blue smoke effect \*\//, '} /* Smooth blue smoke effect */');

// Just to be safe, find any double closing brackets not associated with media queries.
css = css.replace(/100%\s*\{\s*opacity:\s*1;\s*\}\s*\}/g, '100% { opacity: 1; }');

fs.writeFileSync('src/index.css', css);
console.log("Cleaned CSS");
