import { Link } from 'react-router-dom'

const cases = [
  {
    client: 'NovaPay Finance',
    industry: 'FinTech',
    headline: 'From Startup to $2B Payment Volume in 18 Months',
    challenge: 'NovaPay needed a payment processing platform that could handle explosive growth without downtime, while maintaining strict PCI-DSS compliance.',
    solution: 'We architected a microservices platform on AWS with real-time fraud detection, horizontal auto-scaling, and a React-powered merchant dashboard.',
    results: ['+340% transaction speed', '$2B+ annual volume', '99.999% uptime', 'PCI-DSS Level 1 certified'],
    
  },
  {
    client: 'DarkMatter AI',
    industry: 'SaaS / AI',
    headline: '47% Churn Reduction Through Predictive Intelligence',
    challenge: 'A SaaS company losing 12% of their customer base monthly needed to understand why — and stop the bleeding fast.',
    solution: 'We built a custom ML pipeline that ingested 200+ behavioral signals, trained a churn prediction model, and integrated alerts into their CRM workflow.',
    results: ['47% churn reduction', '3.2x LTV improvement', 'ROI in 4 months', '94% model accuracy'],
    
  },
  {
    client: 'HelixHealth',
    industry: 'HealthTech',
    headline: 'Telehealth Platform Serving 150,000 Patients',
    challenge: 'A healthcare network needed a HIPAA-compliant telehealth system that could onboard patients quickly and support video consultations at scale.',
    solution: 'Full-stack Next.js platform with WebRTC video, EHR integration, automated scheduling, and end-to-end encryption throughout.',
    results: ['150K+ active patients', '4.8★ patient rating', 'HIPAA certified', '62% faster onboarding'],
    
  },
]

export default function CaseStudies() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">CASE STUDIES</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Real challenges. Real solutions. Real results. Here is how we ignited transformation.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {cases.map(c => (
            <div key={c.client} className="service-box" style={{ padding: '48px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${c.color}, transparent)`, boxShadow: `0 0 15px ${c.color}` }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                <div>
                  <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '9999px', background: `${c.color}22`, border: `1px solid ${c.color}66`, color: c.color,  fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '12px' }}>{c.industry}</div>
                  <h3 style={{  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.05em', marginBottom: '16px' }} className="lava-text-sm">{c.headline}</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--ink)',    fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '8px' }}>THE CHALLENGE</h4>
                    <p style={{   fontSize: '1rem', lineHeight: 1.6 }}>{c.challenge}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--ink)',    fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '8px' }}>OUR SOLUTION</h4>
                    <p style={{   fontSize: '1rem', lineHeight: 1.6 }}>{c.solution}</p>
                  </div>
                </div>
                <div>
                  <h4 style={{ color: 'var(--ink)',    fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '20px' }}>RESULTS</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {c.results.map(r => (
                      <div key={r} style={{ padding: '16px', borderRadius: '12px', background: `${c.color}11`, border: `1px solid ${c.color}33`, textAlign: 'center' }}>
                        <div style={{  fontSize: '1.2rem', color: 'var(--ink)' }}>{r}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '28px' }}>
                    <Link to="/contact" className="lava-pill" style={{ padding: '11px 24px',  fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textDecoration: 'none' }}>START YOUR PROJECT</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
