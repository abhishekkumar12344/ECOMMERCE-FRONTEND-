import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Truck, Shield, Users, Heart, ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Leaf,   title: 'Natural & Pure',    desc: 'Every product sourced from certified farms with no artificial additives or preservatives.' },
    { icon: Award,  title: 'Quality First',     desc: 'FSSAI certified manufacturing with rigorous quality checks at every production stage.' },
    { icon: Heart,  title: 'Customer Love',     desc: 'Serving 10,000+ happy families across India who trust us for daily essentials.' },
    { icon: Shield, title: 'Trusted Heritage',  desc: 'Over 15 years of experience delivering premium natural products since 2010.' },
  ];

  const team = [
    { name: 'Prem Kumar', role: 'Founder & CEO', initial: 'P' },
    { name: 'Parth Sharma', role: 'Operations Head', initial: 'P' },
    { name: 'Anita Devi', role: 'Quality Manager', initial: 'A' },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,151,58,0.2)', border: '1px solid rgba(201,151,58,0.3)', padding: '5px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            🌿 Our Story
          </div>
          <h1>About Prem Parth</h1>
          <p>Rooted in tradition, growing with trust since 2010</p>
        </div>
      </div>

      {/* Story section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">📖 Our Journey</div>
              <h2 className="section-title">From humble beginnings to trusted household name</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginTop: '20px', fontSize: '0.97rem' }}>
                Prem Parth Enterprises began in 2010 in Patna, Bihar, with a simple mission — to bring pure, unadulterated natural products to every Indian home. What started as a small mustard oil venture has grown into a trusted brand serving customers across Bihar, UP, Jharkhand and beyond.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginTop: '14px', fontSize: '0.97rem' }}>
                Every product we make carries the same commitment our founder started with: honesty, purity, and genuine care for our customers' health and wellbeing. From our cold-pressed oils to our bilona-method ghee — tradition guides us.
              </p>
              <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: '28px' }}>
                Explore Our Products <ArrowRight size={17} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[{ n: '10,000+', l: 'Happy Customers' }, { n: '15+', l: 'Years of Trust' }, { n: '50+', l: 'Products' }, { n: '20+', l: 'Cities Served' }].map((s, i) => (
                <div key={i} style={{ background: i % 2 === 0 ? 'var(--forest)' : 'var(--gold-pale)', borderRadius: 'var(--radius)', padding: '28px 20px', textAlign: 'center', color: i % 2 === 0 ? 'white' : 'var(--ink)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: i % 2 === 0 ? 'var(--gold-light)' : 'var(--gold-dark)' }}>{s.n}</div>
                  <div style={{ fontSize: '0.82rem', marginTop: '8px', opacity: 0.8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="section-eyebrow">💚 What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 14, background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                  <v.icon size={24} color="white" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="section-eyebrow">👥 The People</div>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {team.map((m, i) => (
              <div key={i} className="card" style={{ padding: '32px 28px', textAlign: 'center', minWidth: 200 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.6rem', color: 'white', fontWeight: 700 }}>{m.initial}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '5px' }}>{m.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
