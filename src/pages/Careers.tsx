import { Link } from 'react-router-dom'

const roles = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote / SF', level: 'Senior' },
  { title: 'Lead UI/UX Designer', dept: 'Design', type: 'Full-time', location: 'Remote / NYC', level: 'Lead' },
  { title: 'ML Engineer — LLM Systems', dept: 'AI / ML', type: 'Full-time', location: 'Remote', level: 'Mid–Senior' },
  { title: 'DevOps / Platform Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote', level: 'Senior' },
  { title: 'Product Manager', dept: 'Product', type: 'Full-time', location: 'SF / Remote', level: 'Senior' },
  { title: 'iOS Developer (Swift)', dept: 'Mobile', type: 'Full-time', location: 'Remote', level: 'Mid' },
  { title: 'Security Engineer', dept: 'Security', type: 'Full-time', location: 'Remote / DC', level: 'Senior' },
  { title: 'Blockchain Engineer (Solidity)', dept: 'Web3', type: 'Contract', location: 'Remote', level: 'Mid–Senior' },
]

const perks = [
  { icon: '🌍', title: 'Remote-First', desc: 'Work from anywhere. We mean it — our team spans 18 countries.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Top-of-market salaries plus equity in a profitable, growing company.' },
  { icon: '🏥', title: 'Full Benefits', desc: 'Comprehensive health, dental, vision, and mental health coverage.' },
  { icon: '📚', title: 'Learning Budget', desc: '$3,000/year for conferences, courses, and professional development.' },
  { icon: '🏖️', title: 'Unlimited PTO', desc: 'We trust our team. Take the time you need to recharge and do great work.' },
  { icon: '⚡', title: 'Tech Stipend', desc: '$2,500 equipment budget plus $100/month for home office expenses.' },
]

export default function Careers() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">CAREERS</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Join a team of extraordinary builders. We are always looking for brilliant, passionate people who want to forge the future.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      {/* PERKS */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{  fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', marginBottom: '48px', textAlign: 'center' }} className="lava-text">WHY SVELTERX?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '80px' }}>
            {perks.map(p => (
              <div key={p.title} className="service-box" style={{ padding: '28px', borderRadius: '14px', display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h4 style={{  fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)',   marginBottom: '6px' }}>{p.title}</h4>
                  <p style={{   fontSize: '0.95rem', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* OPEN ROLES */}
          <h2 style={{  fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', marginBottom: '36px', textAlign: 'center' }} className="lava-text">OPEN ROLES</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {roles.map(role => (
              <div key={role.title} className="service-box" style={{ padding: '24px 28px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{  fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: '6px' }} className="lava-text-sm">{role.title}</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[role.dept, role.type, role.location, role.level].map(tag => (
                      <span key={tag} style={{ padding: '2px 12px', borderRadius: '9999px', background: 'rgba(120,0,200,0.2)', border: '1px solid rgba(180,0,255,0.3)',   fontSize: '0.8rem', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <Link to="/contact" className="lava-pill" style={{ padding: '10px 24px',  fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textDecoration: 'none', flexShrink: 0 }}>APPLY NOW</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
