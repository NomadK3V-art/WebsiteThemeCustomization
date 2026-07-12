const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

content = content.replace(
  /READY TO GET COVERED\?/,
  'READY TO EXPLORE YOUR OPTIONS?'
);

content = content.replace(
  /Share a bit about yourself and a licensed guide will reach out within one business day\./,
  "Share what you're looking for and a guide will reach out. It's free to ask, and there's never any pressure. Prefer to pick a time? Grab a slot right on my calendar."
);

content = content.replace(
  /CONNECT WITH A GUIDE →/,
  'GET STARTED →'
);

// We need a schedule call button too in that section
content = content.replace(
  /<div className="service-box" style=\{\{ padding: '36px', borderRadius: '20px', textAlign: 'left' \}\}>/,
  `<div style={{ marginBottom: '36px' }}>
            <a href="https://calendar.app.google/oPJUY6eeG7Rpvp2A8" target="_blank" rel="noreferrer" className="lava-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textDecoration: 'none', background: 'transparent', border: '1px solid #FF1493', color: '#FF1493' }}>
              📅 SCHEDULE A CALL
            </a>
          </div>
          <div className="service-box" style={{ padding: '36px', borderRadius: '20px', textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.6rem', letterSpacing: '0.05em', marginBottom: '20px', textAlign: 'center' }} className="lava-text-sm">GET STARTED TODAY</h3>
            <p style={{ color: '#a080c8', fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', textAlign: 'center', marginBottom: '24px' }}>A guide will follow up personally.</p>`
);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log("Updated Home.tsx - Part 3");
