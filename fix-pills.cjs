const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Universal Pill Background Override using pills.jpg */
.lava-pill,
.nav-pill,
.btn,
.btn-primary,
.qualify-btn,
.dv-btn,
.oe-btn,
.ftag,
.oe-tag,
.svc-featured .ftag {
  background: url('./imports/pills.jpg') center/cover no-repeat !important;
  border: 1px solid rgba(0, 255, 255, 0.4) !important;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.2) !important;
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow) !important;
  -webkit-text-stroke: var(--neon-stroke) !important;
  font-family: var(--display) !important;
}

.lava-pill:hover,
.nav-pill:hover,
.btn:hover,
.btn-primary:hover,
.qualify-btn:hover,
.dv-btn:hover,
.oe-btn:hover {
  background: url('./imports/pills.jpg') center/cover no-repeat !important;
  filter: brightness(1.2);
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.4) !important;
  transform: translateY(-2px);
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated pill boxes to use pills.jpg");
