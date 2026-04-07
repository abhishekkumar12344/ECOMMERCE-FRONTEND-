import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { Package, MapPin, CreditCard, ArrowLeft, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const statusColors = {
  pending: { bg: '#FEF3C7', color: '#92400E' }, confirmed: { bg: '#DBEAFE', color: '#1E40AF' },
  processing: { bg: '#EDE9FE', color: '#5B21B6' }, shipped: { bg: '#D1FAE5', color: '#065F46' },
  delivered: { bg: '#DCFCE7', color: '#14532D' }, cancelled: { bg: '#FEE2E2', color: '#7F1D1D' },
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    orderAPI.getOne(id).then(r => setOrder(r.data?.order || null)).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      await orderAPI.cancel(id);
      setOrder(prev => ({ ...prev, status: 'cancelled' }));
      toast.success('Order cancelled');
    } catch (err) { toast.error(err.response?.data?.message || 'Cannot cancel order'); }
    finally { setCancelling(false); }
  };

  if (loading) return <div className="loading-page"><div className="spinner spinner-dark" style={{ width: 40, height: 40 }} /></div>;
  if (!order) return <div style={{ textAlign: 'center', padding: '80px' }}><h2>Order not found</h2></div>;

  const s = statusColors[order.status] || statusColors.pending;
  const delivery = 0; const tax = Math.round((order.totalAmount || 0) * 0.05);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <Link to="/my-orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', marginBottom: '6px', fontSize: '0.88rem' }}><ArrowLeft size={15} /> My Orders</Link>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700 }}>Order #{(order._id || order.id)?.slice(-8).toUpperCase()}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: s.bg, color: s.color, padding: '6px 18px', borderRadius: 20, fontWeight: 700, fontSize: '0.82rem', textTransform: 'capitalize' }}>{order.status}</span>
            {['pending', 'confirmed'].includes(order.status) && (
              <button className="btn btn-danger btn-sm" onClick={handleCancel} disabled={cancelling}>
                {cancelling ? <span className="spinner" /> : <><XCircle size={14} /> Cancel</>}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Items */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}><Package size={17} color="var(--gold)" /> Order Items</h3>
              {order.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px 0', borderBottom: i < order.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--cream-dark)' }}>
                    <img src={item.productImage || item.image} alt={item.productName || item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => e.target.src = 'https://via.placeholder.com/56?text=P'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.productName || item.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '3px' }}>× {item.quantity} · ₹{item.price} each</div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--gold-dark)' }}>₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={17} color="var(--gold)" /> Shipping Address</h3>
              {order.shippingAddress && (
                <div style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '0.92rem' }}>
                  <div style={{ fontWeight: 700 }}>{order.shippingAddress.name}</div>
                  <div>{order.shippingAddress.phone}</div>
                  <div>{order.shippingAddress.street}</div>
                  <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--border)' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>₹{order.totalAmount?.toFixed(0)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Delivery</span><span style={{ fontWeight: 600, color: 'var(--success)' }}>FREE</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', borderTop: '2px solid var(--border)', paddingTop: '14px' }}>
              <span>Total</span><span style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>₹{order.totalAmount?.toFixed(0)}</span>
            </div>
            <div style={{ marginTop: '18px', padding: '14px', background: 'var(--cream)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              <CreditCard size={15} color="var(--gold)" />
              <span>Payment: <strong style={{ textTransform: 'capitalize' }}>{order.paymentMethod}</strong></span>
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center' }}>
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.container > div > div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
