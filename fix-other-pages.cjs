const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/pages/*.tsx');

for (const file of files) {
  if (file.endsWith('Home.tsx')) continue; // Home is fine

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace hardcoded Anton font with global custom classes or Damion
  if (content.includes("fontFamily: 'Anton, sans-serif'")) {
    content = content.replace(/fontFamily: 'Anton, sans-serif'/g, "fontFamily: 'Damion, cursive'");
    changed = true;
  }

  // Replace hardcoded yellow/red glows with the global blue neon style
  if (content.includes("#FFE600")) {
    content = content.replace(/color: '#FFE600'/g, "color: 'var(--ink)'");
    content = content.replace(/WebkitTextStroke: '[^']+'/g, "WebkitTextStroke: '0'");
    content = content.replace(/textShadow: '[^']+'/g, "textShadow: 'var(--neon-shadow)'");
    changed = true;
  }

  if (content.includes("Rajdhani")) {
    content = content.replace(/fontFamily: 'Rajdhani, sans-serif'/g, "fontFamily: 'Playfair Display, serif'");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated inline styles in ${file}`);
  }
}
