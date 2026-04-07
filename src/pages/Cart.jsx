import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Tag } from 'lucide-react';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--cream)', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--gold-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2.8rem' }}>🛒</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>Your cart is empty</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '1.02rem' }}>Discover our premium products and start shopping!</p>
      <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
    </div>
  );

  const handleCheckout = () => { if (!user) navigate('/login?redirect=/checkout'); else navigate('/checkout'); };
  const delivery = totalPrice >= 499 ? 0 : 49;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + delivery + tax;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingBag size={26} color="var(--gold)" /> Shopping Cart
              <span style={{ background: 'var(--gold)', color: 'white', borderRadius: 20, padding: '2px 12px', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-body)' }}>{cart.length}</span>
            </h1>
            <button onClick={clearCart} style={{ color: 'var(--danger)', background: 'none', border: '1.5px solid var(--danger)', padding: '7px 16px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--danger)'; }}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
          {/* Cart items */}
          <div>
            {cart.map((item, idx) => (
              <div key={item.productId} className="card" style={{ display: 'flex', gap: '18px', padding: '22px', marginBottom: '16px', alignItems: 'center', transition: 'box-shadow 0.2s', animationDelay: `${idx * 0.06}s` }}>
                <div style={{ width: 88, height: 88, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--cream-dark)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => e.target.src = 'https://via.placeholder.com/90?text=' + encodeURIComponent(item.name)} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '4px', fontSize: '0.97rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '14px' }}>₹{item.price} / {item.unit}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'white' }}>
                      <button onClick={() => updateQty(item.productId, item.quantity - 1)} style={{ width: 34, height: 34, border: 'none', background: 'var(--cream-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--cream-dark)'}>
                        <Minus size={13} />
                      </button>
                      <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, item.quantity + 1)} style={{ width: 34, height: 34, border: 'none', background: 'var(--cream-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--cream-dark)'}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: 6, transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = 'var(--danger-light)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'none'; }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>₹{(item.price * item.quantity).toFixed(0)}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-light)', marginTop: '4px' }}>{item.quantity} × ₹{item.price}</div>
                </div>
              </div>
            ))}

            <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: 'var(--muted)', fontWeight: 500, fontSize: '0.9rem', marginTop: '8px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              <ArrowLeft size={15} /> Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div>
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 600, flexShrink: 0 }}>₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>₹{totalPrice.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px' }}><Truck size={14} /> Delivery</span>
                  <span style={{ fontWeight: 600, color: delivery === 0 ? 'var(--success)' : 'inherit' }}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--muted)' }}>Tax (5%)</span>
                  <span style={{ fontWeight: 600 }}>₹{tax}</span>
                </div>
              </div>

              <div style={{ borderTop: '2px solid var(--border)', marginTop: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.3rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>₹{grandTotal.toFixed(0)}</span>
              </div>

              {delivery === 0 && (
                <div style={{ background: 'var(--success-light)', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginTop: '14px', fontSize: '0.82rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Tag size={13} /> 🎉 You qualify for FREE delivery!
                </div>
              )}
              {delivery > 0 && (
                <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', marginTop: '14px', fontSize: '0.82rem', color: 'var(--gold-dark)' }}>
                  Add ₹{(499 - totalPrice).toFixed(0)} more for FREE delivery!
                </div>
              )}

              <button className="btn btn-primary btn-lg" onClick={handleCheckout} style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>
                {user ? 'Proceed to Checkout →' : 'Login to Checkout'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', color: 'var(--muted)', fontSize: '0.78rem' }}>
                <ShieldCheck size={13} /> Secure checkout · 7-day returns
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.container > div > div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
