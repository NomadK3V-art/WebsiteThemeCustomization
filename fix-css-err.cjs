const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// There is a broken block around line 272
// 100% { transform: translateY(-2px) scaleY(1.1); opacity: 1; filter: drop-shadow(0 0 8px #00FFFF) drop-shadow(0 -4px 12px #00BFFF); }
// }
css = css.replace(/100% \{ transform: translateY\(-2px\) scaleY\(1\.1\); opacity: 1; filter: drop-shadow\(0 0 8px #00FFFF\) drop-shadow\(0 -4px 12px #00BFFF\); \}\s*\}/, '');

fs.writeFileSync('src/index.css', css);
console.log("Fixed CSS syntax error");
