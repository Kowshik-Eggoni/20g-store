import { Link, useLocation, useRouteLoaderData } from '@remix-run/react';
import { useState, Suspense } from 'react';
import { Await } from '@remix-run/react';
import { CartDrawer } from './CartDrawer';

export function Header({ cartCount = 0 }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const rootData = useRouteLoaderData('root');
  const cartPromise = rootData?.cart;

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          {/* Logo */}
          <Link to="/" className="site-header__logo">
            <svg width="44" height="44" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="400" rx="64" fill="#1A5C35"/>
              <text x="28" y="316" fontFamily="Arial Black, Impact, sans-serif" fontSize="295" fontWeight="900" fill="white">2</text>
              <ellipse cx="268" cy="230" rx="70" ry="82" fill="white"/>
              <rect x="238" y="60" width="82" height="160" rx="18" fill="white"/>
              <ellipse cx="238" cy="92" rx="22" ry="30" fill="white" transform="rotate(-18,238,92)"/>
              <text x="325" y="380" fontFamily="Arial, sans-serif" fontSize="62" fontWeight="400" fill="white">g</text>
            </svg>
            <span style={{
              fontFamily: 'Jost, Arial Black, sans-serif',
              fontWeight: 900,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
              color: '#1A5C35',
            }}>
              20g<span style={{ color: '#8A8A8A', fontWeight: 400, fontSize: '0.7rem', marginLeft: 4 }}>by NutriNomNom</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="site-header__nav">
            <Link to="/collections/all">Shop</Link>
            <Link to="/pages/our-story">Our Story</Link>
            <Link to="/pages/why-20g">Why 20g?</Link>
            <Link to="/pages/faq">FAQ</Link>
          </nav>

          {/* Actions */}
          <div className="site-header__actions">
            {/* Cart */}
            <button
              className="cart-icon-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <Suspense fallback={null}>
                <Await resolve={cartPromise}>
                  {(cart) => {
                    const count = cart?.totalQuantity || 0;
                    return count > 0 ? <span className="cart-badge">{count}</span> : null;
                  }}
                </Await>
              </Suspense>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="cart-icon-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ display: 'none' }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="5" x2="19" y2="5"/>
                <line x1="3" y1="11" x2="19" y2="11"/>
                <line x1="3" y1="17" x2="19" y2="17"/>
              </svg>
            </button>

            <Link to="/collections/all" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
              Shop Now
            </Link>
          </div>
        </div>
      </header>

      <Suspense fallback={<CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} lines={[]} />}>
        <Await resolve={cartPromise}>
          {(cart) => (
            <CartDrawer
              open={cartOpen}
              onClose={() => setCartOpen(false)}
              lines={cart?.lines?.edges?.map(e => e.node) || cart?.lines?.nodes || []}
              checkoutUrl={cart?.checkoutUrl}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}
