import { Link } from '@remix-run/react';
import { useState } from 'react';

export function CartDrawer({ open, onClose, lines = [], total = '₹0.00' }) {
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
            lines.map((line) => (
              <div key={line.id} className="cart-item">
                <div className="cart-item__image" style={{ background: 'var(--color-green-light)' }}>
                  {line.image && (
                    <img src={line.image} alt={line.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  )}
                </div>
                <div>
                  <div className="cart-item__name">{line.title}</div>
                  <div className="cart-item__variant">{line.variantTitle}</div>
                  <div className="cart-item__price">₹{line.price}</div>
                  <div className="cart-item__qty">
                    <button aria-label="Decrease quantity">−</button>
                    <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{line.quantity}</span>
                    <button aria-label="Increase quantity">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', marginBottom: 12 }}>
              Shipping calculated at checkout
            </p>
            <a href="/checkout" className="btn btn-primary w-full">
              Checkout →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
