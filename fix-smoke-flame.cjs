const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove the previous flame attempts
css = css.replace(/\/\* Top fire border matching Blue_flame_spec \*\/[\s\S]*?@keyframes flameTrail\s*\{\s*0%\s*\{\s*opacity:\s*0\.6;\s*\}\s*100%\s*\{\s*opacity:\s*1;\s*\}\s*\}/, `
/* Smooth wispy blue flame matching the uploaded image */
.svc::before {
  content: "";
  position: absolute;
  top: -40px;
  left: -20px;
  right: -20px;
  bottom: 0;
  background: url('../imports/Blue_flame_spec..jpg') center/cover;
  opacity: 0;
  /* Screen blend mode drops the black background and leaves the blue glow! */
  mix-blend-mode: screen;
  /* Mask it so it's strongest at the top and runs down the sides */
  -webkit-mask-image: radial-gradient(ellipse 120% 80% at top center, black 10%, transparent 70%);
  mask-image: radial-gradient(ellipse 120% 80% at top center, black 10%, transparent 70%);
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.5s ease;
  border-radius: 16px;
}

.svc:hover::before {
  opacity: 0.8;
  animation: smokeFlow 3s infinite linear;
}

/* We don't need ::after anymore for this, but let's hide it just in case */
.svc::after {
  display: none;
}

@keyframes smokeFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`);

fs.writeFileSync('src/index.css', css);
console.log("Updated hover effect to use the actual Blue_flame_spec image with screen blend mode");
