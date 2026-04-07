import React, { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';
import { Plus, Pencil, Trash2, Package, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const EMPTY = { name: '', description: '', price: '', category: 'oil', unit: '1L', stock: '', image: '', featured: false };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => { productsAPI.adminGetAll().then(r => setProducts(r.data?.products || [])).catch(console.error).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => { setEditing(p._id || p.id); setForm({ name: p.name, description: p.description, price: p.price, category: p.category, unit: p.unit, stock: p.stock, image: p.image, featured: p.featured === 1 }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), featured: form.featured ? 1 : 0 };
      if (editing) { await productsAPI.update(editing, data); toast.success('Product updated!'); }
      else { await productsAPI.create(data); toast.success('Product created!'); }
      setModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try { await productsAPI.delete(id); setProducts(prev => prev.filter(p => (p._id || p.id) !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed to delete'); }
  };

  const catColors = { oil: '#FEF3C7', ghee: '#FCE7F3', food: '#D1FAE5', fuel: '#DBEAFE' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700 }}>Products</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '4px' }}>{products.length} products</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={17} /> Add Product</button>
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}><div className="spinner spinner-dark" style={{ width: 36, height: 36 }} /></div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id || p.id} style={{ borderBottom: i < products.length - 1 ? '1px solid var(--border)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--cream-dark)' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src = 'https://via.placeholder.com/44?text=P'} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{p.name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '2px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: catColors[p.category] || '#F3F4F6', padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>{p.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--gold-dark)' }}>₹{p.price}<span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.78rem' }}>/{p.unit}</span></td>
                  <td style={{ padding: '12px 16px', fontSize: '0.88rem' }}>{p.stock}</td>
                  <td style={{ padding: '12px 16px' }}>{p.featured === 1 ? <span style={{ color: 'var(--gold)', fontWeight: 700 }}>⭐ Yes</span> : <span style={{ color: 'var(--muted)' }}>No</span>}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(p)} className="btn btn-sm" style={{ background: 'var(--gold-pale)', border: 'none', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}><Pencil size={13} /> Edit</button>
                      <button onClick={() => handleDelete(p._id || p.id, p.name)} className="btn btn-sm btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }}>{editing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group"><label>Product Name</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="e.g. Premium Mustard Oil" /></div>
              <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} required placeholder="Describe the product..." /></div>
              <div className="form-row">
                <div className="form-group"><label>Price (₹)</label><input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required min={0} step="0.01" /></div>
                <div className="form-group"><label>Stock</label><input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} required min={0} /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                    {['oil','ghee','food','fuel'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Unit</label><input value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} required placeholder="e.g. 1L, 500g" /></div>
              </div>
              <div className="form-group"><label>Image URL</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} style={{ width: 18, height: 18 }} />
                <label htmlFor="featured" style={{ fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Mark as Featured Product</label>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" disabled={saving} style={{ flex: 1 }}>
                  {saving ? <><span className="spinner" /> Saving...</> : <><Save size={16} /> {editing ? 'Update' : 'Create'} Product</>}
                </button>
                <button type="button" onClick={() => setModal(false)} className="btn btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
