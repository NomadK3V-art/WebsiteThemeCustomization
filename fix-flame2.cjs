const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the previous flame code
const regexBefore = /\.svc::before\s*\{[\s\S]*?pointer-events: none;\s*\}/;
const regexHover = /\.svc:hover::before\s*\{\s*left:\s*calc\(100%\s*\+\s*10px\);\s*\}/;

css = css.replace(regexBefore, `.svc::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 15px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2300FFFF"><path d="M12,2c0,0-5,5-5,10c0,2.8,2.2,5,5,5s5-2.2,5-5C17,7,12,2,12,2z M12,14.5c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5 s1.5,0.7,1.5,1.5C13.5,13.8,12.8,14.5,12,14.5z"/></svg>') repeat-x;
  background-size: 15px 15px;
  opacity: 0;
  filter: drop-shadow(0 0 4px #00FFFF) drop-shadow(0 -2px 8px #00BFFF);
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 10;
}`);

css = css.replace(regexHover, `.svc:hover::before {
  opacity: 1;
  animation: blueFire 0.4s infinite alternate;
}`);

// Add keyframes if not exists
if (!css.includes('@keyframes blueFire')) {
  css += `
@keyframes blueFire {
  0% { transform: translateY(0) scaleY(1); opacity: 0.8; filter: drop-shadow(0 0 4px #00FFFF) drop-shadow(0 -2px 8px #00BFFF); }
  100% { transform: translateY(-2px) scaleY(1.1); opacity: 1; filter: drop-shadow(0 0 8px #00FFFF) drop-shadow(0 -4px 12px #00BFFF); }
}
`;
}

fs.writeFileSync('src/index.css', css);
console.log("Updated to continuous animated flame border");
