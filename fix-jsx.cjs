const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Remove script tags entirely
code = code.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
// Remove svg tags as they might have un-react-friendly attributes (like stroke-width vs strokeWidth)
code = code.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '<span>[ICON]</span>');
code = code.replace(/stroke-width/g, 'strokeWidth');
code = code.replace(/stroke-linecap/g, 'strokeLinecap');
code = code.replace(/stroke-linejoin/g, 'strokeLinejoin');
code = code.replace(/fill-rule/g, 'fillRule');
code = code.replace(/clip-rule/g, 'clipRule');

// Write back
fs.writeFileSync('src/pages/Home.tsx', code);
console.log("Fixed JSX");
