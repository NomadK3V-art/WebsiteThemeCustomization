const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The links inside the boxes have terrible contrast and old styling
css += `
/* Fix the resource links and tags inside the service boxes so they are neon and beautiful */
.svc-featured .fr .svc-resource, .svc a.svc-resource {
  background: transparent !important;
  border: 1px solid var(--line) !important;
  color: var(--ink) !important;
  text-shadow: var(--neon-shadow) !important;
  -webkit-text-stroke: var(--neon-stroke) !important;
  font-family: var(--display) !important;
  font-size: 1.1rem !important;
  padding: 12px 16px !important;
  border-radius: 8px !important;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.1) !important;
}

.svc-featured .fr .svc-resource:hover, .svc a.svc-resource:hover {
  background: rgba(0, 191, 255, 0.15) !important;
  border-color: #00FFFF !important;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3) !important;
  transform: translateX(5px);
}

.svc-featured .ftag {
  background: transparent !important;
  border: 1px solid #00FFFF !important;
  color: #00FFFF !important;
  text-shadow: 0 0 8px #00BFFF !important;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2) !important;
}

.svc .ico, .dv-bar .dv-ico {
  background: transparent !important;
  border: 1px solid var(--line) !important;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.2) !important;
}

.svc a.more, .svc-featured .fr .more {
  color: #00FFFF !important;
  text-shadow: 0 0 8px #00BFFF !important;
  font-size: 1.2rem !important;
  font-family: var(--display) !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Fixed internal service box elements");
