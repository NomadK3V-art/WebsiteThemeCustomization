const fs = require('fs');

// 1. Add click listener to main.tsx
let main = fs.readFileSync('src/main.tsx', 'utf8');

const clickLogic = `
// Global listener for Box Spin effect on click
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.closest) {
    // Find if we clicked a link inside a service box
    const link = target.closest('a');
    if (link) {
      const box = link.closest('.svc, .svc-featured');
      // Verify it's one of the internal resource tabs/links
      if (box && (link.classList.contains('svc-resource') || link.classList.contains('more') || link.classList.contains('qualify-btn'))) {
        e.preventDefault();
        
        // Randomly pick left or right spin direction
        const dir = Math.random() > 0.5 ? 'spin-left' : 'spin-right';
        box.classList.add(dir);
        
        // Add a class to the body to briefly hide the cursor flame during the transition
        document.body.classList.add('navigating');

        // Wait 500ms for the spin animation to finish before navigating
        setTimeout(() => {
          if (link.target === '_blank') {
            window.open(link.href, '_blank');
          } else {
            window.location.href = link.href;
          }
          
          // Remove the class shortly after navigation in case they hit the browser back button
          setTimeout(() => {
            box.classList.remove(dir);
            document.body.classList.remove('navigating');
          }, 500);
        }, 500);
      }
    }
  }
});
`;

if (!main.includes('Box Spin effect')) {
  main += '\n' + clickLogic;
  fs.writeFileSync('src/main.tsx', main);
  console.log("Added JS click listener for box spinning");
}

// 2. Add CSS for the spin effect
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Fast spin animation for service boxes before navigation */
.spin-left {
  /* 0.5s is fast but long enough to see the blur and rotation */
  animation: spinBoxLeft 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards !important;
  pointer-events: none;
}

.spin-right {
  animation: spinBoxRight 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards !important;
  pointer-events: none;
}

/* Spin left (counter-clockwise 3 full rotations) while shrinking away into nothing */
@keyframes spinBoxLeft {
  0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
  50% { opacity: 0.8; filter: blur(2px); }
  100% { transform: scale(0) rotate(-1080deg); opacity: 0; filter: blur(10px); }
}

/* Spin right (clockwise 3 full rotations) */
@keyframes spinBoxRight {
  0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
  50% { opacity: 0.8; filter: blur(2px); }
  100% { transform: scale(0) rotate(1080deg); opacity: 0; filter: blur(10px); }
}

/* Hide the cursor flame while the page is transitioning to make it look cleaner */
body.navigating::after {
  display: none !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Added CSS keyframes for box spinning");
