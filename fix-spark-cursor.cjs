const fs = require('fs');

// 1. Update CSS to use CSS variables for position
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/top: 50%;\s*left: 50%;/g, 'top: var(--spark-y, 50%);\n  left: var(--spark-x, 50%);');

fs.writeFileSync('src/index.css', css);

// 2. Update main.tsx to add a global mousemove listener
let main = fs.readFileSync('src/main.tsx', 'utf8');

const script = `
// Global listener to track mouse position for the spark effect
document.addEventListener('mousemove', (e) => {
  const target = e.target;
  if (target && target.matches && target.matches('.lava-pill, .nav-pill, .btn, .btn-primary, .btn-ghost, .qualify-btn, .dv-btn, .oe-btn, .ftag')) {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--spark-x', \`\${x}px\`);
    target.style.setProperty('--spark-y', \`\${y}px\`);
  }
});
`;

if (!main.includes('Global listener')) {
  main = main.replace("import './index.css'", "import './index.css'\n" + script);
  fs.writeFileSync('src/main.tsx', main);
}

console.log("Updated sparks to follow cursor coordinates");
