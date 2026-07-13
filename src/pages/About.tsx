import { Link } from 'react-router-dom'

const services = ['Private health insurance', 'Concierge medicine', 'GLP-1 weight-loss program', 'Life insurance', 'Dental & vision']

export default function About() {
  return (
    <div style={{ background: '#05000A' }}>
      <section className="hero-bg" style={{ padding: 'clamp(70px,10vw,120px) 28px clamp(50px,8vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="lava-pill" style={{ display: 'inline-block', padding: '5px 18px', marginBottom: '24px',  fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            ABOUT SVELTERX
          </div>
          <h1 style={{  fontSize: 'clamp(2.5rem,7vw,5.5rem)', lineHeight: 1.05, letterSpacing: '0.03em', marginBottom: '24px' }} className="lava-text">
            Real guidance,<br />
            <span style={{ color: 'var(--ink)',   fontStyle: 'italic' }}>from a real person.</span>
          </h1>
          <p style={{   fontSize: 'clamp(1rem,2vw,1.2rem)', fontWeight: 500, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
            SvelteRX was built on a simple belief: people deserve access to a real human expert — not a chatbot, not a 1-800 number — someone who knows their situation and stays with them as life changes.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      {/* MEET YOUR AGENT */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '56px', alignItems: 'center' }}>
          <div>
            <h2 style={{  fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '0.04em', marginBottom: '24px' }} className="lava-text">
              MEET YOUR GUIDE
            </h2>
            <p style={{   fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '18px' }}>
              I started SvelteRX after years of watching people overpay for coverage they didn"t understand, skip insurance they desperately needed, or get lost in systems that weren"t built for them.
            </p>
            <p style={{   fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '28px' }}>
              Health insurance is complicated. The jargon is dense. The options are overwhelming. My job is to cut through all of that and make sure you walk away with the right coverage for your actual life — not just whatever is easiest to sell.
            </p>
            <div className="service-box" style={{ padding: '20px 24px', borderRadius: '14px', marginBottom: '28px' }}>
              <p style={{   fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                Licensed insurance agent · NPN on file · Licensed in 30+ states
              </p>
            </div>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lava-pill"
              style={{ padding: '13px 32px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textDecoration: 'none', display: 'inline-block' }}
            >
              SCHEDULE A CALL
            </a>
          </div>

          <div>
            {/* Avatar placeholder */}
            <div style={{
              width: '100%',
              maxWidth: '360px',
              aspectRatio: '1',
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #1A0045 0%, #440088 40%, #7B2CBF 100%)',
              border: '1px solid rgba(255,20,147,0.35)',
              boxShadow: '0 0 40px rgba(120,0,200,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              flexDirection: 'column',
              gap: '12px' }}>
              <div style={{ fontSize: '5rem' }}>🩺</div>
              <div style={{  fontSize: '1.2rem', letterSpacing: '0.08em' }} className="lava-text-sm">YOUR AGENT</div>
              <div style={{   fontSize: '0.9rem' }}>SvelteRX Founder</div>
            </div>
          </div>
        </div>
      </section>

      <div className="lava-divider" />

      {/* WHY WE EXIST */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 28px', background: 'rgba(123,44,191,0.15)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{  fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '0.04em', marginBottom: '24px' }} className="lava-text">
            WHY SVELTERX EXISTS
          </h2>
          <p style={{   fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '20px' }}>
            People were overpaying for coverage — or avoiding it entirely — because the system felt too complicated and too impersonal.
          </p>
          <p style={{   fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '40px' }}>
            SvelteRX exists because everyone deserves clear information, quality options, and a real person who picks up the phone.
          </p>

          <h3 style={{  fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '20px' }} className="lava-text-sm">WHAT WE BRING TOGETHER</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '480px', margin: '0 auto 40px' }}>
            {services.map(s => (
              <div key={s} className="service-box" style={{ padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--ink)',  fontSize: '0.8rem' }}>◆</span>
                <span style={{   fontSize: '1rem', fontWeight: 600 }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{   fontSize: '1rem', lineHeight: 1.7, marginBottom: '32px' }}>
            No pressure. Plain language. Ongoing support as your life and needs evolve.
          </p>
          <Link to="/contact" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textDecoration: 'none' }}>
            TALK TO US
          </Link>
        </div>
      </section>
    </div>
  )
}
