const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Animated Spark Effect on Button Hover */
.lava-pill, .nav-pill, .btn, .btn-primary, .btn-ghost, .qualify-btn, .dv-btn, .oe-btn {
  /* We need overflow visible so sparks can fly out of the button bounds */
  overflow: visible !important;
  position: relative;
}

.lava-pill:hover::before, .nav-pill:hover::before, .btn:hover::before, .btn-primary:hover::before, .btn-ghost:hover::before, .qualify-btn:hover::before, .dv-btn:hover::before, .oe-btn:hover::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: transparent;
  border-radius: 50%;
  pointer-events: none;
  z-index: 100;
  animation: shootSparks 0.6s infinite ease-out;
}

@keyframes shootSparks {
  0% {
    box-shadow: 
      0 0 0 0px #C0FFF0,
      0 0 0 0px #00FFFF,
      0 0 0 0px #FF5E00,
      0 0 0 0px #F0D0FF,
      0 0 0 0px #00BFFF,
      0 0 0 0px #FF5E00;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    box-shadow: 
      -40px -40px 0 1px rgba(192, 255, 240, 0),
      50px -20px 0 2px rgba(0, 255, 255, 0),
      -30px  50px 0 1px rgba(255, 94, 0, 0),
      40px  40px 0 2px rgba(240, 208, 255, 0),
      0px -60px 0 1px rgba(0, 191, 255, 0),
      -50px  10px 0 2px rgba(255, 94, 0, 0);
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Added spark animations to buttons");
