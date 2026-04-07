import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Phone, Award, Leaf, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: Truck, title: 'Pan-India Delivery', desc: 'Fast, reliable delivery to all major cities and towns across India. Free shipping on orders above ₹499.', features: ['3–5 business day delivery', 'Real-time tracking', 'Secure packaging'] },
    { icon: Package, title: 'Bulk Orders', desc: 'Special pricing and dedicated support for bulk orders. Ideal for retailers, hotels, and institutions.', features: ['Wholesale pricing', 'Custom packaging', 'Dedicated account manager'] },
    { icon: Award, title: 'Quality Assurance', desc: 'Every product undergoes strict quality testing before dispatch. FSSAI certified manufacturing.', features: ['Lab tested products', 'FSSAI certified', 'Zero artificial additives'] },
    { icon: Phone, title: '24/7 Support', desc: 'Our dedicated customer support team is here to help you with any queries, orders, or issues.', features: ['WhatsApp support', 'Email assistance', 'Quick resolution'] },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,151,58,0.2)', border: '1px solid rgba(201,151,58,0.3)', padding: '5px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            ⚡ What We Offer
          </div>
          <h1>Our Services</h1>
          <p>Beyond great products — a complete experience</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {services.map((s, i) => (
              <div key={i} className="card" style={{ padding: '32px', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--gold-light)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div style={{ width: 60, height: 60, borderRadius: 14, background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <s.icon size={26} color="white" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '20px' }}>{s.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                      <CheckCircle size={14} color="var(--gold)" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)', borderRadius: 'var(--radius-lg)', padding: '52px 40px', textAlign: 'center', marginTop: '56px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(201,151,58,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '14px' }}>Ready to experience the difference?</h2>
              <p style={{ opacity: 0.78, marginBottom: '28px', fontSize: '1rem' }}>Join thousands of happy customers across India</p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn-primary btn-lg">Shop Now <ArrowRight size={17} /></Link>
                <Link to="/contact" className="btn btn-outline-w btn-lg">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
