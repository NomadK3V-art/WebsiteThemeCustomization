const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// replace unclosed tags
code = code.replace(/<(meta|link|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');

fs.writeFileSync('src/pages/Home.tsx', code);
console.log("Fixed JSX 3");
