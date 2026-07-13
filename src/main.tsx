import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { getActiveTheme, applyThemeTokens } from './themes'

// Load the currently-active saved design (see src/themes/index.ts to swap
// seasons). Its tokens are written to :root; its palette + engine drive the
// animation below.
const activeTheme = getActiveTheme()
applyThemeTokens(activeTheme)

const colors = activeTheme.palette

// Motion/behavior tuning comes from the active theme (the "how it performs"
// half of the design). Swap seasons in src/themes/index.ts.
const ENGINE = activeTheme.engine;

let currentColorIndex = ENGINE.startColorIndex; // Start at Blue (index 4)
document.body.style.setProperty('--cursor-bg', colors[currentColorIndex].headCore);
document.body.style.setProperty('--cursor-shadow', colors[currentColorIndex].headShadow);
// Text no longer cycles or glows — --ink / --neon-shadow are static readable
// values set in index.css / the theme. Only the cursor still cycles color.

// We will handle the canvas colors purely inside animate() so we can interpolate them!
function parseColor(str) {
  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) hex = hex.split('').map(x => x+x).join('');
    return [parseInt(hex.slice(0,2), 16), parseInt(hex.slice(2,4), 16), parseInt(hex.slice(4,6), 16), 1];
  } else if (str.startsWith('rgba(')) {
    return str.match(/[\d.]+/g).map(Number);
  }
  return [0,0,0,1];
}

function lerpColor(c1, c2, t) {
  const p1 = parseColor(c1);
  const p2 = parseColor(c2);
  const r = Math.round(p1[0] + (p2[0] - p1[0]) * t);
  const g = Math.round(p1[1] + (p2[1] - p1[1]) * t);
  const b = Math.round(p1[2] + (p2[2] - p1[2]) * t);
  const a = p1[3] + (p2[3] - p1[3]) * t;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Track start time to sync colors
const appStartTime = Date.now();
let lastCssIndex = currentColorIndex;



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

// Obstacle Boxes for Bouncing Drops
let obstacleBoxes: any[] = [];
setInterval(() => {
  obstacleBoxes = Array.from(document.querySelectorAll('.svc, .svc-featured, .service-box, .formcard, .oe-card, header, .dv-bar, .why-item, .step, .news-card')).map(el => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom
    };
  });
}, 1000);

let bouncingDrops: any[] = [];
const dropLifespans = ENGINE.drops.lifespans;

// Spawn Bouncing Drops periodically
setInterval(() => {
  // High drop rate: 85% chance every 300ms
  if (Math.random() < ENGINE.drops.spawnChance) {
    bouncingDrops.push({
      x: Math.random() * window.innerWidth,
      y: -50,
      vx: (Math.random() - 0.5) * 6,
      vy: 2 + Math.random() * 5,
      life: dropLifespans[Math.floor(Math.random() * dropLifespans.length)],
      born: Date.now(),
      trail: [],
      settled: false,
      colorIndex: Math.floor(Math.random() * colors.length),
      boxFriction: 0.75 + Math.random() * 0.24 // Ranges from 0.75 (stops fast) to 0.99 (rolls off edge)
    });
  }
}, ENGINE.drops.spawnIntervalMs);


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const now = Date.now();
  
  // Decay velocity if mouse stopped
  if (now - lastTime > 20) {
    // Slower decay (0.95 instead of 0.85) makes the tail last longer
    velocityX *= ENGINE.cursor.velocityDecay;
    velocityY *= ENGINE.cursor.velocityDecay;
  }

  // Calculate target length based on speed
  let speed = Math.sqrt(velocityX*velocityX + velocityY*velocityY);
  let targetLength = speed * ENGINE.cursor.trailSpeedScale;
  if (targetLength > ENGINE.cursor.maxTrailLength) targetLength = ENGINE.cursor.maxTrailLength; // Super long trail
  
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

    // Determine active colors based on 10s cycle
    const nowMs = Date.now();
    const elapsed = nowMs - appStartTime;
    const cycleDuration = ENGINE.cycleDuration;
    const currentCycle = Math.floor(elapsed / cycleDuration);

    const baseIndex = (ENGINE.startColorIndex + currentCycle) % colors.length;
    const nextIndex = (baseIndex + 1) % colors.length;
    
    const phase = elapsed % cycleDuration;
    let fadeFactor = 0;
    
    // Start crossfade at 9000ms (last 1 second of the cycle)
    if (phase > ENGINE.crossfadeStart) {
      fadeFactor = (phase - ENGINE.crossfadeStart) / (cycleDuration - ENGINE.crossfadeStart);
      
      // Trigger CSS transition if we haven't already for this crossfade
      if (lastCssIndex !== nextIndex) {
        lastCssIndex = nextIndex;
        document.body.style.setProperty('--cursor-bg', colors[nextIndex].headCore);
        document.body.style.setProperty('--cursor-shadow', colors[nextIndex].headShadow);
      }
    }
    
    // Text color no longer cycles — headings stay a static readable color.

    const c1 = colors[baseIndex];
    const c2 = colors[nextIndex];
    
    const currentTailStart = lerpColor(c1.tailStart, c2.tailStart, fadeFactor);
    const currentMid = lerpColor(c1.mid, c2.mid, fadeFactor);
    const currentCoreRgba = lerpColor(c1.coreRgba, c2.coreRgba, fadeFactor);
    const currentShadowOuter = lerpColor(c1.shadowOuter, c2.shadowOuter, fadeFactor);
    const currentShadowInner = lerpColor(c1.shadowInner, c2.shadowInner, fadeFactor);

    // Gradient that is transparent at the tail-end and solid color at the cursor
    const gradient = ctx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length - 1].x, trail[trail.length - 1].y);
    gradient.addColorStop(0, currentTailStart);
    gradient.addColorStop(0.5, currentMid);
    gradient.addColorStop(1, currentCoreRgba);

    // Wide outer color glow
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.shadowColor = currentShadowOuter; 
    ctx.shadowBlur = 18;
    ctx.stroke();
    
    // Intense color core
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(trail[i].x, trail[i].y);
    }
    ctx.lineWidth = 3;
    ctx.shadowBlur = 8;
    ctx.shadowColor = currentShadowInner;
    
    const coreGradient = ctx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length - 1].x, trail[trail.length - 1].y);
    coreGradient.addColorStop(0, currentTailStart);
    coreGradient.addColorStop(1, currentCoreRgba);
    ctx.strokeStyle = coreGradient;
    ctx.stroke();
  }


  // --- Bouncing Drops Logic ---
  const gravity = ENGINE.drops.gravity;
  const bounceLoss = ENGINE.drops.bounceLoss;
  
  for (let i = bouncingDrops.length - 1; i >= 0; i--) {
    const d = bouncingDrops[i];
    const age = now - d.born;
    
    if (age > d.life) {
      bouncingDrops.splice(i, 1);
      continue;
    }
    
    const lastY = d.y;
    
    // Always apply gravity and velocity unless completely settled
    if (!d.settled) {
      d.vy += gravity;
      d.x += d.vx;
      d.y += d.vy;
      
      // Wall bounce
      if (d.x < 0) { d.x = 0; d.vx *= -bounceLoss; }
      if (d.x > canvas.width) { d.x = canvas.width; d.vx *= -bounceLoss; }
      
      let onSurface = false;
      
      // Box tops bounce & roll
      for (const box of obstacleBoxes) {
        // Allow the drop to roll off the edge:
        if (d.x > box.left && d.x < box.right) {
          // If falling and crosses top edge, or resting on it
          if (lastY <= box.top + 2 && d.y >= box.top) {
            d.y = box.top;
            if (d.vy > 0) d.vy *= -bounceLoss;
            
            d.vx *= d.boxFriction; // Uses individual drop friction so some roll off, some settle
            
            if (Math.abs(d.vy) < 0.8) {
              d.vy = 0;
              onSurface = true;
            }
            break;
          }
        }
      }
      
      // Floor bounce
      if (!onSurface && d.y > canvas.height - 2) {
        d.y = canvas.height - 2;
        if (d.vy > 0) d.vy *= -bounceLoss;
        d.vx *= ENGINE.drops.groundFriction; // Heavier ground friction
        
        if (Math.abs(d.vy) < 0.8) {
          d.vy = 0;
          onSurface = true;
        }
      }
      
      // If it's on a surface and moving very slowly horizontally, it settles.
      // If it has enough vx, it keeps moving (rolling) until it falls off!
      if (onSurface && Math.abs(d.vx) < 0.2) {
        d.vx = 0;
        d.settled = true;
      }
    }
    
    // Trail tracking
    if (d.trail.length === 0 || d.trail[d.trail.length-1].x !== d.x || d.trail[d.trail.length-1].y !== d.y) {
      d.trail.push({x: d.x, y: d.y});
    }
    
    // Calculate speed for tail length
    const dSpeed = Math.sqrt(d.vx*d.vx + d.vy*d.vy);
    let dTargetLength = dSpeed * ENGINE.drops.trailSpeedScale; // Longer tail, more like cursor
    if (dTargetLength > ENGINE.drops.maxTrailLength) dTargetLength = ENGINE.drops.maxTrailLength;
    if (d.settled) dTargetLength = 0; // shrink tail when settled
    
    let dCurrentLength = 0;
    for (let j = d.trail.length - 1; j > 0; j--) {
      const dx = d.trail[j].x - d.trail[j-1].x;
      const dy = d.trail[j].y - d.trail[j-1].y;
      dCurrentLength += Math.sqrt(dx*dx + dy*dy);
      if (dCurrentLength > dTargetLength) {
        d.trail.splice(0, j);
        break;
      }
    }
    
    if (d.trail.length > 1) {
      d.trail.shift();
    }
    
    // Fade out near end of life
    let opacity = 1;
    if (d.life - age < 1000) {
      opacity = (d.life - age) / 1000;
    }
    
    // Draw drop trail
    if (d.trail.length > 1) {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(d.trail[0].x, d.trail[0].y);
      for (let j = 1; j < d.trail.length; j++) {
        ctx.lineTo(d.trail[j].x, d.trail[j].y);
      }
      
      const gradient = ctx.createLinearGradient(d.trail[0].x, d.trail[0].y, d.trail[d.trail.length-1].x, d.trail[d.trail.length-1].y);
      const c = colors[d.colorIndex];
      gradient.addColorStop(0, c.tailStart);
      gradient.addColorStop(1, c.coreRgba.replace('1)', `${opacity * 0.8})`));
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.shadowColor = c.shadowOuter;
      ctx.shadowBlur = 8;
      ctx.stroke();
    }
    
    // Draw drop head
    if (opacity > 0) {
      const c = colors[d.colorIndex];
      ctx.beginPath();
      ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = c.coreRgba.replace('1)', `${opacity})`);
      ctx.shadowColor = c.shadowInner;
      ctx.shadowBlur = 8;
      ctx.fill();
    }
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
