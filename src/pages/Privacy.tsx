export default function Privacy() {
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{  fontSize: '1.6rem', letterSpacing: '0.04em', marginBottom: '12px' }} className="lava-text-sm">{title}</h2>
      <div style={{   fontSize: '1.02rem', lineHeight: 1.8 }}>{children}</div>
    </div>
  )

  return (
    <div style={{ background: '#05000A' }}>
      <section className="hero-bg" style={{ padding: 'clamp(70px,10vw,120px) 28px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(2.5rem,6vw,4.5rem)', letterSpacing: '0.03em', marginBottom: '16px' }} className="lava-text">PRIVACY POLICY</h1>
          <p style={{   fontSize: '1rem' }}>Last updated: June 1, 2026</p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: 'clamp(60px,8vw,100px) 28px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="service-box" style={{ padding: '48px', borderRadius: '20px' }}>
            <S title="1. Information We Collect">
              <p>We collect information you provide directly — such as your name, email address, phone number, and area of interest when you fill out our contact or lead forms. We also collect technical information automatically, including your IP address, browser type, and pages visited, through cookies and analytics tools.</p>
            </S>
            <S title="2. How We Use Your Information">
              <p>We use your information to respond to your inquiries, connect you with a licensed insurance agent, improve our services, and send relevant updates where you have consented. We do not sell your personal information to third parties.</p>
            </S>
            <S title="3. Insurance Agent Contact">
              <p>By submitting a form on SvelteRX, you consent to being contacted by a licensed SvelteRX agent via phone, email, or text using automated or manual methods. You may opt out at any time by replying STOP to any message or contacting us directly.</p>
            </S>
            <S title="4. Cookies">
              <p>We use first-party cookies to operate our website and third-party cookies (including Google Analytics) to understand how visitors use our site. You can control cookie settings through your browser. Disabling cookies may affect some website functionality.</p>
            </S>
            <S title="5. Third-Party Services">
              <p>We use services including Google Analytics for traffic analysis, Google Calendar for appointment booking, and Ameritas for dental and vision enrollment. Each has its own privacy policy governing their use of your data.</p>
            </S>
            <S title="6. Your Rights">
              <p>You have the right to access, correct, or request deletion of your personal data. California residents have additional rights under CCPA. To exercise any rights, contact us at <span style={{ color: 'var(--ink)' }}>privacy@svelterx.com</span>.</p>
            </S>
            <S title="7. Disclaimer">
              <p>Content on SvelteRX is general and informational only. It is not medical, insurance, financial, tax, or legal advice. Always consult a licensed professional for advice specific to your situation. SvelteRX agents are licensed insurance agents, not medical providers.</p>
            </S>
            <S title="8. Contact">
              <p>Questions about this policy? Email us at <span style={{ color: 'var(--ink)' }}>privacy@svelterx.com</span> or use the contact form on our site.</p>
            </S>
            <div style={{ borderTop: '1px solid rgba(120,0,200,0.2)', paddingTop: '24px' }}>
              <p style={{   fontSize: '0.9rem' }}>© 2026 SvelteRX. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
