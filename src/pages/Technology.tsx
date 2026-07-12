import { Link } from 'react-router-dom'

const stacks = [
  {
    cat: 'Frontend',
    icon: '⚡',
    
    techs: ['React 19', 'Next.js 15', 'SvelteKit', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
  },
  {
    cat: 'Backend',
    icon: '🔧',
    
    techs: ['Node.js', 'Python', 'Go', 'Rust', 'GraphQL', 'REST APIs', 'gRPC', 'WebSockets'],
  },
  {
    cat: 'Mobile',
    icon: '📱',
    
    techs: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Expo', 'Capacitor'],
  },
  {
    cat: 'Database',
    icon: '🗄️',
    
    techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'PlanetScale', 'ClickHouse', 'Elasticsearch', 'DynamoDB'],
  },
  {
    cat: 'Cloud & DevOps',
    icon: '☁️',
    
    techs: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
  },
  {
    cat: 'AI & Data',
    icon: '🤖',
    
    techs: ['PyTorch', 'TensorFlow', 'OpenAI API', 'LangChain', 'Hugging Face', 'Apache Spark', 'Airflow', 'dbt'],
  },
]

export default function Technology() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">TECHNOLOGY</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            We are tool-agnostic and obsessively current. Here is our battle-tested technology arsenal.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {stacks.map(s => (
            <div key={s.cat} className="service-box" style={{ padding: '36px', borderRadius: '18px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: `linear-gradient(180deg, ${s.color}, transparent)`, boxShadow: `0 0 12px ${s.color}` }} />
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
              <h3 style={{  fontSize: '1.6rem', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text-sm">{s.cat}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.techs.map(tech => (
                  <span key={tech} style={{
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}40`,
                    
                    
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s' }}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{   fontSize: '1.1rem', marginBottom: '24px' }}>Have specific tech requirements? We will work with what you have.</p>
          <Link to="/contact" className="lava-pill" style={{ padding: '13px 36px',  fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>DISCUSS YOUR STACK</Link>
        </div>
      </section>
    </div>
  )
}
