const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the previous gas/lingering effects with the new continuous blue flame spec
css = css.replace(/\/\* Base settings for both top and side fire layers \*\/[\s\S]*?@keyframes fireLingerSides\s*\{[^}]+\}/, `
/* Top fire border matching Blue_flame_spec */
.svc::before {
  content: "";
  position: absolute;
  top: -24px;
  left: -20px;
  right: -20px;
  height: 24px;
  /* An intense continuous blue energy beam that flickers and clings to the top */
  background: 
    linear-gradient(to right, 
      rgba(0, 255, 255, 0) 0%, 
      rgba(0, 191, 255, 0.8) 10%, 
      #00FFFF 50%, 
      rgba(0, 191, 255, 0.8) 90%, 
      rgba(0, 255, 255, 0) 100%
    );
  /* Use a mask to create flame-like vertical wisps */
  -webkit-mask-image: repeating-linear-gradient(
    to right,
    black 0%,
    rgba(0,0,0,0.5) 10%,
    black 20%
  );
  -webkit-mask-size: 30px 100%;
  opacity: 0;
  filter: blur(1px) drop-shadow(0 -4px 10px #00BFFF) drop-shadow(0 0 15px #00FFFF);
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;
  z-index: 10;
}

/* Side fire trailing down */
.svc::after {
  content: "";
  position: absolute;
  top: 0;
  left: -4px;
  right: -4px;
  bottom: 0;
  /* Thin vertical beams running down the sides */
  background: 
    linear-gradient(to bottom, #00FFFF 0%, rgba(0, 191, 255, 0.6) 20%, rgba(0, 191, 255, 0) 60%) left top / 4px 100% no-repeat,
    linear-gradient(to bottom, #00FFFF 0%, rgba(0, 191, 255, 0.6) 20%, rgba(0, 191, 255, 0) 60%) right top / 4px 100% no-repeat;
  opacity: 0;
  filter: blur(2px) drop-shadow(0 0 8px #00BFFF);
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;
  z-index: 9;
}

.svc:hover::before {
  opacity: 1;
  animation: flameWisp 0.6s infinite alternate ease-in-out;
}
.svc:hover::after {
  opacity: 1;
  animation: flameTrail 0.8s infinite alternate ease-in-out;
}

@keyframes flameWisp {
  0% { transform: translateY(0) scaleY(1); opacity: 0.8; filter: blur(1px) drop-shadow(0 -2px 8px #00BFFF) drop-shadow(0 0 10px #00FFFF); }
  100% { transform: translateY(-3px) scaleY(1.3); opacity: 1; filter: blur(2px) drop-shadow(0 -6px 15px #00BFFF) drop-shadow(0 0 20px #00FFFF); }
}

@keyframes flameTrail {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}
`);

fs.writeFileSync('src/index.css', css);
console.log("Updated to blue flame spec");
