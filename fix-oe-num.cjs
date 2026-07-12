const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The .oe-num class is currently using a gradient fill with -webkit-background-clip:text
// We want to override it to use the exact same neon blue style as the headlines (var(--ink) + var(--neon-shadow))

css += `
/* Override countdown numbers to be neon blue */
.oe-num {
  background: none !important;
  -webkit-text-fill-color: initial !important;
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow) !important;
  -webkit-text-stroke: var(--neon-stroke) !important;
  font-family: var(--display) !important;
}

/* Also ensure the unit labels underneath it inherit the glowing orange instead of breaking */
.oe-u {
  color: var(--body) !important;
  text-shadow: 0 0 4px rgba(255, 120, 0, 0.6), 0 0 10px rgba(255, 80, 0, 0.4) !important;
  font-weight: 700;
}

/* And the box containing the numbers should have the dark glass look instead of solid white */
.oe-unit {
  background: linear-gradient(145deg, rgba(5,0,10,0.8) 0%, rgba(13,0,37,0.8) 100%) !important;
  border: 1px solid var(--line) !important;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.2) !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated countdown numbers to neon blue");
