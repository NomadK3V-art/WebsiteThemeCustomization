const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace open enrollment banner
content = content.replace(
  /\{\/\* ── OPEN ENROLLMENT BANNER ── \*\/\}[\s\S]*?\{\/\* ── HOW IT WORKS ── \*\/\}/,
  `{/* ── STAY INFORMED ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 28px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span className="lava-pill" style={{ display: 'inline-block', padding: '5px 18px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              STAY INFORMED
            </span>
          </div>
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem,5vw,3.8rem)', letterSpacing: '0.04em', textAlign: 'center', marginBottom: '12px' }} className="lava-text">
            HEALTH INSURANCE KEEPS CHANGING — STAY AHEAD OF IT
          </h2>
          <p style={{ color: '#9070c0', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', textAlign: 'center', marginBottom: '52px', maxWidth: '800px', margin: '0 auto 52px', lineHeight: 1.6 }}>
            Premiums, subsidies, and enrollment rules shift every year. Here's your countdown to Open Enrollment, plus the latest headlines on what's changing and why.
          </p>
          
          <div style={{ background: 'linear-gradient(135deg,#0D0025,#1A0045,#0D0025)', border: '1px solid rgba(255,20,147,0.3)', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 0 50px rgba(120,0,200,0.15)', marginBottom: '40px' }}>
            <div className="lava-pill" style={{ display: 'inline-block', padding: '5px 18px', marginBottom: '16px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              OPEN ENROLLMENT · 2027 COVERAGE
            </div>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '0.04em', marginBottom: '12px' }} className="lava-text">
              NOV 1 – DEC 15, 2026
            </h2>
            <p style={{ color: '#a080c8', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 700 }}>
              HealthCare.gov & most states
            </p>
            <p style={{ color: '#9070c0', fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
              Some state marketplaces extend to Dec 31. Idaho opens Oct 15; Georgia opens Oct 19. Plans start Jan 1, 2027.
            </p>
            <Link to="/contact" className="lava-pill" style={{ padding: '12px 32px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textDecoration: 'none' }}>
              GET HELP ENROLLING →
            </Link>
          </div>

          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '20px' }} className="lava-text-sm">LATEST HEALTH INSURANCE NEWS</h3>
            <div className="service-box" style={{ padding: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#CC0000', boxShadow: '0 0 8px #FF0000', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#e0d0ff', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>LIVE — Loading the latest headlines...</span>
              </div>
              <a href="https://news.google.com/search?q=health%20insurance" target="_blank" rel="noreferrer" className="lava-link" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', fontWeight: 600 }}>See more news →</a>
            </div>
            <p style={{ color: '#5a4080', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.8rem', marginTop: '16px', lineHeight: 1.5 }}>
              Headlines are pulled automatically from Google News for general information only — not medical, insurance, or legal advice. Dates and rules can change; always confirm current details at HealthCare.gov or with a licensed agent.
            </p>
          </div>
        </div>
      </section>

      <div className="lava-divider" />

      {/* ── HOW IT WORKS ── */}`
);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log("Updated Home.tsx - Part 2");
