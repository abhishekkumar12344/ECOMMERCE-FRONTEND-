import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const catStyle = {
  oil:  { bg: '#FEF3C7', color: '#92400E', label: 'Oil' },
  ghee: { bg: '#FCE7F3', color: '#831843', label: 'Ghee' },
  food: { bg: '#D1FAE5', color: '#065F46', label: 'Food' },
  fuel: { bg: '#DBEAFE', color: '#1E40AF', label: 'Fuel' },
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const cat = catStyle[product.category] || { bg: '#F3F4F6', color: '#374151', label: product.category };

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product.id || product._id}`}
      style={{ display: 'block', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.25s ease', boxShadow: 'var(--shadow-sm)' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--gold-light)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>

      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 210, background: 'var(--cream-dark)' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(product.name); }} />
        
        {/* Category tag */}
        <span style={{ position: 'absolute', top: 12, left: 12, background: cat.bg, color: cat.color, padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {cat.label}
        </span>

        {/* Featured badge */}
        {product.featured === 1 && (
          <span style={{ position: 'absolute', top: 12, right: 12, background: 'var(--gold)', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700 }}>
            ★ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '18px' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '6px', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.35 }}>{product.name}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '12px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.55 }}>
          {product.description}
        </p>

        {/* Rating */}
        {product.avgRating > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={12} fill={s <= Math.round(product.avgRating) ? '#F5A623' : 'none'} stroke={s <= Math.round(product.avgRating) ? '#F5A623' : '#D1D5DB'} />
            ))}
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '3px' }}>({product.reviewCount})</span>
          </div>
        )}

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
          <div>
            <span style={{ fontWeight: 800, color: 'var(--gold-dark)', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>₹{product.price}</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.78rem', marginLeft: '4px' }}>/ {product.unit}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={handleAdd} style={{ gap: '5px', borderRadius: 8 }}>
            <ShoppingCart size={13} /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}
