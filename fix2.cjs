const fs = require('fs');

// Fix CSS
let css = fs.readFileSync('src/index.css', 'utf8');
const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Yellowtail&family=Rajdhani:wght@400;500;600;700&display=swap');\n";
css = css.replace(fontImport, '');
css = fontImport + css;
fs.writeFileSync('src/index.css', css);

// Fix JSX
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');
// remove <style> tags entirely from the JSX!
code = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
fs.writeFileSync('src/pages/Home.tsx', code);
console.log("Fixed JSX 2");
