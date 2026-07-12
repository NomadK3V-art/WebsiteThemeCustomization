const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The original override grouped .svc, .svc-featured, .formcard, .why-item, .step, .oe-card, .news-card, .dv-bar
// and forced them all to have the exact same gradient:
// background: linear-gradient(145deg, #05000A 0%, #0D0025 40%, #1A0045 80%, #220055 100%) !important;
// This destroys the internal structure styling of .svc-featured (which has child `.fl` and `.fr` elements).

// Let's remove .svc-featured from that massive override block so it can handle its own background and layout natively
css = css.replace(/\.svc, \.svc-featured, \.formcard, \.why-item, \.step, \.oe-card, \.news-card, \.dv-bar \{/, '.svc, .formcard, .why-item, .step, .oe-card, .news-card, .dv-bar {');

// The hover flame is already bound to .svc-featured, but its background might have been messed up by the global override. Let's fix .svc-featured specifically
// Add custom background to .svc-featured
css += `
.svc-featured {
  background: linear-gradient(145deg, #05000A 0%, #0D0025 40%, #1A0045 80%, #220055 100%) !important;
  border: 1px solid var(--line) !important;
  box-shadow: 0 0 20px rgba(120, 0, 200, 0.15), inset 0 0 30px rgba(60, 0, 120, 0.1) !important;
}
.svc-featured .fl { background: transparent !important; }
.svc-featured .fr { background: rgba(0, 0, 0, 0.3) !important; border-left: 1px solid var(--line) !important; }
`;

fs.writeFileSync('src/index.css', css);
console.log("Fixed GLP-1 box style override");
