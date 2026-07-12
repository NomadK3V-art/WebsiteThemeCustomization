import { Link } from 'react-router-dom'

const posts = [
  { id: 1, title: 'The Future of Web3: Beyond the Hype', category: 'Technology', date: 'Jun 28, 2025', read: '8 min read', excerpt: 'How decentralized applications are reshaping digital ownership and what it means for enterprise software in 2026.', author: 'Marcus Okafor',  },
  { id: 2, title: 'Designing for Dark Mode: A Deep Dive', category: 'Design', date: 'Jun 15, 2025', read: '6 min read', excerpt: 'Beyond inverting colors — crafting dark interfaces that are beautiful, accessible, and emotionally resonant.', author: 'Zoe Castellano',  },
  { id: 3, title: 'How AI is Transforming Mobile UX', category: 'AI / ML', date: 'Jun 3, 2025', read: '10 min read', excerpt: 'Machine learning patterns that eliminate friction and create apps that feel like they read your mind.', author: 'Luna Park',  },
  { id: 4, title: 'Zero-Trust Architecture in 2025', category: 'Security', date: 'May 22, 2025', read: '12 min read', excerpt: 'Why the perimeter is dead and how to build systems that assume breach and defend from within.', author: 'Aisha Winters',  },
  { id: 5, title: 'Building for a Billion Users', category: 'Engineering', date: 'May 10, 2025', read: '9 min read', excerpt: 'Infrastructure decisions that scale. Lessons from building systems at Google, Meta, and Stripe.', author: 'Rajan Mehta',  },
  { id: 6, title: 'The Product Manager"s Cheat Code', category: 'Product', date: 'Apr 28, 2025', read: '7 min read', excerpt: 'Mental models, frameworks, and hard-won lessons from 12 years of shipping products that actually matter.', author: 'Devon Cruz',  },
]

const categories = ['All', 'Technology', 'Design', 'AI / ML', 'Security', 'Engineering', 'Product']

export default function Blog() {
  return (
    <div className="page-bg">
      <section style={{ padding: '100px 24px 60px', textAlign: 'center' }} className="hero-bg">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{  fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', marginBottom: '20px' }} className="lava-text">THE JOURNAL</h1>
          <p style={{  fontSize: '1.3rem',  fontWeight: 500, lineHeight: 1.6 }}>
            Insights, deep dives, and hot takes from the SvelteRX team.
          </p>
        </div>
      </section>

      <div className="lava-divider" />

      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {/* CATEGORY PILLS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
            {categories.map(cat => (
              <button key={cat} className="lava-pill" style={{
                padding: '7px 20px',
                
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                border: 'none' }}>{cat}</button>
            ))}
          </div>

          {/* FEATURED */}
          <div className="service-box" style={{ padding: '48px', borderRadius: '20px', marginBottom: '36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, #FF1493, #FFE600)`, boxShadow: '0 0 12px #FF6600' }} />
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(255,20,147,0.2)', border: '1px solid rgba(255,20,147,0.5)',   fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '16px' }}>FEATURED</div>
            <h2 style={{  fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.05em', marginBottom: '16px' }} className="lava-text">{posts[0].title}</h2>
            <p style={{   fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '700px', marginBottom: '24px' }}>{posts[0].excerpt}</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{   fontSize: '0.9rem' }}>By {posts[0].author} · {posts[0].date} · {posts[0].read}</span>
              <button className="lava-pill" style={{ padding: '8px 20px',  fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.08em', cursor: 'pointer', border: 'none' }}>READ NOW →</button>
            </div>
          </div>

          {/* GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {posts.slice(1).map(post => (
              <div key={post.id} className="service-box" style={{ padding: '32px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${post.color}, transparent)`, boxShadow: `0 0 8px ${post.color}` }} />
                <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '9999px', background: `${post.color}22`, border: `1px solid ${post.color}66`, color: post.color,  fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '14px' }}>{post.category}</div>
                <h3 style={{  fontSize: '1.5rem', letterSpacing: '0.05em', marginBottom: '12px' }} className="lava-text-sm">{post.title}</h3>
                <p style={{   fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{   fontSize: '0.85rem' }}>{post.date} · {post.read}</span>
                  <button className="lava-link" style={{  fontWeight: 700, fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>READ →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
