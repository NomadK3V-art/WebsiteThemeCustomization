import { Link } from 'react-router-dom'

const team = [
  { name: 'Vera Ashton', role: 'CEO & Co-Founder', dept: 'Leadership', bio: 'Former CTO at Stripe. 18 years building products at scale. Obsessed with the intersection of craft and commerce.', initials: 'VA',  },
  { name: 'Marcus Okafor', role: 'CTO & Co-Founder', dept: 'Engineering', bio: 'Ex-Google engineer. Built systems handling 10M+ RPS. Believes great architecture is invisible.', initials: 'MO',  },
  { name: 'Zoe Castellano', role: 'Head of Design', dept: 'Design', bio: 'Award-winning product designer with work featured in Awwwards, FWA, and CSS Design Awards.', initials: 'ZC',  },
  { name: 'Rajan Mehta', role: 'VP of Engineering', dept: 'Engineering', bio: 'Led engineering teams at Meta and Airbnb. Expert in distributed systems and developer experience.', initials: 'RM',  },
  { name: 'Luna Park', role: 'Head of AI/ML', dept: 'Engineering', bio: 'PhD in Machine Learning from MIT. Published researcher, now applying ML to real-world product challenges.', initials: 'LP',  },
  { name: 'Devon Cruz', role: 'Head of Product', dept: 'Product', bio: '12 years of product leadership. Launched 3 products that reached $100M ARR. Obsessed with user psychology.', initials: 'DC',  },
  { name: 'Aisha Winters', role: 'Lead Security Engineer', dept: 'Security', bio: 'Former NSA analyst. CISSP certified. Has uncovered critical vulnerabilities in Fortune 500 systems.', initials: 'AW',  },
  { name: 'Theo Nakamura', role: 'Principal Architect', dept: 'Engineering', bio: 'Cloud architecture savant. Designed infrastructure for apps serving 200M+ users globally.', initials: 'TN',  },
]

export default function Team() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">THE TEAM</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            80+ extraordinary minds forging the future of technology. Meet the leadership driving SvelteRX.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {team.map(member => (
            <div key={member.name} className="service-box" style={{ padding: '36px', borderRadius: '18px', textAlign: 'center' }}>
              {/* AVATAR */}
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${member.color} 0%, #7B2CBF 100%)`,
                border: `2px solid ${member.color}80`,
                boxShadow: `0 0 20px ${member.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                
                fontSize: '1.5rem',
                color: 'var(--ink)' }}>{member.initials}</div>
              <h3 style={{  fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: '6px' }} className="lava-text-sm">{member.name}</h3>
              <div style={{
                display: 'inline-block',
                padding: '3px 14px',
                borderRadius: '9999px',
                background: `${member.color}22`,
                border: `1px solid ${member.color}66`,
                color: member.color,
                
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                marginBottom: '16px' }}>{member.role}</div>
              <p style={{   fontSize: '1rem', lineHeight: 1.6 }}>{member.bio}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{   fontSize: '1.1rem', marginBottom: '24px' }}>Want to join this team?</p>
          <Link to="/careers" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>VIEW OPEN ROLES</Link>
        </div>
      </section>
    </div>
  )
}
