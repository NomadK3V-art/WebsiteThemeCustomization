const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/pages/*.tsx');
let fixedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Let's strip out ANY hardcoded colors for text, to ensure the global CSS rules take over
  // If a file has inline style={{ color: '#c0a0e0' }}, it overrides the global CSS!
  
  if (content.match(/color: '#[a-zA-Z0-9]+'/)) {
    content = content.replace(/color: '#[a-zA-Z0-9]+',?/g, '');
    changed = true;
  }
  
  // Same for text-shadow inline overrides
  if (content.match(/textShadow: '[^']+'/)) {
    content = content.replace(/textShadow: '[^']+',?/g, '');
    changed = true;
  }
  
  // Strip hardcoded font families
  if (content.match(/fontFamily: '[^']+'/)) {
    content = content.replace(/fontFamily: '[^']+',?/g, '');
    changed = true;
  }

  // Same for WebkitTextStroke
  if (content.match(/WebkitTextStroke: '[^']+'/)) {
    content = content.replace(/WebkitTextStroke: '[^']+',?/g, '');
    changed = true;
  }

  // For empty style={{ }} tags left behind
  content = content.replace(/style=\{\{\s*\}\}/g, '');
  content = content.replace(/style=\{\{\s*,\s*/g, 'style={{ ');
  content = content.replace(/,\s*\}\}/g, ' }}');

  if (changed) {
    fs.writeFileSync(file, content);
    fixedCount++;
  }
}
console.log(`Cleaned up inline styles in ${fixedCount} files`);
