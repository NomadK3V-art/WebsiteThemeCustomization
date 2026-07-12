const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The user noted that some pills might not have the background. Let's make sure absolutely all button classes are covered.
const buttonClasses = [
  '.lava-pill', '.nav-pill', '.btn', '.btn-primary', '.btn-ghost', '.qualify-btn', '.dv-btn', '.oe-btn', '.ftag', '.oe-tag', '.svc-featured .ftag'
].join(',\n');

const hoverClasses = [
  '.lava-pill:hover', '.nav-pill:hover', '.btn:hover', '.btn-primary:hover', '.btn-ghost:hover', '.qualify-btn:hover', '.dv-btn:hover', '.oe-btn:hover'
].join(',\n');

// Remove the old pill override block from the bottom
css = css.replace(/\/\* Universal Pill Background Override using pills\.jpg \*\/[\s\S]*?(?=\n\n|$)/, '');

// Append the new one with the purple text
css += `
/* Universal Pill Background Override using pills.jpg with Neon Purple text */
${buttonClasses} {
  background: url('./imports/pills.jpg') center/cover no-repeat !important;
  border: 1px solid rgba(180, 0, 255, 0.5) !important;
  box-shadow: 0 0 15px rgba(180, 0, 255, 0.2) !important;
  color: #F0D0FF !important; /* Bright pastel purple */
  text-shadow: 0 0 6px rgba(180, 0, 255, 0.8), 0 0 12px rgba(139, 0, 255, 0.6) !important;
  -webkit-text-stroke: 0 !important;
  font-family: 'Damion', cursive !important;
  font-size: 1.2rem !important;
  font-weight: 400 !important;
  letter-spacing: 1px !important;
  text-transform: none !important;
}

${hoverClasses} {
  background: url('./imports/pills.jpg') center/cover no-repeat !important;
  filter: brightness(1.2);
  box-shadow: 0 0 20px rgba(180, 0, 255, 0.5) !important;
  transform: translateY(-2px);
  color: #FFFFFF !important;
  text-shadow: 0 0 8px rgba(180, 0, 255, 0.9), 0 0 16px rgba(255, 0, 255, 0.7) !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated pills to have purple neon text and ensure all classes have the pills.jpg background");
