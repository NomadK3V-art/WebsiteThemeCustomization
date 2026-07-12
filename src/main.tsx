import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

let mouseX = -100;
let mouseY = -100;
let lastMouseMoveTime = 0;
let lastX = 0;
let lastTime = 0;
let leanTimeout;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const now = Date.now();
  lastMouseMoveTime = now;

  document.body.style.setProperty('--cursor-x', `${mouseX}px`);
  document.body.style.setProperty('--cursor-y', `${mouseY}px`);

  const dt = now - lastTime;
  let velocityX = 0;
  let speed = 0;
  if (dt > 0 && dt < 100) {
    velocityX = (mouseX - lastX) / dt;
    speed = Math.abs(velocityX);
  }
  lastX = mouseX;
  lastTime = now;

  let dragLean = velocityX * 15; 
  if (dragLean > 35) dragLean = 35;
  if (dragLean < -35) dragLean = -35;
  
  let totalLean = dragLean + currentBreeze;
  document.body.style.setProperty('--flame-lean', `${totalLean}deg`);

  clearTimeout(leanTimeout);
  leanTimeout = setTimeout(() => {
    document.body.style.setProperty('--flame-lean', `${currentBreeze}deg`);
  }, 80);
});

let lastSmoke = 0;
let lastRing = 0;
let ringInterval = 2500;
let targetBreeze = 0;
let currentBreeze = 0;
let lastBreezeChange = 0;
let lastFlickerChange = 0;
const flickerSpeeds = ['0.35s', '0.5s', '0.7s', '1.2s']; 

setInterval(() => {
  if (mouseX < 0 || mouseY < 0) return;

  const now = Date.now();
  
  if (now - lastFlickerChange > 2000 + Math.random() * 3000) {
    lastFlickerChange = now;
    const newSpeed = flickerSpeeds[Math.floor(Math.random() * flickerSpeeds.length)];
    document.body.style.setProperty('--flicker-speed', newSpeed);
  }

  const isStationary = now - lastMouseMoveTime > 50;

  if (now - lastBreezeChange > 2000 + Math.random() * 4000) {
    lastBreezeChange = now;
    targetBreeze = (Math.random() * 40) - 20;
  }
  currentBreeze += (targetBreeze - currentBreeze) * 0.015;
  document.body.style.setProperty('--flame-breeze', `${currentBreeze}deg`);

  if (!isStationary) {
    if (now - lastSmoke > 30) {
      lastSmoke = now;
      const smoke = document.createElement('div');
      smoke.className = 'cursor-smoke moving-smoke';
      smoke.style.left = mouseX + 'px';
      smoke.style.top = (mouseY - 45) + 'px';
      smoke.style.setProperty('--drift-x', (Math.random() * 30 - 15) + 'px');
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 3200);
    }
  } else {
    if (now - lastSmoke > 120) {
      lastSmoke = now;
      const smoke = document.createElement('div');
      smoke.className = 'cursor-smoke';
      smoke.style.left = mouseX + 'px';
      smoke.style.top = (mouseY - 35) + 'px';
      smoke.style.setProperty('--drift-x', (Math.random() * 20 - 10) + 'px');
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2200);
    }

    if (now - lastRing > ringInterval) {
      lastRing = now;
      ringInterval = 2500 + Math.random() * 3000; // cadence: ~2.5–5.5s (slightly slower)

      // Randomly skip some spawns entirely so rings still appear, just less predictably.
      // ~45–70% of eligible ticks are skipped, varying each time for a more random feel.
      if (Math.random() < 0.45 + Math.random() * 0.25) return;

      const ring = document.createElement('div');
      ring.className = 'cursor-smoke-ring';
      ring.style.left = mouseX + 'px';
      const startY = mouseY - 45;
      ring.style.top = startY + 'px';
      ring.style.setProperty('--drift-x', (Math.random() * 10 - 5) + 'px');
      
      const isFast = Math.random() < 0.25;
      
      let duration;
      if (isFast) {
        ring.classList.add('fast-ring');
        duration = 2500 + Math.random() * 1000; 
        
        const trailInterval = setInterval(() => {
          if (!document.body.contains(ring)) {
            clearInterval(trailInterval);
            return;
          }
          const rect = ring.getBoundingClientRect();
          if (rect.width === 0) return;
          
          for (let i = -1; i <= 1; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-smoke ring-trail';
            trail.style.left = (rect.left + rect.width / 2 + (i * rect.width * 0.35)) + 'px';
            trail.style.top = (rect.top + rect.height / 2) + 'px';
            trail.style.setProperty('--drift-x', (Math.random() * 15 - 7.5) + 'px');
            trail.style.setProperty('--stretch-y', (1 + Math.random() * 2) + '');
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1800);
          }
        }, 30);
        
      } else {
        const durations = [8000, 10000, 15000, 20000, 30000];
        duration = durations[Math.floor(Math.random() * durations.length)];
      }
      
      ring.style.setProperty('--duration', duration + 'ms');

      let hitY = -1;
      const shouldIgnoreCeiling = Math.random() < 0.35;
      
      if (!shouldIgnoreCeiling && !isFast) { 
        for (let y = startY - 15; y > 0; y -= 30) {
          const el = document.elementFromPoint(mouseX, y);
          if (el) {
            const ceilingBox = el.closest('.svc, .svc-featured, .service-box, .formcard, .oe-card, header, nav');
            if (ceilingBox) {
              hitY = ceilingBox.getBoundingClientRect().bottom;
              break;
            }
          }
        }
      }

      if (hitY > 0 && hitY < startY) {
        ring.classList.add('hit-ceiling');
        ring.style.setProperty('--hit-y', `-${startY - hitY}px`);
      } else {
        ring.style.setProperty('--hit-y', `-600px`);
      }

      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), duration);
    }
  }
}, 20);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// Global listener for Box Spin effect on click
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.closest) {
    // Find if we clicked a link inside a service box
    const link = target.closest('a');
    if (link) {
      const box = link.closest('.svc, .svc-featured, .dv-bar, .service-box');
      // Verify it's one of the internal resource tabs/links
      if (box && (link.classList.contains('svc-resource') || link.classList.contains('more') || link.classList.contains('qualify-btn') || link.classList.contains('dv-btn'))) {
        e.preventDefault();
        
        // Randomly pick left or right spin direction
        let dir;
        if (box.classList.contains('dv-bar')) {
          dir = Math.random() > 0.5 ? 'spin-forward' : 'spin-backward';
        } else {
          dir = Math.random() > 0.5 ? 'spin-left' : 'spin-right';
        }
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
        }, 750);
      }
    }
  }
});
