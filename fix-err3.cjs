const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// If the regex replacement failed and appended broken things, let's fix it manually
css = css.replace(/@keyframes smokeFlow\s*\{\s*0%\s*\{\s*background-position:\s*0%\s*50%;\s*\}\s*50%\s*\{\s*background-position:\s*100%\s*50%;\s*\}\s*100%\s*\{\s*background-position:\s*0%\s*50%;\s*\}\s*\}/g, '');
css = css.replace(/\.svc::before\s*\{[\s\S]*?border-radius:\s*16px;\s*\}/g, '');
css = css.replace(/\.svc:hover::before\s*\{[\s\S]*?animation:\s*smokeFlow\s*3s\s*infinite\s*linear;\s*\}/g, '');

const newSmoke = `
/* Smooth blue smoke effect */
.svc::before {
  content: "";
  position: absolute;
  top: -80px;
  left: -20px;
  right: -20px;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1547070451-ce386c65160a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080') center/cover;
  opacity: 0;
  mix-blend-mode: screen;
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

@keyframes smokeBillow {
  0% { transform: translateY(0) scale(1); filter: blur(0px) hue-rotate(0deg); }
  100% { transform: translateY(-15px) scale(1.05); filter: blur(1px) hue-rotate(15deg); }
}
`;

css += newSmoke;

fs.writeFileSync('src/index.css', css);
console.log("Fixed CSS syntax");
