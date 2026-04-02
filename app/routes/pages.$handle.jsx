import { Link, useParams } from '@remix-run/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// ── Static page content ────────────────────────────────────────────────────────
const PAGES = {
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'April 2026',
    sections: [
      {
        heading: '1. Overview',
        body: `These Terms & Conditions ("Terms") govern your use of the 20g by NutriNomNom website and the purchase of products from NutriNomNom ("we", "us", or "our"). By placing an order or using our website, you agree to these Terms in full. If you do not agree, please do not use our website or place orders.`,
      },
      {
        heading: '2. Products & Pricing',
        body: `All products are subject to availability. Prices are displayed in Indian Rupees (₹) and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. Any price changes will not affect orders that have already been confirmed.`,
      },
      {
        heading: '3. Orders & Payment',
        body: `By placing an order, you represent that you are at least 18 years of age and legally capable of entering into a binding contract. We accept payments through the methods displayed at checkout. Your order is confirmed once payment is successfully processed and you receive a confirmation email. We reserve the right to cancel or refuse any order at our discretion, including if a product is out of stock or a pricing error has occurred.`,
      },
      {
        heading: '4. Shipping & Delivery',
        body: `We aim to dispatch orders within 1–2 business days. Estimated delivery times are 3–7 business days depending on your location within India. We currently ship only within India. Shipping is free on orders above ₹599; a flat shipping fee applies to orders below this threshold. Delivery timelines are estimates and not guaranteed. NutriNomNom is not liable for delays caused by third-party courier services, natural events, or circumstances beyond our control.`,
      },
      {
        heading: '5. Returns & Refunds',
        body: `If you receive a damaged, defective, or incorrect product, please contact us within 48 hours of delivery with photographs. We will arrange a replacement or full refund at no additional cost to you. We do not accept returns on food products for reasons other than damage or defect, in compliance with applicable food safety regulations. Refunds, where applicable, will be processed within 7–10 business days to your original payment method.`,
      },
      {
        heading: '6. Food Safety & Allergen Notice',
        body: `Our products are manufactured in a facility that processes peanuts, tree nuts, dairy (whey), and other allergens. While we take precautions, we cannot guarantee a completely allergen-free environment. Please review the ingredient list on each product before purchasing if you have known allergies. Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional if you have specific dietary or medical needs.`,
      },
      {
        heading: '7. Intellectual Property',
        body: `All content on this website — including text, images, logos, product descriptions, and designs — is the property of NutriNomNom and protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.`,
      },
      {
        heading: '8. Limitation of Liability',
        body: `To the maximum extent permitted by law, NutriNomNom shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or website. Our total liability to you in any circumstance shall not exceed the amount you paid for the specific product giving rise to the claim.`,
      },
      {
        heading: '9. Governing Law',
        body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.`,
      },
      {
        heading: '10. Contact Us',
        body: `For any questions about these Terms, please reach out to us at hello@nutrinomnom.com or via WhatsApp. We're happy to help.`,
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'April 2026',
    sections: [
      {
        heading: '1. What Information We Collect',
        body: `When you place an order or create an account, we collect your name, email address, phone number, shipping and billing address, and payment information (processed securely by our payment provider — we do not store card details). We also collect browsing data automatically, such as your IP address, browser type, pages visited, and time spent on our site, to help us improve your experience.`,
      },
      {
        heading: '2. How We Use Your Information',
        body: `We use your information to process and fulfill your orders, communicate with you about your order status, send promotional emails if you have opted in, improve our website and product offerings, and comply with legal obligations. We do not sell or rent your personal data to third parties.`,
      },
      {
        heading: '3. Sharing of Information',
        body: `We share your information only with trusted service providers who assist us in running our business — including payment processors, courier partners, and email service providers. These partners are contractually obligated to protect your data and may only use it for the specific purpose of serving you on our behalf.`,
      },
      {
        heading: '4. Cookies',
        body: `We use cookies to remember your preferences, maintain your shopping cart, and understand how you use our website. You can disable cookies in your browser settings, but doing so may affect some website functionality.`,
      },
      {
        heading: '5. Data Security',
        body: `We implement industry-standard security measures to protect your personal data. All transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
      },
      {
        heading: '6. Your Rights',
        body: `You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us at hello@nutrinomnom.com. We will respond to your request within 30 days.`,
      },
      {
        heading: '7. Data Retention',
        body: `We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. Order records are typically retained for 7 years for accounting and legal purposes.`,
      },
      {
        heading: '8. Contact',
        body: `If you have questions or concerns about our privacy practices, please contact us at hello@nutrinomnom.com.`,
      },
    ],
  },

  shipping: {
    title: 'Shipping Policy',
    lastUpdated: 'April 2026',
    sections: [
      {
        heading: 'Dispatch Time',
        body: `All orders are processed and dispatched within 1–2 business days of payment confirmation (excluding Sundays and public holidays). You will receive a shipping confirmation email with a tracking link once your order is dispatched.`,
      },
      {
        heading: 'Delivery Time',
        body: `Standard delivery within India typically takes 3–7 business days depending on your location. Metro cities (Hyderabad, Bengaluru, Mumbai, Delhi, Chennai) usually receive orders within 3–4 days. Tier 2 and Tier 3 cities may take up to 7 business days.`,
      },
      {
        heading: 'Shipping Charges',
        body: `Shipping is free on all orders above ₹599. For orders below ₹599, a flat shipping fee of ₹49 applies. This will be clearly displayed at checkout before you complete your purchase.`,
      },
      {
        heading: 'Currently Shipping',
        body: `We currently ship only within India. International shipping is not available at this time. We're working on it and will announce when it becomes available.`,
      },
      {
        heading: 'Delays & Issues',
        body: `If your order hasn't arrived within 10 business days, please contact us at hello@nutrinomnom.com or WhatsApp us. We will investigate and resolve the issue promptly. Please note that delays during sale periods, festivals, or due to weather events may occasionally occur.`,
      },
    ],
  },

  returns: {
    title: 'Returns & Refunds',
    lastUpdated: 'April 2026',
    sections: [
      {
        heading: 'Our Policy',
        body: `We want you to love every product you receive from us. If something isn't right, we'll make it right. We offer a hassle-free resolution for any issue with your order.`,
      },
      {
        heading: 'Damaged or Defective Products',
        body: `If your product arrives damaged, leaking, or defective, please contact us within 48 hours of delivery. Email us at hello@nutrinomnom.com or WhatsApp us with your order number and clear photos of the issue. We will arrange a free replacement or a full refund — your choice.`,
      },
      {
        heading: 'Wrong Item Received',
        body: `If you received an item different from what you ordered, please contact us within 48 hours. We will dispatch the correct item at no additional cost and arrange collection of the wrong item.`,
      },
      {
        heading: 'Change of Mind Returns',
        body: `As our products are food items, we are unable to accept returns due to change of mind, in compliance with FSSAI food safety guidelines. We encourage you to start with a smaller pack size (250g) if you are trying a product for the first time.`,
      },
      {
        heading: 'Refund Processing',
        body: `Approved refunds are processed within 7–10 business days to your original payment method. You will receive an email confirmation when the refund is initiated. Depending on your bank, it may take an additional 3–5 business days to reflect in your account.`,
      },
      {
        heading: 'How to Reach Us',
        body: `For any returns or refund requests, reach us at hello@nutrinomnom.com or via WhatsApp. Please have your order number ready. Our team responds within 1 business day.`,
      },
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    lastUpdated: 'April 2026',
    sections: [
      {
        heading: 'What is 20g protein per serving?',
        body: `Each serving of any 20g product is formulated to deliver approximately 20 grams of protein. Classic Gunpowder and Moringa Gunpowder deliver ~22g per 47g serving. Protein Oatmeal delivers ~23g per 50g serving.`,
      },
      {
        heading: 'Does it taste like a protein supplement?',
        body: `Not at all. Our products are made from real food ingredients — peanuts, chana dal, moringa, rolled oats — with protein boosted through clean sources like whey concentrate. They taste like the food they are, not like a supplement.`,
      },
      {
        heading: 'How do I use Classic Gunpowder?',
        body: `Exactly how you'd use regular podi. Mix 1 serving (47g) with a teaspoon of ghee into hot rice and eat as usual. You can also spread it on a dosa, mix into idli batter, or use it as a chutney powder side.`,
      },
      {
        heading: 'Is it suitable for vegetarians?',
        body: `Classic Gunpowder and Moringa Gunpowder are vegetarian. All products contain whey protein concentrate, which is derived from dairy, so they are not vegan.`,
      },
      {
        heading: 'How long does one pack last?',
        body: `A 250g pack contains approximately 5 full servings. A 500g pack contains ~10 servings. A 1kg pack contains ~20 servings. One serving per day means a 250g pack lasts about a week.`,
      },
      {
        heading: 'What is the shelf life?',
        body: `Our products have a shelf life of 6 months from the date of manufacture when stored in a cool, dry place. Once opened, consume within 30 days for best freshness.`,
      },
      {
        heading: 'Do you offer subscriptions?',
        body: `Yes! You can subscribe to any product and save 15%. Subscriptions are delivered monthly and can be cancelled anytime — no questions asked.`,
      },
    ],
  },

  'why-20g': {
    title: 'Why 20g?',
    lastUpdated: '',
    sections: [
      {
        heading: 'The protein gap in Indian diets',
        body: `The average Indian consumes 35–40g of protein per day. Nutrition science recommends 0.8–1g per kg of body weight — which for a 60kg adult means 48–60g daily. That gap of 20–25g is exactly what one serving of any 20g product fills.`,
      },
      {
        heading: 'Why not just eat more dal or paneer?',
        body: `Dal is great, but you'd need 3–4 bowls to get 20g of protein. Paneer works but is expensive and perishable. Eggs are good but not for everyone. Protein supplements work, but they require building new habits and most taste synthetic. 20g products are different — they're foods you already eat, upgraded.`,
      },
      {
        heading: 'Why 20g specifically?',
        body: `20g per serving is the sweet spot. Research shows that 20–30g of protein per meal is the optimal range for muscle protein synthesis. One serving of any 20g product in one meal gets you there without needing to overhaul your diet. It's one scoop, one meal, one step closer to your daily goal.`,
      },
      {
        heading: 'Clean protein, not synthetic',
        body: `We use whey protein concentrate — the least processed form of whey, derived from dairy. It's combined with naturally protein-rich ingredients like peanuts (26g/100g), chana dal (22g/100g), and oats (17g/100g). The result is a protein profile that comes primarily from real food, not a lab.`,
      },
      {
        heading: 'No new habits required',
        body: `This is the core of what we believe. The best nutrition plan is the one you actually stick to. If you already eat podi rice every day, adding 20g Gunpowder requires zero behaviour change. Same meal, same habit — just with 20g of protein now working in your favour.`,
      },
    ],
  },

  ingredients: {
    title: 'Ingredients',
    lastUpdated: 'April 2026',
    sections: [
      {
        heading: 'Classic Gunpowder — Full Ingredient List',
        body: `Peanuts (45%), Roasted Chana Dal (20%), Sesame Seeds (10%), Red Chilli (8%), Whey Protein Concentrate (7%), Curry Leaves (5%), Garlic (3%), Salt (2%). Contains: Peanuts, Dairy (Whey). Manufactured in a facility that also processes tree nuts.`,
      },
      {
        heading: 'Moringa Gunpowder — Full Ingredient List',
        body: `Peanuts (40%), Moringa Leaf Powder (18%), Roasted Chana Dal (17%), Sesame Seeds (10%), Red Chilli (6%), Whey Protein Concentrate (5%), Curry Leaves (3%), Salt (1%), Black Pepper (trace). Contains: Peanuts, Dairy (Whey).`,
      },
      {
        heading: 'Protein Oatmeal — Full Ingredient List',
        body: `Rolled Oats (45%), Almonds (18%), Whey Protein Concentrate (15%), Milk Solids (10%), Dates (7%), Desiccated Coconut (3%), Cardamom (1%), Salt (1%). Contains: Oats, Tree Nuts (Almonds), Dairy (Whey, Milk Solids), Coconut.`,
      },
      {
        heading: 'Our sourcing principles',
        body: `All ingredients are sourced from FSSAI-approved suppliers. We do not use any artificial colours, artificial flavours, or synthetic preservatives. The shelf life of our products is achieved through low moisture content and natural preservatives (salt). We believe in full ingredient transparency — what you see on the label is everything in the product.`,
      },
      {
        heading: 'Allergen notice',
        body: `Our products contain peanuts, dairy (whey protein concentrate), and tree nuts (almonds in Protein Oatmeal). They are manufactured in a shared facility. If you have known allergies to any of these ingredients, please consult your healthcare provider before consuming our products.`,
      },
    ],
  },

  contact: {
    title: 'Contact Us',
    lastUpdated: '',
    sections: [
      {
        heading: 'We\'re a small team and we actually read every message',
        body: `NutriNomNom is a founder-led startup out of Hyderabad. When you write to us, you're reaching the people who made the product. We respond to every message, usually within one business day.`,
      },
      {
        heading: 'Email',
        body: `For order issues, product questions, feedback, or anything else: hello@nutrinomnom.com. Please include your order number if your query is about a specific order.`,
      },
      {
        heading: 'WhatsApp',
        body: `Prefer to chat? WhatsApp us at +91 99999 99999. We're available Monday–Saturday, 9am–6pm IST. For urgent order issues, WhatsApp is usually the fastest way to reach us.`,
      },
      {
        heading: 'Returns & refunds',
        body: `For returns, damaged products, or refund requests, please read our Returns Policy first — it covers most situations. Then email or WhatsApp us with your order number and photos if applicable.`,
      },
      {
        heading: 'Wholesale & bulk orders',
        body: `Interested in stocking 20g products in your store, gym, or office? We offer wholesale pricing for bulk orders above ₹10,000. Reach out at hello@nutrinomnom.com with the subject line "Wholesale Inquiry".`,
      },
    ],
  },

  'our-story': {
    title: 'Our Story',
    lastUpdated: '',
    sections: [
      {
        heading: "It started with Amma's gunpowder",
        body: `I've been eating podi rice my whole life. My mother makes it, her mother made it, and there's a version of it in every South Indian kitchen. It's one of those foods that feels like home no matter where you are.`,
      },
      {
        heading: 'The protein problem',
        body: `When I started paying attention to my nutrition, I realized most Indians — including me — were eating far less protein than we needed. The options available were either expensive protein supplements that tasted artificial, or expensive real foods like paneer and chicken. Nobody was upgrading the everyday food we already love.`,
      },
      {
        heading: 'The question that started everything',
        body: `"What if podi could be my protein source?" That was it. I eat it every day anyway. It has peanuts, chana dal, sesame — already decent protein. We worked with a food scientist to boost it further with clean whey protein concentrate, keeping every ingredient readable and transparent.`,
      },
      {
        heading: '20g by NutriNomNom',
        body: `We launched with Classic Gunpowder, then added Moringa Gunpowder for those who want an extra greens kick, and Protein Oatmeal for mornings when you want something different. Every product has one rule: 20g of real protein per serving, real ingredients only, no compromise on taste.`,
      },
    ],
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Page() {
  const { handle } = useParams();

  const page = PAGES[handle];

  if (!page) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-cream)' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: 16 }}>Page not found</h1>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Page Header */}
      <div style={{ background: 'var(--color-ink)', color: 'white', padding: '80px 0 60px' }}>
        <div className="container">
          <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 600 }}>← Home</Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {page.title}
          </h1>
          {page.lastUpdated && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: 12 }}>
              Last updated: {page.lastUpdated}
            </p>
          )}
        </div>
      </div>

      {/* Page Content */}
      <main style={{ background: 'var(--color-cream)', padding: '64px 0 96px' }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {page.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < page.sections.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 12, color: 'var(--color-green-dark)' }}>
                  {section.heading}
                </h2>
                <p style={{ lineHeight: 1.8, color: 'var(--color-ink-light)', fontSize: '0.98rem' }}>
                  {section.body}
                </p>
              </div>
            ))}

            {/* CTA at bottom */}
            <div style={{ marginTop: 48, padding: '32px', background: 'var(--color-green-light)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
              <p style={{ fontWeight: 700, marginBottom: 16, fontSize: '1rem' }}>
                Questions? We're reachable and friendly.
              </p>
              <a href="mailto:hello@nutrinomnom.com" className="btn btn-primary">
                Email us →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
