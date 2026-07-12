import { Link } from 'react-router-dom'

const services = [
  {
    icon: '🌱',
    
    title: 'GLP-1 Weight-Loss Program',
    subtitle: 'Physician-guided. Medication included. Coaching bundled.',
    desc: 'Our GLP-1 program pairs you with a licensed physician who reviews your labs, prescribes the right medication, and monitors your progress monthly. Everything — labs, medication, and coaching — is bundled into one clear monthly cost with no surprise bills.',
    includes: [
      'Physician consultation & ongoing oversight',
      'Lab work covered in program cost',
      'GLP-1 medication (Semaglutide or Tirzepatide)',
      'Monthly check-ins with your care team',
      'Nutrition & lifestyle coaching',
      'Insurance coordination where applicable',
    ],
    links: ['How GLP-1 works', 'Am I a candidate?', 'Cost & coverage breakdown'],
  },
  {
    icon: '🛡️',
    
    title: 'Private Health Insurance',
    subtitle: 'Individual & family plans. Licensed guidance. No pressure.',
    desc: 'Health insurance is complicated — but it doesn"t have to feel that way. A SvelteRX agent reviews your options across top carriers, explains the real tradeoffs in plain language, and helps you enroll in a plan that actually fits your life and budget.',
    includes: [
      'ACA Marketplace plans',
      'Off-exchange private plans',
      'Short-term health coverage options',
      'Family plan analysis & optimization',
      'HSA/HRA guidance',
      'Annual plan review & adjustment',
    ],
    links: ['Compare plan types', 'Open Enrollment 2026 guide', 'ACA vs. private plans explained'],
  },
  {
    icon: '🩺',
    
    title: 'Concierge Medicine',
    subtitle: '$149/mo covers up to 7 family members.',
    desc: 'Traditional healthcare means waiting rooms, rushed appointments, and doctors who barely remember your name. Concierge medicine flips that. Your $149 monthly membership covers unlimited telehealth visits, same-day appointments, and a dedicated physician who knows your full medical history.',
    includes: [
      'Unlimited telehealth visits (no co-pays)',
      'Same-day or next-day appointments',
      'Dedicated primary care physician',
      'Up to 7 family members on one plan',
      'Prescription management & refills',
      'Lab interpretation & follow-up care',
    ],
    links: ['What\'s included in $149/mo', 'Meet your concierge doctor', 'Family plan details'],
  },
  {
    icon: '❤️',
    
    title: 'Life Insurance',
    subtitle: 'Term & permanent. Real wealth strategy conversations.',
    desc: 'Life insurance is about protecting the people who depend on you — and building a financial foundation that outlasts you. SvelteRX pairs you with a licensed agent who understands both the coverage side and the wealth strategy side, so you get a policy that actually fits your goals.',
    includes: [
      'Term life insurance (10, 20, 30-year)',
      'Whole & universal life options',
      'Indexed Universal Life (IUL) strategies',
      'Coverage for self-employed & business owners',
      'Estate planning considerations',
      'Annual policy review',
    ],
    links: ['Term vs. permanent explained', 'Get a no-obligation quote', 'Life insurance as a wealth tool'],
  },
  {
    icon: '🦷',
    
    title: 'Dental & Vision',
    subtitle: 'Simple enrollment through our Ameritas portal.',
    desc: 'Dental and vision coverage should be straightforward. Through our Ameritas partner portal, you can compare plans, check your dentist and eye doctor network, and enroll in minutes. A SvelteRX agent is always available if you have questions.',
    includes: [
      'Individual & family dental plans',
      'Preventive, basic, and major dental coverage',
      'Vision exams & eyewear allowances',
      'Large in-network provider options',
      'Self-serve enrollment portal',
      'Agent support for complex situations',
    ],
    links: ['View dental plan options', 'Vision coverage details', 'Enroll via Ameritas portal'],
  },
]

export default function Services() {
  return (
    <div style={{ background: '#05000A' }}>
      <section className="hero-bg" style={{ padding: 'clamp(70px,10vw,120px) 28px clamp(50px,8vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="lava-pill" style={{ display: 'inline-block', padding: '5px 18px', marginBottom: '24px',  fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            OUR SERVICES
          </div>
          <h1 style={{  fontSize: 'clamp(2.5rem,7vw,5rem)', lineHeight: 1.05, letterSpacing: '0.03em', marginBottom: '24px' }} className="lava-text">
            ONE PLACE FOR YOUR<br />HEALTH &amp; WELLNESS
          </h1>
          <p style={{   fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.7 }}>
            Five interconnected services, one licensed guide who sees your whole picture.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: 'clamp(60px,8vw,100px) 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {services.map(s => (
            <div key={s.title} className="service-box" style={{ padding: '44px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg,${s.color},transparent)`, boxShadow: `0 0 14px ${s.color}` }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '36px', alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>{s.icon}</div>
                  <h2 style={{  fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '0.04em', marginBottom: '8px' }} className="lava-text-sm">{s.title}</h2>
                  <p style={{ color: s.color,  fontWeight: 700, fontSize: '1rem', marginBottom: '18px', textShadow: `0 0 8px ${s.color}` }}>{s.subtitle}</p>
                  <p style={{   fontSize: '1.05rem', lineHeight: 1.75 }}>{s.desc}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--ink)',    fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.12em', marginBottom: '14px' }}>WHAT'S INCLUDED</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                    {s.includes.map(item => (
                      <li key={item} style={{   fontSize: '0.98rem', fontWeight: 600, padding: '6px 0', display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid rgba(120,0,200,0.12)' }}>
                        <span style={{ color: 'var(--ink)',  flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {s.links.map(l => (
                      <Link key={l} to="/contact" className="lava-link" style={{  fontSize: '0.88rem', fontWeight: 700 }}>→ {l}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <p style={{   fontSize: '1.1rem', marginBottom: '24px' }}>Not sure which service is right for you?</p>
          <Link to="/contact" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textDecoration: 'none' }}>
            TALK TO A GUIDE — IT"S FREE
          </Link>
        </div>
      </section>
    </div>
  )
}
