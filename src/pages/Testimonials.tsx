import { Link } from 'react-router-dom'

const testimonials = [
  { name: 'Sarah Chen', role: 'CEO, NovaPay Finance', quote: 'SvelteRX did not just build our platform — they built our competitive moat. The engineering quality and speed of delivery were unlike anything we have experienced. Three years later, that infrastructure is still serving us flawlessly.', rating: 5,  },
  { name: 'James Oduya', role: 'CTO, DarkMatter AI', quote: 'The ML team at SvelteRX genuinely understood our business problem, not just the technical brief. The churn prediction model they delivered changed the trajectory of our company. Worth every dollar and then some.', rating: 5,  },
  { name: 'Dr. Priya Nair', role: 'Founder, HelixHealth', quote: 'Building in healthcare means every detail matters — compliance, security, UX. SvelteRX nailed all three while shipping faster than any agency we had worked with. Our patients love the platform.', rating: 5,  },
  { name: 'Marcus Webb', role: 'VP Engineering, StormCloud', quote: 'I have worked with dozens of agencies. SvelteRX is in a different category — they think like product engineers, not contractors. They push back when they see a better path. That is rare and valuable.', rating: 5,  },
  { name: 'Aiko Tanaka', role: 'Head of Product, VortexMobile', quote: 'The mobile app they built for us won an Apple Design Award. It took 4 months. Every detail was thoughtful — the micro-interactions, the performance, the onboarding. Our 2M users feel it every day.', rating: 5,  },
  { name: 'Carlos Reyes', role: 'Founder, CryptoForge', quote: 'Security is non-negotiable in DeFi. SvelteRX"s smart contract work was formally audited and passed without a single critical finding. In a space where one bug costs millions, that is everything.', rating: 5,  },
]

export default function Testimonials() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">TESTIMONIALS</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Don"t take our word for it. Hear from the clients who lived the eruption.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      {/* AGGREGATE SCORE */}
      <section style={{ padding: '50px 24px', background: 'rgba(123,44,191,0.15)', textAlign: 'center' }}>
        <div style={{  fontSize: '5rem', color: 'var(--ink)' }}>4.9 / 5</div>
        <div style={{  fontSize: '2rem', marginBottom: '8px' }}>★★★★★</div>
        <div style={{   fontSize: '1rem', letterSpacing: '0.1em' }}>ACROSS 150+ PROJECTS</div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {testimonials.map(t => (
            <div key={t.name} className="service-box" style={{ padding: '40px', borderRadius: '18px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${t.color}, transparent)`, boxShadow: `0 0 10px ${t.color}` }} />
              <div style={{ color: 'var(--ink)',  fontSize: '1.3rem', marginBottom: '16px', letterSpacing: '2px' }}>{'★'.repeat(t.rating)}</div>
              <p style={{
                
                
                fontSize: '1.05rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '24px' }}>"{t.quote}"</p>
              <div style={{ borderTop: '1px solid rgba(120,0,200,0.2)', paddingTop: '16px' }}>
                <div style={{  fontSize: '1.2rem', letterSpacing: '0.05em' }} className="lava-text-sm">{t.name}</div>
                <div style={{ color: t.color,  fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/contact" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>START YOUR SUCCESS STORY</Link>
        </div>
      </section>
    </div>
  )
}
