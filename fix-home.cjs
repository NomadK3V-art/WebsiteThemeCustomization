const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace services array
content = content.replace(/const services = \[[\s\S]*?\]\n/, `const services = [
  {
    icon: '🌱',
    featured: true,
    title: 'GLP-1 Weight-Loss Program',
    desc: 'Doctor-guided, all-inclusive weight loss that pairs proven GLP-1 medications with real human support — built on your Concierge Plan, with your labs covered.',
    bullets: ['Physician-guided, all-inclusive care', 'Medications, coaching & support in one price', 'All your labs covered by your Concierge Plan'],
    links: ['✓ See if you qualify — 60 sec', '🌱 The program & the science', '💰 What GLP-1 really costs (2026)', '📸 Before & after: real results', 'Learn more →'],
    color: '#FF6600',
  },
  {
    icon: '🛡️',
    title: 'Private Health Insurance',
    desc: 'Coverage that fits your life and budget — with a licensed agent in your corner, at no extra cost to you.',
    bullets: ['Individual, family & self-employed plans', 'Help comparing coverage, cost & savings', 'A real agent, never a call center'],
    links: ['📘 Health insurance explained: costs & plans', '📜 The ACA & your income: a brief history', '🧩 How a bundled plan fills the gaps', 'Let\\'s talk →'],
    color: '#FF1493',
  },
  {
    icon: '🩺',
    title: 'Concierge Medicine',
    desc: 'Unlimited virtual care for one flat price — $149/mo covers up to 7 family members.',
    bullets: ['Unlimited $0 telehealth with board-certified doctors', '$0 labs, $0 meds & an AI Doctor built in', 'The foundation your GLP-1 program is built on'],
    links: ['🩺 What\\'s included & why ~83% of health issues are handled virtually', '🏥 In-person concierge: what it\\'s like & what it costs', 'Learn more →'],
    color: '#7B00D4',
  },
  {
    icon: '❤️',
    title: 'Life Insurance',
    desc: 'Protect the people who count on you — and see how life insurance can fit into a smart, long-term plan.',
    bullets: ['Term & permanent options', 'Protection for income and loved ones', 'Wealth- and tax-strategy conversations'],
    links: ['📄 Read: Tax Benefits of Employing Your Children in Your Business', '📊 Quick reference: 401(k) vs. Fixed Indexed Annuity', '💼 For business owners: Section 162 Executive Bonus Plans', 'Let\\'s talk →'],
    color: '#FF1493',
  },
  {
    icon: '🦷',
    title: 'Dental & Vision plans',
    desc: 'Build your own dental & vision plan and enroll online in minutes — you can do it all yourself.',
    bullets: [],
    links: ['Dental & Vision →'],
    color: '#FF6600',
  },
]
`);

// Replace whyPoints array
content = content.replace(/const whyPoints = \[[\s\S]*?\]\n/, `const whyPoints = [
  {
    label: 'A',
    title: 'A real guide',
    desc: 'Work directly with a licensed professional who explains your options in plain terms — not a call center.',
  },
  {
    label: 'B',
    title: 'Everything in one place',
    desc: 'Coverage, concierge care, and wellness under one roof, so you\\'re not juggling a dozen companies.',
  },
  {
    label: 'C',
    title: 'Built around you',
    desc: 'We start with what you need and where you are — then help you find what actually fits your life.',
  },
]
`);

// Replace steps array
content = content.replace(/const steps = \[[\s\S]*?\]\n/, `const steps = [
  { num: '01', title: 'Tell us what you need', desc: 'Pick a service and share a few details so we understand where you\\'re starting from.' },
  { num: '02', title: 'Talk with a guide', desc: 'A licensed professional walks you through your options and answers every question in plain language.' },
  { num: '03', title: 'Get set up', desc: 'Move forward with what fits — and keep our support for whatever comes next.' },
]
`);

// Fix "WHY SVELTERX?" heading block
content = content.replace(
  /<h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp\(2rem,5vw,3\.8rem\)', letterSpacing: '0\.04em', textAlign: 'center', marginBottom: '52px' }} className="lava-text">\s*WHY SVELTERX\?\s*<\/h2>/,
  `<div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span className="lava-pill" style={{ display: 'inline-block', padding: '5px 18px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              WHY SVELTERX
            </span>
          </div>
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem,5vw,3.8rem)', letterSpacing: '0.04em', textAlign: 'center', marginBottom: '12px' }} className="lava-text">
            HEALTH DECISIONS FEEL BETTER WITH A GUIDE
          </h2>
          <p style={{ color: '#9070c0', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', textAlign: 'center', marginBottom: '52px', maxWidth: '800px', margin: '0 auto 52px', lineHeight: 1.6 }}>
            We built SvelteRX around one belief: you deserve clear information, quality options, and a real person who picks up the phone.
          </p>`
);

// Fix "HOW IT WORKS" heading block
content = content.replace(
  /<h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp\(2rem,5vw,3\.8rem\)', letterSpacing: '0\.04em', textAlign: 'center', marginBottom: '52px' }} className="lava-text">\s*HOW IT WORKS\s*<\/h2>/,
  `<div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span className="lava-pill" style={{ display: 'inline-block', padding: '5px 18px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              HOW IT WORKS
            </span>
          </div>
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem,5vw,3.8rem)', letterSpacing: '0.04em', textAlign: 'center', marginBottom: '12px' }} className="lava-text">
            GETTING STARTED IS SIMPLE
          </h2>
          <p style={{ color: '#9070c0', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', textAlign: 'center', marginBottom: '52px', maxWidth: '800px', margin: '0 auto 52px', lineHeight: 1.6 }}>
            Three easy steps — at your pace, with no obligation.
          </p>`
);

// We need to also render the bullets in the services mapped block!
content = content.replace(
  /<ul style=\{\{ listStyle: 'none', padding: 0, margin: 0 \}\}>\s*\{s\.links\.map\(l => \(\s*<li key=\{l\}>\s*<Link to="\/services" className="lava-link" style=\{\{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0\.9rem', fontWeight: 600, display: 'block', padding: '4px 0' \}\}>→ \{l\}<\/Link>\s*<\/li>\s*\)\)\}\s*<\/ul>/,
  `<ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.bullets?.map(b => (
                    <li key={b} style={{ color: '#e0d0ff', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: s.color, marginTop: '2px' }}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {s.links.map(l => (
                    <li key={l}>
                      <Link to="/services" className="lava-link" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', fontWeight: 600, display: 'block', padding: '4px 0' }}>{l}</Link>
                    </li>
                  ))}
                </ul>`
);

// We also need to add "Featured Program" banner
content = content.replace(
  /<div style=\{\{ fontSize: '2\.2rem', marginBottom: '14px' \}\}>\{s\.icon\}<\/div>/,
  `{s.featured && (
                  <div style={{ display: 'inline-block', background: 'rgba(255,230,0,0.1)', color: '#FFE600', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', marginBottom: '16px', border: '1px solid rgba(255,230,0,0.3)' }}>
                    ★ FEATURED PROGRAM
                  </div>
                )}
                <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>{s.icon}</div>`
);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log("Updated Home.tsx");
