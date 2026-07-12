const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/--purple: #FF1493;/g, '--purple: #1A0040;');
css = css.replace(/--purple-d: #8B0066;/g, '--purple-d: #0D0020;');
css = css.replace(/--red: #FF6600;/g, '--red: #00BFFF;');
css = css.replace(/--red-d: #CC0000;/g, '--red-d: #008B8B;');

// The main glowing text color
css = css.replace(/--ink: #FFE600;/g, '--ink: #E0FFFF;');

css = css.replace(/--neon-shadow: 0 0 6px #FF6000, 0 0 18px #FF4400, 0 0 35px #FFB300;/g, '--neon-shadow: 0 0 6px #00FFFF, 0 0 18px #00BFFF, 0 0 35px #00FFFF;');
css = css.replace(/--neon-stroke: 1px #CC0000;/g, '--neon-stroke: 1px #00BFFF;');
css = css.replace(/text-shadow: 0 0 8px #FF6000 !important;/g, 'text-shadow: 0 0 8px #00FFFF !important;');

fs.writeFileSync('src/index.css', css);
console.log("Updated colors in index.css");
