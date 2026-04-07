import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div style={{ minHeight: '80vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--success-light)', border: '3px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <CheckCircle size={48} color="var(--success)" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '14px', color: 'var(--forest)' }}>Order Confirmed! 🎉</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '8px' }}>
          Thank you for shopping with Prem Parth Enterprises. Your order has been successfully placed.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '36px' }}>Order ID: <strong style={{ color: 'var(--ink)', fontFamily: 'monospace' }}>#{id}</strong></p>
        
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><Package size={17} color="var(--gold)" /> What's Next?</h3>
          {[
            'You will receive an order confirmation via email shortly.',
            'Our team will process your order within 24 hours.',
            'You can track your order status from My Orders page.',
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
              <span style={{ background: 'var(--gold)', color: 'white', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              {s}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/my-orders" className="btn btn-primary btn-lg"><Package size={17} /> My Orders</Link>
          <Link to="/products" className="btn btn-outline btn-lg">Continue Shopping <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
