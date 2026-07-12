const fs = require('fs');

// 1. Update CSS to stop the fast ring from expanding and update the trail shape
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Override the fast ring animation to stop it from expanding and make it travel purely vertically */
.cursor-smoke-ring.fast-ring {
  animation: fastRingRise var(--duration, 3s) forwards linear !important;
}

@keyframes fastRingRise {
  0% { transform: translate(-50%, -50%) scale(1.5) rotateX(75deg); opacity: 0.95; filter: blur(0px); }
  80% { opacity: 0.8; filter: blur(1px); }
  100% { transform: translate(-50%, -400px) scale(1.5) rotateX(75deg); opacity: 0; filter: blur(3px); }
}

/* Make the trail exactly match the diameter of the ring and create a tube effect */
.ring-trail {
  /* Using width/height to match the actual visual dimension of the ring (14px * 1.5 scale) */
  width: 21px; 
  height: 21px;
  /* Thin white edges with a hollow transparent center (a tube!) */
  background: radial-gradient(circle, transparent 40%, rgba(255, 255, 255, 0.4) 60%, rgba(0, 191, 255, 0.2) 80%, transparent 100%);
  /* Start oval shaped to match the ring's rotateX perspective */
  transform: translate(-50%, -50%) scaleY(0.4); 
  animation: tubeTrail 1.8s forwards ease-out !important;
}

@keyframes tubeTrail {
  0% { transform: translate(-50%, -50%) scaleX(1) scaleY(0.4); opacity: 0.7; }
  50% { transform: translate(calc(-50% + var(--drift-x, 0px)), 20px) scaleX(1.1) scaleY(0.5); opacity: 0.4; }
  100% { transform: translate(calc(-50% + calc(var(--drift-x, 0px) * 2)), 40px) scaleX(1.3) scaleY(0.6); opacity: 0; }
}
`;

fs.writeFileSync('src/index.css', css);

// 2. Adjust JS spawning logic to tightly match the new tube
let main = fs.readFileSync('src/main.tsx', 'utf8');

// Change the trail particle spawn offset so it perfectly overlaps the ring's edges
main = main.replace(/trail\.style\.top = \(rect\.top \+ rect\.height \/ 2 \+ 10\) \+ 'px';/, 'trail.style.top = (rect.top + rect.height / 2) + "px";');
// Reduce random horizontal drift so the tube stays more solid/column-like
main = main.replace(/trail\.style\.setProperty\('--drift-x', \(Math\.random\(\) \* 6 - 3\) \+ 'px'\);/, 'trail.style.setProperty("--drift-x", (Math.random() * 2 - 1) + "px");');
// Drop a particle faster for a solid unbroken tube
main = main.replace(/setInterval\(\(\) => \{[\s\S]*?\}, 40\);/m, (match) => match.replace('}, 40);', '}, 20);'));

fs.writeFileSync('src/main.tsx', main);

console.log("Updated fast ring to not expand and created a cylindrical tube trail");
