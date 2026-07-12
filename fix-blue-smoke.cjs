const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const oldRegex = /\/\* Smooth wispy blue flame matching the uploaded image \*\/[\s\S]*?@keyframes smokeFlow\s*\{[^}]+\s*[^}]+\s*[^}]+\s*\}/;

const newSmoke = `
/* Smooth blue smoke effect */
.svc::before {
  content: "";
  position: absolute;
  top: -60px;
  left: -20px;
  right: -20px;
  bottom: 0;
  /* Using a classic high-res blue smoke image */
  background: url('https://images.unsplash.com/photo-1547070451-e3857a8ea62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080') center/cover;
  opacity: 0;
  /* Screen blend mode drops the black background and leaves the blue smoke! */
  mix-blend-mode: screen;
  /* Mask it so it billows out of the top edge */
  -webkit-mask-image: linear-gradient(to top, transparent 10%, black 50%, transparent 100%);
  mask-image: linear-gradient(to top, transparent 10%, black 50%, transparent 100%);
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.6s ease;
  border-radius: 16px;
}

.svc:hover::before {
  opacity: 0.85;
  animation: smokeBillow 4s infinite alternate ease-in-out;
}

.svc::after {
  display: none;
}

@keyframes smokeBillow {
  0% { transform: translateY(0) scale(1); filter: blur(0px) hue-rotate(0deg); }
  100% { transform: translateY(-15px) scale(1.05); filter: blur(1px) hue-rotate(15deg); }
}
`;

css = css.replace(oldRegex, newSmoke);

fs.writeFileSync('src/index.css', css);
console.log("Updated hover effect to blue smoke");
