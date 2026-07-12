
import React from 'react';
import Countdown from '../components/Countdown';

export default function Home() {
  return (
    <div className="svelterx-container">
      

<header>
  <div className="wrap nav">
    <div className="logo"><span className="lm">S</span><b>Svelte<span>RX</span></b></div>
    <nav className="navlinks">
      <a href="#services">Services</a>
      <a href="#why">Why SvelteRX</a>
      <a href="#how">How It Works</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
      <a href="https://calendar.app.google/oPJUY6eeG7Rpvp2A8" target="_blank" rel="noopener">Book a Call</a>
    </nav>
    <a href="#start" className="btn btn-primary">Get Started</a>
  </div>
</header>


<section className="hero">
  <div className="wrap hero-grid">
    <div>
      <span className="eyebrow">Health &amp; Wellness, Personally Guided</span>
      <h1>Your health, <em>handled with care.</em></h1>
      <p className="lead">SvelteRX brings health and life insurance, concierge medicine, and a physician-guided weight-loss program together in one Private Healthcare Network — with a real person to walk you through your options.</p>
      <div className="ctas">
        <a href="#start" className="btn btn-primary">Explore your options</a>
        <a href="#services" className="btn btn-ghost">See what we offer</a>
      </div>
      <div className="trustline"><span className="dot"></span> Licensed guidance · Clear information · No pressure, ever</div>
    </div>

    
    <div className="formcard" id="top">
      <h3>Let's find your fit</h3>
      <p className="sub">Tell us what you're interested in and we'll reach out.</p>
      <div className="field"><label>First name</label><input type="text" placeholder="Your first name" /></div>
      <div className="field"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
      <div className="field"><label>Phone</label><input type="tel" placeholder="(555) 555-5555" /></div>
      <div className="field"><label>I'm interested in</label>
        <select>
          <option value="">Choose a service…</option>
          <option>Private Health Insurance</option>
          <option>Life Insurance</option>
          <option>Concierge Medicine</option>
          <option>GLP-1 Weight-Loss Program</option>
          <option>Dental &amp; Vision</option>
          <option>I'm not sure yet</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={() => {}}>Get started</button>
      <p className="formnote">By submitting, you agree that SvelteRX and a licensed agent may contact you by phone, text, and email at the number and address you provide — including with automated technology — about health and wellness products and services. Consent is not a condition of any purchase, and message/data rates may apply. See our <a href="/privacy/">Privacy Policy</a>.</p>
    </div>
  </div>
</section>


<section id="services">
  <div className="wrap">
    <div className="sec-head">
      <span className="eyebrow">What We Offer</span>
      <h2>One place for your health, wellness &amp; financial future</h2>
      <p>Explore the ways SvelteRX can support you — from health coverage and concierge care to life insurance and retirement planning, most delivered through our one Private Healthcare Network. Learn about each and connect with a guide who explains it in plain language.</p>
    </div>
    
    <div className="svc-featured" id="glp1-featured">
      <div className="fl">
        <span className="ftag">★ Featured Program</span>
        <div className="fhead"><span className="fico">🌱</span><h3>GLP-1 Weight-Loss Program</h3></div>
        <p>Doctor-guided, all-inclusive weight loss that pairs proven GLP-1 medications with real human support — built on your Concierge Plan, with your labs covered.</p>
        <ul className="pts">
          <li>Physician-guided, all-inclusive care</li>
          <li>Medications, coaching &amp; support in one price</li>
          <li>All your labs covered by your Concierge Plan</li>
        </ul>

        <div className="glp-required">
          <span className="req-badge">Required</span>
          <p>The GLP-1 program is built on our Concierge Medicine Plan — you <strong>must be a Concierge member</strong> to enroll. It's the foundation that makes the doctor visits, labs, and medications possible.</p>
        </div>

        <div className="svc-secondary">
          <div className="sec-head"><span className="sec-ico">🩺</span><h4>Included: Concierge Medicine</h4></div>
          <p>Unlimited virtual care for one flat price — $149/mo covers up to 7 family members.</p>
          <ul className="pts">
            <li>Unlimited $0 telehealth with board-certified doctors</li>
            <li>$0 labs, $0 meds &amp; an AI Doctor built in</li>
            <li>The foundation your GLP-1 program is built on</li>
          </ul>
        </div>
      </div>
      <div className="fr">
        <a className="qualify-btn" href="/glp1-quiz/">✓ See if you qualify — 60 sec</a>
        <a className="svc-resource" href="/glp1/">🌱 The program &amp; the science</a>
        <a className="svc-resource" href="/glp1-cost/">💰 What GLP-1 really costs (2026)</a>
        <a className="svc-resource" href="/glp1/#results">📸 Before &amp; after: real results</a>
        <div className="fr-divider"><span>Your Concierge Plan</span></div>
        <a className="svc-resource" href="/concierge/">🩺 What's included &amp; why ~83% of issues are handled virtually</a>
        <a className="svc-resource" href="/in-person-concierge/">🏥 In-person concierge: what it's like &amp; costs</a>
        <a className="more" href="/glp1/">Learn more →</a>
      </div>
    </div>

    
    <div className="services">
      <div className="svc svc-phi">
        <div className="ico">🛡️</div>
        <h3>Private Health Insurance</h3>
        <p>Coverage that fits your life and budget — with a licensed agent in your corner, at no extra cost to you.</p>
        <ul className="pts">
          <li>Individual, family &amp; self-employed plans</li>
          <li>Help comparing coverage, cost &amp; savings</li>
          <li>A real agent, never a call center</li>
        </ul>
        <a className="svc-resource" href="/health-insurance-explained/">📘 Health insurance explained: costs &amp; plans</a>
        <a className="svc-resource" href="/aca-history/">📜 The ACA &amp; your income: a brief history</a>
        <a className="svc-resource" href="/bundled-coverage/">🧩 How a bundled plan fills the gaps</a>
        <a className="more" href="#start">Let's talk →</a>
      </div>
      <div className="svc svc-li">
        <div className="ico">❤️</div>
        <h3>Life Insurance</h3>
        <p>Protect the people who count on you — and see how life insurance can fit into a smart, long-term plan.</p>
        <ul className="pts">
          <li>Term &amp; permanent options</li>
          <li>Protection for income and loved ones</li>
          <li>Wealth- and tax-strategy conversations</li>
        </ul>
        <a className="svc-resource" href="/tax-benefits-children/">📄 Read: Tax Benefits of Employing Your Children in Your Business</a>
        <a className="svc-resource" href="/401k-vs-fia/">📊 Quick reference: 401(k) vs. Fixed Indexed Annuity</a>
        <a className="svc-resource" href="/section-162/">💼 For business owners: Section 162 Executive Bonus Plans</a>
        <a className="more" href="#start">Let's talk →</a>
      </div>
    </div>
    <div className="dv-bar">
      <div className="dv-left">
        <div className="dv-ico">🦷</div>
        <div>
          <h3>Dental &amp; Vision plans</h3>
          <p>Build your own dental &amp; vision plan and enroll online in minutes — you can do it all yourself.</p>
        </div>
      </div>
      <a className="dv-btn" href="https://myplan.ameritas.com/id/010W9498" target="_blank" rel="noopener">Dental &amp; Vision →</a>
    </div>
  </div>
</section>


<section id="why" className="why">
  <div className="wrap">
    <div className="sec-head">
      <span className="eyebrow">Why SvelteRX</span>
      <h2>Health decisions feel better with a guide</h2>
      <p>We built SvelteRX around one belief: you deserve clear information, quality options, and a real person who picks up the phone.</p>
    </div>
    <div className="why-grid">
      <div className="why-item"><div className="n">A</div><h3>A real guide</h3><p>Work directly with a licensed professional who explains your options in plain terms — not a call center.</p></div>
      <div className="why-item"><div className="n">B</div><h3>Everything in one place</h3><p>Coverage, concierge care, and wellness under one roof, so you're not juggling a dozen companies.</p></div>
      <div className="why-item"><div className="n">C</div><h3>Built around you</h3><p>We start with what you need and where you are — then help you find what actually fits your life.</p></div>
    </div>
  </div>
</section>


<section id="informed">
  <div className="wrap">
    <div className="sec-head">
      <span className="eyebrow">Stay Informed</span>
      <h2>Health insurance keeps changing — stay ahead of it</h2>
      <p>Premiums, subsidies, and enrollment rules shift every year. Here's your countdown to Open Enrollment, plus the latest headlines on what's changing and why.</p>
    </div>
    <div className="informed-grid">
      <div className="oe-card">
        <span className="oe-tag">Open Enrollment · 2027 Coverage</span>
        <Countdown />
        <div className="oe-dates">Nov 1 – Dec 15, 2026 · HealthCare.gov &amp; most states</div>
        <div className="oe-note">Some state marketplaces extend to Dec 31. Idaho opens Oct 15; Georgia opens Oct 19. Plans start Jan 1, 2027.</div>
        <a className="oe-btn" href="#start">Get help enrolling →</a>
      </div>
      <div className="news-card">
        <div className="news-head"><h3>Latest health insurance news</h3><span className="news-live">● LIVE</span></div>
        <div id="newsList" className="news-list"><div className="news-loading">Loading the latest headlines…</div></div>
        <a className="news-more" id="newsMore" href="https://news.google.com/search?q=health%20insurance" target="_blank" rel="noopener">See more news →</a>
      </div>
    </div>
    <p className="informed-disc">Headlines are pulled automatically from Google News for general information only — not medical, insurance, or legal advice. Dates and rules can change; always confirm current details at HealthCare.gov or with a licensed agent.</p>
  </div>
</section>


<section id="how">
  <div className="wrap">
    <div className="sec-head">
      <span className="eyebrow">How It Works</span>
      <h2>Getting started is simple</h2>
      <p>Three easy steps — at your pace, with no obligation.</p>
    </div>
    <div className="steps">
      <div className="step"><div className="num">01</div><h3>Tell us what you need</h3><p>Pick a service and share a few details so we understand where you're starting from.</p></div>
      <div className="step"><div className="num">02</div><h3>Talk with a guide</h3><p>A licensed professional walks you through your options and answers every question in plain language.</p></div>
      <div className="step"><div className="num">03</div><h3>Get set up</h3><p>Move forward with what fits — and keep our support for whatever comes next.</p></div>
    </div>
  </div>
</section>



<section id="start" className="cta">
  <div className="wrap cta-grid">
    <div>
      <h2>Ready to explore your options?</h2>
      <p>Share what you're looking for and a guide will reach out. It's free to ask, and there's never any pressure.</p>
      <p >Prefer to pick a time? Grab a slot right on my calendar.</p>
      <a href="https://calendar.app.google/oPJUY6eeG7Rpvp2A8" target="_blank" rel="noopener" className="btn" >📅 Schedule a call</a>
    </div>
    <div className="formcard">
      <h3>Get started today</h3>
      <p className="sub">A guide will follow up personally.</p>
      <div className="field"><label>First name</label><input type="text" placeholder="Your first name" /></div>
      <div className="field"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
      <div className="field"><label>Phone</label><input type="tel" placeholder="(555) 555-5555" /></div>
      <div className="field"><label>I'm interested in</label>
        <select>
          <option value="">Choose a service…</option>
          <option>Private Health Insurance</option>
          <option>Life Insurance</option>
          <option>Concierge Medicine</option>
          <option>GLP-1 Weight-Loss Program</option>
          <option>Dental &amp; Vision</option>
          <option>I'm not sure yet</option>
        </select>
      </div>
      <div className="field"><label>Anything you'd like us to know? <span >(optional)</span></label><textarea placeholder="Tell us a little about what you're looking for…"></textarea></div>
      <button className="btn btn-primary" onClick={() => {}}>Get started</button>
      <p className="formnote">By submitting, you agree that SvelteRX and a licensed agent may contact you by phone, text, and email at the number and address you provide — including with automated technology — about health and wellness products and services. Consent is not a condition of any purchase, and message/data rates may apply. See our <a href="/privacy/">Privacy Policy</a>.</p>
    </div>
  </div>
</section>


<footer>
  <div className="wrap">
    <div className="foot-grid">
      <div className="foot-logo">
        <b>Svelte<span>RX</span></b>
        <p>Health &amp; wellness, personally guided. Health and life insurance, concierge medicine, and wellness — all delivered through one Private Healthcare Network.</p>
      </div>
      <div className="foot-col">
        <h4>Services</h4>
        <a href="/health-insurance-explained/">Private Health Insurance</a>
        <a href="/tax-benefits-children/">Life Insurance</a>
        <a href="/concierge/">Concierge Medicine</a>
        <a href="/glp1/">GLP-1 Weight-Loss Program</a>
      </div>
      <div className="foot-col">
        <h4>Company</h4>
        <a href="/about/">About</a>
        <a href="/contact/">Contact / Get Started</a>
        <a href="/privacy/">Privacy Policy</a>
        <a href="/terms/">Terms of Use</a>
      </div>
    </div>
    <div className="disclaimer">
      SvelteRX provides general information about health and wellness products and services and connects you with licensed professionals. Content on this site is for informational purposes only and is not medical, insurance, or financial advice.
      <span className="fine">© 2026 SvelteRX. All rights reserved. · Every page's footer includes the same quick "Get Started" form with the service dropdown.</span>
    </div>
  </div>
</footer>





<div id="srx-bot">
<button id="srx-launch" aria-label="Open chat">
  <span>[ICON]</span>
</button>
<div id="srx-panel" role="dialog" aria-label="SvelteRX assistant">
  <div className="srx-head">
    <span className="srx-av"><span>[ICON]</span></span>
    <div><b>SvelteRX Assistant</b><small>Here to help &mdash; not medical advice</small></div>
    <button className="srx-x" aria-label="Close">&times;</button>
  </div>
  <div className="srx-body" id="srx-body"></div>
  <div className="srx-qr" id="srx-qr"></div>
  <div className="srx-form" id="srx-form">
    <input id="srx-name" placeholder="Your name" autoComplete="name" />
    <input id="srx-email" placeholder="Email" autoComplete="email" type="email" />
    <input id="srx-phone" placeholder="Phone (optional)" autoComplete="tel" type="tel" />
    <textarea id="srx-note" placeholder="Anything you'd like us to know? (optional)"></textarea>
    <button className="srx-send" id="srx-submit">Continue</button>
  </div>
  <div className="srx-foot">Powered by SvelteRX</div>
</div>
</div>





<meta id="bilmur" property="bilmur:data" content="" data-customproperties="{&quot;woo_active&quot;:&quot;0&quot;,&quot;logged_in&quot;:&quot;0&quot;,&quot;wptheme&quot;:&quot;svelterx-theme&quot;,&quot;wptheme_is_block&quot;:&quot;0&quot;}" data-provider="wordpress.com" data-service="atomic"  data-site-tz="America/Chicago"  />






    </div>
  );
}
