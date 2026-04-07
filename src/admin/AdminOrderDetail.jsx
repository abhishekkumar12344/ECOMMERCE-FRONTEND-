import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending','confirmed','processing','shipped','delivered','cancelled'];
const statusColors = {
  pending: { bg: '#FEF3C7', color: '#92400E' }, confirmed: { bg: '#DBEAFE', color: '#1E40AF' },
  processing: { bg: '#EDE9FE', color: '#5B21B6' }, shipped: { bg: '#D1FAE5', color: '#065F46' },
  delivered: { bg: '#DCFCE7', color: '#14532D' }, cancelled: { bg: '#FEE2E2', color: '#7F1D1D' },
};

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    orderAPI.getOne(id).then(r => { const o = r.data?.order || null; setOrder(o); setNewStatus(o?.status || ''); }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await orderAPI.updateStatus(id, { status: newStatus });
      setOrder(prev => ({ ...prev, status: newStatus }));
      toast.success('Order status updated!');
    } catch (err) { toast.error('Failed to update status'); }
    finally { setUpdating(false); }
  };

  if (loading) return <div className="loading-page"><div className="spinner spinner-dark" style={{ width: 36, height: 36 }} /></div>;
  if (!order) return <div style={{ padding: 40 }}><h2>Order not found</h2></div>;

  const s = statusColors[order.status] || statusColors.pending;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/admin/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', marginBottom: '10px', fontSize: '0.88rem' }}><ArrowLeft size={14} /> All Orders</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700 }}>Order #{(order._id || order.id)?.slice(-8).toUpperCase()}</h1>
          <span style={{ background: s.bg, color: s.color, padding: '5px 14px', borderRadius: 20, fontWeight: 700, fontSize: '0.8rem', textTransform: 'capitalize' }}>{order.status}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Items */}
          <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '24px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Package size={16} color="var(--gold)" /> Order Items</h3>
            {order.items?.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: i < order.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 52, height: 52, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--cream-dark)' }}>
                  <img src={item.productImage || item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src = 'https://via.placeholder.com/52?text=P'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.productName || item.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>× {item.quantity} · ₹{item.price}</div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--gold-dark)' }}>₹{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '24px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--gold)" /> Shipping Address</h3>
            {order.shippingAddress && (
              <div style={{ color: 'var(--ink-soft)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                <div style={{ fontWeight: 700 }}>{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.phone}</div>
                <div>{order.shippingAddress.street}, {order.shippingAddress.city}</div>
                <div>{order.shippingAddress.state} {order.shippingAddress.pincode}</div>
              </div>
            )}
            {order.notes && <div style={{ marginTop: '14px', padding: '12px', background: 'var(--cream)', borderRadius: 8, fontSize: '0.88rem', color: 'var(--muted)' }}>📝 {order.notes}</div>}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Update status */}
          <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '24px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>Update Status</h3>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', marginBottom: '14px', background: 'white', textTransform: 'capitalize' }}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s}</option>)}
            </select>
            <button className="btn btn-primary" onClick={handleUpdate} disabled={updating || newStatus === order.status} style={{ width: '100%' }}>
              {updating ? <><span className="spinner" /> Updating...</> : 'Update Status'}
            </button>
          </div>

          {/* Summary */}
          <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '24px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '14px', fontSize: '1rem' }}>Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>₹{order.totalAmount?.toFixed(0)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Delivery</span><span style={{ fontWeight: 600, color: 'var(--success)' }}>FREE</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', borderTop: '2px solid var(--border)', paddingTop: '12px' }}>
              <span>Total</span><span style={{ color: 'var(--gold-dark)' }}>₹{order.totalAmount?.toFixed(0)}</span>
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.82rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <CreditCard size={13} color="var(--gold)" /> {order.paymentMethod?.toUpperCase()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted-light)', marginTop: '6px' }}>
              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.container-inner{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
