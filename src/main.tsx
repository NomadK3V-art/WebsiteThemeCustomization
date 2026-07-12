import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

let mouseX = -100;
let mouseY = -100;
let lastX = -100;
let lastY = -100;
let lastTime = Date.now();
let velocityX = 0;
let velocityY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  const now = Date.now();
  const dt = Math.max(now - lastTime, 1);
  if (lastX >= 0) {
    velocityX = (mouseX - lastX) / dt;
    velocityY = (mouseY - lastY) / dt;
  }
  lastX = mouseX;
  lastY = mouseY;
  lastTime = now;

  document.body.style.setProperty('--cursor-x', `${mouseX}px`);
  document.body.style.setProperty('--cursor-y', `${mouseY}px`);
});

// Setup Canvas for trail
const canvas = document.createElement('canvas');
canvas.id = 'cursor-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d')!;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let trail: {x: number, y: number}[] = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const now = Date.now();
  
  // Decay velocity if mouse stopped
  if (now - lastTime > 20) {
    velocityX *= 0.85;
    velocityY *= 0.85;
  }

  // Calculate target length based on speed
  let speed = Math.sqrt(velocityX*velocityX + velocityY*velocityY);
  let targetLength = speed * 320; 
  if (targetLength > 1400) targetLength = 1400; // Max ~14 inches (quadruple original length)
  
  // Constantly add current mouse position so the head is always attached
  if (mouseX >= 0 && mouseY >= 0) {
    // Only add if it moved to prevent infinite stacking at 0 speed
    if (trail.length === 0 || trail[trail.length-1].x !== mouseX || trail[trail.length-1].y !== mouseY) {
      trail.push({x: mouseX, y: mouseY});
    }
  }

  // Trim the trail to the exact targetLength
  let currentLength = 0;
  for (let i = trail.length - 1; i > 0; i--) {
    const dx = trail[i].x - trail[i-1].x;
    const dy = trail[i].y - trail[i-1].y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    currentLength += dist;
    
    if (currentLength > targetLength) {
      // We exceeded the allowed length. Cut off the older points.
      trail.splice(0, i);
      break;
    }
  }

  if (document.body.classList.contains('navigating')) {
    trail = []; 
  }

  if (trail.length > 1 && targetLength > 2) {
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.moveTo(trail[0].x, trail[0].y);
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(trail[i].x, trail[i].y);
    }

    // Gradient that is transparent at the tail-end and solid bright blue at the cursor
    const gradient = ctx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length - 1].x, trail[trail.length - 1].y);
    gradient.addColorStop(0, 'rgba(0, 200, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 255, 240, 0.6)');
    gradient.addColorStop(1, 'rgba(192, 255, 240, 1)'); // Matches the --ink color of the words

    // Wide outer bright blue glow
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.shadowColor = '#00BFFF'; // Deep neon blue shadow
    ctx.shadowBlur = 18;
    ctx.stroke();
    
    // Intense bright blue/aqua core (no more white core)
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(trail[i].x, trail[i].y);
    }
    ctx.lineWidth = 3;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00FFFF';
    
    const coreGradient = ctx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length - 1].x, trail[trail.length - 1].y);
    coreGradient.addColorStop(0, 'rgba(192, 255, 240, 0)');
    coreGradient.addColorStop(1, 'rgba(192, 255, 240, 1)');
    ctx.strokeStyle = coreGradient;
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

animate();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target && target.closest) {
    const link = target.closest('a');
    if (link) {
      const box = link.closest('.svc, .svc-featured, .dv-bar, .service-box');
      if (box && (link.classList.contains('svc-resource') || link.classList.contains('more') || link.classList.contains('qualify-btn') || link.classList.contains('dv-btn'))) {
        e.preventDefault();
        let dir;
        if (box.classList.contains('dv-bar')) {
          dir = Math.random() > 0.5 ? 'spin-forward' : 'spin-backward';
        } else {
          dir = Math.random() > 0.5 ? 'spin-left' : 'spin-right';
        }
        box.classList.add(dir);
        document.body.classList.add('navigating');
        setTimeout(() => {
          if (link.target === '_blank') {
            window.open(link.href, '_blank');
          } else {
            window.location.href = link.href;
          }
          setTimeout(() => {
            box.classList.remove(dir);
            document.body.classList.remove('navigating');
          }, 500);
        }, 750);
      }
    }
  }
});
