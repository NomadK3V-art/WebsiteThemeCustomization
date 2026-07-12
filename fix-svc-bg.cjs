const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Disable the blue flame on .svc
css += `
/* Disable flame on .svc */
.svc::before {
  display: none !important;
}

/* Apply Purple_Night-1.jpg to .svc and .oe-card */
.svc, .oe-card {
  background: linear-gradient(rgba(13, 0, 37, 0.7), rgba(13, 0, 37, 0.7)), url('./imports/Purple_Night-1.jpg') center/cover no-repeat !important;
  border: 1px solid var(--line) !important;
  box-shadow: 0 0 20px rgba(120, 0, 200, 0.15), inset 0 0 30px rgba(60, 0, 120, 0.1) !important;
}

/* Ensure the purple variant doesn't override */
.svc.svc-purple {
  background: linear-gradient(rgba(13, 0, 37, 0.7), rgba(13, 0, 37, 0.7)), url('./imports/Purple_Night-1.jpg') center/cover no-repeat !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated backgrounds for .svc and .oe-card");
