const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// We appended a block at the end of the file starting with /* Universal Pill Background Override using pills.jpg */
// We just need to remove the text-styling overrides from that block.

css = css.replace(/color: var\(--ink\) !important;\s*text-shadow: var\(--neon-shadow\) !important;\s*-webkit-text-stroke: var\(--neon-stroke\) !important;\s*font-family: var\(--display\) !important;/g, '');

fs.writeFileSync('src/index.css', css);
console.log("Reverted pill text styles");
