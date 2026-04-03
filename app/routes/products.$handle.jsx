import { useState } from 'react';
import { json } from '@shopify/remix-oxygen';
import { Link, useLoaderData } from '@remix-run/react';
import { CartForm } from '@shopify/hydrogen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// ── Storefront API query ──────────────────────────────────────────────────────
const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      tags
      images(first: 8) {
        nodes {
          url
          altText
          width
          height
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

// ── Brand-specific enrichment data (not stored in Shopify) ───────────────────
const PRODUCT_META = {
  'classic-gunpowder': {
    fullName: 'Classic Gunpowder — Protein Podi',
    subtitle: 'Your everyday podi, now with 22g of protein per serving.',
    emoji: '🌶️',
    color: '#FFF3E0',
    accentColor: '#E65100',
    howToUse: [
      { step: 'Rice + Ghee', desc: 'Mix 1 serving (47g) with a teaspoon of ghee into hot rice. Eat as usual.' },
      { step: 'Dosa / Idli', desc: 'Spread or serve as a side chutney powder. Works exactly like regular podi.' },
      { step: 'Chapati / Roti', desc: 'Mix with butter or oil as a spread. Elevated protein paratha hack.' },
    ],
    nutrition: {
      servingSize: '47g (1 serving)',
      servingsPerPack: '~5.3 per 250g pack',
      calories: 212,
      protein: 22.1,
      carbs: 11.8,
      fat: 9.6,
      fibre: 4.2,
      sodium: 380,
    },
    ingredients: [
      'Defatted Peanut Flour (46%)',
      'Whole Peanuts (21%)',
      'Whey Protein Concentrate WPC80 (21%)',
      'Kashmiri Chilli Powder (6%)',
      'Garlic (2%)',
      'Salt (4%)',
    ],
    allergens: 'Contains: Peanuts, Milk (Whey). Produced in a facility that handles tree nuts.',
  },
  'moringa-gunpowder': {
    fullName: 'Moringa Gunpowder — Superfood Protein Podi',
    subtitle: 'Protein podi with the quiet power of moringa. 22g per serving.',
    emoji: '🌿',
    color: '#E8F5E9',
    accentColor: '#1A5C35',
    howToUse: [
      { step: 'Rice + Ghee', desc: 'Mix 1 serving with ghee into hot rice. The moringa flavour is mild and earthy.' },
      { step: 'Dosa / Idli', desc: 'Use as your everyday podi. The colour adds a beautiful green tint.' },
      { step: 'Smoothie Boost', desc: 'Stir half a serving into a banana or mango smoothie for a protein-moringa hit.' },
    ],
    nutrition: {
      servingSize: '47g (1 serving)',
      servingsPerPack: '~5.3 per 250g pack',
      calories: 208,
      protein: 22.0,
      carbs: 11.2,
      fat: 9.4,
      fibre: 4.5,
      sodium: 360,
    },
    ingredients: [
      'Defatted Peanut Flour (46.5%)',
      'Whey Protein Concentrate WPC80 (23%)',
      'Whole Peanuts (15%)',
      'Moringa Leaf Powder (6%)',
      'Dried Red Chilli (3%)',
      'Garlic (2%)',
      'Salt (4%)',
    ],
    allergens: 'Contains: Peanuts, Milk (Whey). Produced in a facility that handles tree nuts.',
  },
  'protein-oatmeal': {
    fullName: 'Protein Oatmeal Mix — Just Add Hot Water',
    subtitle: '23g of protein for breakfast. Hot water and a fruit is all you add.',
    emoji: '🥣',
    color: '#F3E5F5',
    accentColor: '#6A1B9A',
    howToUse: [
      { step: 'Hot water method', desc: 'Add 68g to a bowl, pour 200ml hot water, stir well, wait 2 minutes. Add banana or any fruit.' },
      { step: 'Milk method', desc: 'Use hot milk instead of water for a creamier, higher-protein bowl.' },
      { step: 'Overnight prep', desc: 'Mix with cold milk the night before, refrigerate. Ready to eat in the morning — no heating needed.' },
    ],
    nutrition: {
      servingSize: '68g (1 serving)',
      servingsPerPack: '~3.7 per 250g pack',
      calories: 285,
      protein: 23.2,
      carbs: 34.1,
      fat: 8.8,
      fibre: 5.4,
      sodium: 220,
    },
    ingredients: [
      'Instant Oats (22%)',
      'Skim Milk Powder (24%)',
      'Whey Protein Concentrate WPC80 (16%)',
      'Date Powder (22%)',
      'Peanut Butter Powder (15%)',
      'Chia Seeds (2%)',
      'Almond Flakes (4%)',
      'Pumpkin Seeds (4%)',
      'Cinnamon Powder (0.2%)',
    ],
    allergens: 'Contains: Oats, Milk, Peanuts, Tree Nuts (Almonds). May contain traces of other tree nuts.',
  },
};

function formatPrice(amount) {
  return `₹${Math.round(parseFloat(amount))}`;
}

// ── Remix loader ──────────────────────────────────────────────────────────────
export async function loader({ params, context }) {
  const { storefront } = context;
  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle: params.handle },
  });

  if (!product) {
    throw new Response('Product not found', { status: 404 });
  }

  return json({ product });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { product } = useLoaderData();

  const meta = PRODUCT_META[product.handle] || {
    fullName: product.title,
    subtitle: product.description?.slice(0, 120) || '',
    emoji: '🛒',
    color: '#F5F5F5',
    accentColor: '#085639',
    howToUse: [],
    nutrition: null,
    ingredients: [],
    allergens: '',
  };

  // Group variants by weight/size option
  const variants = product.variants.nodes;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [subscription, setSubscription] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const selectedVariant = variants[selectedVariantIndex];
  const basePrice = parseFloat(selectedVariant?.price?.amount || 0);
  const subscriptionPrice = Math.round(basePrice * 0.85);
  const unitPrice = subscription ? subscriptionPrice : Math.round(basePrice);
  const displayPrice = unitPrice * quantity;

  const images = product.images.nodes;

  // addedToCart is now driven by fetcher state (see CartForm below)

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ padding: '12px var(--space-xl)' }}>
          <nav style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link to="/" style={{ color: 'var(--color-ink-muted)' }}>Home</Link>
            <span>/</span>
            <Link to="/collections/all" style={{ color: 'var(--color-ink-muted)' }}>Products</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main product layout */}
      <section style={{ background: 'white', padding: 'var(--space-2xl) 0' }}>
        <div className="container">
          <div className="product-layout">

            {/* LEFT: Product image gallery */}
            <div>
              <div style={{
                background: meta.color,
                borderRadius: 'var(--radius-xl)',
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: 'var(--space-md)',
              }}>
                {images.length > 0 ? (
                  <img
                    src={images[activeImage]?.url}
                    alt={images[activeImage]?.altText || product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ fontSize: '8rem' }}>{meta.emoji}</span>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: 72, height: 72,
                        background: meta.color,
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: i === activeImage ? `2px solid ${meta.accentColor}` : '2px solid transparent',
                        transition: 'border-color 200ms',
                      }}
                    >
                      <img src={img.url} alt={img.altText || `View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product info & purchase */}
            <div>
              <span className="protein-badge" style={{ background: meta.accentColor }}>
                💪 {meta.nutrition?.protein}g protein per serving
              </span>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginTop: 'var(--space-md)',
                marginBottom: 'var(--space-sm)',
              }}>
                {meta.fullName}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-light)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}>
                {meta.subtitle}
              </p>

              {/* Variant / size selector */}
              {variants.length > 1 && (
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Choose Size
                  </p>
                  <div className="size-selector">
                    {variants.map((v, i) => {
                      const weightOption = v.selectedOptions.find(o => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'weight');
                      const label = weightOption ? weightOption.value : v.title;
                      return (
                        <div
                          key={v.id}
                          className={`size-option ${selectedVariantIndex === i ? 'active' : ''}`}
                          onClick={() => setSelectedVariantIndex(i)}
                          style={{ opacity: v.availableForSale ? 1 : 0.5 }}
                        >
                          <div className="size-option__weight">{label}</div>
                          <div className="size-option__price">{formatPrice(v.price.amount)}</div>
                          {!v.availableForSale && (
                            <div style={{ fontSize: '0.7rem', color: '#999', marginTop: 2 }}>Sold out</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Subscription toggle */}
              <div style={{
                background: subscription ? 'var(--color-green-light)' : 'var(--color-cream)',
                border: `2px solid ${subscription ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md) var(--space-lg)',
                marginBottom: 'var(--space-lg)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }} onClick={() => setSubscription(!subscription)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem' }}>🔄</span>
                      Subscribe & Save 15%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: 4 }}>
                      Delivered monthly · Cancel anytime
                    </div>
                  </div>
                  <div style={{
                    width: 22, height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${subscription ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                    background: subscription ? 'var(--color-green-dark)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.8rem',
                    transition: 'all 200ms',
                  }}>
                    {subscription ? '✓' : ''}
                  </div>
                </div>
              </div>

              {/* Price + Add to cart */}
              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontWeight: 900, fontSize: '2.2rem', color: 'var(--color-ink)' }}>
                    ₹{displayPrice}
                  </span>
                  {subscription && (
                    <span style={{ fontSize: '1.1rem', color: 'var(--color-ink-muted)', textDecoration: 'line-through' }}>
                      ₹{Math.round(basePrice) * quantity}
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: '6px 4px' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                  <CartForm
                    route="/cart"
                    action={CartForm.ACTIONS.LinesAdd}
                    inputs={{
                      lines: [{
                        merchandiseId: selectedVariant?.id,
                        quantity,
                      }],
                    }}
                  >
                    {(fetcher) => (
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{
                          flex: 1,
                          background: fetcher.state !== 'idle' ? '#2E7D4F' : undefined,
                          opacity: selectedVariant?.availableForSale === false ? 0.5 : 1,
                          cursor: selectedVariant?.availableForSale === false ? 'not-allowed' : 'pointer',
                        }}
                        disabled={selectedVariant?.availableForSale === false || fetcher.state !== 'idle'}
                      >
                        {selectedVariant?.availableForSale === false
                          ? 'Out of Stock'
                          : fetcher.state !== 'idle' ? '✓ Adding...' : 'Add to Cart'}
                      </button>
                    )}
                  </CartForm>
                </div>
              </div>

              {/* Trust micro-signals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 'var(--space-lg)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)' }}>
                {[
                  '🚚 Free shipping on orders above ₹999',
                  '💯 100% clean ingredients — readable label',
                  '🔄 Easy returns within 7 days',
                  '💬 Questions? WhatsApp us anytime',
                ].map((t) => (
                  <div key={t} style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', gap: 8 }}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS: Description / Nutrition / Ingredients ─────────────────── */}
      <ProductTabs product={product} meta={meta} />

      {/* ── HOW TO USE ─────────────────────────────────────────────────── */}
      {meta.howToUse.length > 0 && (
        <section className="section" style={{ background: 'var(--color-green-light)' }}>
          <div className="container">
            <div className="text-center mb-xl">
              <p className="text-xs text-green mb-sm">RIDICULOUSLY SIMPLE</p>
              <h2 className="text-display text-h2">How to use {product.title}</h2>
            </div>
            <div className="grid-3" style={{ maxWidth: 860, margin: '0 auto' }}>
              {meta.howToUse.map((item, i) => (
                <div key={item.step} style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-xl)',
                }}>
                  <div style={{
                    width: 36, height: 36,
                    background: 'var(--color-green-dark)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    marginBottom: 'var(--space-md)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 8 }}>{item.step}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

// ── Tabbed section ─────────────────────────────────────────────────────────
function ProductTabs({ product, meta }) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'About' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'ingredients', label: 'Ingredients' },
  ];

  return (
    <section style={{ background: 'white', borderTop: '1px solid var(--color-border)' }}>
      {/* Tab buttons */}
      <div className="container">
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--color-border)',
          gap: 'var(--space-xl)',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid var(--color-green-dark)' : '3px solid transparent',
                marginBottom: '-2px',
                padding: 'var(--space-lg) 0',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: activeTab === tab.id ? 800 : 500,
                color: activeTab === tab.id ? 'var(--color-green-dark)' : 'var(--color-ink-muted)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ padding: 'var(--space-2xl) var(--space-xl)' }}>
        {activeTab === 'description' && (
          <div style={{ maxWidth: 680 }}>
            {product.description.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-ink-light)', marginBottom: 'var(--space-lg)' }}>
                {para}
              </p>
            ))}
          </div>
        )}

        {activeTab === 'nutrition' && meta.nutrition && (
          <div style={{ display: 'flex', gap: 'var(--space-3xl)', flexWrap: 'wrap' }}>
            {/* Nutrition label */}
            <div className="nutrition-label">
              <div className="nutrition-label__title">Nutrition Facts</div>
              <div className="nutrition-label__serving">
                <div>{meta.nutrition.servingSize}</div>
                <div>{meta.nutrition.servingsPerPack}</div>
              </div>
              <div className="nutrition-label__row nutrition-label__row--bold nutrition-label__thick">
                <span>Calories</span>
                <span>{meta.nutrition.calories}</span>
              </div>
              <div className="nutrition-label__row nutrition-label__row--bold">
                <span>Total Fat</span>
                <span>{meta.nutrition.fat}g</span>
              </div>
              <div className="nutrition-label__row nutrition-label__row--bold">
                <span>Total Carbohydrate</span>
                <span>{meta.nutrition.carbs}g</span>
              </div>
              <div className="nutrition-label__row nutrition-label__row--indented">
                <span>Dietary Fibre</span>
                <span>{meta.nutrition.fibre}g</span>
              </div>
              <div className="nutrition-label__row nutrition-label__row--bold" style={{ borderBottom: '4px solid #000', paddingBottom: 8, marginBottom: 4 }}>
                <span>Protein</span>
                <span style={{ color: 'var(--color-green-dark)' }}>{meta.nutrition.protein}g</span>
              </div>
              <div className="nutrition-label__row">
                <span>Sodium</span>
                <span>{meta.nutrition.sodium}mg</span>
              </div>
            </div>

            {/* Macros visual */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 'var(--space-lg)' }}>Macros per serving</h3>
              {[
                { label: 'Protein', value: meta.nutrition.protein, max: 40, color: 'var(--color-green-dark)' },
                { label: 'Carbohydrates', value: meta.nutrition.carbs, max: 60, color: '#2196F3' },
                { label: 'Fat', value: meta.nutrition.fat, max: 30, color: '#FF9800' },
                { label: 'Fibre', value: meta.nutrition.fibre, max: 15, color: '#9C27B0' },
              ].map((macro) => (
                <div key={macro.label} style={{ marginBottom: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{macro.label}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{macro.value}g</span>
                  </div>
                  <div style={{
                    height: 8,
                    background: 'var(--color-border)',
                    borderRadius: 'var(--radius-pill)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, (macro.value / macro.max) * 100)}%`,
                      background: macro.color,
                      borderRadius: 'var(--radius-pill)',
                      transition: 'width 600ms ease',
                    }} />
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: 'var(--space-xl)',
                background: 'var(--color-green-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md) var(--space-lg)',
                border: '1px solid rgba(26,92,53,0.15)',
              }}>
                <div style={{ fontWeight: 800, color: 'var(--color-green-dark)', fontSize: '1.5rem' }}>
                  {meta.nutrition.protein}g
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                  That's {Math.round((meta.nutrition.protein / 0.4))} rotis worth of protein in one serving.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div style={{ maxWidth: 680 }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 'var(--space-lg)' }}>
              Full Ingredients (in order of quantity)
            </h3>
            {meta.ingredients.length > 0 ? (
              <div className="ingredient-list" style={{ marginBottom: 'var(--space-xl)' }}>
                {meta.ingredients.map((ing) => (
                  <span key={ing} className="ingredient-chip">{ing}</span>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)' }}>
                {product.tags.filter(t => t.startsWith('ing:')).map(t => t.replace('ing:', '')).join(', ') || product.description}
              </div>
            )}
            {meta.allergens && (
              <div style={{
                background: '#FFF8E1',
                border: '1px solid #FFD54F',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md) var(--space-lg)',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: '0.9rem' }}>⚠️ Allergen Information</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-light)' }}>{meta.allergens}</div>
              </div>
            )}
            <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-lg)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>🔬 What about additives?</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-light)', lineHeight: 1.7 }}>
                None. No preservatives, no artificial colours, no flavour enhancers, no anti-caking agents.
                Every ingredient you see above is a food. That's our commitment.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
