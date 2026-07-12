import { Outlet, useNavigate, useLocation } from 'react-router-dom'

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
    <div className="featured-pill-bar">
      <a href="/" className="ftag ftag-clone" onClick={handleClick}>
        ★ Featured Program — GLP-1 Weight-Loss
      </a>
    </div>
  )
}

export default function Layout() {
  return (
    <div style={{ background: '#05000A', minHeight: '100vh' }}>
      <FeaturedPill />
      <Outlet />
    </div>
  )
}
