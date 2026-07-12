const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Disable the old gas stove rules by renaming their selectors
css = css.replace(/\.svc::before/g, '.old-svc-before-disabled');
css = css.replace(/\.svc:hover::before/g, '.old-svc-hover-before-disabled');

// Append the new lingering + wrapping fire effects
const newFireCSS = `

/* Base settings for both top and side fire layers */
.svc::before, .svc::after {
  content: "";
  position: absolute;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.8s ease-in-out;
}

/* Top fire */
.svc::before {
  top: -16px;
  left: -2px;
  right: -2px;
  height: 16px;
  background: radial-gradient(circle at bottom, #FFFFFF 0%, #E0FFFF 10%, #00FFFF 35%, rgba(0, 191, 255, 0) 65%) repeat-x;
  background-size: 22px 16px;
  filter: blur(1px) drop-shadow(0 -3px 8px #00BFFF) drop-shadow(0 0 5px #00FFFF);
}

/* Side fire (trailing down) */
.svc::after {
  top: 0;
  left: -16px;
  right: -16px;
  bottom: 0;
  /* Two repeating gradients: one for left side, one for right side */
  background: 
    radial-gradient(circle at right, #FFFFFF 0%, #E0FFFF 10%, #00FFFF 35%, rgba(0, 191, 255, 0) 65%) repeat-y top left,
    radial-gradient(circle at left, #FFFFFF 0%, #E0FFFF 10%, #00FFFF 35%, rgba(0, 191, 255, 0) 65%) repeat-y top right;
  background-size: 16px 22px;
  filter: blur(1px) drop-shadow(-3px 0 8px #00BFFF) drop-shadow(3px 0 8px #00BFFF);
  /* Fades out gradually so it looks like it's trailing down */
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
  mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
}

.svc:hover::before {
  opacity: 1;
  animation: fireLingerTop 0.8s infinite alternate ease-in-out;
}
.svc:hover::after {
  opacity: 1;
  animation: fireLingerSides 0.8s infinite alternate ease-in-out;
}

@keyframes fireLingerTop {
  0% { background-size: 22px 14px; opacity: 0.75; transform: translateY(0); }
  100% { background-size: 22px 22px; opacity: 1; transform: translateY(-2px); }
}

@keyframes fireLingerSides {
  0% { background-size: 14px 22px; opacity: 0.75; }
  100% { background-size: 22px 22px; opacity: 1; }
}
`;

css += newFireCSS;

fs.writeFileSync('src/index.css', css);
console.log("Updated to lingering fire running down the sides");
