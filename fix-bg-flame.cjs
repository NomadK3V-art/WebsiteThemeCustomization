const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove old smoke/flame ::before and ::after rules
css = css.replace(/\/\* Smooth blue smoke effect \*\/[\s\S]*?@keyframes smokeBillow\s*\{[^}]+\}/, '');
css = css.replace(/\.svc::before\s*\{[\s\S]*?border-radius:\s*16px;\s*\}/g, '');
css = css.replace(/\.svc:hover::before\s*\{[\s\S]*?animation:\s*smokeBillow[^;]+;\s*\}/g, '');

const newBgFlame = `
/* Blue flame background on hover */
.svc::before, .svc-featured::before, .service-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('./imports/Blue_flame_spec..jpg') center/cover no-repeat;
  opacity: 0;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.5s ease-in-out, transform 3s ease-out;
  transform: scale(1.1);
  border-radius: inherit;
}

.svc:hover::before, .svc-featured:hover::before, .service-box:hover::before {
  opacity: 0.45; /* Soft glow behind words */
  transform: scale(1);
}

/* Ensure content sits above the flame */
.svc > *, .svc-featured > *, .service-box > * {
  position: relative;
  z-index: 1;
}

.svc, .svc-featured, .service-box {
  position: relative;
  overflow: hidden;
}
`;

css += newBgFlame;

fs.writeFileSync('src/index.css', css);
console.log("Updated to background blue flame");
