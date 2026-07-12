const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

if (!app.includes('FAQ')) {
  app = `
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Privacy from './pages/Privacy'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import CaseStudies from './pages/CaseStudies'
import FAQ from './pages/FAQ'
import Partners from './pages/Partners'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Support from './pages/Support'
import Team from './pages/Team'
import Technology from './pages/Technology'
import Testimonials from './pages/Testimonials'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="careers" element={<Careers />} />
          <Route path="casestudies" element={<CaseStudies />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="partners" element={<Partners />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="services" element={<Services />} />
          <Route path="support" element={<Support />} />
          <Route path="team" element={<Team />} />
          <Route path="technology" element={<Technology />} />
          <Route path="testimonials" element={<Testimonials />} />
        </Route>
      </Routes>
    </Router>
  )
}
`;
  fs.writeFileSync('src/App.tsx', app);
  console.log("Added all 16 pages to the router");
}
