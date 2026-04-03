import { Link } from '@remix-run/react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img src="/logo.svg" alt="20g by NutriNomNom" style={{ height: 64, width: 'auto', borderRadius: '18%' }} />
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>20g</div>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>by NutriNomNom</div>
              </div>
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
