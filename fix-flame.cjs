const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove overflow: hidden from .svc so the flame isn't clipped
css = css.replace(/\.svc\{position:relative;overflow:hidden;/g, '.svc{position:relative;');

// Replace the ::before rule with a blue flame SVG background
css = css.replace(
  /\.svc::before\{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient\(90deg,var\(--purple\),var\(--red\)\);transform:scaleX\(0\);transform-origin:left;transition:transform \.35s cubic-bezier\(\.2,\.85,\.25,1\)\}/,
  `.svc::before {
  content: "";
  position: absolute;
  top: -12px;
  left: -30px;
  width: 24px;
  height: 24px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2300FFFF"><path d="M11.6,2C11.6,2,6,7.5,6,12.5C6,15.5,8.5,18,11.6,18s5.6-2.5,5.6-5.5C17.2,7.5,11.6,2,11.6,2z M11.6,15.5c-1.1,0-2-1-2-2.1c0-1.1,0.9-2.1,2-2.1s2,1,2,2.1C13.6,14.5,12.7,15.5,11.6,15.5z"/></svg>') center/contain no-repeat;
  filter: drop-shadow(0 0 6px #00FFFF) drop-shadow(0 0 12px #00BFFF);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  pointer-events: none;
}`
);

// Update hover action
css = css.replace(
  /\.svc:hover::before\{transform:scaleX\(1\)\}/,
  `.svc:hover::before { left: calc(100% + 10px); }`
);

fs.writeFileSync('src/index.css', css);
console.log("Updated hover effect to blue flame");
