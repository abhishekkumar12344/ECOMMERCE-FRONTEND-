import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Truck, Award, Shield, Leaf, ChevronRight, Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI.getAll({ featured: true, limit: 4 })
      .then(r => setFeatured(r.data?.products || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { id: 'oil',  label: 'Premium Oils',  icon: '🫙', desc: 'Cold-pressed & refined', color: '#FEF3C7', accent: '#92400E' },
    { id: 'ghee', label: 'Pure Ghee',     icon: '🧈', desc: 'Traditional bilona method', color: '#FCE7F3', accent: '#831843' },
    { id: 'food', label: 'Food Products', icon: '🌾', desc: 'Healthy & nutritious', color: '#D1FAE5', accent: '#065F46' },
    { id: 'fuel', label: 'Fuel Products', icon: '⛽', desc: 'BS6 compliant fuels', color: '#DBEAFE', accent: '#1E40AF' },
  ];

  const features = [
    { icon: Leaf,   title: '100% Natural',      desc: 'All products sourced from certified farms with no artificial additives.' },
    { icon: Award,  title: 'FSSAI Certified',   desc: 'Certified manufacturing with strict quality control at every step.' },
    { icon: Truck,  title: 'Pan India Delivery', desc: 'Fast and reliable shipping to all major cities across India.' },
    { icon: Shield, title: 'Trusted Since 2010', desc: 'Serving 10,000+ happy customers across Bihar, UP and other states.' },
  ];

  const testimonials = [
  { name: 'Priya Sharma',  city: 'Patna',    text: 'The mustard oil quality is outstanding — my family noticed the difference immediately!', rating: 5 },
  { name: 'Rahul Verma',   city: 'Varanasi', text: 'Fast delivery, excellent packaging, and the ghee is absolutely authentic. Highly recommended.', rating: 5 },
  { name: 'Anita Singh',   city: 'Lucknow',  text: "Best sattu I've ever tasted. Freshness and quality is unmatched. Will order again!", rating: 5 },
];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+',     label: 'Products' },
    { number: '15+',     label: 'Years of Trust' },
    { number: '20+',     label: 'Cities Served' },
  ];

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section style={{ background: 'linear-gradient(150deg, var(--forest) 0%, var(--forest-mid) 55%, #1B4D35 100%)', color: 'white', minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,151,58,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="anim-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,151,58,0.2)', border: '1px solid rgba(201,151,58,0.4)', padding: '6px 16px', borderRadius: 30, marginBottom: '24px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)' }}>
                🏆 Trusted by 10,000+ customers
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '22px' }}>
                Pure. Natural.<br />
                <span style={{ color: 'var(--gold-light)' }}>Delivered Fresh.</span>
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.82, lineHeight: 1.75, marginBottom: '36px', maxWidth: 440 }}>
                Premium oils, pure ghee, nutritious food products & BS6 fuels — crafted with care and delivered to your doorstep across India.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <Link to="/products" className="btn btn-xl btn-primary">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn btn-xl btn-outline-w">
                  Our Story
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {['FSSAI Certified', 'Free Delivery', '100% Natural'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.85rem', opacity: 0.8 }}>
                    <CheckCircle size={15} color="var(--gold-light)" /> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="anim-up">
              {stats.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius)', padding: '28px 20px', textAlign: 'center', animationDelay: `${i * 0.1}s` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 }}>{s.number}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.7, marginTop: '8px', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ──────────────────────────── */}
      <section style={{ padding: '96px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-eyebrow">✦ What We Offer</div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-sub">Explore our diverse range of premium, certified products</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }}>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.id}`}
                style={{ padding: '36px 28px', textAlign: 'center', background: cat.color, border: `1.5px solid transparent`, borderRadius: 'var(--radius-lg)', transition: 'all 0.25s ease', cursor: 'pointer', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = cat.accent + '44'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'transparent'; }}>
                <div style={{ fontSize: '3.2rem', marginBottom: '16px', lineHeight: 1 }}>{cat.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '8px', color: cat.accent }}>{cat.label}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '16px' }}>{cat.desc}</p>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cat.accent, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Browse <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────── */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="section-eyebrow">⭐ Best Sellers</div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-sub">Our most popular and highest-rated products</p>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ flexShrink: 0 }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
              {[1, 2, 3, 4].map(i => <div key={i} className="shimmer" style={{ height: 340, borderRadius: 'var(--radius)' }} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
              {featured.map(p => <ProductCard key={p._id || p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Us ────────────────────────────── */}
      <section style={{ padding: '96px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-eyebrow">💚 Our Promise</div>
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-sub">We stand behind every product we deliver</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '40px 28px', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', transition: 'all 0.25s', boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--gold-light)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <f.icon size={26} color="white" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px', color: 'var(--ink)' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.88rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────── */}
      <section style={{ padding: '96px 0', background: 'linear-gradient(150deg, var(--forest) 0%, var(--forest-mid) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,151,58,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,151,58,0.2)', border: '1px solid rgba(201,151,58,0.3)', padding: '5px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
              💬 Reviews
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: 'white', marginBottom: '10px' }}>What Customers Say</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.02rem' }}>Thousands of happy families trust Prem Parth daily</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: 'var(--radius)', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.borderColor = 'rgba(201,151,58,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={15} fill={s <= t.rating ? '#F5A623' : 'transparent'} stroke="#F5A623" />)}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.95rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '0.9rem', flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter / CTA ─────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--gold-pale2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: '14px' }}>Ready to Order?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: '32px' }}>Browse our full catalogue and experience the Prem Parth difference.</p>
          <Link to="/products" className="btn btn-primary btn-xl">
            Browse All Products <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
