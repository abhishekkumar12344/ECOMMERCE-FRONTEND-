import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { MapPin, CreditCard, FileText, ShieldCheck, Truck, Package } from 'lucide-react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', phone: user?.phone || '',
    street: '', city: '', state: '', pincode: '',
    paymentMethod: 'cod', notes: '',
  });

  if (cart.length === 0) { navigate('/cart'); return null; }

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const delivery = totalPrice >= 499 ? 0 : 49;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + delivery + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.street || !form.city || !form.state || !form.pincode) return toast.error('Please fill all address fields');
    setLoading(true);
    try {
      const res = await orderAPI.create({
        items: cart.map(i => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: { name: form.name, phone: form.phone, street: form.street, city: form.city, state: form.state, pincode: form.pincode },
        paymentMethod: form.paymentMethod, notes: form.notes,
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(`/order-success/${res.data.order.id}`);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to place order'); }
    finally { setLoading(false); }
  };

  const steps = [{ icon: MapPin, label: 'Address' }, { icon: CreditCard, label: 'Payment' }, { icon: Package, label: 'Confirm' }];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', marginBottom: '4px' }}>Checkout</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Complete your order securely</p>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
          {/* Left: form */}
          <form onSubmit={handleSubmit}>
            {/* Shipping */}
            <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '9px', color: 'var(--forest)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={16} color="white" /></div>
                Shipping Address
              </h3>
              <div className="form-row">
                <div className="form-group"><label>Full Name</label><input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" /></div>
                <div className="form-group"><label>Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} required placeholder="10-digit mobile" /></div>
              </div>
              <div className="form-group"><label>Street Address</label><input name="street" value={form.street} onChange={handleChange} required placeholder="House no., street, area, landmark" /></div>
              <div className="form-row">
                <div className="form-group"><label>City</label><input name="city" value={form.city} onChange={handleChange} required placeholder="City" /></div>
                <div className="form-group"><label>State</label><input name="state" value={form.state} onChange={handleChange} required placeholder="State" /></div>
              </div>
              <div style={{ maxWidth: 200 }}>
                <div className="form-group"><label>PIN Code</label><input name="pincode" value={form.pincode} onChange={handleChange} required placeholder="6-digit PIN" /></div>
              </div>
            </div>

            {/* Payment */}
            <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '9px', color: 'var(--forest)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CreditCard size={16} color="white" /></div>
                Payment Method
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when your order arrives at your door' },
                  { id: 'upi', icon: '📱', label: 'UPI Payment',       desc: 'Google Pay, PhonePe, Paytm, or any UPI app' },
                  { id: 'bank', icon: '🏦', label: 'Bank Transfer',    desc: 'Direct NEFT/RTGS transfer' },
                ].map(m => (
                  <label key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', borderRadius: 'var(--radius-sm)', border: `2px solid ${form.paymentMethod === m.id ? 'var(--gold)' : 'var(--border)'}`, background: form.paymentMethod === m.id ? 'var(--gold-pale)' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <input type="radio" name="paymentMethod" value={m.id} checked={form.paymentMethod === m.id} onChange={handleChange} style={{ marginTop: 3 }} />
                    <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{m.label}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '3px' }}>{m.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '9px', color: 'var(--forest)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} color="white" /></div>
                Order Notes <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>(Optional)</span>
              </h3>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any special delivery instructions or notes for us..."
                style={{ width: '100%', padding: '11px 16px', border: '1.5px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', resize: 'vertical', fontSize: '0.92rem' }} />
            </div>

            <button type="submit" className="btn btn-primary btn-xl" disabled={loading} style={{ width: '100%' }}>
              {loading ? <><span className="spinner" /> Placing Order...</> : `Place Order — ₹${grandTotal}`}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', color: 'var(--muted)', fontSize: '0.8rem' }}>
              <ShieldCheck size={13} /> 100% Secure · SSL Encrypted
            </div>
          </form>

          {/* Right: summary */}
          <div>
            <div className="card" style={{ padding: '24px', position: 'sticky', top: 80 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--border)' }}>Your Order ({cart.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item.productId} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--cream-dark)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => e.target.src = 'https://via.placeholder.com/48?text=P'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>× {item.quantity}</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>₹{totalPrice.toFixed(0)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Delivery</span><span style={{ fontWeight: 600, color: delivery === 0 ? 'var(--success)' : 'inherit' }}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}><span style={{ color: 'var(--muted)' }}>Tax (5%)</span><span style={{ fontWeight: 600 }}>₹{tax}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', borderTop: '2px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
                  <span>Total</span><span style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>₹{grandTotal}</span>
                </div>
              </div>
              <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--muted)', background: 'var(--cream)', borderRadius: 8, padding: '10px 14px' }}>
                <Truck size={14} color="var(--gold)" /> Estimated delivery: 3-5 business days
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.container > div > div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
