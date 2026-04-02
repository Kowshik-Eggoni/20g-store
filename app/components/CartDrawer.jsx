import { Link } from '@remix-run/react';
import { CartForm } from '@shopify/hydrogen';

export function CartDrawer({ open, onClose, lines = [], checkoutUrl }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-drawer-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">Your Cart</span>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cart-drawer__items">
          {lines.length === 0 ? (
            <div className="cart-drawer__empty">
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🛒</div>
              <p style={{ fontWeight: 600 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.875rem', marginTop: 8, color: 'var(--color-ink-muted)' }}>
                Add some protein-packed goodness!
              </p>
              <button
                onClick={onClose}
                className="btn btn-primary btn-sm"
                style={{ marginTop: 20 }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            lines.map((line) => {
              const { merchandise, quantity, id: lineId } = line;
              const price = Math.round(parseFloat(merchandise?.price?.amount || 0));
              const image = merchandise?.image?.url;
              const title = merchandise?.product?.title;
              const variantTitle = merchandise?.title !== 'Default Title' ? merchandise?.title : null;

              return (
                <div key={lineId} className="cart-item">
                  <div className="cart-item__image" style={{ background: 'var(--color-green-light)' }}>
                    {image && (
                      <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="cart-item__name">{title}</div>
                    {variantTitle && <div className="cart-item__variant">{variantTitle}</div>}
                    <div className="cart-item__price">₹{price}</div>
                    <div className="cart-item__qty">
                      <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{ lines: [{ id: lineId, quantity: Math.max(0, quantity - 1) }] }}>
                        <button type="submit" aria-label="Decrease quantity">−</button>
                      </CartForm>
                      <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{quantity}</span>
                      <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{ lines: [{ id: lineId, quantity: quantity + 1 }] }}>
                        <button type="submit" aria-label="Increase quantity">+</button>
                      </CartForm>
                    </div>
                  </div>
                  <CartForm route="/cart" action={CartForm.ACTIONS.LinesRemove} inputs={{ lineIds: [lineId] }}>
                    <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-muted)', fontSize: '1.2rem', padding: '4px' }} aria-label="Remove item">×</button>
                  </CartForm>
                </div>
              );
            })
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Subtotal</span>
              <span>
                ₹{lines.reduce((sum, line) => {
                  return sum + Math.round(parseFloat(line.merchandise?.price?.amount || 0)) * line.quantity;
                }, 0)}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', marginBottom: 12 }}>
              Shipping calculated at checkout
            </p>
            {checkoutUrl ? (
              <a href={checkoutUrl} className="btn btn-primary w-full">
                Checkout →
              </a>
            ) : (
              <a href="/checkout" className="btn btn-primary w-full">
                Checkout →
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}
