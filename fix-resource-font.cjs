const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Ensure resource links use the neon cursive font (Damion)
css += `
/* Restore the cursive font for resource links inside service boxes */
.svc-featured .fr .svc-resource, .svc a.svc-resource, .svc a.more, .svc-featured .fr .more {
  font-family: var(--display) !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Restored cursive font to resource links");
