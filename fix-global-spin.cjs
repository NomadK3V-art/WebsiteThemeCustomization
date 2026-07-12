const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// Update the box targeting to include .service-box (used on all other pages)
main = main.replace(
  /const box = link\.closest\('\.svc, \.svc-featured, \.dv-bar'\);/g,
  "const box = link.closest('.svc, .svc-featured, .dv-bar, .service-box');"
);

// We want ANY link inside these boxes to trigger the box spin.
// The old logic was:
// if (box && (link.classList.contains('svc-resource') || ...))
// Let's change it to just if (box) so ANY link inside a box makes the box spin.
main = main.replace(
  /if \(box && \(link\.classList\.contains[^)]+\)\) \{/g,
  "if (box) {"
);

// Also need to make sure the forward/backward spin applies to the horizontal dv-bar, but left/right to everything else
// The logic is already:
// if (box.classList.contains('dv-bar')) { ... forward/backward ... } else { ... left/right ... }
// Which perfectly handles .service-box falling into the left/right spin!

fs.writeFileSync('src/main.tsx', main);

// Ensure .service-box has preserve-3d in CSS
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.service-box {\n  transform-style: preserve-3d;')) {
  css += `\n.service-box {\n  transform-style: preserve-3d;\n}\n`;
  fs.writeFileSync('src/index.css', css);
}

console.log("Enabled 3D box spinning on ALL pages and links within boxes.");
