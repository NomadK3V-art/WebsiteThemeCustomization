const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Speed up the animation so it looks like an aggressive spark burst (like an angle grinder)
css = css.replace(/animation: shootSparks [^;]+;/, 'animation: shootSparks 0.35s infinite ease-out;');

// Replace the multicolored keyframes with intense, hot metal sparks (White -> Yellow -> Orange -> Red)
// The sparks will get smaller (scale(0.5)) as they shoot outward and cool off, exactly like real metal sparks.
css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes shootSparks {
  0% {
    box-shadow: 
      0 0 0 0px #FFFFFF, 0 0 0 0px #FFE600, 0 0 0 0px #FF5E00, 
      0 0 0 0px #FFFFFF, 0 0 0 0px #FFE600, 0 0 0 0px #FF5E00,
      0 0 0 0px #FFE600, 0 0 0 0px #FF5E00, 0 0 0 0px #FFFFFF;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    box-shadow: 
      -60px -50px 0 -1px #FF0000,
       70px -30px 0 0px #FFE600,
      -50px  70px 0 -1px #FF5E00,
       60px  50px 0 0px #FF0000,
      -10px -80px 0 -1px #FFE600,
      -70px  20px 0 0px #FFFFFF,
       80px  10px 0 -1px #FF5E00,
       30px -70px 0 0px #FFE600,
      -30px -60px 0 -1px #FF0000;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
  }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Updated to hot metal sparks");
