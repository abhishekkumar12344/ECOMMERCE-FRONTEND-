import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, CheckCircle, Truck, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const catStyle = {
  oil:  { bg: '#FEF3C7', color: '#92400E', label: 'Oil' },
  ghee: { bg: '#FCE7F3', color: '#831843', label: 'Ghee' },
  food: { bg: '#D1FAE5', color: '#065F46', label: 'Food' },
  fuel: { bg: '#DBEAFE', color: '#1E40AF', label: 'Fuel' },
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    productsAPI.getOne(id)
      .then(r => setProduct(r?.data?.product || null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => { addToCart(product, qty); toast.success(`${product.name} (×${qty}) added to cart!`); };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to add a review');
    setSubmitting(true);
    try {
      const res = await productsAPI.addReview(id, review);
      setProduct(prev => ({ ...prev, reviews: res?.data?.reviews || [] }));
      setReview({ rating: 5, comment: '' });
      toast.success('Review submitted!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to submit review'); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="loading-page"><div className="spinner spinner-dark" style={{ width: 40, height: 40 }} /></div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px 20px' }}><h2>Product not found</h2></div>;

  const cat = catStyle[product.category] || { bg: '#F3F4F6', color: '#374151', label: product.category };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Breadcrumb */}
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', marginBottom: '28px', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '52px', marginBottom: '60px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', background: 'white', border: '1px solid var(--border)', aspectRatio: '1/1', position: 'relative' }}>
            <img src={product.image} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.src = 'https://via.placeholder.com/600x600?text=' + encodeURIComponent(product.name); }} />
            {product.featured === 1 && (
              <span style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold)', color: 'white', padding: '6px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>⭐ Featured</span>
            )}
          </div>

          {/* Details */}
          <div>
            <span style={{ background: cat.bg, color: cat.color, padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'inline-block', marginBottom: '14px' }}>
              {cat.label}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>{product.name}</h1>

            {product.avgRating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= Math.round(product.avgRating) ? '#F5A623' : 'none'} stroke={s <= Math.round(product.avgRating) ? '#F5A623' : '#D1D5DB'} />)}
                </div>
                <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{product.avgRating.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
            )}

            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', marginBottom: '6px', lineHeight: 1 }}>
              ₹{product.price}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '20px' }}>per {product.unit}</div>

            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '28px', fontSize: '0.95rem' }}>{product.description}</p>

            {/* Perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', padding: '20px', background: 'var(--gold-pale)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              {[[CheckCircle, 'FSSAI certified & quality tested'], [Truck, 'Free pan-India delivery'], [Shield, '7-day return guarantee']].map(([Icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
                  <Icon size={15} color="var(--gold)" /> {text}
                </div>
              ))}
            </div>

            {/* Qty + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'white' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 42, height: 42, border: 'none', background: 'var(--cream-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--cream-dark)'}>
                  <Minus size={15} />
                </button>
                <span style={{ width: 52, textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: 42, height: 42, border: 'none', background: 'var(--cream-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--cream-dark)'}>
                  <Plus size={15} />
                </button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart} style={{ flex: 1, minWidth: 180 }}>
                <ShoppingCart size={18} /> Add to Cart — ₹{(product.price * qty).toFixed(0)}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '28px' }}>Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              {product.reviews.map((r, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '8px' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= r.rating ? '#F5A623' : 'none'} stroke={s <= r.rating ? '#F5A623' : '#D1D5DB'} />)}
                  </div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '10px' }}>{r.comment}</p>
                  <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>— {r.userName || 'Anonymous'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>No reviews yet. Be the first to review this product!</p>
          )}

          {/* Review form */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1.05rem' }}>Write a Review</h3>
            <form onSubmit={handleReview} style={{ maxWidth: 520 }}>
              <div className="form-group">
                <label>Your Rating</label>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} type="button" onClick={() => setReview(p => ({ ...p, rating: s }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                      <Star size={24} fill={s <= review.rating ? '#F5A623' : 'none'} stroke={s <= review.rating ? '#F5A623' : '#D1D5DB'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Your Review</label>
                <textarea value={review.comment} onChange={e => setReview(p => ({ ...p, comment: e.target.value }))} rows={3} required placeholder="Share your experience with this product..." />
              </div>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <><span className="spinner" />Submitting...</> : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.container > div > div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
