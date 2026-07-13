import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ first: '', email: '', phone: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'rgba(5,0,15,0.8)',
    border: '1px solid rgba(180,0,255,0.35)',
    borderRadius: '10px',
    padding: '13px 16px',
    
    
    fontSize: '1rem',
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ background: '#05000A' }}>
      <section className="hero-bg" style={{ padding: 'clamp(70px,10vw,120px) 28px clamp(50px,8vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(2.5rem,7vw,5rem)', lineHeight: 1.05, letterSpacing: '0.03em', marginBottom: '20px' }} className="lava-text">
            LET'S TALK
          </h1>
          <p style={{   fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.7 }}>
            A licensed SvelteRX guide will reach out within one business day. No pressure, no scripts — just a real conversation.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: 'clamp(60px,8vw,100px) 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '56px', alignItems: 'start' }}>

          {/* LEFT — info */}
          <div>
            <h2 style={{  fontSize: 'clamp(1.8rem,3vw,2.8rem)', letterSpacing: '0.04em', marginBottom: '28px' }} className="lava-text">HOW TO REACH US</h2>

            {[
              { icon: '✉️', label: 'Email', val: 'hello@svelterx.com' },
              { icon: '📞', label: 'Phone', val: 'Available after you book a call' },
              { icon: '🕐', label: 'Response Time', val: 'Within 1 business day' },
              { icon: '🌍', label: 'Licensed In', val: '30+ states across the US' },
            ].map(item => (
              <div key={item.label} className="service-box" style={{ padding: '18px 22px', borderRadius: '12px', marginBottom: '12px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ color: 'var(--ink)',    fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.12em', marginBottom: '3px' }}>{item.label}</div>
                  <div style={{   fontSize: '0.98rem' }}>{item.val}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '28px', padding: '24px', background: 'linear-gradient(135deg,#1A0045,#7B2CBF)', border: '1px solid rgba(255,20,147,0.25)', borderRadius: '16px' }}>
              <h4 style={{ color: 'var(--ink)',    fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '12px' }}>PREFER TO BOOK DIRECTLY?</h4>
              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lava-pill"
                style={{ padding: '11px 28px',  fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', textDecoration: 'none', display: 'inline-block' }}
              >
                BOOK A CALL →
              </a>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="service-box" style={{ padding: '40px', borderRadius: '20px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔥</div>
                <h3 style={{  fontSize: '2rem', letterSpacing: '0.04em', marginBottom: '12px' }} className="lava-text">MESSAGE RECEIVED!</h3>
                <p style={{   fontSize: '1.05rem', lineHeight: 1.6 }}>A licensed guide will be in touch within one business day. Watch your inbox — and feel free to check your spam folder just in case.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{  fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '6px' }} className="lava-text-sm">SEND A MESSAGE</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input required placeholder="First Name" value={form.first} onChange={e => setForm({...form, first: e.target.value})} style={inp} />
                  <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inp} />
                </div>
                <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inp} />
                <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} style={{ ...inp, cursor: 'pointer' }}>
                  <option value="">I'm interested in...</option>
                  <option>GLP-1 Weight-Loss</option>
                  <option>Private Health Insurance</option>
                  <option>Concierge Medicine</option>
                  <option>Life Insurance</option>
                  <option>Dental & Vision</option>
                  <option>Multiple Services</option>
                  <option>Just exploring my options</option>
                </select>
                <textarea rows={4} placeholder="Anything else you'd like us to know?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ ...inp, resize: 'vertical' }} />
                <button type="submit" className="lava-pill" style={{ padding: '13px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', cursor: 'pointer', border: 'none' }}>
                  SEND MESSAGE →
                </button>
                <p style={{   fontSize: '0.78rem', lineHeight: 1.5 }}>
                  By submitting, you consent to being contacted by a licensed SvelteRX agent via the methods provided. We never sell your information. <Link to="/privacy" className="lava-link" style={{ fontSize: '0.78rem' }}>Privacy Policy</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
