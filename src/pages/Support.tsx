import { Link } from 'react-router-dom'
import { useState } from 'react'

const plans = [
  { name: 'ESSENTIAL', price: '$999/mo', response: '48 hours', hours: '4 hrs dev/month', monitoring: 'Basic',  },
  { name: 'PROFESSIONAL', price: '$2,499/mo', response: '8 hours', hours: '12 hrs dev/month', monitoring: 'Advanced',  },
  { name: 'ENTERPRISE', price: 'Custom', response: '1 hour', hours: 'Dedicated team', monitoring: '24/7 NOC',  },
]

export default function Support() {
  const [ticket, setTicket] = useState({ email: '', subject: '', priority: 'medium', desc: '' })
  const [sent, setSent] = useState(false)

  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">SUPPORT</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            We do not disappear after launch. Our support team has your back, 24/7.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      {/* SUPPORT PLANS */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{  fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', marginBottom: '48px', textAlign: 'center' }} className="lava-text">SUPPORT PLANS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {plans.map(p => (
              <div key={p.name} className="service-box" style={{ padding: '36px', borderRadius: '18px', border: `1px solid ${p.color}55` }}>
                <div style={{  fontSize: '1.8rem', letterSpacing: '0.1em', marginBottom: '8px' }} className="lava-text-sm">{p.name}</div>
                <div style={{  fontSize: '2.5rem', color: 'var(--ink)',   marginBottom: '24px' }}>{p.price}</div>
                {[
                  ['Response SLA', p.response],
                  ['Dev Time', p.hours],
                  ['Monitoring', p.monitoring],
                  ['Security Patches', 'Included'],
                  ['Monthly Reports', 'Included'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(120,0,200,0.15)' }}>
                    <span style={{   fontSize: '0.95rem' }}>{label}</span>
                    <span style={{   fontSize: '0.95rem', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
                <Link to="/contact" className="lava-pill" style={{ display: 'block', textAlign: 'center', marginTop: '24px', padding: '11px 24px',  fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textDecoration: 'none' }}>GET STARTED</Link>
              </div>
            ))}
          </div>

          {/* TICKET FORM */}
          <h2 style={{  fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', marginBottom: '36px', textAlign: 'center' }} className="lava-text">SUBMIT A TICKET</h2>
          <div className="service-box" style={{ maxWidth: '700px', margin: '0 auto', padding: '40px', borderRadius: '20px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{  fontSize: '1.8rem' }} className="lava-text">TICKET SUBMITTED</h3>
                <p style={{   fontSize: '1.05rem', marginTop: '12px' }}>We will respond within your plan"s SLA window.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input required placeholder="Your Email" value={ticket.email} onChange={e => setTicket({...ticket, email: e.target.value})} style={{ background: '#05000A', border: '1px solid rgba(180,0,255,0.35)', borderRadius: '10px', padding: '13px 16px',   fontSize: '1rem', outline: 'none' }} />
                <input required placeholder="Subject" value={ticket.subject} onChange={e => setTicket({...ticket, subject: e.target.value})} style={{ background: '#05000A', border: '1px solid rgba(180,0,255,0.35)', borderRadius: '10px', padding: '13px 16px',   fontSize: '1rem', outline: 'none' }} />
                <select value={ticket.priority} onChange={e => setTicket({...ticket, priority: e.target.value})} style={{ background: '#05000A', border: '1px solid rgba(180,0,255,0.35)', borderRadius: '10px', padding: '13px 16px',   fontSize: '1rem', outline: 'none', cursor: 'pointer' }}>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority — Urgent</option>
                  <option value="critical">Critical — Site Down</option>
                </select>
                <textarea required rows={5} placeholder="Describe your issue..." value={ticket.desc} onChange={e => setTicket({...ticket, desc: e.target.value})} style={{ background: '#05000A', border: '1px solid rgba(180,0,255,0.35)', borderRadius: '10px', padding: '13px 16px',   fontSize: '1rem', outline: 'none', resize: 'vertical' }} />
                <button type="submit" className="lava-pill" style={{ padding: '13px',  fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.1em', cursor: 'pointer', border: 'none' }}>SUBMIT TICKET</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
