const fs = require('fs');

// 1. Add specific X-axis spin animations to CSS
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Fast spin animation for Dental & Vision bar (Forward/Backward on X-axis) */
.spin-forward {
  animation: spinBoxForward 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards !important;
  pointer-events: none;
}

.spin-backward {
  animation: spinBoxBackward 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards !important;
  pointer-events: none;
}

@keyframes spinBoxForward {
  0% { transform: perspective(1200px) rotateX(0deg); }
  100% { transform: perspective(1200px) rotateX(1080deg); }
}

@keyframes spinBoxBackward {
  0% { transform: perspective(1200px) rotateX(0deg); }
  100% { transform: perspective(1200px) rotateX(-1080deg); }
}
`;

fs.writeFileSync('src/index.css', css);

// 2. Update main.tsx to use forward/backward specifically for the dv-bar
let main = fs.readFileSync('src/main.tsx', 'utf8');

const spinLogicOld = /const dir = Math\.random\(\) > 0\.5 \? 'spin-left' : 'spin-right';/;

const spinLogicNew = `let dir;
        if (box.classList.contains('dv-bar')) {
          dir = Math.random() > 0.5 ? 'spin-forward' : 'spin-backward';
        } else {
          dir = Math.random() > 0.5 ? 'spin-left' : 'spin-right';
        }`;

main = main.replace(spinLogicOld, spinLogicNew);

fs.writeFileSync('src/main.tsx', main);
console.log("Updated Dental & Vision box to spin forward/backward");
