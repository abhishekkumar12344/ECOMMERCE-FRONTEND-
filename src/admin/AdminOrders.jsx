import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { ChevronRight, Package } from 'lucide-react';

const STATUS_OPTIONS = ['all','pending','confirmed','processing','shipped','delivered','cancelled'];
const statusColors = {
  pending: { bg: '#FEF3C7', color: '#92400E' }, confirmed: { bg: '#DBEAFE', color: '#1E40AF' },
  processing: { bg: '#EDE9FE', color: '#5B21B6' }, shipped: { bg: '#D1FAE5', color: '#065F46' },
  delivered: { bg: '#DCFCE7', color: '#14532D' }, cancelled: { bg: '#FEE2E2', color: '#7F1D1D' },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    orderAPI.getAll(status !== 'all' ? { status } : {})
      .then(r => setOrders(r.data?.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700 }}>Orders</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '4px' }}>{orders.length} total orders</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {STATUS_OPTIONS.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              style={{ padding: '7px 14px', borderRadius: 20, border: `2px solid ${status === s ? 'var(--gold)' : 'var(--border)'}`, background: status === s ? 'var(--gold)' : 'white', color: status === s ? 'white' : 'var(--ink-soft)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', textTransform: 'capitalize', transition: 'all 0.18s' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><div className="spinner spinner-dark" style={{ width: 36, height: 36 }} /></div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)' }}>
            <Package size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p>No orders found</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}>
                {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => {
                const s = statusColors[order.status] || statusColors.pending;
                return (
                  <tr key={order._id || order.id} style={{ borderBottom: i < orders.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'monospace' }}>#{(order._id || order.id)?.slice(-8).toUpperCase()}</td>
                    <td style={{ padding: '14px 16px', fontSize: '0.88rem' }}>{order.user?.name || 'Guest'}<br /><span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{order.user?.email}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: '0.88rem', color: 'var(--muted)' }}>{order.items?.length || 0}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>₹{order.totalAmount?.toFixed(0)}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>{order.status}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: 'var(--muted)' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <Link to={`/admin/orders/${order._id || order.id}`} style={{ display: 'flex', alignItems: 'center', color: 'var(--gold)', fontWeight: 600, fontSize: '0.82rem', gap: '2px' }}>
                        View <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
