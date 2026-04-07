import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';

const statusColors = {
  pending:    { bg: '#FEF3C7', color: '#92400E' },
  confirmed:  { bg: '#DBEAFE', color: '#1E40AF' },
  processing: { bg: '#EDE9FE', color: '#5B21B6' },
  shipped:    { bg: '#D1FAE5', color: '#065F46' },
  delivered:  { bg: '#DCFCE7', color: '#14532D' },
  cancelled:  { bg: '#FEE2E2', color: '#7F1D1D' },
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getMyOrders()
      .then(r => setOrders(r.data?.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>My Orders</h1>
          <p>Track and manage all your orders</p>
        </div>
      </div>
      <div className="container" style={{ padding: '48px 24px' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height: 110, borderRadius: 'var(--radius)' }} />)}
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>No orders yet</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '28px' }}>Start shopping to see your orders here!</p>
            <Link to="/products" className="btn btn-primary btn-lg"><ShoppingBag size={17} /> Browse Products</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map(order => {
              const s = statusColors[order.status] || statusColors.pending;
              return (
                <Link key={order._id || order.id} to={`/my-orders/${order._id || order.id}`}
                  style={{ display: 'block', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '22px 24px', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-light)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--gold-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={20} color="var(--gold)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>Order #{(order._id || order.id)?.slice(-8).toUpperCase()}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '3px' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {order.items?.length || 0} item(s)
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold-dark)' }}>₹{order.totalAmount?.toFixed(0)}</span>
                      <span style={{ background: s.bg, color: s.color, padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>{order.status}</span>
                      <ChevronRight size={18} color="var(--muted-light)" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
