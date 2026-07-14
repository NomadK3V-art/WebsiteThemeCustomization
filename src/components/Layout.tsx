import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import React from 'react'

function scrollToGlp() {
  const el = document.getElementById('glp1-featured')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function FeaturedPill() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      // Jump home first, then scroll once the GLP-1 box has mounted.
      navigate('/')
      setTimeout(scrollToGlp, 120)
    } else {
      scrollToGlp()
    }
  }

  return (
    <div className="featured-pill-bar layout-content">
      <a href="/" className="ftag ftag-clone" onClick={handleClick}>
        ★ Featured Program — GLP-1 Weight-Loss
      </a>
    </div>
  )
}

function FallingStars() {
  // Create 30 individual stars
  const stars = Array.from({ length: 30 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 8; // Random start delay
    const type = Math.floor(Math.random() * 5) + 1; // 5 different lifespans/distances
    
    // Randomize duration for speeds (some extremely slow, some normal)
    const baseDuration = 2 + Math.random() * 5; // 2s to 7s
    const isVerySlow = Math.random() > 0.6; // 40% chance to be very slow
    const duration = isVerySlow ? baseDuration * 2.5 : baseDuration; // up to ~17.5 seconds!
    
    // Randomize tail lengths (1x, 2x, 3x, or 4x the base length)
    const lengthMultiplier = Math.floor(Math.random() * 4) + 1;
    const tailHeight = 80 * lengthMultiplier; // 80px, 160px, 240px, or 320px

    return (
      <div 
        key={i} 
        className={`falling-star type-${type}`} 
        style={{ 
          left: `${left}vw`, 
          animationDelay: `${delay}s`, 
          animationDuration: `${duration}s`,
          height: `${tailHeight}px`
        }} 
      />
    );
  });

  return <div className="stars-container">{stars}</div>;
}

export default function Layout() {
  return (
    <div style={{ background: '#05000A', minHeight: '100vh', position: 'relative' }}>
      <FallingStars />
      <div className="layout-content">
        <FeaturedPill />
        <Outlet />
      </div>
    </div>
  )
}
