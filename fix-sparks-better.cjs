const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// I will make the sparks a bit more dramatic and dense!
css = css.replace(/@keyframes shootSparks\s*\{[\s\S]*?100%\s*\{[\s\S]*?\}\s*\}/, `@keyframes shootSparks {
  0% {
    box-shadow: 
      0 0 0 0px #00FFFF, 0 0 0 0px #FF5E00, 0 0 0 0px #F0D0FF, 
      0 0 0 0px #00FFFF, 0 0 0 0px #FF5E00, 0 0 0 0px #F0D0FF,
      0 0 0 0px #00BFFF, 0 0 0 0px #FFC099, 0 0 0 0px #00FFFF;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    box-shadow: 
      -40px -40px 0 1px #00FFFF,
      50px -20px 0 2px #FF5E00,
      -30px  50px 0 1px #F0D0FF,
      40px  40px 0 2px #00FFFF,
      0px -60px 0 1px #FF5E00,
      -60px  10px 0 2px #F0D0FF,
      60px  20px 0 1px #00BFFF,
      20px -50px 0 2px #FFC099,
      -20px -60px 0 1px #00FFFF;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}`);

fs.writeFileSync('src/index.css', css);
console.log("Made sparks denser and brighter");
