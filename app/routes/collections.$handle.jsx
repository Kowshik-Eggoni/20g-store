import { useLoaderData, Link } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: 20, sortKey: TITLE) {
        nodes {
          id
          handle
          title
          description
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 5) {
            nodes {
              id
              title
              price { amount currencyCode }
              availableForSale
              selectedOptions { name value }
            }
          }
          images(first: 1) {
            nodes { url altText width height }
          }
        }
      }
    }
    # Fallback: if collection not found, get all products
    products(first: 20, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        description
        tags
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        variants(first: 5) {
          nodes {
            id
            title
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
        images(first: 1) {
          nodes { url altText width height }
        }
      }
    }
  }
`;

export async function loader({ params, context }) {
  const { storefront } = context;
  const handle = params.handle || 'all';

  try {
    const data = await storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: { handle },
    });

    const products = data.collection
      ? data.collection.products.nodes
      : data.products.nodes;

    return json({
      collectionTitle: data.collection?.title || 'All Products',
      collectionDescription: data.collection?.description || '',
      products,
    });
  } catch (e) {
    throw new Response('Collection not found', { status: 404 });
  }
}

const PRODUCT_META = {
  'classic-gunpowder': { sub: 'Peanut, Chilli & Protein Podi', emoji: '🌶️', protein: '22g', badge: '#E65100', accent: '#FFF3E0' },
  'moringa-gunpowder': { sub: 'Moringa, Peanut & Protein Podi', emoji: '🌿', protein: '22g', badge: '#1A5C35', accent: '#E8F5E9' },
  'protein-oatmeal': { sub: 'Oats, Almonds & Whey Protein Mix', emoji: '🥣', protein: '23g', badge: '#6A1B9A', accent: '#FFF8E1' },
};

function formatPrice(amount, currencyCode = 'INR') {
  const num = parseFloat(amount);
  return currencyCode === 'INR' ? `₹${Math.round(num)}` : `${currencyCode} ${num}`;
}

export default function Collection() {
  const { collectionTitle, products } = useLoaderData();

  return (
    <>
      <Header />

      {/* Page header */}
      <div style={{ background: 'var(--color-ink)', color: 'white', padding: '80px 0 56px' }}>
        <div className="container">
          <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 600 }}>← Home</Link>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, letterSpacing: '-0.02em' }}>
            {collectionTitle}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: 8, fontSize: '1rem' }}>
            Every product delivers 20g of real protein per serving.
          </p>
        </div>
      </div>

      <main style={{ background: 'var(--color-cream)', padding: '64px 0 96px' }}>
        <div className="container">
          <div className="g3">
            {products.map((p) => {
              const meta = PRODUCT_META[p.handle] || {};
              const img = p.images?.nodes?.[0];
              const baseVariant = p.variants?.nodes?.[0];
              const price = baseVariant
                ? formatPrice(baseVariant.price.amount, baseVariant.price.currencyCode)
                : formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode);

              return (
                <Link key={p.handle} to={`/products/${p.handle}`} className="prod-card">
                  <div className="prod-img" style={{ background: meta.accent || '#F5F5F5', padding: 0, overflow: 'hidden', position: 'relative' }}>
                    {img
                      ? <img src={img.url} alt={img.altText || p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontSize: '3rem' }}>{meta.emoji}</span>
                    }
                    <span className="prod-badge" style={{ background: meta.badge }}>💪 {meta.protein || '20g'} protein</span>
                  </div>
                  <div className="prod-body">
                    <div className="prod-name">{p.title}</div>
                    <div className="prod-sub">{meta.sub || p.description?.substring(0, 60)}</div>
                    <div className="prod-footer">
                      <div>
                        <div className="prod-price">{price}</div>
                        <div className="prod-detail">250g · ~5 servings</div>
                      </div>
                      <div className="btn btn-primary btn-sm">View →</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
