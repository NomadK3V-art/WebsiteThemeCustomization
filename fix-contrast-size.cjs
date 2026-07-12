const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Append new CSS rules to the bottom to override the previous ones
css += `
/* Reduce contrast of blue letters in all boxes */
.svc-featured .fr .svc-resource, .svc a.svc-resource {
  color: #C0F0FF !important; /* Slightly more muted/softer light blue */
  text-shadow: 0 0 4px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 191, 255, 0.5) !important; /* Softer glow */
  -webkit-text-stroke: 0 !important; /* Removing the stroke softens the text significantly */
}

.svc a.more, .svc-featured .fr .more {
  color: #A0E8FF !important; /* Muted cyan */
  text-shadow: 0 0 5px rgba(0, 191, 255, 0.6) !important; /* Softer glow */
  -webkit-text-stroke: 0 !important;
}

/* Increase size of blue letters specifically in the GLP-1 box (.svc-featured) */
.svc-featured .fr .svc-resource {
  font-size: 1.25rem !important; /* Increased from 1.1rem */
}

.svc-featured .fr .more {
  font-size: 1.4rem !important; /* Increased from 1.2rem */
}

.svc-featured .ftag {
  font-size: 13px !important; /* Increase the tag size slightly as well */
  color: #B0F0FF !important;
  text-shadow: 0 0 6px rgba(0, 191, 255, 0.6) !important;
  border-color: rgba(0, 255, 255, 0.5) !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated contrast and font sizes");
