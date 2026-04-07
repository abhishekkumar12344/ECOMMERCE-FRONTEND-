import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const CATS = [
  { id: 'all',  label: 'All Products', icon: '🛍️' },
  { id: 'oil',  label: 'Oils',         icon: '🫙' },
  { id: 'ghee', label: 'Ghee',         icon: '🧈' },
  { id: 'food', label: 'Food',         icon: '🌾' },
  { id: 'fuel', label: 'Fuels',        icon: '⛽' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const category = searchParams.get('category') || 'all';

  const fetchProducts = (cat, s) => {
    setLoading(true);
    const params = {};
    if (cat && cat !== 'all') params.category = cat;
    if (s) params.search = s;
    productsAPI.getAll(params)
      .then(r => setProducts(r?.data?.products || r?.data?.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(category, search); }, [category]);

  const handleSearch = (e) => { e.preventDefault(); fetchProducts(category, search); };
  const clearSearch = () => { setSearch(''); fetchProducts(category, ''); };

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-eyebrow" style={{ background: 'rgba(201,151,58,0.2)', color: 'var(--gold-light)', border: '1px solid rgba(201,151,58,0.3)' }}>🛍️ Catalogue</div>
          <h1>Our Products</h1>
          <p>Premium quality oils, ghee, food products & fuels</p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {/* Search + filters bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', flexWrap: 'wrap', alignItems: 'center' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flex: 1, minWidth: 240, maxWidth: 480 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-light)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                style={{ width: '100%', paddingLeft: '42px', padding: '11px 14px 11px 42px', border: '1.5px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', fontSize: '0.92rem', background: 'white' }} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
            {search && <button type="button" className="btn btn-ghost btn-sm" onClick={clearSearch}><X size={15} /></button>}
          </form>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <SlidersHorizontal size={16} color="var(--muted)" style={{ alignSelf: 'center' }} />
            {CATS.map(cat => (
              <button key={cat.id} onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 30, border: `2px solid ${category === cat.id ? 'var(--gold)' : 'var(--border)'}`, background: category === cat.id ? 'var(--gold)' : 'white', color: category === cat.id ? 'white' : 'var(--ink-soft)', fontWeight: 600, cursor: 'pointer', fontSize: '0.86rem', transition: 'all 0.18s' }}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div style={{ marginBottom: '24px', color: 'var(--muted)', fontSize: '0.88rem' }}>
            {products.length > 0 ? `${products.length} product${products.length !== 1 ? 's' : ''} found` : ''}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="shimmer" style={{ height: 350, borderRadius: 'var(--radius)' }} />)}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px', color: 'var(--ink)' }}>No products found</h3>
            <p>Try adjusting your search or select a different category</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            {products.map(p => <ProductCard key={p._id || p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
