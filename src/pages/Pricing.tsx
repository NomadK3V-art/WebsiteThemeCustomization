import { Link } from 'react-router-dom'
import { useState } from 'react'

const plans = [
  {
    name: 'IGNITE',
    price: { monthly: 2999, annual: 2499 },
    desc: 'Perfect for startups and small businesses ready to spark their digital presence.',
    features: ['Up to 5 pages', 'Responsive design', 'Basic SEO setup', 'Contact form', '1 month support', 'Performance audit'],
    cta: 'GET STARTED',
    highlight: false,
  },
  {
    name: 'VOLCANIC',
    price: { monthly: 6999, annual: 5999 },
    desc: 'Our most popular plan for growing businesses that demand molten-hot results.',
    features: ['Unlimited pages', 'Custom UI/UX design', 'API integrations', 'CMS setup', '3 months support', 'Analytics dashboard', 'A/B testing', 'Priority delivery'],
    cta: 'MOST POPULAR',
    highlight: true,
  },
  {
    name: 'ERUPTION',
    price: { monthly: 14999, annual: 12999 },
    desc: 'Full-scale enterprise solutions for businesses that refuse to be contained.',
    features: ['Everything in Volcanic', 'Mobile app included', 'Custom AI/ML features', 'Dedicated team', '12 months support', 'SLA guarantee', 'White-glove onboarding', '24/7 monitoring'],
    cta: 'CONTACT US',
    highlight: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">PRICING</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Transparent pricing. No surprises. Just volcanic value.
          </p>
          {/* TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '36px' }}>
            <span style={{ color: annual ? '#8060b0' : '#FFE600',  fontWeight: 700, textShadow: annual ? 'none' : '0 0 8px #FF6000' }}>MONTHLY</span>
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: '56px', height: '28px',
                borderRadius: '9999px',
                background: annual ? 'linear-gradient(135deg, #FF1493, #7B00D4)' : '#1A0040',
                border: '1px solid rgba(255,20,147,0.5)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s' }}
            >
              <span style={{
                position: 'absolute',
                top: '3px',
                left: annual ? '30px' : '3px',
                width: '20px', height: '20px',
                borderRadius: '50%',
                background: '#FFE600',
                boxShadow: '0 0 8px #FF6000',
                transition: 'all 0.3s' }} />
            </button>
            <span style={{ color: annual ? '#FFE600' : '#8060b0',  fontWeight: 700, textShadow: annual ? '0 0 8px #FF6000' : 'none' }}>
              ANNUAL <span style={{  fontSize: '0.8em' }}>SAVE 17%</span>
            </span>
          </div>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', alignItems: 'start' }}>
          {plans.map(p => (
            <div key={p.name} className="service-box" style={{
              padding: '40px',
              borderRadius: '20px',
              border: p.highlight ? '1px solid rgba(255,20,147,0.6)' : '1px solid rgba(180,0,255,0.35)',
              boxShadow: p.highlight ? '0 0 40px rgba(255,20,147,0.2), 0 0 80px rgba(120,0,200,0.15)' : undefined,
              transform: p.highlight ? 'scale(1.03)' : 'none',
              position: 'relative' }}>
              {p.highlight && (
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  padding: '4px 20px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #FF1493, #7B0060)',
                  color: 'var(--ink)',
                  
                  
                  
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  border: '1px solid rgba(255,20,147,0.6)' }}>★ MOST POPULAR ★</div>
              )}
              <div style={{  fontSize: '1.8rem', letterSpacing: '0.1em', marginBottom: '8px' }} className="lava-text-sm">{p.name}</div>
              <div style={{ marginBottom: '12px' }}>
                <span style={{
                  
                  fontSize: '3.5rem',
                  color: 'var(--ink)' }}>${(annual ? p.price.annual : p.price.monthly).toLocaleString()}</span>
                <span style={{   fontSize: '1rem' }}>/mo</span>
              </div>
              <p style={{   fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                {p.features.map(f => (
                  <li key={f} style={{   fontSize: '1rem', fontWeight: 600, padding: '6px 0', display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid rgba(120,0,200,0.1)' }}>
                    <span style={{ color: 'var(--ink)' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="lava-pill" style={{
                display: 'block',
                textAlign: 'center',
                padding: '13px 24px',
                
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textDecoration: 'none' }}>{p.cta}</Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center',   fontSize: '0.95rem', marginTop: '40px' }}>
          Custom projects available. <Link to="/contact" className="lava-link" style={{ fontSize: '0.95rem' }}>Get a custom quote →</Link>
        </p>
      </section>
    </div>
  )
}
