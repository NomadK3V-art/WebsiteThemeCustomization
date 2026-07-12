import { Link } from 'react-router-dom'

const partners = [
  { name: 'Amazon Web Services', tier: 'Premier Partner', desc: 'AWS Premier Tier Services Partner with certifications across all major service categories.', icon: '☁️',  },
  { name: 'Google Cloud', tier: 'Premier Partner', desc: 'Google Cloud Premier Partner specializing in AI/ML, data, and infrastructure at scale.', icon: '🌐',  },
  { name: 'Microsoft Azure', tier: 'Gold Partner', desc: 'Azure Gold Partner with advanced specializations in DevOps and application development.', icon: '💻',  },
  { name: 'Vercel', tier: 'Agency Partner', desc: 'Vercel Agency Partner — certified experts in Next.js deployment and edge computing.', icon: '▲',  },
  { name: 'Stripe', tier: 'Technology Partner', desc: 'Stripe Technology Partner specializing in complex payment integrations and platform builds.', icon: '💳',  },
  { name: 'Supabase', tier: 'Technology Partner', desc: 'Supabase certified partner with proven expertise in backend-as-a-service architecture.', icon: '🔐',  },
]

const benefits = [
  { icon: '🤝', title: 'Revenue Share', desc: 'Earn competitive referral commissions on every client you send our way.' },
  { icon: '🎓', title: 'Co-Marketing', desc: 'Joint case studies, webinars, and content that elevate both brands.' },
  { icon: '⚡', title: 'Priority Access', desc: 'First access to new services, beta programs, and our partner community.' },
  { icon: '📈', title: 'Deal Registration', desc: 'Protect your pipeline with deal registration and territory exclusivity.' },
]

export default function Partners() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">PARTNERS</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            We build with the best and partner with leaders who share our obsession with excellence.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      {/* TECH PARTNERS */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{  fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', marginBottom: '48px', textAlign: 'center' }} className="lava-text">TECHNOLOGY PARTNERS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {partners.map(p => (
              <div key={p.name} className="service-box" style={{ padding: '32px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${p.color}, transparent)`, boxShadow: `0 0 10px ${p.color}` }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{p.icon}</div>
                <h3 style={{  fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: '6px' }} className="lava-text-sm">{p.name}</h3>
                <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '9999px', background: `${p.color}22`, border: `1px solid ${p.color}55`, color: p.color,  fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '12px' }}>{p.tier}</div>
                <p style={{   fontSize: '0.95rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* BECOME A PARTNER */}
          <div style={{
            borderRadius: '24px',
            padding: '64px 40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0D0025 0%, #1A0045 50%, #0D0025 100%)',
            border: '1px solid rgba(255,20,147,0.3)',
            boxShadow: '0 0 60px rgba(120,0,200,0.15)' }}>
            <h2 style={{  fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', marginBottom: '24px' }} className="lava-text">BECOME A PARTNER</h2>
            <p style={{   fontSize: '1.1rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 36px' }}>
              Join our partner network and unlock mutual growth opportunities. We are selective — we only partner with the best.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto 40px' }}>
              {benefits.map(b => (
                <div key={b.title} style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{b.icon}</div>
                  <div style={{  fontWeight: 700, fontSize: '1rem', color: 'var(--ink)',   marginBottom: '6px' }}>{b.title}</div>
                  <div style={{   fontSize: '0.9rem' }}>{b.desc}</div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="lava-pill" style={{ padding: '14px 40px',  fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>APPLY TO PARTNER</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
