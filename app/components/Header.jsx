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
      <header className="site-header" style={{ position: 'relative' }}>
        <div className="site-header__inner">
          {/* Logo */}
          <Link to="/" className="site-header__logo">
            <img src="/logo.svg" alt="20g by NutriNomNom" style={{ height: 44, width: 'auto' }} />
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

            {/* Mobile menu toggle - shown on mobile via CSS */}
            <button
              className="cart-icon-btn hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="4" x2="18" y2="18"/>
                  <line x1="18" y1="4" x2="4" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="5" x2="19" y2="5"/>
                  <line x1="3" y1="11" x2="19" y2="11"/>
                  <line x1="3" y1="17" x2="19" y2="17"/>
                </svg>
              )}
            </button>

            <Link to="/collections/all" className="btn btn-primary btn-sm hide-on-mobile" style={{ marginLeft: 8 }}>
              Shop Now
            </Link>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/collections/all" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/pages/our-story" onClick={() => setMenuOpen(false)}>Our Story</Link>
            <Link to="/pages/why-20g" onClick={() => setMenuOpen(false)}>Why 20g?</Link>
            <Link to="/pages/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          </div>
        )}
      </header>

      {/* Bottom navigation — mobile only */}
      <nav className="bottom-nav">
        <Link to="/" className="bottom-nav__tab">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </Link>
        <Link to="/collections/all" className="bottom-nav__tab">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span>Shop</span>
        </Link>
        <button className="bottom-nav__tab" onClick={() => setCartOpen(true)}>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
            </svg>
            <Suspense fallback={null}>
              <Await resolve={cartPromise}>
                {(cart) => {
                  const count = cart?.totalQuantity || 0;
                  return count > 0 ? <span className="cart-badge">{count}</span> : null;
                }}
              </Await>
            </Suspense>
          </div>
          <span>Cart</span>
        </button>
        <button className="bottom-nav__tab" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="5" x2="19" y2="5"/>
            <line x1="3" y1="11" x2="19" y2="11"/>
            <line x1="3" y1="17" x2="19" y2="17"/>
          </svg>
          <span>Menu</span>
        </button>
      </nav>

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
