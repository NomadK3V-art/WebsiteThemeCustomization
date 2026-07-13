import { useState } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  { id: 1, title: 'NovaPay Finance', category: 'Web App', tags: ['React', 'Node.js', 'AWS'], desc: 'Real-time payment processing platform handling $2B+ in annual transactions with sub-100ms response times.',  },
  { id: 2, title: 'DarkMatter AI', category: 'AI / ML', tags: ['Python', 'TensorFlow', 'GCP'], desc: 'Predictive analytics engine that reduced customer churn by 47% for a SaaS unicorn.',  },
  { id: 3, title: 'VortexMobile', category: 'Mobile', tags: ['React Native', 'Firebase'], desc: 'Social fitness app with 2M+ downloads and 4.9★ App Store rating.',  },
  { id: 4, title: 'CryptoForge DEX', category: 'Web3', tags: ['Solidity', 'React', 'Web3.js'], desc: 'Decentralized exchange with $500M+ TVL, audited and battle-tested in DeFi.',  },
  { id: 5, title: 'HelixHealth Platform', category: 'Web App', tags: ['Next.js', 'PostgreSQL', 'HIPAA'], desc: 'HIPAA-compliant telehealth platform serving 150,000 patients across 12 states.',  },
  { id: 6, title: 'StormCloud CDN', category: 'Infrastructure', tags: ['Kubernetes', 'Terraform', 'AWS'], desc: 'Global CDN infrastructure delivering content to 50M+ users with 99.99% uptime.',  },
]

const categories = ['All', 'Web App', 'Mobile', 'AI / ML', 'Web3', 'Infrastructure']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">OUR WORK</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Projects forged in the heat of ambition. Real results for real clients.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {/* FILTER PILLS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '8px 22px',
                  
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  borderRadius: '9999px',
                  border: 'none',
                  color: 'var(--ink)',
                  textShadow: 'none',
                  background: active === cat
                    ? 'linear-gradient(135deg, #FF3399 0%, #7B0060 60%, #1A0040 100%)'
                    : 'linear-gradient(135deg, #FF1493 0%, #5B0045 60%, #0D0025 100%)',
                  boxShadow: active === cat ? '0 0 16px rgba(255,20,147,0.45)' : 'none',
                  transition: 'all 0.25s ease' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PROJECTS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '28px' }}>
            {filtered.map(p => (
              <div key={p.id} className="service-box" style={{ padding: '36px', borderRadius: '18px', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                  boxShadow: `0 0 12px ${p.color}` }} />
                <div style={{
                  display: 'inline-block',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  background: `${p.color}22`,
                  border: `1px solid ${p.color}66`,
                  color: p.color,
                  
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  marginBottom: '16px' }}>{p.category}</div>
                <h3 style={{  fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '12px' }} className="lava-text-sm">{p.title}</h3>
                <p style={{   fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '20px' }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '3px 12px',
                      borderRadius: '9999px',
                      background: 'rgba(120,0,200,0.2)',
                      border: '1px solid rgba(180,0,255,0.3)',
                      
                      
                      fontSize: '0.85rem',
                      fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/case-studies" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>
              READ CASE STUDIES
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
