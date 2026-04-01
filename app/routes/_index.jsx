import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Header} from '../components/Header';
import {Footer} from '../components/Footer';

// ── Storefront API query ──────────────────────────────────────────────────────
const HOMEPAGE_PRODUCTS_QUERY = `#graphql
  query HomepageProducts {
    products(first: 10, sortKey: TITLE) {
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

// ── Server loader ─────────────────────────────────────────────────────────────
export async function loader({context}) {
  const {storefront} = context;
  const {products} = await storefront.query(HOMEPAGE_PRODUCTS_QUERY);
  return json({products: products.nodes});
}

// ── Product display metadata (brand copy, not API data) ───────────────────────
const PRODUCT_META = {
  'classic-gunpowder': {
    sub: 'Peanut, Chilli & Protein Podi',
    tagline: '"Your rice just got a protein upgrade."',
    useWith: ['Rice + Ghee', 'Dosa', 'Idli', 'Chapati'],
    accent: '#FFF3E0',
    badge: '#E65100',
    emoji: '🌶️',
    protein: '22g',
  },
  'moringa-gunpowder': {
    sub: 'Moringa, Peanut & Protein Podi',
    tagline: '"Same tradition. Added supergreens."',
    useWith: ['Rice + Ghee', 'Dosa', 'Idli', 'Roti'],
    accent: '#E8F5E9',
    badge: '#1A5C35',
    emoji: '🌿',
    protein: '22g',
  },
  'protein-oatmeal': {
    sub: 'Oats, Almonds & Whey Protein Mix',
    tagline: '"20g protein before your first meeting."',
    useWith: ['Hot Water', 'Warm Milk', 'Cold Brew', 'Smoothie'],
    accent: '#FFF8E1',
    badge: '#6A1B9A',
    emoji: '🥣',
    protein: '23g',
  },
};

function formatPrice(amount, currencyCode = 'INR') {
  const num = parseFloat(amount);
  return currencyCode === 'INR' ? `₹${Math.round(num)}` : `${currencyCode} ${num}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Homepage() {
  const {products} = useLoaderData();

  const TICKER_ITEMS = [
    '💪 20g Protein Per Serving',
    '🌿 Clean Ingredients',
    '🫙 Shelf Stable — Travel Friendly',
    '🇮🇳 Made in India',
    '⚡ No New Habits Required',
    '🚚 Free Shipping above ₹599',
  ];

  return (
    <>
      <Header />
      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item} <span className="dot"></span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-inner">
          <div>
            <div className="eyebrow">🌱 By NutriNomNom · Hyderabad</div>
            <h1 className="hero-title">
              Your daily food.<br/>Now with<br/><em>20g protein.</em>
            </h1>
            <p className="hero-sub">
              Gunpowder podi for your rice. Oatmeal mix for your mornings.
              One serving delivers 20g of real, clean protein.
              No new habits. No compromise on taste.
            </p>
            <div className="hero-cta">
              <a href="#products" className="btn btn-white btn-lg">Shop Now</a>
              <a href="#story" className="btn btn-ghost btn-lg">Why 20g? →</a>
            </div>
          </div>
          <div className="product-tiles">
            {products.map((p) => {
              const meta = PRODUCT_META[p.handle] || {};
              const img = p.images?.nodes?.[0];
              const price = formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode);
              return (
                <Link key={p.handle} to={`/products/${p.handle}`} className="ptile">
                  {img
                    ? <img src={img.url} alt={img.altText || p.title}
                        style={{width:'100%',height:'90px',objectFit:'cover',borderRadius:'8px 8px 0 0',display:'block'}}/>
                    : <div className="ptile-icon">{meta.emoji}</div>
                  }
                  <div className="ptile-name" style={{marginTop:'8px'}}>{p.title}</div>
                  <div className="ptile-badge">💪 {meta.protein || '20g'} protein</div>
                  <div className="ptile-price">{price}</div>
                </Link>
              );
            })}
            <div className="ptile" style={{opacity:0.45,cursor:'default'}}>
              <div className="ptile-icon">🍫</div>
              <div className="ptile-name">Protein Bar</div>
              <div className="ptile-badge" style={{color:'rgba(255,255,255,0.5)'}}>Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        <div className="trust-item"><div className="trust-icon">🧪</div>Lab Tested</div>
        <div className="trust-item"><div className="trust-icon">🌾</div>Real Ingredients</div>
        <div className="trust-item"><div className="trust-icon">🏋️</div>20g Every Serving</div>
        <div className="trust-item"><div className="trust-icon">🇮🇳</div>Made in India</div>
        <div className="trust-item"><div className="trust-icon">📦</div>Ships in 24h</div>
      </div>

      {/* ── THE PROBLEM ── */}
      <section className="section section-dark">
        <div className="container">
          <div style={{maxWidth:'680px',margin:'0 auto',textAlign:'center'}}>
            <div className="label label-light">THE PROBLEM</div>
            <h2 className="h2" style={{color:'white',marginBottom:'28px'}}>
              Most Indians get 30–40g of protein a day.<br/>
              <span style={{color:'#F5A623'}}>You need 50–60g.</span>
            </h2>
            <p className="lead" style={{color:'rgba(255,255,255,0.7)',marginBottom:'40px'}}>
              Protein supplements taste like chalk and require new habits.
              Regular food doesn&apos;t have enough protein. 20g products fill the gap —
              foods you already eat, upgraded with 20g protein per serving.
            </p>
            <div style={{display:'flex',gap:'24px',justifyContent:'center',flexWrap:'wrap'}}>
              {[
                {label:'Avg. Indian diet',value:'35g/day',note:'protein intake'},
                {label:'Your daily need',value:'60g/day',note:'for an active adult'},
                {label:'The gap',value:'25g',note:'one 20g serving fills most of it'},
              ].map(stat => (
                <div key={stat.label} style={{background:'rgba(255,255,255,0.06)',borderRadius:'12px',padding:'24px 28px',flex:'1',minWidth:'160px'}}>
                  <div style={{fontSize:'2rem',fontWeight:900,color:'#F5A623',letterSpacing:'-0.02em'}}>{stat.value}</div>
                  <div style={{fontWeight:700,color:'white',fontSize:'0.88rem',marginTop:'6px'}}>{stat.label}</div>
                  <div style={{color:'rgba(255,255,255,0.45)',fontSize:'0.78rem',marginTop:'4px'}}>{stat.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="section section-cream" id="products">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'52px'}}>
            <div className="label">THE CATALOGUE</div>
            <h2 className="h2">Three products. One promise.</h2>
            <p className="lead" style={{color:'var(--ink-muted)',maxWidth:'500px',margin:'16px auto 0'}}>
              Every single one delivers 20g of protein per serving. Real ingredients. Real taste.
            </p>
          </div>
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
                  <div className="prod-img" style={{background: meta.accent || '#F5F5F5', padding: 0, overflow: 'hidden', position: 'relative'}}>
                    {img
                      ? <img src={img.url} alt={img.altText || p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                      : <span style={{fontSize:'3rem'}}>{meta.emoji}</span>
                    }
                    <span className="prod-badge" style={{background: meta.badge}}>💪 {meta.protein || '20g'} protein</span>
                  </div>
                  <div className="prod-body">
                    <div className="prod-name">{p.title}</div>
                    <div className="prod-sub">{meta.sub}</div>
                    <div className="prod-tagline">{meta.tagline}</div>
                    {meta.useWith && (
                      <div style={{marginTop:'10px'}}>
                        <div style={{fontSize:'0.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--ink-muted)',marginBottom:'6px'}}>Use with</div>
                        <div className="use-chips">
                          {meta.useWith.map(u => <span key={u} className="use-chip">{u}</span>)}
                        </div>
                      </div>
                    )}
                    <div className="prod-footer">
                      <div>
                        <div className="prod-price">{price}</div>
                        <div className="prod-detail">250g · ~5 servings</div>
                      </div>
                      <div className="btn btn-primary btn-sm">Add to Cart</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALUE COMPARISON ── */}
      <section className="section section-white">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="label">THE MATH</div>
            <h2 className="h2">20g of protein from real food.<br/>Finally affordable.</h2>
          </div>
          <div style={{display:'flex',gap:'20px',flexWrap:'wrap',justifyContent:'center'}}>
            {[
              {name:'Whey Protein',price:'₹120',protein:'25g',note:'Synthetic, chalky, needs special habits',hero:false},
              {name:'20g Gunpowder',price:'₹66',protein:'22g',note:'Food you already eat, upgraded',hero:true},
              {name:'Paneer (100g)',price:'₹55',protein:'18g',note:'Real food but expensive & perishable',hero:false},
              {name:'Dal (1 bowl)',price:'₹30',protein:'9g',note:'Healthy but need 3 bowls for 20g',hero:false},
            ].map(item => (
              <div key={item.name} className={`cmp-card${item.hero ? ' cmp-hero' : ''}`}>
                {item.hero && <div className="cmp-tag">Best Value 💪</div>}
                <div className="cmp-price">{item.price}</div>
                <div className="cmp-protein">{item.protein} protein</div>
                <div className="cmp-name">{item.name}</div>
                <div className="cmp-note">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="section section-green" id="story">
        <div className="container">
          <div className="g2" style={{alignItems:'center',gap:'64px'}}>
            <div>
              <div className="label label-light">OUR STORY</div>
              <h2 className="h2" style={{color:'white',marginBottom:'24px'}}>
                Amma&apos;s gunpowder.<br/>Now with 20g protein.
              </h2>
              <p className="lead" style={{color:'rgba(255,255,255,0.8)',marginBottom:'20px'}}>
                We&apos;re from Hyderabad. Gunpowder podi has been on our rice for three generations.
                We just asked one question: what if it could also cover your daily protein?
              </p>
              <p style={{color:'rgba(255,255,255,0.65)',lineHeight:1.8,marginBottom:'32px'}}>
                No lab-designed formulas. No artificial flavours. We took the food you already trust,
                worked with a food scientist to boost the protein content with clean plant sources,
                and kept every ingredient transparent.
              </p>
              <div style={{display:'flex',gap:'32px',flexWrap:'wrap'}}>
                {[['3','Generations of the recipe'],['100%','Ingredient transparency'],['0','Artificial additives']].map(([n,l]) => (
                  <div key={n}>
                    <div style={{fontSize:'2rem',fontWeight:900,color:'#6FCF97'}}>{n}</div>
                    <div style={{color:'rgba(255,255,255,0.7)',fontSize:'0.85rem',marginTop:'4px'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'16px',padding:'40px',border:'1px solid rgba(255,255,255,0.12)'}}>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'0.78rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:'20px'}}>FROM THE FOUNDER</div>
              <p style={{color:'white',fontSize:'1.1rem',lineHeight:1.8,fontStyle:'italic',marginBottom:'24px'}}>
                &quot;I was buying expensive protein powder and hating every sip. Then I realized —
                I eat podi rice every single day. Why can&apos;t that be my protein source?
                That question became 20g.&quot;
              </p>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem'}}>K</div>
                <div>
                  <div style={{color:'white',fontWeight:700,fontSize:'0.9rem'}}>Kowshik Eggoni</div>
                  <div style={{color:'rgba(255,255,255,0.5)',fontSize:'0.78rem'}}>Founder, NutriNomNom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-white">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="label">HOW IT WORKS</div>
            <h2 className="h2">No new habits. Just upgrade the ones you have.</h2>
          </div>
          <div className="g3">
            {[
              {step:'01',title:'Cook like you always do',desc:'Make your rice, dosa, oatmeal — whatever your morning looks like.'},
              {step:'02',title:'Add one scoop of 20g',desc:'One serving (50g) of any 20g product mixed in. That\'s it.'},
              {step:'03',title:'Get your 20g of protein',desc:'Same taste. Same food. But now your meal has 20g of clean protein.'},
            ].map(s => (
              <div key={s.step} style={{padding:'32px',background:'var(--cream)',borderRadius:'16px',border:'1px solid var(--border)'}}>
                <div style={{fontSize:'2.5rem',fontWeight:900,color:'var(--green-dark)',opacity:0.15,lineHeight:1}}>{s.step}</div>
                <div style={{fontWeight:800,fontSize:'1.1rem',marginBottom:'12px',marginTop:'8px'}}>{s.title}</div>
                <p style={{color:'var(--ink-muted)',lineHeight:1.7}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-cream">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="label">WHAT PEOPLE SAY</div>
            <h2 className="h2">Real people. Real meals. Real protein.</h2>
          </div>
          <div className="g3">
            {[
              {name:'Priya M.',role:'Software Engineer, Bengaluru',text:'"I have curd rice for lunch every day. Adding Moringa Gunpowder means I\'m actually hitting my protein goals without thinking about it."',rating:5},
              {name:'Ravi K.',role:'Father of two, Hyderabad',text:'"My kids eat it on their dosa without knowing it\'s \'healthy\'. The taste is genuinely good — not like health food."',rating:5},
              {name:'Ananya S.',role:'Fitness coach, Chennai',text:'"I recommend this to all my clients who struggle with protein. Clean ingredients, no artificial stuff, and it works with Indian food habits."',rating:5},
            ].map(t => (
              <div key={t.name} className="tcard">
                <div className="tcard-stars">{'★'.repeat(t.rating)}</div>
                <p className="tcard-text">{t.text}</p>
                <div className="tcard-author">
                  <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'var(--green-light)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.9rem',color:'var(--green-dark)',flexShrink:0}}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:'0.88rem'}}>{t.name}</div>
                    <div style={{color:'var(--ink-muted)',fontSize:'0.78rem'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS TRANSPARENCY ── */}
      <section className="section section-white" id="ingredients">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="label">FULL TRANSPARENCY</div>
            <h2 className="h2">Every ingredient. Every percentage.<br/>No surprises.</h2>
          </div>
          <div className="g3">
            {[
              {product:'Classic Gunpowder',ingredients:['Peanuts 45%','Roasted Chana Dal 20%','Sesame 10%','Red Chilli 8%','Whey Protein 7%','Curry Leaves 5%','Garlic 3%','Salt 2%']},
              {product:'Moringa Gunpowder',ingredients:['Peanuts 40%','Moringa Powder 18%','Roasted Chana Dal 17%','Sesame 10%','Red Chilli 6%','Whey Protein 5%','Curry Leaves 3%','Salt 1%']},
              {product:'Protein Oatmeal',ingredients:['Rolled Oats 45%','Almonds 18%','Whey Protein 15%','Milk Solids 10%','Dates 7%','Coconut 3%','Cardamom 1%','Salt 1%']},
            ].map(p => (
              <div key={p.product} style={{padding:'28px',border:'1px solid var(--border)',borderRadius:'16px'}}>
                <div style={{fontWeight:800,marginBottom:'16px',fontSize:'1rem'}}>{p.product}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {p.ingredients.map(ing => (
                    <span key={ing} style={{background:'var(--cream)',border:'1px solid var(--border)',borderRadius:'20px',padding:'4px 12px',fontSize:'0.78rem',fontWeight:600}}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section section-dark">
        <div className="container" style={{textAlign:'center'}}>
          <div className="label label-light">GET STARTED</div>
          <h2 className="h2" style={{color:'white',marginBottom:'16px',maxWidth:'560px',margin:'0 auto 16px'}}>
            Your food is already good.<br/>Make it do more.
          </h2>
          <p className="lead" style={{color:'rgba(255,255,255,0.6)',marginBottom:'40px',maxWidth:'400px',margin:'0 auto 40px'}}>
            Try any 20g product for ₹349. Free shipping above ₹599.
          </p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="#products" className="btn btn-primary btn-lg">Shop Now</a>
            <Link to="/pages/faq" className="btn btn-ghost btn-lg">Read FAQs</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
