import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope. A basic website takes 4–6 weeks. A full web application typically runs 3–6 months. Enterprise projects can span 6–18 months. We always provide a detailed timeline in our proposal.' },
  { q: 'What is your development process?', a: 'We follow an agile methodology with 2-week sprints. Each sprint includes discovery, design, development, QA, and stakeholder review. You get visibility into progress at every step through our project portal.' },
  { q: 'Do you offer fixed-price or time-and-materials contracts?', a: 'We offer both. Fixed-price works well for clearly defined projects. Time-and-materials suits evolving projects where scope may change. We help you choose the right model during our discovery call.' },
  { q: 'Who owns the source code and IP?', a: 'You do — 100%. Upon full payment, all source code, design assets, and intellectual property transfer to you. We include this in every contract, no exceptions.' },
  { q: 'Do you provide ongoing support and maintenance?', a: 'Yes. We offer monthly retainers starting at $999/month that include bug fixes, security patches, performance monitoring, and up to 8 hours of development time.' },
  { q: 'Can you work with our existing tech stack?', a: 'Absolutely. We are polyglot engineers comfortable with most modern stacks. Share your tech requirements and we will adapt — or recommend improvements where justified.' },
  { q: 'How do you handle revisions during the project?', a: 'Each milestone includes two rounds of revisions. Additional revisions are billed at our standard hourly rate. We set this up clearly upfront so there are no surprises.' },
  { q: 'What industries do you serve?', a: 'FinTech, HealthTech, EdTech, SaaS, E-Commerce, Media, Gaming, Web3, and more. Our team has domain expertise across most major verticals.' },
  { q: 'Do you sign NDAs?', a: 'Yes, always. We sign NDAs before any project discussion if requested. Client confidentiality is foundational to how we work.' },
  { q: 'How do you price AI/ML projects?', a: 'AI projects are scoped individually based on data complexity, model requirements, and compute needs. We provide detailed estimates after a technical discovery session.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">FAQ</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Answers to the questions we hear most. Still unsure? We"re a message away.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="service-box" style={{ borderRadius: '14px', marginBottom: '14px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '24px 28px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left' }}
              >
                <span style={{
                  
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: 'var(--ink)' }}>{faq.q}</span>
                <span style={{
                  
                  
                  fontSize: '1.3rem',
                  flexShrink: 0,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s' }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 28px 24px' }}>
                  <p style={{   fontSize: '1.05rem', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{   fontSize: '1.1rem', marginBottom: '24px' }}>Still have questions?</p>
            <Link to="/contact" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
