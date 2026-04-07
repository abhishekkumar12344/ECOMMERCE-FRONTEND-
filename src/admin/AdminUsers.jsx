import React, { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import { Users, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAPI.getAll().then(r => setUsers(r.data?.users || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await userAPI.updateRole(id, newRole);
      setUsers(prev => prev.map(u => (u._id || u.id) === id ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}`);
    } catch (err) { toast.error('Failed to update role'); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700 }}>Users</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '4px' }}>{users.length} registered users</p>
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><div className="spinner spinner-dark" style={{ width: 36, height: 36 }} /></div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}>
                {['User', 'Email', 'Phone', 'Role', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id || u.id} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--border)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{u.name?.charAt(0).toUpperCase()}</div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--muted)' }}>{u.email}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--muted)' }}>{u.phone || '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: u.role === 'admin' ? 'var(--forest)' : 'var(--gold-pale)', color: u.role === 'admin' ? 'white' : 'var(--gold-dark)', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: 'var(--muted)' }}>{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => toggleRole(u._id || u.id, u.role)} className="btn btn-sm" style={{ background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink-soft)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Shield size={12} /> Toggle Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
