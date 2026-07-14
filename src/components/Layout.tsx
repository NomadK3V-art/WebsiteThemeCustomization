import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import React from 'react'

function scrollToGlp() {
  const el = document.getElementById('glp1-featured')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const PILL_TEXT = '★ Featured Program — GLP-1 Weight-Loss'

const LIFESPANS = [1, 2, 5] // seconds

// Schedule the occasional, colour-alternating re-flickers for a set of letter
// spans. `flip` alternates the scheme every burst: false = flicker aqua then
// settle pink, true = flicker pink then settle aqua. The completed animation
// holds its final frame (fill: both) so the settled colour persists through the
// gap until the next, opposite burst. Returns nothing; pushes its timers so the
// caller can clear them on cleanup.
function scheduleFlicker(spans: HTMLElement[], timers: number[]) {
  const scheduleLetter = (el: HTMLElement, flip: boolean) => {
    // Occasional: wait 4–14s between bursts on any given letter.
    const gap = 4000 + Math.random() * 10000
    const t = window.setTimeout(() => {
      const life = LIFESPANS[Math.floor(Math.random() * LIFESPANS.length)]
      const colorAnim = flip ? 'gpill-pink-to-aqua' : 'gpill-aqua-to-pink'
      el.style.animation = 'none'
      void el.offsetWidth // force reflow so the animation re-triggers
      el.style.animation =
        `pill-flick-in ${life}s steps(1, end) 1 both, ` +
        `${colorAnim} ${life}s ease-out 1 both`
      const done = window.setTimeout(() => {
        scheduleLetter(el, !flip) // next burst uses the opposite colour
      }, life * 1000)
      timers.push(done)
    }, gap)
    timers.push(t)
  }

  // Start scheduling after the 2s intro flicker (aqua→pink) has finished, so the
  // first re-flicker is its opposite (pink→aqua).
  const kickoff = window.setTimeout(() => {
    spans.forEach((el) => scheduleLetter(el, true))
  }, 2000)
  timers.push(kickoff)
}

// Replace a pill's plain text with per-letter ".pill-flick" spans (which pick up
// the CSS "flicker to life" intro automatically). Returns the non-space spans.
function splitIntoFlickerLetters(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  // Letters live in a single wrapper span so pills that are flex containers
  // (e.g. .btn has gap:8px) treat the whole word as one flex item and don't
  // space the letters apart.
  const wrap = document.createElement('span')
  el.appendChild(wrap)
  const spans: HTMLElement[] = []
  for (const ch of Array.from(text)) {
    const s = document.createElement('span')
    s.className = 'pill-flick'
    s.textContent = ch === ' ' ? ' ' : ch
    wrap.appendChild(s)
    if (ch.trim() !== '') spans.push(s)
  }
  return spans
}

// Only pills that explicitly opt in by adding the "flicker-pill" class get the
// top-pill flicker. (Nothing is matched by generic button classes — flicker is
// applied deliberately, tab by tab.)
const PILL_SELECTOR = '.flicker-pill'

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

  const letters = React.useMemo(() => Array.from(PILL_TEXT), [])
  const pillRef = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    const pill = pillRef.current
    if (!pill) return
    const spans = Array.from(
      pill.querySelectorAll<HTMLSpanElement>('.pill-flick')
    ).filter((s) => (s.textContent ?? '').trim() !== '')
    const timers: number[] = []
    scheduleFlicker(spans, timers)
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  return (
    <div className="featured-pill-bar layout-content">
      <a href="/" className="ftag ftag-clone" onClick={handleClick} ref={pillRef}>
        {letters.map((ch, i) => (
          <span key={i} className="pill-flick">
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
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

// Applies the top-pill flicker to every other pill box on the current page.
// Re-runs on each route change so all 16 pages are covered as they mount.
function usePillFlicker() {
  const location = useLocation()
  React.useEffect(() => {
    const timers: number[] = []
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(PILL_SELECTOR)
    ).filter(
      (el) =>
        el.children.length === 0 && // plain-text pills only (no nested markup)
        (el.textContent ?? '').trim() !== '' &&
        el.dataset.flicker !== '1'
    )
    els.forEach((el) => {
      el.dataset.flicker = '1'
      const spans = splitIntoFlickerLetters(el)
      scheduleFlicker(spans, timers)
    })
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [location.pathname])
}

export default function Layout() {
  usePillFlicker()
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
