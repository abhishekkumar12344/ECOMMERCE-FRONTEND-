import React, { useState, useEffect } from 'react';
import { contactAPI } from '../utils/api';
import { MessageSquare, CheckCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contactAPI.getAll().then(r => setMsgs(r.data?.messages || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    try { await contactAPI.markRead(id); setMsgs(prev => prev.map(m => (m._id || m.id) === id ? { ...m, isRead: true } : m)); }
    catch { toast.error('Failed'); }
  };

  const deleteMsg = async (id) => {
    try { await contactAPI.delete(id); setMsgs(prev => prev.filter(m => (m._id || m.id) !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700 }}>Messages</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '4px' }}>{msgs.filter(m => !m.isRead).length} unread messages</p>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center' }}><div className="spinner spinner-dark" style={{ width: 36, height: 36 }} /></div>
      ) : msgs.length === 0 ? (
        <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <MessageSquare size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p>No messages yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {msgs.map(msg => (
            <div key={msg._id || msg.id} style={{ background: 'white', borderRadius: 'var(--radius)', border: `1.5px solid ${msg.isRead ? 'var(--border)' : 'var(--gold-light)'}`, padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.97rem' }}>{msg.name}</span>
                    {!msg.isRead && <span style={{ background: 'var(--gold)', color: 'white', padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 700 }}>NEW</span>}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '3px' }}>{msg.email} {msg.phone && `· ${msg.phone}`}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!msg.isRead && (
                    <button onClick={() => markRead(msg._id || msg.id)} className="btn btn-sm" style={{ background: 'var(--success-light)', border: 'none', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle size={13} /> Mark Read
                    </button>
                  )}
                  <button onClick={() => deleteMsg(msg._id || msg.id)} className="btn btn-sm" style={{ background: 'var(--danger-light)', border: 'none', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              {msg.subject && <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem', color: 'var(--forest)' }}>Re: {msg.subject}</div>}
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '0.9rem' }}>{msg.message}</p>
              <div style={{ color: 'var(--muted-light)', fontSize: '0.78rem', marginTop: '12px' }}>{new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
