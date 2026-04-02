import { Link } from '@remix-run/react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="40" height="40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" rx="64" fill="#1A5C35"/>
                <text x="28" y="316" fontFamily="Arial Black" fontSize="295" fontWeight="900" fill="white">2</text>
                <ellipse cx="268" cy="230" rx="70" ry="82" fill="white"/>
                <rect x="238" y="60" width="82" height="160" rx="18" fill="white"/>
                <ellipse cx="238" cy="92" rx="22" ry="30" fill="white" transform="rotate(-18,238,92)"/>
                <text x="325" y="380" fontFamily="Arial" fontSize="62" fill="white">g</text>
              </svg>
              <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white', letterSpacing: '-0.02em' }}>
                20g by NutriNomNom
              </span>
            </div>
            <p className="site-footer__brand-blurb">
              20 grams of protein in every single serving. No new habits, no hard choices —
              just the food you already love, working harder for you.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <a href="https://instagram.com/nutri.nomnom" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', transition: 'color 200ms' }}
                aria-label="Instagram">
                📷
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem' }}
                aria-label="WhatsApp">
                💬
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <div className="site-footer__col-title">Shop</div>
            <nav className="site-footer__links">
              <Link to="/products/classic-gunpowder">Classic Gunpowder</Link>
              <Link to="/products/moringa-gunpowder">Moringa Gunpowder</Link>
              <Link to="/products/protein-oatmeal">Protein Oatmeal</Link>
              <Link to="/collections/all">All Products</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <div className="site-footer__col-title">Learn</div>
            <nav className="site-footer__links">
              <Link to="/pages/our-story">Our Story</Link>
              <Link to="/pages/why-20g">Why 20g?</Link>
              <Link to="/pages/ingredients">Ingredients</Link>
              <Link to="/pages/faq">FAQ</Link>
            </nav>
          </div>

          {/* Help */}
          <div>
            <div className="site-footer__col-title">Help</div>
            <nav className="site-footer__links">
              <Link to="/pages/shipping">Shipping Info</Link>
              <Link to="/pages/returns">Returns</Link>
              <Link to="/pages/contact">Contact Us</Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </nav>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 NutriNomNom. All rights reserved.</span>
          <div style={{display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'flex-end'}}>
            <Link to="/pages/terms" style={{color:'rgba(255,255,255,0.45)', fontSize:'0.8rem', transition:'color 200ms'}}
              onMouseOver={e => e.target.style.color='white'}
              onMouseOut={e => e.target.style.color='rgba(255,255,255,0.45)'}>
              Terms &amp; Conditions
            </Link>
            <Link to="/pages/privacy" style={{color:'rgba(255,255,255,0.45)', fontSize:'0.8rem', transition:'color 200ms'}}
              onMouseOver={e => e.target.style.color='white'}
              onMouseOut={e => e.target.style.color='rgba(255,255,255,0.45)'}>
              Privacy Policy
            </Link>
            <Link to="/pages/shipping" style={{color:'rgba(255,255,255,0.45)', fontSize:'0.8rem', transition:'color 200ms'}}
              onMouseOver={e => e.target.style.color='white'}
              onMouseOut={e => e.target.style.color='rgba(255,255,255,0.45)'}>
              Shipping Policy
            </Link>
            <Link to="/pages/returns" style={{color:'rgba(255,255,255,0.45)', fontSize:'0.8rem', transition:'color 200ms'}}
              onMouseOver={e => e.target.style.color='white'}
              onMouseOut={e => e.target.style.color='rgba(255,255,255,0.45)'}>
              Returns &amp; Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
